"use client";

import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom hook for smooth scrolling with Lenis
function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect lenis to RAF (request animation frame)
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Connect GSAP's ticker to Lenis for synced animations
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Set up a resize observer for responsive adjustments
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(document.body);

    // Clean up
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      resizeObserver.disconnect();
    };
  }, []);
}

interface CourseCardProps {
  id: string;
  title: string;
  tag: string;
  duration: string;
  description: string;
  levels: string;
  schedule: string;
  image: string;
  showButton?: boolean;
  index: number;
}

function CourseCard({
  id,
  title,
  tag,
  duration,
  description,
  levels,
  schedule,
  image,
  showButton = true,
  index,
}: CourseCardProps) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Set initial state
    gsap.set(cardRef.current, { 
      y: 50, 
      opacity: 0 
    });

    // Create animation for card entrance
    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1 * index,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Add hover animation
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(cardRef.current, {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });

    // Add event listeners for hover
    cardRef.current.addEventListener("mouseenter", () => hoverTl.play());
    cardRef.current.addEventListener("mouseleave", () => hoverTl.reverse());

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mouseenter", () => hoverTl.play());
        cardRef.current.removeEventListener("mouseleave", () => hoverTl.reverse());
      }
    };
  }, [index]);

  return (
    <div className="w-full px-4">
      <div
        ref={cardRef}
        key={id}
        className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto transition-all duration-300 cursor-pointer h-[480px] flex flex-col"
      >
        <div className="p-5 flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{title}</h3>
            <p className="text-gray-700 text-left">{duration}</p>
            <p className="text-sm text-gray-700">{levels}</p>
          </div>

          <div className="mb-4 flex-grow">
            <p className="text-sm font-medium text-gray-700 line-clamp-3">{description}</p>
          </div>

          <div className="bg-[#FBCF41] rounded-lg h-[200px] mb-4">
            <div className="w-full h-full relative">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover rounded"
              />
            </div>
          </div>

          {showButton && (
            <div className="mt-auto">
              <Link href={`/courses/${id}`} className="block w-full">
                <Button
                  variant="outline"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 border-none"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// courses data
const courses = [
  {
    id: "Intro-AE-Course",
    title: "Introduction to After Effects Course",
    tag: "After Effects",
    duration: "2x Online Class",
    description: "Preview of AE Specialist Course.",
    levels: "Beginner",
    schedule: "Flexible",
    image: "/Courses_Icon/Course_Intro_AE.png",
  },
  {
    id: "Intro-UE5-Course",
    title: "Introduction to Unreal Engine 5 Course",
    tag: "Unreal Engine",
    duration: "1x Online Class",
    description: "Preview of UE 5 Specialist Course.",
    levels: "Beginner",
    schedule: "Flexible",
    image: "/Courses_Icon/Course_Intro_Ue.png",
  },
  {
    id: "Design-Foundation-Course",
    title: "Design Foundation Course",
    tag: "Foundation",
    duration: "1 Month class",
    description: "Condensed foundational course.",
    levels: "Beginner",
    schedule: "Weekly sessions",
    image: "/Courses_Icon/Course_Foundation.png",
  },
  {
    id: "2D-Motion-Design-Specialist-Course",
    title: "2D Motion Design Specialist Course",
    tag: "2D",
    duration: "3 Months class",
    description: "Recommended after Foundation.",
    levels: "Intermediate",
    schedule: "Weekly sessions",
    image: "/Courses_Icon/Course_Specialist_2DMD.png",
  },
  {
    id: "Unreal-Engine-5-Render-Specialist-Course",
    title: "Unreal Engine 5 Render Specialist Course",
    tag: "UE 5",
    duration: "3 Months class",
    description: "Recommended after Foundation.",
    levels: "Intermediate",
    schedule: "Weekly sessions",
    image: "/Courses_Icon/Course_Specialist_UE.png",
  },
  {
    id: "Comp-FX-Specialist-Course",
    title: "Comp-FX Specialist Course",
    tag: "Comp-FX",
    duration: "3 Months class",
    description: "Recommended after Foundation.",
    levels: "Intermediate",
    schedule: "Weekly sessions",
    image: "/Courses_Icon/Course_Specialist_CompFX.png",
  },
];

export default function CoursesPage() {
  // Initialize smooth scrolling
  useSmoothScroll();
  
  const titleRef = useRef(null);
  const coursesGridRef = useRef(null);

  useEffect(() => {
    // Title animation with GSAP
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: -30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
      <Navigation />
      <main className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-[#660099] mb-12 text-center"
          >
            COURSES
          </h1>
          <div 
            ref={coursesGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                tag={course.tag}
                duration={course.duration}
                description={course.description}
                levels={course.levels}
                schedule={course.schedule}
                image={course.image}
                showButton={true}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}