// app/promo/route.ts
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Redirect directly to the Google Form
  redirect("https://drive.google.com/file/d/1nXU_GULnF2psCRmXMQSe-dC8W4SDB68T/view?usp=sharing")
}
