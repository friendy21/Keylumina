"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Mail, Instagram, FileText } from "lucide-react"
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

  // Links
  const whatsappLink = "https://wa.me/6287886928285?text=Hey%20I'm%20interested%20in%20the%20course"
  const tiktokLink = "https://www.tiktok.com/@keylumina"
  const youtubeLink = "https://www.youtube.com/@Keylumina"
  const instagramLink = "https://www.instagram.com/keylumina/"
  const registrationLink = "https://docs.google.com/forms/d/e/1FAIpQLScM2CFULJen8j9OlYQXCMiufV_FqKjIuDn7XytBZ6FDY5wXQQ/viewform"

  // Only keeping dropdown animations
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

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        when: "beforeChildren" 
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren" 
      }
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

            {/* Mobile menu button with animation */}
            <div className={`${mobileMenuOpen ? "w-full flex justify-end" : ""}`}>
              <motion.button 
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
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

              {/* Contact dropdown with animation */}
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
                      {/* Email - First */}
                      <motion.div variants={menuItemVariants}>
                        <button
                          onClick={() => openContactForm("email")}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <Mail className="h-4 w-4 mr-2" /> Email
                        </button>
                      </motion.div>
                      
                      {/* Registration - Second */}
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href={registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <div className="flex items-center w-full">
                            <FileText className="h-4 w-4 mr-2" /> Registration
                          </div>
                        </Link>
                      </motion.div>
                      
                      {/* WhatsApp - Added before TikTok */}
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <div className="flex items-center w-full">
                            <svg 
                              className="h-4 w-4 mr-2" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.226-.574.731-.704.879-.13.148-.26.166-.486.056-.225-.112-.947-.349-1.804-1.113-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.226.224-.377.074-.15.037-.28-.019-.393-.055-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path>
                            </svg> WhatsApp
                          </div>
                        </Link>
                      </motion.div>
                      
                      {/* TikTok - Now Fourth */}
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href={tiktokLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <div className="flex items-center w-full">
                            <svg 
                              className="h-4 w-4 mr-2" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19.321 5.562a5.124 5.124 0 0 1-.828-1.979h.002v-.464H15.31v12.033c0 1.303-1.038 2.36-2.34 2.385a2.34 2.34 0 0 1-1.384-.432 2.342 2.342 0 0 1-.957-1.953c0-1.296 1.051-2.345 2.346-2.345.257 0 .505.042.738.118v-3.21a5.532 5.532 0 0 0-.955-.085c-3.052 0-5.536 2.484-5.536 5.536 0 1.753.818 3.308 2.091 4.32a5.516 5.516 0 0 0 3.445 1.217c3.052 0 5.537-2.484 5.537-5.536V9.971a8.235 8.235 0 0 0 4.682 1.454V8.251a4.956 4.956 0 0 1-2.656-2.689z" />
                            </svg> TikTok
                          </div>
                        </Link>
                      </motion.div>
                      
                      {/* YouTube - Now Fifth */}
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href={youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <div className="flex items-center w-full">
                            <svg 
                              className="h-4 w-4 mr-2" 
                              viewBox="0 0 24 24" 
                              fill="currentColor" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg> YouTube
                          </div>
                        </Link>
                      </motion.div>
                      
                      {/* Instagram - Now Sixth */}
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href={instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <div className="flex items-center w-full">
                            <Instagram className="h-4 w-4 mr-2" /> Instagram
                          </div>
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

          {/* Mobile navigation with animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="md:hidden bg-[#660099] py-4"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <nav className="flex flex-col space-y-4">
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/"
                      className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      HOME
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/tutors"
                      className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      TUTORS
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/courses"
                      className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      COURSES
                    </Link>
                  </motion.div>

                  {/* Mobile contact options with animation */}
                  <motion.div variants={menuItemVariants} className="px-4">
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
                          {/* Email - First */}
                          <motion.div variants={menuItemVariants}>
                            <button
                              onClick={() => {
                                openContactForm("email")
                                setMobileMenuOpen(false)
                              }}
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                            >
                              <Mail className="h-4 w-4 mr-2" /> Email
                            </button>
                          </motion.div>
                          
                          {/* Registration - Second */}
                          <motion.div variants={menuItemVariants}>
                            <Link
                              href={registrationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center w-full">
                                <FileText className="h-4 w-4 mr-2" /> Registration
                              </div>
                            </Link>
                          </motion.div>
                          
                          {/* WhatsApp - Added before TikTok */}
                          <motion.div variants={menuItemVariants}>
                            <Link
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center w-full">
                                <svg 
                                  className="h-4 w-4 mr-2" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.226-.574.731-.704.879-.13.148-.26.166-.486.056-.225-.112-.947-.349-1.804-1.113-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.226.224-.377.074-.15.037-.28-.019-.393-.055-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"></path>
                                </svg> WhatsApp
                              </div>
                            </Link>
                          </motion.div>
                          
                          {/* TikTok - Now Fourth */}
                          <motion.div variants={menuItemVariants}>
                            <Link
                              href={tiktokLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center w-full">
                                <svg 
                                  className="h-4 w-4 mr-2" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.828-1.979h.002v-.464H15.31v12.033c0 1.303-1.038 2.36-2.34 2.385a2.34 2.34 0 0 1-1.384-.432 2.342 2.342 0 0 1-.957-1.953c0-1.296 1.051-2.345 2.346-2.345.257 0 .505.042.738.118v-3.21a5.532 5.532 0 0 0-.955-.085c-3.052 0-5.536 2.484-5.536 5.536 0 1.753.818 3.308 2.091 4.32a5.516 5.516 0 0 0 3.445 1.217c3.052 0 5.537-2.484 5.537-5.536V9.971a8.235 8.235 0 0 0 4.682 1.454V8.251a4.956 4.956 0 0 1-2.656-2.689z" />
                                </svg> TikTok
                              </div>
                            </Link>
                          </motion.div>
                          
                          {/* YouTube - Now Fifth */}
                          <motion.div variants={menuItemVariants}>
                            <Link
                              href={youtubeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center w-full">
                                <svg 
                                  className="h-4 w-4 mr-2" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg> YouTube
                              </div>
                            </Link>
                          </motion.div>
                          
                          {/* Instagram - Now Sixth */}
                          <motion.div variants={menuItemVariants}>
                            <Link
                              href={instagramLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="flex items-center w-full">
                                <Instagram className="h-4 w-4 mr-2" /> Instagram
                              </div>
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* FAQ link in mobile menu */}
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/faq"
                      className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      
      {/* Contact Forms */}
      {activeForm === "email" && (
        <div className="mt-16">
          <EmailForm onClose={closeContactForm} />
        </div>
      )}
    </>
  )
}
