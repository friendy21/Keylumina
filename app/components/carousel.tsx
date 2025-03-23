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

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(courses.length - visibleCards + 1))
  const isLastPage = currentSlide >= totalPages - 1

  // Normalized slide position handling
  const normalizeSlidePosition = (position: number) => {
    if (position < 0) return totalPages - 1
    if (position >= totalPages) return 0
    return position
  }

  const nextSlide = () => {
    if (courses.length <= visibleCards) return
    
    setCurrentSlide(prev => {
      if (isLastPage) {
        // Quick reset to beginning without animation
        setTransition(false)
        setTimeout(() => setTransition(true), 50)
        return 0
      }
      return normalizeSlidePosition(prev + 1)
    })
  }

  const prevSlide = () => {
    if (courses.length <= visibleCards) return
    
    setCurrentSlide(prev => {
      if (prev <= 0) {
        // Quick reset to end without animation
        setTransition(false)
        setTimeout(() => setTransition(true), 50)
        return totalPages - 1
      }
      return normalizeSlidePosition(prev - 1)
    })
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

  // Handle mouse hover events
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Don't show navigation when no scrolling is needed
  const showNavigation = courses.length > visibleCards

  return (
    <div 
      className="relative overflow-hidden"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container with improved scroll math */}
      <div 
        ref={containerRef}
        className="w-full"
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${getTransformDistance()}px)`,
            transition: transition ? 'transform 500ms ease-in-out' : 'none',
          }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
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
            disabled={currentSlide === 0 && !isLastPage}
          >
            <ChevronLeft className="h-6 w-6 text-[#3a0e58]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors"
            aria-label="Next slide"
            disabled={isLastPage && currentSlide !== 0}
          >
            <ChevronRight className="h-6 w-6 text-[#3a0e58]" />
          </button>
        </>
      )}
      
      {/* Pagination indicators */}
      {showNavigation && totalPages > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-[#3a0e58]' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
