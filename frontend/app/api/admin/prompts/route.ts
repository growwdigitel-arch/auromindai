import { NextRequest, NextResponse } from 'next/server';
import { getPrompts, addPrompt } from '@/lib/db';

export async function GET() {
  const prompts = getPrompts();
  return NextResponse.json({ total: prompts.length, prompts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPrompt = addPrompt(body);
    return NextResponse.json({ status: 'success', prompt: newPrompt });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add prompt' }, { status: 500 });
  }
}
