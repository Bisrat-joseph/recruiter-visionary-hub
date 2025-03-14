
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!MISTRAL_API_KEY) {
      throw new Error("MISTRAL_API_KEY is not set in environment variables");
    }

    const { resumeText } = await req.json();

    if (!resumeText || typeof resumeText !== 'string') {
      throw new Error("Resume text is required and must be a string");
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [
          {
            role: "system",
            content: "You are an expert recruiter AI assistant that analyzes resumes. Provide structured analysis of the candidate's skills, experience, education, and strengths/weaknesses. Include a match percentage for technical skills, experience, education, cultural fit, and communication. For each category, provide a brief suggestion."
          },
          {
            role: "user",
            content: `Analyze this resume and provide a structured evaluation: ${resumeText}`
          }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to analyze resume");
    }

    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in analyze-resume function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
