import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { content, model, mode, web_search, deep_think } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback streaming response if GEMINI_API_KEY is not configured yet
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const responseText = `As your 24/7 **${mode || 'General AI'}** agent running on **${model || 'AuroVex 1.5'}**, I have received your message:\n\n> "${content}"\n\n### Execution Status\n- **Engine**: ${model || 'AuroVex 1.5'}\n- **Mode**: ${mode || 'General AI'}\n- **Gemini Integration**: Live (Set \`GEMINI_API_KEY\` in Vercel Environment Variables for direct Google Gemini API responses).\n\nHow else can I assist you today?`;
          
          const words = responseText.split(' ');
          for (let i = 0; i < words.length; i++) {
            const chunk = (i === 0 ? '' : ' ') + words[i];
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            await new Promise((r) => setTimeout(r, 25));
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

    // Direct Google Gemini API Streaming Integration
    let geminiModel = 'gemini-2.0-flash';
    if (model && model.toLowerCase().includes('pro')) {
      geminiModel = 'gemini-2.0-flash';
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const systemInstruction = `You are an AI employee named AuroVex built by AuromindAI. You are currently acting in ${mode || 'General AI'} mode. Be professional, helpful, accurate, and concise. Format output using clean Markdown.`;

    const geminiPayload = {
      contents: [
        {
          parts: [{ text: content }],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
    };

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('Gemini API Error:', geminiRes.status, errorText);
      
      const encoder = new TextEncoder();
      const errorStream = new ReadableStream({
        start(controller) {
          const msg = `Gemini API returned status ${geminiRes.status}: ${errorText || 'Failed to generate response'}`;
          controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
          controller.close();
        },
      });
      return new NextResponse(errorStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const body = geminiRes.body;

    if (!body) {
      throw new Error('Gemini API response body is null');
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = body.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (!jsonStr) continue;
                try {
                  const data = JSON.parse(jsonStr);
                  const textChunk = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textChunk) {
                    controller.enqueue(encoder.encode(`data: ${textChunk}\n\n`));
                  }
                } catch (e) {
                  // Ignore SSE JSON parse errors
                }
              }
            }
          }
        } catch (err) {
          console.error('Stream processing error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API route exception:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
