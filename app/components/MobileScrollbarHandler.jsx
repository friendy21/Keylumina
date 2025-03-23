"use client"

import { useEffect } from 'react';

// This component can be added anywhere in your app to manage scrollbar visibility
export const MobileScrollbarHandler = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        document.body.classList.add('no-scrollbar');
        
        // Additional fixes for iOS Safari and other mobile browsers
        document.documentElement.style.overflow = 'auto';
        document.body.style.position = 'relative';
        document.body.style.height = '100%';
      } else {
        document.body.classList.remove('no-scrollbar');
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.height = '';
      }
    };
    
    // Run once on mount
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('no-scrollbar');
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.height = '';
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default MobileScrollbarHandler;