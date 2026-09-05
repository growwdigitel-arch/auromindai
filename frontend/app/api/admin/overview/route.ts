import { NextResponse } from 'next/server';
import { getOverviewMetrics } from '@/lib/db';

export async function GET() {
  try {
    const metrics = getOverviewMetrics();
    return NextResponse.json(metrics);
  } catch (err) {
    console.error('Failed to compute overview metrics:', err);
    return NextResponse.json({ error: 'Failed to compute metrics' }, { status: 500 });
  }
}
