"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const phoneSchema = z.object({
  name: z.string().min(1, "Name is required"),
  whatsapp: z.string().min(1, "WhatsApp number is required"),
  email: z.string().email("Invalid email address"),
  promoCode: z.string().optional(),
});

const socialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  socialPlatform: z.enum(["instagram", "facebook", "twitter"]),
  message: z.string().min(1, "Message is required"),
});

// Helper to generate CSRF token
export async function generateCsrfToken() {
  const token = Math.random().toString(36).substring(2);
  cookies().set("csrfToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  return token;
}

// Helper to verify CSRF token
function verifyCsrfToken(formData: FormData) {
  const submittedToken = formData.get("csrfToken")?.toString();
  const storedToken = cookies().get("csrfToken")?.value;
  return submittedToken === storedToken;
}

// Helper to check rate limit (simplified for this example)
function isRateLimited(clientIp: string) {
  // In production, implement actual rate limiting (e.g., using Redis)
  return false;
}

// Helper to save submission to file system
async function saveSubmission(type: string, data: Record<string, string>) {
  const submissionsDir = path.join(process.cwd(), "submissions");
  await fs.mkdir(submissionsDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${type}-${timestamp}.json`;
  const filePath = path.join(submissionsDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Email Form Submission
export async function submitEmailForm(formData: FormData) {
  try {
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!verifyCsrfToken(formData)) {
      return { success: false, message: "Invalid CSRF token" };
    }
    if (isRateLimited(clientIp)) {
      return { success: false, message: "Rate limit exceeded" };
    }

    const data = emailSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    await saveSubmission("email", data);

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["friendykaliman@gmail.com"],
      subject: `New Email Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });

    return { success: true, message: "Email submitted successfully!" };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "An error occurred" };
  }
}

// Phone Form Submission
export async function submitPhoneForm(formData: FormData) {
  try {
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!verifyCsrfToken(formData)) {
      return { success: false, message: "Invalid CSRF token" };
    }
    if (isRateLimited(clientIp)) {
      return { success: false, message: "Rate limit exceeded" };
    }

    const data = phoneSchema.parse({
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      promoCode: formData.get("promoCode"),
    });

    await saveSubmission("phone", data);

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["friendykaliman@gmail.com"],
      subject: "New Phone Contact",
      text: `Name: ${data.name}\nWhatsApp: ${data.whatsapp}\nEmail: ${data.email}\nPromo Code: ${data.promoCode || "N/A"}`,
    });

    return { success: true, message: "Phone submission successful!" };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "An error occurred" };
  }
}

// Social Form Submission
export async function submitSocialForm(formData: FormData) {
  try {
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!verifyCsrfToken(formData)) {
      return { success: false, message: "Invalid CSRF token" };
    }
    if (isRateLimited(clientIp)) {
      return { success: false, message: "Rate limit exceeded" };
    }

    const data = socialSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      socialPlatform: formData.get("socialPlatform"),
      message: formData.get("message"),
    });

    await saveSubmission("social", data);

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["friendykaliman@gmail.com"],
      subject: `New Social Contact via ${data.socialPlatform}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPlatform: ${data.socialPlatform}\nMessage: ${data.message}`,
    });

    return { success: true, message: "Social submission successful!" };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "An error occurred" };
  }
}