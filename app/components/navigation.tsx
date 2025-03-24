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
  const instagramLink = "https://www.instagram.com/keylumina/"
  const registrationLink = "https://docs.google.com/forms/d/e/1FAIpQLScM2CFULJen8j9OlYQXCMiufV_FqKjIuDn7XytBZ6FDY5wXQQ/viewform"

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  }

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
      <motion.header 
        className={`bg-[#660099] text-white fixed top-0 left-0 right-0 z-50 ${scrolled ? 'shadow-lg' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{ 
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            {!mobileMenuOpen && (
              <motion.div
                initial="initial"
                whileHover="hover"
                variants={logoVariants}
              >
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
              </motion.div>
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

            {/* Desktop navigation with animations */}
            <nav className="hidden md:flex items-center space-x-8">
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <Link href="/" className="text-white hover:text-[#FBCF41] transition-colors">
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">HOME</motion.span>
                </Link>
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <Link href="/tutors" className="text-white hover:text-[#FBCF41] transition-colors">
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">TUTORS</motion.span>
                </Link>
              </motion.div>

              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <Link href="/courses" className="text-white hover:text-[#FBCF41] transition-colors">
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">COURSES</motion.span>
                </Link>
              </motion.div>

              {/* Contact dropdown with animation */}
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                className="relative"
              >
                <motion.button
                  className="flex items-center text-white hover:text-[#FBCF41] transition-colors"
                  onClick={() => setContactOpen(!contactOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CONTACT <motion.div
                    animate={{ rotate: contactOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-[#660099] rounded-md shadow-lg py-2 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
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
                      
                      {/* <motion.div 
                        variants={menuItemVariants}
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                      >
                        <Link
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-left px-4 py-2 text-white hover:bg-[#4d0073] flex items-center"
                        >
                          <motion.div
                            className="flex items-center w-full"
                            variants={dropdownItemHover}
                          >
                            <Phone className="h-4 w-4 mr-2" /> WhatsApp
                          </motion.div>
                        </Link>
                      </motion.div> */}
                      
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
                      
                      {/* Added Registration Link to the contact dropdown with improved hover */}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* FAQ link */}
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                <Link href="/faq" className="text-white hover:text-[#FBCF41] transition-colors">
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">FAQ</motion.span>
                </Link>
              </motion.div>
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
                      <motion.div whileHover={{ x: 5 }}>HOME</motion.div>
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/tutors"
                      className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div whileHover={{ x: 5 }}>TUTORS</motion.div>
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/courses"
                      className="text-white hover:text-[#FBCF41] transition-colors px-4 py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div whileHover={{ x: 5 }}>COURSES</motion.div>
                    </Link>
                  </motion.div>

                  {/* Mobile contact options with animation */}
                  <motion.div variants={menuItemVariants} className="px-4">
                    <motion.button
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
                    </motion.button>

                    <AnimatePresence>
                      {contactOpen && (
                        <motion.div 
                          className="mt-2 pl-4 border-l border-[#4d0073] space-y-2 py-2"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
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
                          
                          {/* <motion.div 
                            variants={menuItemVariants}
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                          >
                            <Link
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left py-1 text-white hover:text-[#FBCF41] flex items-center"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <motion.div 
                                className="flex items-center w-full"
                                variants={dropdownItemHover}
                              >
                                <Phone className="h-4 w-4 mr-2" /> WhatsApp
                              </motion.div>
                            </Link>
                          </motion.div> */}
                          
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
                          
                          {/* Added Registration Link to mobile contact dropdown with improved hover */}
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
                      <motion.div whileHover={{ x: 5 }}>FAQ</motion.div>
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
      
      {/* Contact Forms with animation */}
      <AnimatePresence>
        {activeForm === "email" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <EmailForm onClose={closeContactForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
