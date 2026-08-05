import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Models available on this API key (from Google AI Studio Rate Limits)
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-preview-05-20',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash-001',
  'gemini-1.5-flash',
];

export async function POST(req: NextRequest) {
  try {
    const { content, model, mode } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return streamText(`I'm **AuroVex**, your AI assistant by AuromindAI.\n\nYou asked: *"${content}"*\n\nTo enable real AI responses, set your **GEMINI_API_KEY** in Vercel Environment Variables.`);
    }

    const systemPrompt = `You are AuroVex, an expert AI assistant built by AuromindAI. Mode: ${mode || 'General AI'}. Be professional, helpful, concise. Format with clean Markdown.`;

    // Build a simple request body — embed system prompt in user message for compatibility
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser request: ${content}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    // Try each model + both API versions until one succeeds
    let responseText: string | null = null;
    let lastError = '';

    const apiVersions = ['v1beta', 'v1'];

    outer:
    for (const geminiModel of GEMINI_MODELS) {
      for (const apiVersion of apiVersions) {
        try {
          const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${geminiModel}:generateContent?key=${apiKey}`;

          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
          });

          if (res.ok) {
            const data = await res.json();
            responseText =
              data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
            if (responseText) break outer; // success — stop all loops
          } else {
            const errText = await res.text();
            lastError = `${geminiModel}(${apiVersion}): ${res.status}`;
            console.error('Gemini attempt failed:', lastError, errText.slice(0, 200));
          }
        } catch (e: any) {
          lastError = `${geminiModel}(${apiVersion}): ${e.message}`;
          console.error('Gemini fetch error:', lastError);
        }
      }
    }

    if (!responseText) {
      console.error('All Gemini models failed. Last error:', lastError);
      return streamText(
        `I'm having trouble connecting to the AI engine right now. Please try again in a moment.\n\n*Error: ${lastError}*`
      );
    }

    return streamText(responseText);
  } catch (error: any) {
    console.error('Chat route exception:', error);
    return streamText(`An unexpected error occurred: ${error?.message || 'Unknown error'}. Please try again.`);
  }
}

// Stream text word-by-word as SSE for live typing effect
function streamText(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const tokens = text.split(/(\s+)/);
      for (const token of tokens) {
        if (token) {
          controller.enqueue(encoder.encode(`data: ${token}\n\n`));
          await new Promise((r) => setTimeout(r, 15));
        }
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
