"use client"

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// Loading spinner component
const VideoLoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#FFFDF7] z-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#d48fb6] border-t-[#660099] rounded-full animate-spin"></div>
      <div className="mt-4 text-[#660099] font-semibold text-center">Loading Video...</div>
    </div>
  </div>
);

// Scroll down arrow component
const ScrollDownArrow = () => {
  const controls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    controls.start({
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    });
    
    // Handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  // If user has scrolled, don't show the arrow
  if (hasScrolled) {
    return null;
  }

  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer z-30"
      animate={controls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
        setHasScrolled(true);
      }}
    >
      <div className="text-sm font-medium mb-2">Scroll Down</div>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        <path 
          d="M12 5V19M12 19L5 12M12 19L19 12" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
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
      {/* Loading Spinner */}
      <AnimatePresence>
        {isVideoLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VideoLoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Background Video - Full Size and possibly blurred */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={mainVideoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          } ${
            viewportSize === 'desktop' ? '' : 'filter blur-xl'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Screen_Web.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Tablet View - Scaled to 80% in the center */}
      {viewportSize === 'tablet' && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVideoReady ? 1 : 0, scale: isVideoReady ? 1 : 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-[80%] aspect-video" 
            style={{
              transformOrigin: 'center'
            }}
          >
            <video 
              ref={tabletVideoRef}
              className="w-full h-full object-cover rounded-lg shadow-xl"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/Screen_Web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      )}
      
      {/* Mobile View - Scaled to 100% width with rounded corners */}
      {viewportSize === 'mobile' && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVideoReady ? 1 : 0, scale: isVideoReady ? 1 : 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-[100%] aspect-video" 
            style={{
              transformOrigin: 'center'
            }}
          >
            <video 
              ref={mobileVideoRef}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/Screen_Web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      )}
      
      {/* Scroll Down Arrow - visible on all device sizes only until first scroll */}
      {isVideoReady && !isVideoLoading && (
        <AnimatePresence>
          <ScrollDownArrow />
        </AnimatePresence>
      )}
    </section>
  );
};

export default ResponsiveBackground;
