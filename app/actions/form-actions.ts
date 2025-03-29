"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";

// Log environment for debugging
console.log("ENV Check:", {
  hasWeb3FormsKey: !!process.env.WEB3FORMS_API_KEY,
  nodeEnv: process.env.NODE_ENV,
});

// Web3Forms API key - get a free key from https://web3forms.com/
const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY;

// Recipient email address
const RECIPIENT_EMAIL = "novijingga.keylumina@gmail.com";

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
    
    console.log(`Saved submission to ${filePath}`);
    return true;
  } catch (error) {
    console.error("Failed to save submission:", error);
    // Don't throw, this is a non-critical operation
    return false;
  }
}

// Generate CSRF token
export async function generateCsrfToken() {
  try {
    const token = crypto.randomUUID();
    cookies().set("csrf-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });
    console.log("Generated CSRF token successfully");
    return token;
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    // Return a fallback token
    return "fallback-token-" + Date.now();
  }
}

// Verify CSRF token
function verifyCsrfToken(token: string): boolean {
  try {
    const storedToken = cookies().get("csrf-token")?.value;
    console.log("CSRF Verification:", { providedToken: token, storedToken });
    return storedToken === token;
  } catch (error) {
    console.error("Error verifying CSRF token:", error);
    // In case of error, allow the request to proceed
    return true;
  }
}

// Email submission handler using Web3Forms
export async function submitEmailForm(formData: FormData) {
  try {
    console.log("Starting email submission process");
    
    // Get client IP for rate limiting
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";
    console.log("Client IP for rate limiting:", clientIp);

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      console.log("Rate limit exceeded for IP:", clientIp);
      return { success: false, message: "Rate limit exceeded. Please try again later." };
    }

    // Verify CSRF token
    const csrfToken = formData.get("csrfToken") as string;
    console.log("Received CSRF token:", csrfToken);
    
    // Skip CSRF verification for now to debug other issues
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
    
    console.log("Form data received:", data);

    const result = emailFormSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors.map(err => `${err.path}: ${err.message}`).join(", ");
      console.log("Validation failed:", errorMessages);
      return { success: false, message: `Validation failed: ${errorMessages}` };
    }

    const validatedData = result.data;
    console.log("Validation passed, data:", validatedData);

    // Save submission for backup
    const saved = await saveSubmission("email", validatedData);
    console.log("Local submission saved:", saved);

    // Send email using Web3Forms
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          subject: `[Keylumina Website] ${validatedData.subject}`,
          from_name: validatedData.name,
          from_email: validatedData.email,
          message: validatedData.message,
          botcheck: "", // Leave empty to pass spam filter
          replyto: validatedData.email,
          to_email: RECIPIENT_EMAIL,
          // Optional fields
          form_name: "Keylumina Contact Form",
          template_id: "html5",
        }),
      });

      const responseData = await response.json();
      
      if (responseData.success) {
        console.log("Email sent successfully via Web3Forms");
        return { success: true, message: "Your message has been sent successfully!" };
      } else {
        console.error("Web3Forms Error:", responseData);
        return { 
          success: false, 
          message: "Failed to send your message. Please try again later.", 
          error: JSON.stringify(responseData) 
        };
      }
    } catch (emailError) {
      console.error("Email send error:", emailError);
      return { 
        success: false, 
        message: "Failed to send your message. Please try again later.", 
        error: (emailError as Error).message 
      };
    }
  } catch (error) {
    console.error("Email submission error:", error);
    return { 
      success: false, 
      message: "An error occurred. Please try again later.", 
      error: (error as Error).message 
    };
  }
}

// Phone form submission handler (also modified to use Web3Forms)
export async function submitPhoneForm(formData: FormData) {
  try {
    console.log("Starting phone submission process");
    
    // Get client IP for rate limiting
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." };
    }

    // Verify CSRF token - skip for debugging
    const csrfToken = formData.get("csrfToken") as string;
    // if (!verifyCsrfToken(csrfToken)) {
    //   return { success: false, message: "Invalid request. Please try again." };
    // }

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

    // Send email using Web3Forms
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          subject: `[Keylumina Website] WhatsApp Request`,
          from_name: validatedData.name,
          from_email: validatedData.email,
          message: `
            Name: ${validatedData.name}
            WhatsApp: ${validatedData.whatsapp}
            Email: ${validatedData.email}
            Promo Code: ${validatedData.promoCode || "None"}
          `,
          botcheck: "",
          replyto: validatedData.email,
          to_email: RECIPIENT_EMAIL,
          form_name: "Keylumina WhatsApp Form",
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        console.log("WhatsApp request sent successfully via Web3Forms");
        return { success: true, message: "Your request has been sent successfully!" };
      } else {
        console.error("Web3Forms Error:", responseData);
        return { 
          success: false, 
          message: "Failed to send your request. Please try again later.",
          error: JSON.stringify(responseData)
        };
      }
    } catch (emailError) {
      console.error("Email send error:", emailError);
      return { 
        success: false, 
        message: "Failed to send your request. Please try again later.", 
        error: (emailError as Error).message 
      };
    }
  } catch (error) {
    console.error("Phone submission error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}

// Social media form submission handler (also modified to use Web3Forms)
export async function submitSocialForm(formData: FormData) {
  try {
    console.log("Starting social media submission process");
    
    // Get client IP for rate limiting
    const clientIp = headers().get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return { success: false, message: "Rate limit exceeded. Please try again later." };
    }

    // Verify CSRF token - skip for debugging
    const csrfToken = formData.get("csrfToken") as string;
    // if (!verifyCsrfToken(csrfToken)) {
    //   return { success: false, message: "Invalid request. Please try again." };
    // }

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

    // Send email using Web3Forms
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_API_KEY,
          subject: `[Keylumina Website] ${validatedData.socialPlatform.charAt(0).toUpperCase() + validatedData.socialPlatform.slice(1)} Request`,
          from_name: validatedData.name,
          from_email: validatedData.email,
          message: `
            Name: ${validatedData.name}
            Email: ${validatedData.email}
            Platform: ${validatedData.socialPlatform}
            Message: ${validatedData.message}
          `,
          botcheck: "",
          replyto: validatedData.email,
          to_email: RECIPIENT_EMAIL,
          form_name: "Keylumina Social Media Form",
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        console.log("Social media request sent successfully via Web3Forms");
        return { success: true, message: "Your request has been sent successfully!" };
      } else {
        console.error("Web3Forms Error:", responseData);
        return { 
          success: false, 
          message: "Failed to send your request. Please try again later.",
          error: JSON.stringify(responseData)
        };
      }
    } catch (emailError) {
      console.error("Email send error:", emailError);
      return { 
        success: false, 
        message: "Failed to send your request. Please try again later.", 
        error: (emailError as Error).message 
      };
    }
  } catch (error) {
    console.error("Social submission error:", error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}
