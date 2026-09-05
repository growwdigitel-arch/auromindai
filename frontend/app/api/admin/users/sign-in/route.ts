import { NextRequest, NextResponse } from 'next/server';
import { recordUserSignIn } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = recordUserSignIn(email, name);

    return NextResponse.json({
      status: 'success',
      message: 'User sign-in recorded and saved in database',
      user
    });
  } catch (err) {
    console.error('Failed to record user sign in:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
