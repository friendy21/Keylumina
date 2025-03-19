"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { Resend } from "resend"


const resend = new Resend("re_yourkey") 

// Rate limiting setup
type RateLimitStore = {
  [ip: string]: {
    count: number
    timestamp: number
  }
}

const rateLimitStore: RateLimitStore = {}
const RATE_LIMIT_DURATION = 3600000 
const MAX_REQUESTS = 5 

// Form schemas for validation
const emailFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

const phoneFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  whatsapp: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  promoCode: z.string().optional(),
})

const socialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  socialPlatform: z.enum(["instagram", "facebook", "twitter"]),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

// Helper function to check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now()

  // Clean up expired entries
  Object.keys(rateLimitStore).forEach((key) => {
    if (now - rateLimitStore[key].timestamp > RATE_LIMIT_DURATION) {
      delete rateLimitStore[key]
    }
  })

  // Check if IP exists in store
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, timestamp: now }
    return true
  }

  // Check if rate limit exceeded
  if (rateLimitStore[ip].count >= MAX_REQUESTS) {
    return false
  }

  // Increment count
  rateLimitStore[ip].count += 1
  return true
}

// Generate CSRF token
export async function generateCsrfToken() {
  const token = crypto.randomUUID()
  cookies().set("csrf-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  return token
}

// Verify CSRF token
function verifyCsrfToken(token: string): boolean {
  const storedToken = cookies().get("csrf-token")?.value
  return storedToken === token
}

// Email submission handler
export async function submitEmailForm(formData: FormData) {
  try {
    const clientIp = "client-ip"

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." }
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string
    if (!verifyCsrfToken(csrfToken)) {
      return { success: false, message: "Invalid request. Please try again." }
    }

    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const validatedData = emailFormSchema.safeParse(data)
    if (!validatedData.success) {
      return { success: false, message: "Invalid form data. Please check your inputs." }
    }

    // Send email using Resend
    const { name, email, subject, message } = validatedData.data

    await resend.emails.send({
      from: "Keylumina Contact <noreply@yourdomain.com>",
      to: "friendykaliman@gmail.com",
      subject: `[Website Contact] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Email submission error:", error)
    return { success: false, message: "An error occurred. Please try again later." }
  }
}

// Phone form submission handler
export async function submitPhoneForm(formData: FormData) {
  try {
    // Get client IP for rate limiting
    const clientIp = "client-ip" // This is a placeholder

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." }
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string
    if (!verifyCsrfToken(csrfToken)) {
      return { success: false, message: "Invalid request. Please try again." }
    }

    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      whatsapp: formData.get("whatsapp") as string,
      email: formData.get("email") as string,
      promoCode: formData.get("promoCode") as string,
    }

    const validatedData = phoneFormSchema.safeParse(data)
    if (!validatedData.success) {
      return { success: false, message: "Invalid form data. Please check your inputs." }
    }

    // Send email using Resend
    const { name, whatsapp, email, promoCode } = validatedData.data

    await resend.emails.send({
      from: "Keylumina Contact <noreply@yourdomain.com>",
      to: "friendykaliman@gmail.com",
      subject: `[Website Contact] WhatsApp Request`,
      html: `
        <h2>New WhatsApp Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Promo Code:</strong> ${promoCode || "None"}</p>
      `,
    })

    return { success: true, message: "Your request has been sent successfully!" }
  } catch (error) {
    console.error("Phone submission error:", error)
    return { success: false, message: "An error occurred. Please try again later." }
  }
}

// Social media form submission handler
export async function submitSocialForm(formData: FormData) {
  try {
    const clientIp = "client-ip" 

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." }
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string
    if (!verifyCsrfToken(csrfToken)) {
      return { success: false, message: "Invalid request. Please try again." }
    }

    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      socialPlatform: formData.get("socialPlatform") as "instagram" | "facebook" | "twitter",
      message: formData.get("message") as string,
    }

    const validatedData = socialFormSchema.safeParse(data)
    if (!validatedData.success) {
      return { success: false, message: "Invalid form data. Please check your inputs." }
    }

    // Send email using Resend
    const { name, email, socialPlatform, message } = validatedData.data

    await resend.emails.send({
      from: "Keylumina Contact <noreply@yourdomain.com>",
      to: "friendykaliman@gmail.com",
      subject: `[Website Contact] ${socialPlatform.charAt(0).toUpperCase() + socialPlatform.slice(1)} Request`,
      html: `
        <h2>New Social Media Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Platform:</strong> ${socialPlatform}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return { success: true, message: "Your request has been sent successfully!" }
  } catch (error) {
    console.error("Social submission error:", error)
    return { success: false, message: "An error occurred. Please try again later." }
  }
}

