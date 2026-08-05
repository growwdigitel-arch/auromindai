import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { content, model, mode } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return streamText(`I'm **AuroVex**, your AI assistant by AuromindAI.\n\nI received: *"${content}"*\n\nTo enable real AI responses, please set your **GEMINI_API_KEY** in Vercel Environment Variables.`);
    }

    // Use generateContent (REST) — simple, reliable, no SSE parsing needed
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `You are AuroVex, an expert AI assistant built by AuromindAI. You are in ${mode || 'General AI'} mode. Be professional, helpful, and concise. Format responses with clean Markdown.`;

    const body = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          parts: [{ text: content }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini error:', geminiRes.status, errText);
      return streamText(`Sorry, I encountered an error (${geminiRes.status}). Please try again.`);
    }

    const data = await geminiRes.json();
    const responseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not generate a response. Please try again.';

    // Stream the response word-by-word for a live typing effect
    return streamText(responseText);
  } catch (error: any) {
    console.error('Chat route error:', error);
    return streamText(`An error occurred: ${error?.message || 'Unknown error'}. Please try again.`);
  }
}

// Helper: stream text word-by-word as SSE
function streamText(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(/(\s+)/); // split preserving whitespace
      for (const word of words) {
        controller.enqueue(encoder.encode(`data: ${word}\n\n`));
        await new Promise((r) => setTimeout(r, 18));
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
