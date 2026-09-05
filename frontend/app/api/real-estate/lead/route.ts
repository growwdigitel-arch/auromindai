import { NextRequest, NextResponse } from 'next/server';
import { getRealEstateLeads, addRealEstateLead, updateRealEstateLead, deleteRealEstateLead } from '@/lib/db';

export async function GET() {
  const leads = getRealEstateLeads();
  return NextResponse.json({
    total: leads.length,
    leads
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLead = addRealEstateLead({
      name: body.name || 'Prospective Client',
      email: body.email || 'info@client.com',
      phone: body.phone || 'N/A',
      company_type: body.company_type || 'Real Estate Firm',
      lead_volume: body.lead_volume || '50 - 200 leads/mo',
      notes: body.notes || ''
    });

    // Optional proxy to backend if reachable
    try {
      fetch('http://127.0.0.1:8000/api/v1/real-estate/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch(() => {});
    } catch {}

    return NextResponse.json({
      status: 'success',
      message: 'Lead received and persisted in Owner Admin Panel',
      lead: newLead
    });
  } catch (error) {
    console.error('Error processing real estate lead:', error);
    return NextResponse.json({ error: 'Failed to process lead request' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, notes } = await req.json();
    const updated = updateRealEstateLead(id, {
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

    const success = deleteRealEstateLead(id);
    return NextResponse.json({ status: success ? 'success' : 'not_found' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
