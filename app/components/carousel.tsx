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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Triple the courses for smooth infinite scrolling
  const totalCourses = courses.length
  const extendedCourses = [...courses, ...courses, ...courses]
  
  // Initialize with middle set
  useEffect(() => {
    setCurrentIndex(totalCourses)
  }, [totalCourses])

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }

      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-scroll setup with cleanup
  useEffect(() => {
    const startAutoScroll = () => {
      if (isPaused) return
      
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      
      autoScrollRef.current = setInterval(() => {
        if (!isTransitioning) {
          goToNextSlide()
        }
      }, 5000)
    }
    
    startAutoScroll()
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isPaused, isTransitioning])

  // Handle boundary transitions smoothly
  useEffect(() => {
    if (!isTransitioning) return
    
    const handleTransitionEnd = () => {
      // When we reach the end of triplicated array
      if (currentIndex >= totalCourses * 2) {
        setIsTransitioning(false)
        // Silently reset to first set
        setCurrentIndex(currentIndex - totalCourses)
      } 
      // When we reach the beginning
      else if (currentIndex < totalCourses) {
        setIsTransitioning(false)
        // Silently reset to second set
        setCurrentIndex(currentIndex + totalCourses)
      }
      else {
        setIsTransitioning(false)
      }
    }
    
    const transitionDuration = 500 // ms
    const timer = setTimeout(handleTransitionEnd, transitionDuration + 50)
    
    return () => clearTimeout(timer)
  }, [currentIndex, isTransitioning, totalCourses])

  // Touch event handlers
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
      
      if (difference > 50) {
        goToNextSlide()
      } else if (difference < -50) {
        goToPrevSlide()
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

  // Navigation functions
  const goToNextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => prev + 1)
  }

  const goToPrevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => prev - 1)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    
    // Calculate position in middle set
    const middleOffset = totalCourses
    const normalizedIndex = index % totalCourses
    setCurrentIndex(middleOffset + normalizedIndex)
  }

  // Calculate transformations
  const getCardWidth = () => {
    if (!containerWidth || visibleCards <= 0) return 0
    return containerWidth / visibleCards
  }

  const getTransformDistance = () => {
    return currentIndex * getCardWidth()
  }

  // Pagination dots - fixed at 6 
  const paginationDotsCount = 6

  // Get active dot based on currentIndex
  const getActiveDotIndex = () => {
    // Normalize to a single set
    const normalizedIndex = currentIndex % totalCourses
    
    // Map to dots (evenly distributed)
    return Math.floor((normalizedIndex / totalCourses) * paginationDotsCount) % paginationDotsCount
  }

  // Handlers for pause on hover
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Navigation visibility
  const showNavigation = courses.length > visibleCards

  // Handle dot click
  const handleDotClick = (dotIndex: number) => {
    // Calculate course position from dot index
    const segmentSize = totalCourses / paginationDotsCount
    const targetCourseIndex = Math.floor(dotIndex * segmentSize)
    goToSlide(targetCourseIndex)
  }

  return (
    <div 
      className="relative pb-24"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel container */}
      <div 
        ref={containerRef}
        className="w-full overflow-hidden"
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${getTransformDistance()}px)`,
            transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
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

      {/* Navigation buttons */}
      {showNavigation && (
        <>
          <button
            onClick={goToPrevSlide}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-[#3a0e58]" />
          </button>
          
          <button
            onClick={goToNextSlide}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md transition-colors disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-[#3a0e58]" />
          </button>
        </>
      )}
      
      {/* Pagination indicators */}
      {showNavigation && paginationDotsCount > 1 && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex gap-3 z-10"
          style={{
            bottom: '30px',
          }}
        >
          {Array.from({ length: paginationDotsCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-colors ${
                getActiveDotIndex() === index ? 'bg-[#3a0e58]' : 'bg-gray-300'
              } disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
