"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY || "re_1ACvBa7Z_BkpBmjeHwnQzW9iaGN6uwxRh");

// Validation schemas
const emailFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
        email: z.string().email({ message: "Invalid email address - we need this to know who sent the message" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const phoneFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  whatsapp: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
        email: z.string().email({ message: "Invalid email address - we need this to know who sent the message" }),
  promoCode: z.string().optional(),
});

const socialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
        email: z.string().email({ message: "Invalid email address - we need this to know who sent the message" }),
  socialPlatform: z.enum(["instagram", "facebook", "twitter"]),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Rate limiting implementation
type RateLimitStore = {
  [ip: string]: {
    count: number;
    timestamp: number;
  };
};

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_DURATION = 3600000; 
const MAX_REQUESTS = 5; 

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Clean up expired entries
  Object.keys(rateLimitStore).forEach((key) => {
    if (now - rateLimitStore[key].timestamp > RATE_LIMIT_DURATION) {
      delete rateLimitStore[key];
    }
  });

  // Check if IP exists in store
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, timestamp: now };
    return true;
  }

  // Check if rate limit exceeded
  if (rateLimitStore[ip].count >= MAX_REQUESTS) {
    return false;
  }

  // Increment count
  rateLimitStore[ip].count += 1;
  return true;
}

// Helper to save submissions (useful for backup)
async function saveSubmission(type: string, data: Record<string, any>) {
  try {
    const submissionsDir = path.join(process.cwd(), "submissions");
    await fs.mkdir(submissionsDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${type}-${timestamp}.json`;
    const filePath = path.join(submissionsDir, fileName);
    
    await fs.writeFile(filePath, JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      ip: headers().get("x-forwarded-for") || "unknown"
    }, null, 2));
  } catch (error) {
    console.error("Failed to save submission:", error);
    // Don't throw, this is a non-critical operation
  }
}

// Generate CSRF token
export async function generateCsrfToken() {
  const token = crypto.randomUUID();
  cookies().set("csrf-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600, // 1 hour
  });
  return token;
}

// Verify CSRF token
function verifyCsrfToken(token: string): boolean {
  const storedToken = cookies().get("csrf-token")?.value;
  return storedToken === token;
}

// Email submission handler
export async function submitEmailForm(formData: FormData) {
  try {
    // Get client IP for rate limiting
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." };
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string;
    if (!verifyCsrfToken(csrfToken)) {
      return { success: false, message: "Invalid request. Please try again." };
    }

    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = emailFormSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => `${err.path}: ${err.message}`).join(", ");
      return { success: false, message: `Validation failed: ${errorMessages}` };
    }

    const validatedData = result.data;

    // Save submission for backup
    await saveSubmission("email", validatedData);

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", 
      to: "whiteleakerfredy@gmail.com", 
      subject: `[Keylumina Website] ${validatedData.subject}`,
      reply_to: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Sender Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${validatedData.message.replace(/\n/g, "<br>")}
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Failed to send your message. Please try again later." };
    }

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Email submission error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}

// Phone form submission handler
export async function submitPhoneForm(formData: FormData) {
  try {
    // Get client IP for rate limiting
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." };
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string;
    if (!verifyCsrfToken(csrfToken)) {
      return { success: false, message: "Invalid request. Please try again." };
    }

    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      whatsapp: formData.get("whatsapp") as string,
      email: formData.get("email") as string,
      promoCode: (formData.get("promoCode") as string) || "",
    };

    const result = phoneFormSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => `${err.path}: ${err.message}`).join(", ");
      return { success: false, message: `Validation failed: ${errorMessages}` };
    }

    const validatedData = result.data;

    // Save submission for backup
    await saveSubmission("phone", validatedData);

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "whiteleakerfredy@gmail.com", 
      subject: `[Keylumina Website] WhatsApp Request`,
      reply_to: validatedData.email,
      html: `
        <h2>New WhatsApp Contact Request</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>WhatsApp:</strong> ${validatedData.whatsapp}</p>
        <p><strong>Sender Email:</strong> ${validatedData.email}</p>
        <p><strong>Promo Code:</strong> ${validatedData.promoCode || "None"}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Failed to send your request. Please try again later." };
    }

    return { success: true, message: "Your request has been sent successfully!" };
  } catch (error) {
    console.error("Phone submission error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}

// Social media form submission handler
export async function submitSocialForm(formData: FormData) {
  try {
    // Get client IP for rate limiting
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." };
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string;
    if (!verifyCsrfToken(csrfToken)) {
      return { success: false, message: "Invalid request. Please try again." };
    }

    // Parse and validate form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      socialPlatform: formData.get("socialPlatform") as "instagram" | "facebook" | "twitter",
      message: formData.get("message") as string,
    };

    const result = socialFormSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => `${err.path}: ${err.message}`).join(", ");
      return { success: false, message: `Validation failed: ${errorMessages}` };
    }

    const validatedData = result.data;

    // Save submission for backup
    await saveSubmission("social", validatedData);

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Update with your verified domain
      to: "whiteleakerfredy@gmail.com", // Your receiving email address
      subject: `[Keylumina Website] ${validatedData.socialPlatform.charAt(0).toUpperCase() + validatedData.socialPlatform.slice(1)} Request`,
      reply_to: validatedData.email,
      html: `
        <h2>New Social Media Contact Request</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Sender Email:</strong> ${validatedData.email}</p>
        <p><strong>Platform:</strong> ${validatedData.socialPlatform}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${validatedData.message.replace(/\n/g, "<br>")}
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Failed to send your request. Please try again later." };
    }

    return { success: true, message: "Your request has been sent successfully!" };
  } catch (error) {
    console.error("Social submission error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}