import { NextRequest, NextResponse } from 'next/server';
import { getEcommerceLeads, addEcommerceLead, updateEcommerceLead, deleteEcommerceLead } from '@/lib/db';

export async function GET() {
  const leads = getEcommerceLeads();
  return NextResponse.json({
    total: leads.length,
    leads
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLead = addEcommerceLead({
      name: body.name || 'Anonymous Merchant',
      phone: body.phone || 'N/A',
      business: body.business || 'Unnamed Store',
      budget: body.budget || 'Custom Scale',
      source: body.source || 'Website Form',
      notes: body.notes || ''
    });

    return NextResponse.json({
      status: 'success',
      message: 'Lead received and persisted in Owner Admin Panel',
      lead: newLead
    });
  } catch (err) {
    console.error('Error saving ecommerce lead:', err);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, notes } = await req.json();
    const updated = updateEcommerceLead(id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {})
    });

    if (updated) {
      return NextResponse.json({ status: 'success', lead: updated });
    }
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const success = deleteEcommerceLead(id);
    return NextResponse.json({ status: success ? 'success' : 'not_found' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
