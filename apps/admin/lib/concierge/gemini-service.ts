import { GoogleGenAI } from '@google/genai';
import { aiProviderRegistry } from './ai-provider';
import type {
  AiProvider,
  ChatCompletionOptions,
  ConciergeEvent,
} from './types';
import { buildConciergeSystemInstruction } from './prompts';
import { CONCIERGE_TOOLS, executeConciergeTool } from './tools';
import mallData from './data/mall-data.json';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function getMallInfo(mallId: string) {
  const normalized = mallId.toLowerCase();
  const mall = mallData.malls.find(
    (m) =>
      m.id.toLowerCase() === normalized ||
      m.slug.toLowerCase() === normalized ||
      m.name.toLowerCase().includes(normalized)
  );

  if (mall) {
    return {
      mallId: mall.id,
      mallName: mall.name,
      city: mall.city,
      availableFloors: mall.floors,
    };
  }

  return {
    mallId: mallId || 'sambil-chacao',
    mallName: 'Mall OS Sambil Chacao',
    city: 'Caracas',
    availableFloors: ['Nivel Autopista (L1)', 'Nivel Acuario (L2)', 'Nivel Libertador (L3)', 'Nivel Feria (L4)'],
  };
}

export class GeminiConciergeService implements AiProvider {
  public readonly name = 'gemini';
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }

  private getClient(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno.');
      }
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return this.ai;
  }

  public async *streamChat(options: ChatCompletionOptions): AsyncGenerator<ConciergeEvent, void, unknown> {
    const { mallId, messages } = options;

    try {
      const ai = this.getClient();
      const mallInfo = getMallInfo(mallId);
      const systemInstruction = buildConciergeSystemInstruction(mallInfo);

      // Mapear historial al formato de contents de Gemini
      const contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> = [];

      for (const msg of messages) {
        const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
        contents.push({
          role,
          parts: [{ text: msg.content }],
        });
      }

      // Si no hay mensajes, generar saludo inicial
      if (contents.length === 0) {
        contents.push({
          role: 'user',
          parts: [{ text: 'Hola, ¿qué opciones tienes hoy?' }],
        });
      }

      let iteration = 0;
      const MAX_TOOL_ITERATIONS = 4;

      while (iteration < MAX_TOOL_ITERATIONS) {
        iteration++;

        const responseStream = await ai.models.generateContentStream({
          model: GEMINI_MODEL,
          contents,
          config: {
            systemInstruction,
            tools: [{ functionDeclarations: CONCIERGE_TOOLS }],
            temperature: options.temperature ?? 0.4,
          },
        });

        let accumulatedText = '';
        const pendingFunctionCalls: Array<{ name: string; args: Record<string, unknown>; id?: string }> = [];

        for await (const chunk of responseStream) {
          const chunkText = chunk.text;
          if (chunkText) {
            accumulatedText += chunkText;
            yield {
              type: 'text',
              text: chunkText,
            };
          }

          if (chunk.functionCalls && chunk.functionCalls.length > 0) {
            for (const call of chunk.functionCalls) {
              if (call.name) {
                pendingFunctionCalls.push({
                  name: call.name,
                  args: (call.args as Record<string, unknown>) || {},
                  id: call.id,
                });
              }
            }
          }
        }

        // Si no hay llamadas a funciones pendientes, terminamos el ciclo
        if (pendingFunctionCalls.length === 0) {
          break;
        }

        // Guardar el turno del modelo con sus functionCalls
        const modelParts: Array<Record<string, unknown>> = [];
        if (accumulatedText) {
          modelParts.push({ text: accumulatedText });
        }
        for (const call of pendingFunctionCalls) {
          modelParts.push({
            functionCall: {
              name: call.name,
              args: call.args,
            },
          });
        }
        contents.push({
          role: 'model',
          parts: modelParts,
        });

        // Ejecutar las herramientas y emitir eventos
        const toolResponseParts: Array<Record<string, unknown>> = [];

        for (const call of pendingFunctionCalls) {
          yield {
            type: 'tool_call',
            toolName: call.name,
            args: call.args,
          };

          let result: unknown;
          try {
            result = await executeConciergeTool(mallId, call.name, call.args);
          } catch (toolError) {
            result = { error: toolError instanceof Error ? toolError.message : 'Error ejecutando herramienta' };
          }

          yield {
            type: 'tool_result',
            toolName: call.name,
            result,
          };

          toolResponseParts.push({
            functionResponse: {
              name: call.name,
              response: { result },
            },
          });
        }

        // Añadir el turno de respuesta de las herramientas
        contents.push({
          role: 'user',
          parts: toolResponseParts,
        });
      }

      yield { type: 'done' };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al procesar la solicitud con Gemini';
      yield {
        type: 'error',
        error: errorMessage,
      };
    }
  }
}

// Instanciar y registrar como proveedor predeterminado
export const geminiConciergeService = new GeminiConciergeService();
aiProviderRegistry.register(geminiConciergeService);
aiProviderRegistry.setDefault('gemini');
