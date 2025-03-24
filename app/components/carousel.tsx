"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CourseCard } from "./course-card"
import Link from "next/link"

// Define the Course interface
interface Course {
  id: string
  title: string
  tag: string
  description: string
  levels: string
  duration: string
  schedule: string
  image: string
}

interface CarouselProps {
  courses: Course[]
}

export function Carousel({ courses }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [transition, setTransition] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Create an extended array with duplicated items for infinity scrolling
  const extendedCourses = [...courses, ...courses, ...courses]

  // Calculate responsive values
  useEffect(() => {
    const handleResize = () => {
      // Set number of visible cards based on screen width
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }

      // Update container width
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-scroll the carousel
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [currentSlide, isPaused, courses.length, visibleCards])

  // Handle touch events for mobile swipe functionality
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let touchStartX = 0
    let touchEndX = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      setIsPaused(true)
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX
    }
    
    const handleTouchEnd = () => {
      const difference = touchStartX - touchEndX
      
      // Detect swipe (with threshold)
      if (difference > 50) {
        nextSlide()
      } else if (difference < -50) {
        prevSlide()
      }
      
      setIsPaused(false)
    }
    
    carousel.addEventListener('touchstart', handleTouchStart)
    carousel.addEventListener('touchmove', handleTouchMove)
    carousel.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart)
      carousel.removeEventListener('touchmove', handleTouchMove)
      carousel.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  // Pagination calculation - adjust for the extended courses array
  const totalSlides = extendedCourses.length
  // Force 6 pagination dots
  const originalTotalPages = 6
  
  // Reset to original courses position when reaching the extended boundaries
  useEffect(() => {
    if (currentSlide >= courses.length + visibleCards) {
      // We've scrolled too far right into the duplicated section
      // Reset back to the original section without animation
      setTimeout(() => {
        setTransition(false)
        setCurrentSlide(currentSlide - courses.length)
        setTimeout(() => setTransition(true), 50)
      }, 500) // Wait for transition to complete
    } else if (currentSlide < 0) {
      // We've scrolled too far left
      // Reset to end of original section
      setTimeout(() => {
        setTransition(false)
        setCurrentSlide(currentSlide + courses.length)
        setTimeout(() => setTransition(true), 50)
      }, 500) // Wait for transition to complete
    }
  }, [currentSlide, courses.length, visibleCards])

  // Slide control functions for infinite scrolling
  const nextSlide = () => {
    setCurrentSlide(prev => prev + 1)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => prev - 1)
  }

  // Calculate precise card width including potential gap
  const getCardWidth = () => {
    if (!containerWidth || visibleCards <= 0) return 0
    return containerWidth / visibleCards
  }

  // Calculate transform distance precisely
  const getTransformDistance = () => {
    const cardWidth = getCardWidth()
    return currentSlide * cardWidth
  }

  // For pagination indicators, normalize to show the actual position within original courses
  const getNormalizedSlidePosition = () => {
    // Get the position relative to original course set
    let normalizedPosition = currentSlide % courses.length
    // Handle negative values
    if (normalizedPosition < 0) normalizedPosition += courses.length
    
    // Convert the slide position to match one of the 6 dots
    // Map the full course length to 6 segments
    return Math.floor((normalizedPosition / courses.length) * originalTotalPages) % originalTotalPages
  }

  // Handle mouse hover events
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Don't show navigation when no scrolling is needed
  const showNavigation = courses.length > visibleCards

  return (
    <div 
      className="relative pb-24" /* Removed overflow-hidden and increased padding */
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container with improved scroll math */}
      <div 
        ref={containerRef}
        className="w-full overflow-hidden" /* Added overflow-hidden here instead */
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${getTransformDistance()}px)`,
            transition: transition ? 'transform 500ms ease-in-out' : 'none',
          }}
        >
          {extendedCourses.map((course, index) => (
            <div
              key={`${course.id}-${index}`}
              className="flex-none px-2"
              style={{
                width: `${100 / visibleCards}%`,
              }}
            >
              <Link href={`/courses/${course.id}`}>
                <CourseCard
                  id={course.id}
                  title={course.title}
                  duration={course.duration}
                  tag={course.tag}
                  description={course.description}
                  levels={course.levels}
                  schedule={course.schedule}
                  image={course.image}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons with improved accessibility */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-[#3a0e58]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-[#3a0e58]" />
          </button>
        </>
      )}
      
      {/* Pagination indicators - positioned with 30px bottom margin */}
      {showNavigation && originalTotalPages > 1 && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex gap-3 z-10"
          style={{
            bottom: '30px', // Fixed 30px from bottom
          }}
        >
          {Array.from({ length: originalTotalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Calculate the target slide position in the extended array
                // Position at the start of each segment
                const targetPosition = Math.floor((index / originalTotalPages) * courses.length) + courses.length
                setCurrentSlide(targetPosition)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                getNormalizedSlidePosition() === index ? 'bg-[#3a0e58]' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
