// supabase/functions/get-price-history/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  const { symbol } = await req.json();
  if (!symbol) return new Response(JSON.stringify({ error: 'Symbol is required' }), { status: 400, headers: corsHeaders });

  try {
    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SB_SERVICE_ROLE_KEY')!);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data, error } = await supabaseAdmin.from('price_history').select('price').eq('stock_symbol', symbol).gt('recorded_at', oneHourAgo).order('recorded_at', { ascending: true });
    if (error) throw error;

    const priceData = data.map(item => item.price);
    return new Response(JSON.stringify({ history: priceData }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
  }
});
