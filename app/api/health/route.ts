import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json({ success: false, ...data }, { status: res.status });
    }
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: 'Health check failed' }, { status: 502 });
  }
}
