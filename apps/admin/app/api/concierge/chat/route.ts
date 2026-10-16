import { NextRequest } from 'next/server';
import { z } from 'zod';
import { aiProviderRegistry } from '@/lib/concierge/ai-provider';
import '@/lib/concierge/gemini-service'; // Asegura el registro del proveedor Gemini
import type { ConciergeMessage } from '@/lib/concierge/types';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// ============================================================================
// RATE LIMITING EN MEMORIA
// ============================================================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 peticiones por minuto por cliente
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

// Limpieza periódica de registros viejos para evitar fugas de memoria
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000).unref?.();

// ============================================================================
// ESQUEMA DE VALIDACIÓN DEL REQUEST
// ============================================================================

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      id: z.string().optional().default(() => Math.random().toString(36).substring(2, 9)),
      role: z.enum(['user', 'assistant', 'system', 'model']),
      content: z.string(),
      timestamp: z.number().optional(),
    })
  ),
  mallId: z.string().optional(),
});

// ============================================================================
// ROUTE HANDLER (POST /api/concierge/chat)
// ============================================================================

export async function POST(req: NextRequest) {
  // 1. Verificación de clave perimetral X-Mall-OS-Key
  const requiredKey = process.env.CONCIERGE_API_KEY || 'mallos-concierge-secret-2026';
  const providedKey = req.headers.get('X-Mall-OS-Key') || req.headers.get('x-mall-os-key');

  if (providedKey !== requiredKey) {
    return new Response(
      JSON.stringify({ error: 'No autorizado: cabecera X-Mall-OS-Key inválida o ausente' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 2. Control de Tasa (Rate Limiting)
  const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous-client';
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: 'Demasiadas solicitudes. Por favor espera un momento antes de reintentar.' }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 3. Validación de cuerpo de la petición
  let bodyJson: unknown;
  try {
    bodyJson = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Cuerpo de la petición inválido: JSON malformado' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const parseResult = chatRequestSchema.safeParse(bodyJson);
  if (!parseResult.success) {
    return new Response(
      JSON.stringify({ error: 'Datos de mensaje inválidos', details: parseResult.error.format() }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const { messages, mallId: bodyMallId } = parseResult.data;

  // 4. Resolución de Mall ID
  const mallId =
    req.headers.get('X-Mall-ID') ||
    req.headers.get('x-mall-id') ||
    bodyMallId ||
    process.env.DEFAULT_MALL_ID ||
    'sambil-chacao';

  // 5. Instanciar proveedor y generar flujo SSE
  const provider = aiProviderRegistry.get('gemini');
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const eventGenerator = provider.streamChat({
          mallId,
          messages: messages as ConciergeMessage[],
        });

        for await (const event of eventGenerator) {
          const ssePayload = `data: ${JSON.stringify(event)}\n\n`;
          controller.enqueue(encoder.encode(ssePayload));
        }

        controller.close();
      } catch (streamError) {
        const errorMsg = streamError instanceof Error ? streamError.message : 'Error en la transmisión SSE';
        const errorPayload = `data: ${JSON.stringify({ type: 'error', error: errorMsg })}\n\n`;
        controller.enqueue(encoder.encode(errorPayload));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Evita buffering en proxies intermedios
    },
  });
}
