"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Phone, Mail, Instagram } from "lucide-react"
import { PhoneForm } from "./contact-forms/phone-form"
import { EmailForm } from "./contact-forms/email-form"
import { SocialForm } from "./contact-forms/social-form"
import Image from "next/image"

export function Navigation() {
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeForm, setActiveForm] = useState<string | null>(null)

  const openContactForm = (formType: string) => {
    setActiveForm(formType)
    setContactOpen(false)
  }

  const closeContactForm = () => {
    setActiveForm(null)
  }

  return (
    <>
      <header className="bg-[#660099] text-white fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-white font-bold flex items-center">
              <Image
                src="/KMS_Icon.png?height=60&width=120"
                alt="Keylumina Logo"
                width={120}
                height={60}
                className="mr-2 mt-[50px]"
              />
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-[#FBCF41] transition-colors">
                HOME
              </Link>
              <Link href="/tutors" className="text-white hover:text-[#FBCF41] transition-colors">
                TUTORS
              </Link>
              <Link href="/courses" className="text-white hover:text-[#FBCF41] transition-colors">
                COURSES
              </Link>

              {/* Contact dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-white hover:text-[#FBCF41] transition-colors"
                  onClick={() => setContactOpen(!contactOpen)}
                >
                  CONTACT <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {contactOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#660099] rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={() => openContactForm("email")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                    >
                      <Mail className="h-4 w-4 mr-2" /> Email
                    </button>
                    <button
                      onClick={() => openContactForm("phone")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                    >
                      <Phone className="h-4 w-4 mr-2" /> Phone
                    </button>
                    <button
                      onClick={() => openContactForm("social")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                    >
                      <Instagram className="h-4 w-4 mr-2" /> Social Media
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#660099] py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/tutors"
                  className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  TUTORS
                </Link>
                <Link
                  href="/courses"
                  className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  COURSES
                </Link>

                {/* Mobile contact options */}
                <div className="px-4">
                  <button
                    className="flex items-center text-white hover:text-[#FBCF41] transition-colors w-full justify-between"
                    onClick={() => setContactOpen(!contactOpen)}
                  >
                    CONTACT{" "}
                    <ChevronDown className={`h-4 w-4 transition-transform ${contactOpen ? "rotate-180" : ""}`} />
                  </button>

                  {contactOpen && (
                    <div className="mt-2 pl-4 border-l border-[#4d0073] space-y-2 py-2">
                      <button
                        onClick={() => {
                          openContactForm("email")
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                      >
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </button>
                      <button
                        onClick={() => {
                          openContactForm("phone")
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                      >
                        <Phone className="h-4 w-4 mr-2" /> Phone
                      </button>
                      <button
                        onClick={() => {
                          openContactForm("social")
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                      >
                        <Instagram className="h-4 w-4 mr-2" /> Social Media
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contact Forms */}
      {activeForm === "phone" && <PhoneForm onClose={closeContactForm} />}
      {activeForm === "email" && <EmailForm onClose={closeContactForm} />}
      {activeForm === "social" && <SocialForm onClose={closeContactForm} />}
    </>
  )
}

