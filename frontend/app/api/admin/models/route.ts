import { NextRequest, NextResponse } from 'next/server';
import { getModels, updateModel } from '@/lib/db';

export async function GET() {
  const models = getModels();
  return NextResponse.json({ total: models.length, models });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    const updated = updateModel(id, updates);
    if (updated) {
      return NextResponse.json({ status: 'success', model: updated });
    }
    return NextResponse.json({ error: 'Model not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update model' }, { status: 500 });
  }
}
