import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Healthcheck seguro para el módulo de Concierge.
 * Valida la configuración de entorno requerida sin exponer secretos.
 */
export async function GET() {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  const hasConciergeKey = Boolean(process.env.CONCIERGE_API_KEY && process.env.CONCIERGE_API_KEY.trim().length > 0);
  const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL);
  const hasSupabaseKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const defaultMallId = process.env.DEFAULT_MALL_ID || 'sambil-chacao';
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const isHealthy = hasGeminiKey && hasConciergeKey;

  const status = isHealthy ? 'healthy' : 'degraded';

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      service: 'Mall OS Concierge AI',
      environment: {
        geminiApiKeyConfigured: hasGeminiKey,
        conciergeAuthKeyConfigured: hasConciergeKey,
        supabaseConfigured: hasSupabaseUrl && hasSupabaseKey,
        defaultMallId,
        model,
      },
      diagnostics: {
        streamingSupported: true,
        offlineFallbackAvailable: true,
        maxDurationSeconds: 60,
      },
    },
    {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
