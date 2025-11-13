import { corsHeaders } from '../_shared/cors.ts';

const finnhubApiKey = Deno.env.get('FINNHUB_API_KEY');

Deno.serve(async (req) => {
  const query = new URL(req.url).searchParams.get('q');
  if (!query) return new Response(JSON.stringify({ error: 'Query "q" is required' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });

  try {
    if (!finnhubApiKey) throw new Error("FINNHUB_API_KEY is not set.");
    const apiUrl = `https://finnhub.io/api/v1/search?q=${query}&token=${finnhubApiKey}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Finnhub API error: ${res.status}`);

    const data = await res.json();
    const filteredResults = data.result.filter(item => item.type === 'Common Stock');

    return new Response(JSON.stringify(filteredResults), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    });
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
