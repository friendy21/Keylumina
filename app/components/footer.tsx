"use client"

import Image from "next/image"
import { useState } from "react"
import { PhoneForm } from "./contact-forms/phone-form"
import { EmailForm } from "./contact-forms/email-form"
import { SocialForm } from "./contact-forms/social-form"

export function Footer() {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  const openContactForm = (formType: string) => {
    setActiveForm(formType)
  }

  const closeContactForm = () => {
    setActiveForm(null)
  }

  return (
    <>
      <footer className="bg-[#660099] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/KMS_Icon.png?height=50&width=50"
                alt="Keylumina Logo"
                width={50}
                height={50}
                className="mr-4"
              />
              <h3 className="text-xl font-bold">CONTACT US</h3>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <button
                className="flex items-center hover:text-[#FBCF41] transition-colors"
              >
                <a
                  href="tel:+0888888888888"
                  className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
                >
                <img src="/Whatsapp.png" className="w-6 h-6" alt="Whatsapps" />
                <span>+088 8888 888888</span>
                </a>
              </button>

              <button
                className="flex items-center hover:text-[#FBCF41] transition-colors"
              >
                <a
                href="https://www.tiktok.com/@keylumina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
              >
                <img src="tiktok.png" className="w-6 h-6" alt="Tiktok" />
                <span>Tiktok</span>
                </a>
              </button>

              <button
                className="flex items-center hover:text-[#FBCF41] transition-colors"
              ><a
                href="https://www.youtube.com/@Keylumina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
              >
                <img src="Youtube.png" className="w-6 h-6" alt="Facebook" />
                <span>Youtube</span>
                </a>
              </button>

              <button
                className="flex items-center hover:text-[#FBCF41] transition-colors"
              ><a
                  href="https://www.instagram.com/keylumina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-[#FBCF41] transition-colors cursor-pointer"
                >
                <img src="Instagram.png" className="w-6 h-6" alt="Live class icon" />
                <span>Instagram</span>
                </a>
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4">Keylumina | Alright Reserved 2025</p>
          </div>
        </div>
      </footer>

      {/* Contact Forms */}
      {activeForm === "phone" && <PhoneForm onClose={closeContactForm} />}
      {activeForm === "email" && <EmailForm onClose={closeContactForm} />}
      {activeForm === "social" && <SocialForm onClose={closeContactForm} />}
    </>
  )
}

