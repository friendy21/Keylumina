"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/app/components/navigation" 
import { Footer } from "@/app/components/footer" 
import { TutorSection } from "@/app/components/tutor-section"

// Loading spinner component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#fff8d9] z-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#d48fb6] border-t-[#660099] rounded-full animate-spin"></div>
      <div className="mt-4 text-[#660099] font-semibold text-center">Loading...</div>
    </div>
  </div>
);

// Content wrapper component
const ContentWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function TutorsPage() {
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    // Set page as loaded after window load event
    setPageLoaded(true)
    
    // Listen for route changes to show loading state
    const handleRouteChangeStart = () => setPageLoaded(false)
    const handleRouteChangeComplete = () => setPageLoaded(true)
    
    // Add event listeners for route changes if using Next.js router
    // This is commented out since your file doesn't show router import
    // Router.events.on('routeChangeStart', handleRouteChangeStart)
    // Router.events.on('routeChangeComplete', handleRouteChangeComplete)
    
    // Clean up event listeners
    // return () => {
    //   Router.events.off('routeChangeStart', handleRouteChangeStart)
    //   Router.events.off('routeChangeComplete', handleRouteChangeComplete)
    // }
  }, [])

  return (
    <ContentWrapper>
      <div className="min-h-screen bg-[#fff8d9] mt-[65px]">
        <Navigation />
        <TutorSection />
        <Footer />
      </div>
    </ContentWrapper>
  )
}
