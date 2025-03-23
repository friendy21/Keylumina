"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tutors = [
  {
    id: "novi-jingga",
    name: "Novi Jingga",
    linkedinUrl: "https://www.linkedin.com/in/novi-jingga-3ba074a5/",
    role: "Senior Visual Animator",
    description:
      "Novi is a 2D Motion Design senior animator with 7 years of experience in industry, specializing in creating assets, effects, and animation with Adobe Illustrators and Adobe After Effects. Novi started as a traditional 2D artist eager to learn new skills and enhance her works. Discovering Adobe After Effects, Novi began passionately honing her 2D motion design skill, challenging herself every project. As she advanced to Senior Animator, Novi was given the responsibility to mentor juniors. In doing so, she discovered a new passion —guiding and inspiring the next generation of 2D motion designers.",
    image: "/Photo_Tutor_Left.png",
    videoThumbnail: "/Novi_Jingga_thumbnail.png?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/4pMGW_iiobI",
  },
  {
    id: "fredy",
    name: "Fredy",
    linkedinUrl: "https://www.linkedin.com/in/fredy-tan-5591a85/",
    role: "Lighting, Render, FX, and Compositing Supervisor",
    description:
      "A LRFC supervisor with 8 years of experience, proficient at multiple industry-standard software for lighting, render, and compositing. Fredy's journey started as a Comp FX artist in high school using mostly Adobe After Effects. His passions led him to extensively experimenting with Adobe After Effects, and applying his skills to many commercial projects. As he rose to supervisor rank, Fredy has expanded his expertise to other 3D software such as Autodesk Maya, Blender, Clarisse, 3ds Max, and Unreal Engine 5. Fredy has been using UE 5 for 3D production since 2021 for its real time rendering power. Beyond production work, Fredy has a strong passion for teaching. He has trained junior artists on a project basis, focusing on personalized learning, skill sharing, and open communication as key for effective growth.",
    image: "/Photo_Tutor_Right.png",
    videoThumbnail: "/Fredy_thumbnail.png?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/Bgu6pTJOcJU?rel=0",
  },
];

function VideoPlayer({ videoUrl }) {
  // Add autoplay=1 parameter to the video URL
  const autoplayUrl = videoUrl.includes('?') 
    ? `${videoUrl}&autoplay=1` 
    : `${videoUrl}?autoplay=1`;
    
  return (
    <motion.div 
      className="relative w-full aspect-video"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <iframe
        src={autoplayUrl}
        title="Tutor Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      ></iframe>
    </motion.div>
  );
}

function VideoThumbnail({ thumbnail, onClick }) {
  return (
    <motion.div
      className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
    >
      <div className="bg-black w-full aspect-video relative">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt="Video thumbnail"
          className="object-cover opacity-80 group-hover:opacity-60 transition-all duration-300 w-full h-full"
        />
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="rounded-full bg-white/30 backdrop-blur-sm p-3"
            variants={{
              rest: { scale: 1, boxShadow: "0px 0px 0px rgba(255,255,255,0.3)" },
              hover: { scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.5)" },
              tap: { scale: 0.95 }
            }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-8 w-8"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1, rotate: 0 },
                tap: { scale: 0.9, rotate: 0 }
              }}
            >
              <path d="M8 5v14l11-7z" />
            </motion.svg>
          </motion.div>
        </motion.div>
        
        {/* Glowing border effect on hover */}
        <motion.div 
          className="absolute inset-0 border-2 border-transparent rounded-lg"
          variants={{
            rest: { borderColor: "rgba(255,255,255,0)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" },
            hover: { borderColor: "rgba(255,255,255,0.7)", boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function TutorCard({ tutor, alignment = "left", index }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isLeft = alignment === "left";
  const isNovi = tutor.id === "novi-jingga";
  
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // GSAP animation for the card reveal
    gsap.fromTo(
      cardRef.current,
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        }
      }
    );
    
    // Parallax effect for the image
    gsap.to(imageRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);
  
  // Staggered animation variants for Framer Motion elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div 
      ref={cardRef}
      className="bg-[#fff8d9] rounded-lg overflow-hidden h-full flex flex-col md:flex-row hover:-translate-y-1 transition-transform duration-300 shadow-lg"
    >
      <div 
        className={`md:w-1/2 ${isLeft ? "md:order-first" : "md:order-last"} relative overflow-hidden`}
        style={{ height: "auto" }}
      >
        <div ref={imageRef} className="w-full h-full absolute inset-0">
          <img
            src={tutor.image || "/placeholder.svg"}
            alt={tutor.name}
            className="w-full h-full object-contain transition-all duration-700"
          />
        </div>
        <div style={{ paddingTop: "133%" }} className="relative w-full"></div>
      </div>
      
      {/* Content section */}
      <motion.div 
        className={`md:w-1/2 p-6 flex flex-col justify-between ${
          isLeft ? "md:order-last" : "md:order-first"
        } h-full`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top section */}
        <div className="flex flex-col h-full">
          <motion.div className="mb-2 flex items-center" variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-bold mr-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-600"
              variants={itemVariants}
            >
              {tutor.name}
            </motion.h3>
          </motion.div>
          
          <motion.p 
            className="text-gray-700 text-base font-medium mb-3"
            variants={itemVariants}
          >
            {tutor.role}
          </motion.p>
        
          {/* Description */}
          <motion.div 
            className="text-gray-700 text-sm mb-4 flex-grow overflow-y-auto"
            variants={itemVariants}
          >
            <p>{tutor.description}</p>
            
            {/* Modified section for Novi - LinkedIn icon first, then video */}
            {isNovi ? (
              <div className="flex flex-col">
                {tutor.linkedinUrl && (
                  <motion.a
                    href={tutor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 mb-4 inline-block"
                    variants={itemVariants}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24" 
                      fill="#0077b5"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </motion.a>
                )}
                
                {/* Video section for Novi moved here, directly below LinkedIn */}
                <motion.div className="w-full mt-2" variants={itemVariants}>
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <VideoPlayer videoUrl={tutor.videoUrl} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="thumbnail"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <VideoThumbnail
                          thumbnail={tutor.videoThumbnail}
                          onClick={() => setIsPlaying(true)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ) : (
              /* Original LinkedIn icon for Fredy */
              tutor.linkedinUrl && (
                <motion.a
                  href={tutor.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 inline-block"
                  variants={itemVariants}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="#0077b5"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
              )
            )}
          </motion.div>
        </div>
        
        {/* Video section for Fredy only (kept in original position) */}
        {!isNovi && (
          <motion.div className="w-full mt-auto" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <VideoPlayer videoUrl={tutor.videoUrl} />
                </motion.div>
              ) : (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <VideoThumbnail
                    thumbnail={tutor.videoThumbnail}
                    onClick={() => setIsPlaying(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Background particles component
const BackgroundParticles = () => {
  const particlesRef = useRef([]);
  
  useEffect(() => {
    // Animate particles with GSAP
    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        x: `random(-50, 50)%`,
        y: `random(-50, 50)%`,
        opacity: gsap.utils.random(0.2, 0.5),
        duration: gsap.utils.random(15, 30),
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-4 h-4 rounded-full bg-purple-200 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        />
      ))}
    </div>
  );
};

export function TutorSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const backgroundRef = useRef(null);
  
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Create Lenis instance with high framerate
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect lenis to RAF for optimal performance
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    // Bind Lenis to requestAnimationFrame for high FPS
    requestAnimationFrame(raf);
    
    // GSAP animation for the background parallax
    gsap.fromTo(
      backgroundRef.current,
      { y: "0%" },
      {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
    
    // Animate title and subtitle
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100"
        }
      }
    );
    
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100"
        }
      }
    );
    
    // Cleanup
    return () => {
      lenis.destroy();
      
      // Cleanup ScrollTrigger instances
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef}
      className="relative bg-[#d9c9e6] flex flex-col items-center justify-center py-20 w-full overflow-hidden"
    >
      {/* Background effects */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-b from-purple-100/30 to-transparent"
      />
      <BackgroundParticles />
      
      <div className="container mx-auto px-6 w-full max-w-screen-2xl relative z-10">
        <div ref={titleRef}>
          <h1 className="mt-16 text-4xl md:text-5xl font-bold text-[#660099] mb-4 text-center">
            TUTORS
          </h1>
        </div>
        
        <div ref={subtitleRef}>
          <p className="text-xl text-[#660099] mb-12 text-center">
            Learn from industry professionals with years of experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Novi's card (left-aligned image) */}
          <TutorCard tutor={tutors[0]} alignment="left" index={0} />
          
          {/* Fredy's card (right-aligned image) */}
          <TutorCard tutor={tutors[1]} alignment="right" index={1} />
        </div>
      </div>
    </div>
  );
}