import { NextRequest, NextResponse } from 'next/server';
import { 
  getWebinarRegistrations, 
  addWebinarRegistration,
  updateWebinarRegistration,
  deleteWebinarRegistration
} from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const registrations = getWebinarRegistrations();
  return NextResponse.json({
    total: registrations.length,
    registrations
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const amountInPaise = 9900; // Rs 99 = 9900 paise
    const currency = 'INR';
    let orderId = `order_${Date.now()}`;
    let isLiveRazorpay = false;

    // If Razorpay server credentials are available, create a real Razorpay order
    if (keyId && keySecret) {
      try {
        const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency,
            receipt: `rcpt_${Date.now()}`,
            notes: {
              webinar: 'AI Implementation Masterclass',
              date: 'October 10th, 2026',
              user_email: email,
              user_phone: phone,
            },
          }),
        });

        if (rzpRes.ok) {
          const rzpData = await rzpRes.json();
          orderId = rzpData.id;
          isLiveRazorpay = true;
        } else {
          console.warn('Razorpay order creation fallback:', await rzpRes.text());
        }
      } catch (err) {
        console.warn('Razorpay order error, falling back:', err);
      }
    }

    // Save initial registration record
    const registration = addWebinarRegistration({
      name,
      email,
      phone,
      amount: 99,
      currency: 'INR',
      paymentStatus: 'pending',
      orderId,
      source: source || 'AI Webinar Landing Page',
      webinarDate: 'Saturday, October 10, 2026',
      webinarTime: '10:00 AM – 12:00 PM IST',
    });

    return NextResponse.json({
      status: 'success',
      orderId,
      amount: amountInPaise,
      currency,
      keyId: keyId || 'rzp_test_placeholder',
      isLiveRazorpay,
      registrationId: registration.id,
      eventDetails: {
        title: 'Mastering AI Workflows & Autonomous AI Employees',
        date: 'Saturday, October 10, 2026',
        time: '10:00 AM – 12:00 PM IST',
        platform: 'Live on Zoom + Prompt Vault Handout',
        price: '₹99',
      }
    });
  } catch (err) {
    console.error('Error creating webinar registration:', err);
    return NextResponse.json({ error: 'Failed to initiate webinar registration' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, paymentStatus, notes, name, email, phone } = body;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const updated = updateWebinarRegistration(id, {
      ...(paymentStatus ? { paymentStatus } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
    });
    if (!updated) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, registration: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = deleteWebinarRegistration(id);
    return NextResponse.json({ success });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
  }
}
