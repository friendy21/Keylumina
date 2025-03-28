// app/promo/route.ts
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Redirect directly to the Google Form
  redirect("https://docs.google.com/forms/d/e/1FAIpQLScM2CFULJen8j9OlYQXCMiufV_FqKjIuDn7XytBZ6FDY5wXQQ/viewform")
}