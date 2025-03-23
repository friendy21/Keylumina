"use client"

import { useEffect, useState } from 'react';

export const ResponsiveBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Initial check
      const checkMobile = (): boolean => window.innerWidth <= 768;
      setIsMobile(checkMobile());
      
      // Add resize listener
      const handleResize = (): void => {
        const isMobileView = checkMobile();
        setIsMobile(isMobileView);
        
        // Add or remove no-scrollbar class to body based on mobile state
        if (isMobileView) {
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

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Main Background Video - Always Full Size */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Screen_Web.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Mobile View - Same video scaled down to 60% in the center */}
      {isMobile && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="w-[100%] aspect-video" 
            style={{
              transform: 'scale(1)',
              transformOrigin: 'center'
            }}
          >
            <video 
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/Screen_Web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResponsiveBackground;