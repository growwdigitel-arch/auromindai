import { NextRequest, NextResponse } from 'next/server';

const VALID_USERNAMES = [
  'auromindai admin',
  'auromindai',
  'admin',
  'admin@auromind.ai',
  'owner@auromind.ai'
];

const VALID_PASSWORD = 'aurovex123';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const normalizedUser = (username || '').toLowerCase().trim();
    const normalizedPass = (password || '').trim();

    const isUserValid = VALID_USERNAMES.some(
      u => u === normalizedUser || normalizedUser.replace(/\s+/g, '') === u.replace(/\s+/g, '')
    );
    const isPassValid = normalizedPass === VALID_PASSWORD;

    if (isUserValid && isPassValid) {
      return NextResponse.json({
        success: true,
        message: 'Owner Admin authenticated successfully',
        token: `owner-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        user: {
          name: 'AuromindAI Admin',
          username: 'auromindai admin',
          role: 'Owner',
          email: 'admin@auromind.ai'
        }
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid credentials. Please verify your admin username and password.'
      },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed due to server error' },
      { status: 500 }
    );
  }
}
