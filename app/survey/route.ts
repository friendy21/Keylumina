// app/survey/route.ts
import { NextRequest, NextResponse } from 'next/server'

const SAFE_REDIRECT_URL = "https://docs.google.com/forms/d/e/1FAIpQLScM2CFULJen8j9OlYQXCMiufV_FqKjIuDn7XytBZ6FDY5wXQQ/viewform";

export async function GET(request: NextRequest) {
  try {
    // Validate the redirect URL
    const targetUrl = new URL(SAFE_REDIRECT_URL);
    
    // Ensure HTTPS and correct domain
    if (targetUrl.protocol !== 'https:' || targetUrl.hostname !== 'docs.google.com') {
      throw new Error('Invalid redirect URL');
    }

    // Create redirect response with security headers
    const response = NextResponse.redirect(targetUrl.toString());
    
    // Set security headers
    response.headers.set('Content-Security-Policy', "default-src 'self' https://docs.google.com");
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    return response;

  } catch (error) {
    // Fallback to safe redirect if validation fails
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
}
