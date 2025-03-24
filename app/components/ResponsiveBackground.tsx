"use client"

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Loading spinner component - centered and fixed size
const VideoLoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#FFFDF7] z-20">
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#d48fb6] border-t-[#660099] rounded-full animate-spin"></div>
      <div className="mt-4 text-[#660099] font-semibold text-center">Loading Video...</div>
    </div>
  </div>
);

// Scroll down arrow component
const ScrollDownArrow = () => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start the bounce animation
    controls.start({
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    });
    
    // Handle scroll event to show/hide arrow based on scroll position
    const handleScroll = () => {
      // Show when at top, hide when scrolled down
      if (window.scrollY <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const handleClick = () => {
    // Improved smooth scrolling with better target calculation
    const targetPosition = Math.min(
      document.documentElement.scrollHeight - window.innerHeight,
      window.innerHeight
    );
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer z-30"
          animate={controls}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          <div className="text-lg font-medium mb-3">Scroll Down</div>
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-pulse"
          >
            <path 
              d="M12 5V19M12 19L5 12M12 19L19 12" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ResponsiveBackground: React.FC = () => {
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const tabletVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Function to determine viewport size
      const checkViewportSize = (): 'desktop' | 'tablet' | 'mobile' => {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
      };
      
      // Initial check
      setViewportSize(checkViewportSize());
      
      // Add resize listener
      const handleResize = (): void => {
        const currentSize = checkViewportSize();
        setViewportSize(currentSize);
        
        // Add or remove no-scrollbar class to body based on mobile state
        if (currentSize === 'mobile') {
          document.body.classList.add('no-scrollbar');
        } else {
          document.body.classList.remove('no-scrollbar');
        }
      };
      
      // Initial call to set scrollbar visibility
      handleResize();
      
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.classList.remove('no-scrollbar');
      };
    }
  }, []);

  // Handle video loading
  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    const tabletVideo = tabletVideoRef.current;
    const mobileVideo = mobileVideoRef.current;
    
    const handleVideoCanPlay = () => {
      setIsVideoReady(true);
      // Add a slight delay to ensure smooth transition
      setTimeout(() => {
        setIsVideoLoading(false);
      }, 500);
    };
    
    const handleVideoError = (e: Event) => {
      console.error("Video failed to load:", e);
      setIsVideoLoading(false); // Hide loading spinner even on error
    };
    
    if (mainVideo) {
      mainVideo.addEventListener('canplay', handleVideoCanPlay);
      mainVideo.addEventListener('error', handleVideoError);
      
      // Preload the video
      mainVideo.load();
    }
    
    if (tabletVideo) {
      tabletVideo.addEventListener('canplay', handleVideoCanPlay);
      tabletVideo.addEventListener('error', handleVideoError);
    }
    
    if (mobileVideo) {
      mobileVideo.addEventListener('canplay', handleVideoCanPlay);
      mobileVideo.addEventListener('error', handleVideoError);
    }
    
    return () => {
      if (mainVideo) {
        mainVideo.removeEventListener('canplay', handleVideoCanPlay);
        mainVideo.removeEventListener('error', handleVideoError);
      }
      
      if (tabletVideo) {
        tabletVideo.removeEventListener('canplay', handleVideoCanPlay);
        tabletVideo.removeEventListener('error', handleVideoError);
      }
      
      if (mobileVideo) {
        mobileVideo.removeEventListener('canplay', handleVideoCanPlay);
        mobileVideo.removeEventListener('error', handleVideoError);
      }
    };
  }, [viewportSize]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Loading Spinner - now fixed directly in the center */}
      <AnimatePresence>
        {isVideoLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <VideoLoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Background Video - Full Size without blur */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={mainVideoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Screen_Web_02.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Logo Overlay - Centered on all viewport sizes */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVideoReady ? 1 : 0, scale: isVideoReady ? 1 : 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${
            viewportSize === 'mobile' ? 'w-full' : 
            viewportSize === 'tablet' ? 'w-full' : 'w-2/3'
          } h-auto`}
        >
          <img 
            src="/Screen_Web_logo.png" 
            alt="Logo" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
      
      {/* Tablet View - No separate video, using main background */}
      {viewportSize === 'tablet' && (
        <div className="absolute inset-0 flex items-center justify-center z-5">
          {/* Removed separate video element for tablet view */}
        </div>
      )}
      
      {/* Mobile View - No separate video, using main background */}
      {viewportSize === 'mobile' && (
        <div className="absolute inset-0 flex items-center justify-center z-5">
          {/* Removed separate video element for mobile view */}
        </div>
      )}
      
      {/* Scroll Down Arrow - visible at top of page, reappears when user scrolls back up */}
      {isVideoReady && !isVideoLoading && <ScrollDownArrow />}
    </section>
  );
};

export default ResponsiveBackground;
