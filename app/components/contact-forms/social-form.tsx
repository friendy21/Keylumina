"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, User, Mail, MessageSquare, AlertCircle, Instagram, Facebook, Twitter } from "lucide-react"
import { submitSocialForm, generateCsrfToken } from "@/app/actions/form-actions"

interface SocialFormProps {
  onClose: () => void
}

export function SocialForm({ onClose }: SocialFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    socialPlatform: "instagram",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      formDataObj.append("socialPlatform", formData.socialPlatform)
      formDataObj.append("message", formData.message)
      formDataObj.append("csrfToken", csrfToken)

      // Submit form
      const result = await submitSocialForm(formDataObj)

      if (result.success) {
        setFormStatus({ type: "success", message: result.message })
        // Clear form
        setFormData({
          name: "",
          email: "",
          socialPlatform: "instagram",
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

  // Get the appropriate icon based on selected platform
  const getSocialIcon = () => {
    switch (formData.socialPlatform) {
      case "instagram":
        return <Instagram className="mr-2" />
      case "facebook":
        return <Facebook className="mr-2" />
      case "twitter":
        return <Twitter className="mr-2" />
      default:
        return <Instagram className="mr-2" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a0e4a] text-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-500">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Hubungi Kami via social media</h2>

        <p className="mb-6 text-gray-300">
          Silakan lengkapi data di bawah ini untuk menghubungi kami melalui social media.
        </p>

        {formStatus.type && (
          <div className={`mb-4 p-3 rounded ${formStatus.type === "success" ? "bg-green-800/50" : "bg-red-800/50"}`}>
            <div className="flex items-start">
              {formStatus.type === "success" ? (
                <MessageSquare className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{formStatus.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-yellow-300 mb-1">
              Nama <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#4c2a70]" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 pl-10 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-yellow-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#4c2a70]" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 pl-10 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="socialPlatform" className="block text-yellow-300 mb-1">
              Platform <span className="text-red-500">*</span>
            </label>
            <select
              id="socialPlatform"
              name="socialPlatform"
              value={formData.socialPlatform}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-yellow-300 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 rounded bg-[#3a1a5e] text-white border border-[#4c2a70] focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="mb-6 flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="mt-1 mr-2"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
              Saya telah membaca dan menyetujui{" "}
              <a href="#" className="text-yellow-300 hover:underline">
                Syarat Ketentuan
              </a>{" "}
              dan{" "}
              <a href="#" className="text-yellow-300 hover:underline">
                Kebijakan Privasi
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded flex items-center justify-center text-white font-bold bg-gradient-to-r from-[#660099] to-[#FBCF41] disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                MENGIRIM...
              </>
            ) : (
              <>
                {getSocialIcon()}
                HUBUNGI KAMI
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

