import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Serve logo.png from public directory
    const iconPath = path.join(process.cwd(), 'public', 'logo.png')
    
    if (fs.existsSync(iconPath)) {
      const iconContent = fs.readFileSync(iconPath, 'utf-8')
      return new NextResponse(iconContent, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
    
    // Fallback: return a simple SVG favicon
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#1e40af"/>
      <text x="50" y="60" font-size="40" text-anchor="middle" fill="white" font-weight="bold">Κ</text>
    </svg>`
    
    return new NextResponse(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 })
  }
}

