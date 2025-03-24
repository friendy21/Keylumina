"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Phone, Mail, Instagram, FileText } from "lucide-react"
import { EmailForm } from "./contact-forms/email-form"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

export function Navigation() {
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeForm, setActiveForm] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const openContactForm = (formType) => {
    setActiveForm(formType)
    setContactOpen(false)
  }

  const closeContactForm = () => {
    setActiveForm(null)
  }

  // WhatsApp link with pre-filled message
  // const whatsappLink = "https://wa.me/6287886928285?text=Hi%2C%20I%20Am%20Interested%20In%20Learning%20the%20Keylumina%20Class%20Course"
  const tiktokLink = "https://www.tiktok.com/@keylumina"
  const youtubeLink = "https://www.youtube.com/@Keylumina"
  const instagramLink = "https://www.instagram.com/keylumina/"
  const registrationLink = "https://docs.google.com/forms/d/e/1FAIpQLScM2CFULJen8j9OlYQXCMiufV_FqKjIuDn7XytBZ6FDY5wXQQ/viewform"

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      height: 0,
      transition: { 
        duration: 0.2,
        when: "afterChildren"
      }
    }
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      x: -10,
      transition: { duration: 0.1 }
    }
  }

  // Hover effect for dropdown items
  const dropdownItemHover = {
    rest: { backgroundColor: "transparent" },
    hover: { 
      backgroundColor: "#4d0073", 
      x: 3,
      transition: { duration: 0.2 }
    }
  }

  return (
    <>
      <header 
        className={`bg-[#660099] text-white fixed top-0 left-0 right-0 z-50 ${scrolled ? 'shadow-lg' : ''}`}
        style={{ 
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {!mobileMenuOpen && (
              <div>
                <Link href="/" className="text-white font-bold flex items-center">
                  <div className="rounded-full overflow-hidden w-30 h-30 mr-2 mt-[57px] flex items-center justify-center bg-white">
                    <Image
                      src="/KMS_Logo_crop.png?height=120&width=120"
                      alt="Keylumina Logo"
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className={`${mobileMenuOpen ? "w-full flex justify-end" : ""}`}>
              <button 
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div>
                <Link href="/" className="text-white hover:text-[#FBCF41] transition-colors">
                  <span className="inline-block">HOME</span>
                </Link>
              </div>

              <div>
                <Link href="/tutors" className="text-white hover:text-[#FBCF41] transition-colors">
                  <span className="inline-block">TUTORS</span>
                </Link>
              </div>

              <div>
                <Link href="/courses" className="text-white hover:text-[#FBCF41] transition-colors">
                  <span className="inline-block">COURSES</span>
                </Link>
              </div>

              {/* Contact dropdown with animation - REARRANGED ORDER */}
              <div className="relative">
                <button
                  className="flex items-center text-white hover:text-[#FBCF41] transition-colors"
                  onClick={() => setContactOpen(!contactOpen)}
                >
                  CONTACT <motion.div
                    animate={{ rotate: contactOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-[#660099] rounded-md shadow-lg py-2 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {/* Email - Now First */}
                      <motion.div
                        variants={menuItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <motion.button
                          onClick={() => openContactForm("email")}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                          variants={dropdownItemHover}
                        >
                          <Mail className="h-4 w-4 mr-2" /> Email
                        </motion.button>
                      </motion.div>
                      
                      {/* Registration - Now Second */}
                      <motion.div 
                        variants={menuItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <Link
                          href={registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <motion.div
                            className="flex items-center w-full"
                            variants={dropdownItemHover}
                          >
                            <FileText className="h-4 w-4 mr-2" /> Registration
                          </motion.div>
                        </Link>
                      </motion.div>
                      
                      {/* TikTok - Now Third */}
                      <motion.div 
                        variants={menuItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <Link
                          href={tiktokLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <motion.div
                            className="flex items-center w-full"
                            variants={dropdownItemHover}
                          >
                            <svg 
                              className="h-4 w-4 mr-2" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19.321 5.562a5.124 5.124 0 0 1-.828-1.979h.002v-.464H15.31v12.033c0 1.303-1.038 2.36-2.34 2.385a2.34 2.34 0 0 1-1.384-.432 2.342 2.342 0 0 1-.957-1.953c0-1.296 1.051-2.345 2.346-2.345.257 0 .505.042.738.118v-3.21a5.532 5.532 0 0 0-.955-.085c-3.052 0-5.536 2.484-5.536 5.536 0 1.753.818 3.308 2.091 4.32a5.516 5.516 0 0 0 3.445 1.217c3.052 0 5.537-2.484 5.537-5.536V9.971a8.235 8.235 0 0 0 4.682 1.454V8.251a4.956 4.956 0 0 1-2.656-2.689z" />
                            </svg> TikTok
                          </motion.div>
                        </Link>
                      </motion.div>
                      
                      {/* YouTube - Now Fourth */}
                      <motion.div 
                        variants={menuItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <Link
                          href={youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <motion.div
                            className="flex items-center w-full"
                            variants={dropdownItemHover}
                          >
                            <svg 
                              className="h-4 w-4 mr-2" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg> YouTube
                          </motion.div>
                        </Link>
                      </motion.div>
                      
                      {/* Instagram - Now Fifth */}
                      <motion.div 
                        variants={menuItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <Link
                          href={instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <motion.div
                            className="flex items-center w-full"
                            variants={dropdownItemHover}
                          >
                            <Instagram className="h-4 w-4 mr-2" /> Instagram
                          </motion.div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* FAQ link */}
              <div>
                <Link href="/faq" className="text-white hover:text-[#FBCF41] transition-colors">
                  <span className="inline-block">FAQ</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#660099] py-4">
              <nav className="flex flex-col space-y-4">
                <div>
                  <Link
                    href="/"
                    className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div>HOME</div>
                  </Link>
                </div>
                
                <div>
                  <Link
                    href="/tutors"
                    className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div>TUTORS</div>
                  </Link>
                </div>
                
                <div>
                  <Link
                    href="/courses"
                    className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div>COURSES</div>
                  </Link>
                </div>

                {/* Mobile contact options with animation - REARRANGED ORDER */}
                <div className="px-4">
                  <button
                    className="flex items-center text-white hover:text-[#FBCF41] transition-colors w-full justify-between"
                    onClick={() => setContactOpen(!contactOpen)}
                  >
                    CONTACT{" "}
                    <motion.div
                      animate={{ rotate: contactOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {contactOpen && (
                      <motion.div 
                        className="mt-2 pl-4 border-l border-[#4d0073] space-y-2 py-2"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {/* Email - Now First */}
                        <motion.div 
                          variants={menuItemVariants}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                        >
                          <motion.button
                            onClick={() => {
                              openContactForm("email")
                              setMobileMenuOpen(false)
                            }}
                            className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                            variants={dropdownItemHover}
                          >
                            <Mail className="h-4 w-4 mr-2" /> Email
                          </motion.button>
                        </motion.div>
                        
                        {/* Registration - Now Second */}
                        <motion.div 
                          variants={menuItemVariants}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                        >
                          <Link
                            href={registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <motion.div 
                              className="flex items-center w-full"
                              variants={dropdownItemHover}
                            >
                              <FileText className="h-4 w-4 mr-2" /> Registration
                            </motion.div>
                          </Link>
                        </motion.div>
                        
                        {/* TikTok - Now Third */}
                        <motion.div 
                          variants={menuItemVariants}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                        >
                          <Link
                            href={tiktokLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <motion.div 
                              className="flex items-center w-full"
                              variants={dropdownItemHover}
                            >
                              <svg 
                                className="h-4 w-4 mr-2" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M19.321 5.562a5.124 5.124 0 0 1-.828-1.979h.002v-.464H15.31v12.033c0 1.303-1.038 2.36-2.34 2.385a2.34 2.34 0 0 1-1.384-.432 2.342 2.342 0 0 1-.957-1.953c0-1.296 1.051-2.345 2.346-2.345.257 0 .505.042.738.118v-3.21a5.532 5.532 0 0 0-.955-.085c-3.052 0-5.536 2.484-5.536 5.536 0 1.753.818 3.308 2.091 4.32a5.516 5.516 0 0 0 3.445 1.217c3.052 0 5.537-2.484 5.537-5.536V9.971a8.235 8.235 0 0 0 4.682 1.454V8.251a4.956 4.956 0 0 1-2.656-2.689z" />
                              </svg> TikTok
                            </motion.div>
                          </Link>
                        </motion.div>
                        
                        {/* YouTube - Now Fourth */}
                        <motion.div 
                          variants={menuItemVariants}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                        >
                          <Link
                            href={youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <motion.div 
                              className="flex items-center w-full"
                              variants={dropdownItemHover}
                            >
                              <svg 
                                className="h-4 w-4 mr-2" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg> YouTube
                            </motion.div>
                          </Link>
                        </motion.div>
                        
                        {/* Instagram - Now Fifth */}
                        <motion.div 
                          variants={menuItemVariants}
                          initial="rest"
                          whileHover="hover"
                          animate="rest"
                        >
                          <Link
                            href={instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <motion.div 
                              className="flex items-center w-full"
                              variants={dropdownItemHover}
                            >
                              <Instagram className="h-4 w-4 mr-2" /> Instagram
                            </motion.div>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* FAQ link in mobile menu */}
                <div>
                  <Link
                    href="/faq"
                    className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div>FAQ</div>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Contact Forms */}
      {activeForm === "email" && (
        <div>
          <EmailForm onClose={closeContactForm} />
        </div>
      )}
    </>
  )
}
