import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl } from '@/lib/api-url';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  // Handle both Promise and direct params (for Next.js 15+ compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  let fileId = resolvedParams?.id;
  
  // Fallback: Extract ID from URL if params didn't work
  if (!fileId) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const idIndex = pathParts.indexOf('panhellenic-archive');
    if (idIndex !== -1 && pathParts[idIndex + 1]) {
      fileId = pathParts[idIndex + 1];
    }
  }
  
  const API_BASE = getApiUrl();
  
  // Debug logging
  console.log('Proxy route called with params:', resolvedParams);
  console.log('File ID:', fileId);
  console.log('Request URL:', request.url);
  
  if (!fileId) {
    console.error('File ID is missing. Params:', resolvedParams);
    return NextResponse.json(
      { success: false, message: 'File ID is required', receivedParams: resolvedParams },
      { status: 400 }
    );
  }

  try {
    const backendUrl = `${API_BASE}/api/panhellenic-archive/${fileId}/proxy`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf,application/octet-stream,*/*',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      return NextResponse.json(
        { success: false, message: errorText },
        { status: response.status }
      );
    }

    // Get the content type from the backend response
    const contentType = response.headers.get('content-type') || 'application/pdf';
    const contentDisposition = response.headers.get('content-disposition');
    
    // Get the file stream
    const fileStream = await response.arrayBuffer();
    
    // Return the file with appropriate headers
    return new NextResponse(fileStream, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition || `inline; filename="file.pdf"`,
        'Cache-Control': 'public, max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        // Remove X-Frame-Options to allow embedding
      },
    });
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Σφάλμα κατά τη φόρτωση του αρχείου',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

