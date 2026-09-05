import { NextResponse } from 'next/server';
import { getOverviewMetrics } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const metrics = await getOverviewMetrics();
    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      }
    });
  } catch (err) {
    console.error('Failed to compute overview metrics:', err);
    return NextResponse.json({ error: 'Failed to compute metrics' }, { status: 500 });
  }
}
