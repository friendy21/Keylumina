// app/promo/route.ts
import { NextRequest, NextResponse } from 'next/server'

const SAFE_REDIRECT_URL = "https://drive.google.com/file/d/1nXU_GULnF2psCRmXMQSe-dC8W4SDB68T/view?usp=sharing";

export async function GET(request: NextRequest) {
  try {
    // Validate the redirect URL
    const targetUrl = new URL(SAFE_REDIRECT_URL);
    
    // Security checks
    if (
      targetUrl.protocol !== 'https:' ||
      targetUrl.hostname !== 'drive.google.com' ||
      !targetUrl.pathname.startsWith('/file/d/')
    ) {
      throw new Error('Invalid redirect URL');
    }

    // Create secure redirect response
    const response = NextResponse.redirect(targetUrl.toString());
    
    // Security headers
    response.headers.set('Content-Security-Policy', "default-src 'self' https://*.google.com");
    response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    
    return response;

  } catch (error) {
    // Fallback to origin root if validation fails
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
}
