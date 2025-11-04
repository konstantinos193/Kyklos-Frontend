import { NextResponse } from 'next/server';
import { getApiUrl } from '@/lib/api-url';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const API_BASE = getApiUrl();
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // Increased timeout to 5 seconds
    
    console.log(`Health check: Calling ${API_BASE}/health`);
    
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      cache: 'no-store',
      signal: controller.signal,
    });
    
    clearTimeout(timeout);
    
    console.log(`Health check response: ${res.status} ${res.statusText}`);
    
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      console.error(`Health check failed: ${res.status}`, data);
      return NextResponse.json({ 
        success: false, 
        status: 'offline',
        message: 'Backend server is not responding properly',
        ...data 
      }, { status: res.status });
    }
    
    console.log('Health check successful:', data);
    return NextResponse.json({ 
      success: true, 
      status: data.status || 'online',
      ...data 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Health check error:', error.message);
    return NextResponse.json({ 
      success: false, 
      status: 'offline',
      message: 'Health check failed',
      error: error.message,
      apiBase: API_BASE
    }, { status: 502 });
  }
}
