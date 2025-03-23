"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Mail, User, Send, AlertCircle } from "lucide-react"
import { submitEmailForm, generateCsrfToken } from "@/app/actions/form-actions"

interface EmailFormProps {
  onClose: () => void
}

export function EmailForm({ onClose }: EmailFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToTerms: false,
  })
  const [csrfToken, setCsrfToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  useEffect(() => {
    // Generate CSRF token when component mounts
    const fetchCsrfToken = async () => {
      const token = await generateCsrfToken()
      setCsrfToken(token)
    }

    fetchCsrfToken()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      // Create FormData object
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("email", formData.email)
      formDataObj.append("subject", formData.subject)
      formDataObj.append("message", formData.message)
      formDataObj.append("csrfToken", csrfToken)

      // Submit form
      const result = await submitEmailForm(formDataObj)

      if (result.success) {
        setFormStatus({ type: "success", message: result.message })
        // Clear form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          agreeToTerms: false,
        })
        // Close form after successful submission with a delay
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setFormStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a0e4a] text-white rounded-lg w-full max-w-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-500 transition-colors">
          <X size={24} />
        </button>

        {/* Header with fixed height */}
        <div className="p-6 border-b border-[#4c2a70]">
          <h2 className="text-2xl font-bold text-yellow-300">Contact Us</h2>
          <p className="text-gray-300 mt-2">We value your feedback and inquiries.</p>
        </div>

        {/* Form area with fixed height and scrollable textarea */}
        <div className="p-6">
          {formStatus.type && (
            <div className={`mb-5 p-3 rounded ${formStatus.type === "success" ? "bg-green-800/50" : "bg-red-800/50"}`}>
              <div className="flex items-start">
                {formStatus.type === "success" ? (
                  <Send className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm">{formStatus.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-yellow-300 text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-[#4c2a70]" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full p-2 pl-10 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-1 focus:ring-yellow-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-yellow-300 text-sm font-medium mb-1">
                  From Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#4c2a70]" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full p-2 pl-10 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-1 focus:ring-yellow-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-yellow-300 text-sm font-medium mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
                className="w-full p-2 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-1 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-yellow-300 text-sm font-medium mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please provide details about your inquiry..."
                  rows={4}
                  className="w-full p-3 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-1 focus:ring-yellow-300 max-h-32 overflow-y-auto"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded flex items-center justify-center text-white font-semibold bg-gradient-to-r from-[#660099] to-[#FBCF41] hover:opacity-90 transition-opacity disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}