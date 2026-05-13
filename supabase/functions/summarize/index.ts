// import { serve } from "https://deno.land/std/http/server.ts";

// serve(async (req) => {
//   try {
//     const { auditResult } = await req.json();

//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//   model: "llama-3.1-8b-instant",
//   messages: [
//     {
//       role: "user",
//       content: `Summarize this financial data in 2-3 lines: ${JSON.stringify(auditResult)}`
//     }
//   ],
//   temperature: 0.7,
// }),
//     });

//     const data = await response.json();

//     console.log("GROQ RESPONSE:", JSON.stringify(data));

//     const summary =
//       data?.choices?.[0]?.message?.content ||
//       data?.error?.message ||
//       "No summary generated";

//     return new Response(
//       JSON.stringify({ summary, debug: data }),
//       { headers: { "Content-Type": "application/json" } }
//     );

//   } catch (err) {
//     return new Response(
//       JSON.stringify({ error: err.message }),
//       { status: 500 }
//     );
//   }
// });

import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { auditResult } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `
You are a financial AI assistant.

Analyze this financial data and give:
1. One insight
2. One recommendation

Data:
${JSON.stringify(auditResult)}
              `,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    const summary =
      data?.choices?.[0]?.message?.content ||
      "No summary generated.";

    return new Response(
      JSON.stringify({ summary }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});