import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { GeminiProvider } from './llm-provider.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'auth_required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') ?? '';

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { message, mall_id } = await req.json();

    if (!message || !mall_id) {
      return new Response(JSON.stringify({ error: 'missing_parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Obtener contexto real del mall desde la DB (Server-Side Context Construction)
    const { data: mall } = await supabase.from('malls').select('name, status').eq('id', mall_id).single();
    if (!mall || mall.status !== 'active') {
      return new Response(JSON.stringify({ error: 'mall_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: stores } = await supabase
      .from('stores')
      .select('name, floor, unit, description, opening_hours, can_publish_offers')
      .eq('mall_id', mall_id)
      .eq('status', 'active');

    const { data: offers } = await supabase
      .from('offers')
      .select('title, benefit_label, terms')
      .eq('mall_id', mall_id)
      .eq('status', 'active');

    const systemPrompt = `Eres el Asistente Concierge de ${mall.name}.
Tu objetivo es orientar a los visitantes sobre las tiendas, promociones, horarios y ubicación en el centro comercial.
Responde de forma concisa, cordial y en español.
SOLO proporciona información basada en los siguientes datos del mall. Si no sabes la respuesta o el dato no está en la lista, indica honestamente que no dispones de esa información y sugiere consultar en información del mall.

LOCALES DISPONIBLES:
${JSON.stringify(stores, null, 2)}

PROMOCIONES ACTIVAS:
${JSON.stringify(offers, null, 2)}
`;

    const provider = new GeminiProvider(geminiApiKey);
    const result = await provider.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ]);

    return new Response(JSON.stringify({ reply: result.text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
