/**
 * Cliente SSE para el Concierge IA de Mall OS con streaming y timeout rápido.
 * Se conecta al endpoint /api/concierge/chat en el servidor Next.js.
 */

export interface ConciergeApiMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system' | 'model';
  content: string;
}

export interface StreamConciergeOptions {
  messages: ConciergeApiMessage[];
  mallId?: string;
  onTextChunk?: (chunk: string) => void;
  onToolCall?: (toolName: string, args: Record<string, unknown>) => void;
  onToolResult?: (toolName: string, result: unknown) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}

const DEFAULT_ADMIN_URL = 'http://localhost:3000';
const CONNECT_TIMEOUT_MS = 2000;

export function getAdminApiUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_ADMIN_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }
  return DEFAULT_ADMIN_URL;
}

export async function streamConciergeChat(options: StreamConciergeOptions): Promise<void> {
  const {
    messages,
    mallId = 'sambil-chacao',
    onTextChunk,
    onToolCall,
    onToolResult,
    onDone,
    onError,
    signal,
  } = options;

  const baseUrl = getAdminApiUrl();
  const endpoint = `${baseUrl}/api/concierge/chat`;

  // Controlador de timeout de conexión a 2 segundos
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, CONNECT_TIMEOUT_MS);

  // Vincular abort del llamador si se provee
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Mall-OS-Key': 'mallos-concierge-secret-2026',
        'X-Mall-ID': mallId,
      },
      body: JSON.stringify({
        messages,
        mallId,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error en servidor Concierge (${response.status}): ${response.statusText}`);
    }

    if (!response.body) {
      // Fallback si la plataforma móvil no soporta ReadableStream nativo en fetch
      const text = await response.text();
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'text' && onTextChunk) onTextChunk(data.text);
            if (data.type === 'tool_call' && onToolCall) onToolCall(data.toolName, data.args);
            if (data.type === 'tool_result' && onToolResult) onToolResult(data.toolName, data.result);
          } catch {
            // Ignorar líneas no JSON
          }
        }
      }
      onDone?.();
      return;
    }

    // Lector de ReadableStream SSE para streaming progresivo
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice(6);
          try {
            const event = JSON.parse(jsonStr);
            if (event.type === 'text' && onTextChunk) {
              onTextChunk(event.text);
            } else if (event.type === 'tool_call' && onToolCall) {
              onToolCall(event.toolName, event.args);
            } else if (event.type === 'tool_result' && onToolResult) {
              onToolResult(event.toolName, event.result);
            } else if (event.type === 'done') {
              onDone?.();
            } else if (event.type === 'error') {
              throw new Error(event.error || 'Error reportado por el servidor');
            }
          } catch (jsonErr) {
            // Evento incompleto o no JSON
          }
        }
      }
    }

    onDone?.();
  } catch (err) {
    clearTimeout(timeoutId);
    const errorObj = err instanceof Error ? err : new Error(String(err));
    onError?.(errorObj);
    throw errorObj;
  }
}
