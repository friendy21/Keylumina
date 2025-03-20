"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CourseCard } from "./course-card"
import Link from "next/link"

// Define the Course interface based 
interface Course {
  id: string
  title: string
  tag: string
  description: string
  levels: string
  duration:string
  schedule: string
  image: string
}

interface CarouselProps {
  courses: Course[]
}

export function Carousel({ courses }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const [cardWidth, setCardWidth] = useState(0)
  const [gap, setGap] = useState(0)
  const flexContainerRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLDivElement>(null)

  // Handle window resize to adjust the number of visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Measure card width and gap for slide calculations
  useEffect(() => {
    const updateSizes = () => {
      if (firstCardRef.current && flexContainerRef.current) {
        const cardWidthPx = firstCardRef.current.offsetWidth
        const computedStyle = window.getComputedStyle(flexContainerRef.current)
        const gapPx = parseFloat(computedStyle.getPropertyValue("gap")) || 0
        setCardWidth(cardWidthPx)
        setGap(gapPx)
      }
    }

    updateSizes()
    window.addEventListener("resize", updateSizes)
    return () => window.removeEventListener("resize", updateSizes)
  }, [])

  // Auto-scroll the carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 2000)
    return () => clearInterval(interval)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlides = Math.max(0, courses.length - visibleCards)
      return prev >= maxSlides ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlides = Math.max(0, courses.length - visibleCards)
      return prev <= 0 ? maxSlides : prev - 1
    })
  }

  return (
    <div className="relative">
      {/* Previous slide button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 p-2 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-[#3a0e58]" />
      </button>
  
      {/* Carousel container */}
      <div >
        <div
          ref={flexContainerRef}
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentSlide * (cardWidth + gap)}px)`,
          }}
        >
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={index === 0 ? firstCardRef : null}
              className="flex-none px-2"
              style={{
                width: `${100 / visibleCards}%`,
              }}
            >
              <Link href={`/courses/${course.id}`}>
                <CourseCard
                  id={course.id}
                  title={course.title}
                  duration= {course.duration}
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
  
      {/* Next slide button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 p-2 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-[#3a0e58]" />
      </button>
    </div>
  )
}