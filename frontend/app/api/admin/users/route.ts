import { NextRequest, NextResponse } from 'next/server';
import { getUsers, addUser, updateUser, deleteUser } from '@/lib/db';

export async function GET() {
  const users = getUsers();
  return NextResponse.json({ total: users.length, users });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = addUser({
      name: body.name,
      email: body.email,
      role: body.role || 'Client',
      plan: body.plan || 'Free Plan',
      credits: body.credits || 10000,
      status: body.status || 'Active'
    });
    return NextResponse.json({ status: 'success', user: newUser });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });

    const updated = updateUser(id, updates);
    if (updated) {
      return NextResponse.json({ status: 'success', user: updated });
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });

    const ok = deleteUser(id);
    return NextResponse.json({ status: ok ? 'success' : 'not_found' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
