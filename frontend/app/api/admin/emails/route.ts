import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getWritableDataDir(): string {
  const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  return isServerless ? '/tmp/auromind-data' : path.join(process.cwd(), 'data');
}

export async function GET() {
  try {
    const filePath = path.join(getWritableDataDir(), 'sent-emails.json');
    let emails = [];
    if (fs.existsSync(filePath)) {
      emails = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return NextResponse.json({ total: emails.length, emails });
  } catch (err) {
    return NextResponse.json({ emails: [] });
  }
}
