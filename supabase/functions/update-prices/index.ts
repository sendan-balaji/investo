import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY');
const popularStocks = ['AAPL', 'GOOGL', 'TSLA', 'MSFT'];

Deno.serve(async (req) => {
  try {
    if (!finnhubApiKey) throw new Error("FINNHUB_API_KEY is not set.");

    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SB_SERVICE_ROLE_KEY')!);
    const { data: watchlistSymbols, error: symbolError } = await supabaseAdmin.from('watchlist').select('stock_symbol');
    if (symbolError) throw symbolError;

    const userSymbols = watchlistSymbols.map(item => item.stock_symbol);
    const trackedStocks = [...new Set([...popularStocks, ...userSymbols])];

    for (const symbol of trackedStocks) {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`;
      const res = await fetch(url);
      if (!res.ok) continue;

      const stockData = await res.json();
      const currentPrice = stockData.c;
      const changePercent = stockData.dp;

      if (currentPrice === 0 && changePercent === 0) continue;

      await supabaseAdmin.from('price_history').insert({ stock_symbol: symbol, price: currentPrice });
      await supabaseAdmin.from('prices').upsert({
        stock_symbol: symbol,
        current_price: currentPrice,
        change_percent: changePercent,
        last_updated_at: new Date().toISOString()
      }, { onConflict: 'stock_symbol' });
    }

    return new Response(JSON.stringify({ message: `Updated ${trackedStocks.length} stocks.` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    });
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
