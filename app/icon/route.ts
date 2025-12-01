import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Serve logo.png from public directory
    const iconPath = path.join(process.cwd(), 'public', 'logo.png')
    
    if (fs.existsSync(iconPath)) {
      const iconContent = fs.readFileSync(iconPath)
      return new NextResponse(iconContent, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
    
    // If logo.png doesn't exist, return 404
    return new NextResponse('Favicon not found', { status: 404 })
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 })
  }
}

