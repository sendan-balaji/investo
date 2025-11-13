// supabase/functions/ai-suggestions/index.ts

import { corsHeaders } from '../_shared/cors.ts';
import { GoogleGenerativeAI } from 'npm:@google/generative-ai';

// This function will be called when the file is first run
const getGenAI = () => {
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
  }
  return new GoogleGenerativeAI(apiKey);
};

const genAI = getGenAI();

Deno.serve(async (req) => {
  try {
    const { marketData } = await req.json();
    if (!marketData || marketData.length === 0) {
      throw new Error("Market data is missing or empty.");
    }

    // Use the newer, faster model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are a financial market analyst AI. Based on the following real-time market data, provide a brief (2-3 sentences) market summary.
        Identify the top gainer and the most notable loser and give a very short, plausible reason for their movement (e.g., "positive earnings report," "sector-wide downturn").
        Keep the tone professional and concise. Do not use markdown.

        Current Data:
        ${marketData.map(stock => `- ${stock.symbol}: Price ${stock.price}, Change ${stock.change.toFixed(2)}%`).join('\n')}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ suggestion: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
    });
  }
});
