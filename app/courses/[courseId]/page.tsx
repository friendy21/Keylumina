"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"

// Register the ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ModuleContentProps {
  isOpen: boolean
  content: string[]
}

function ModuleContent({ isOpen, content }: ModuleContentProps) {
  if (!isOpen) return null

  return (
    <div className="py-4 pl-4 module-content">
      {content.map((item, index) => (
        <p key={index} className="text-gray-600 mb-1 text-sm">
          {item}
        </p>
      ))}
    </div>
  )
}

interface ModuleProps {
  number: number
  title: string
  content: string[]
  isOpen: boolean
  onToggle: () => void
}

function Module({ number, title, content, isOpen, onToggle }: ModuleProps) {
  return (
    <div className="border-b border-gray-200 module-item">
      <div className="py-4 flex justify-between items-center cursor-pointer" onClick={onToggle}>
        <h3 className="text-gray-800 font-medium">
          Modul {number}: {title}
        </h3>
        <button className="text-gray-500 p-1 rounded-full bg-purple-100">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      <ModuleContent isOpen={isOpen} content={content} />
    </div>
  )
}

interface CourseLevel {
  title: string
  modules: CourseModule[]
}

interface CourseModule {
  number: number
  title: string
  content: string[]
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const { courseId } = params
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({})
  const lenisRef = useRef<Lenis | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Create new Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.2,           // Animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
      direction: 'vertical',   // Scroll direction
      gestureDirection: 'vertical',
      smooth: true,            // Enable smooth scrolling
      smoothTouch: false,      // Disable on touch devices
      touchMultiplier: 2,      // Touch sensitivity
      infinite: false,         // No infinite scrolling
      syncTouch: true,         // Sync with touch events
      wheelMultiplier: 1,      // Wheel sensitivity
      lerp: 0.1,               // Linear interpolation factor (lower = smoother)
      orientation: 'vertical', // Scroll orientation
    })

    // GSAP ScrollTrigger integration
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // Bind Lenis to requestAnimationFrame for optimal performance
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Create stagger animations for module items
    if (containerRef.current) {
      const moduleItems = containerRef.current.querySelectorAll('.module-item')
      
      gsap.fromTo(
        moduleItems,
        { 
          opacity: 0,
          y: 20
        },
        { 
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Handle module content expansion with GSAP animation
  useEffect(() => {
    const moduleContents = document.querySelectorAll('.module-content')
    
    moduleContents.forEach(content => {
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { 
          height: 'auto', 
          opacity: 1, 
          duration: 0.3, 
          ease: "power2.out",
          onComplete: () => {
            // Update Lenis and ScrollTrigger after animation
            lenisRef.current?.resize()
            ScrollTrigger.refresh()
          }
        }
      )
    })
  }, [openModules])

  const toggleModule = (levelIndex: number, moduleIndex: number) => {
    const key = `${levelIndex}-${moduleIndex}`
    setOpenModules(prev => {
      const newState = { ...prev, [key]: !prev[key] }
      // We need to update Lenis after state change
      setTimeout(() => {
        lenisRef.current?.resize()
      }, 50)
      return newState
    })
  }


  const courseData = {
    "Intro-AE-Course": {
      title: "Introduction to After Effects Course",
      levels: [
        {
          modules: [
            {
              number: 1,
              title: "Animation in After Effects",
              content: ["Learn basics of After Effects for layer animation"],
            },
            {
              number: 2,
              title: "FX in After Effects",
              content: ["Using After Effects to make basic effects"],
            }
          ]
        }
      ]
    },
    "Intro-UE5-Course": {
      title: "Introduction to Unreal Engine 5 Course",
      levels: [
        {
          modules: [
            {
              number: 1,
              title: "Preview Unreal Engine 5 Potential",
              content: ["Understanding the potential of using Unreal Engine 5 for rendering"],
            },
          ]
        }
      ]
    },
    "Design-Foundation-Course": {
      title: "Design Foundation Course",
      levels: [
        {
          title: "",
          modules: [
            {
              number: 1,
              title: "After Effects Basics",
              content: ["Learn the basics of After Effects"],
            },
            {
              number: 2,
              title: "Typography Basics",
              content: ["Introduction to typography theory, examples, and application using tools inside After Effects"],
            },
            {
              number: 3,
              title: "12 Principles of Animation Part 1",
              content: ["Introduction to 6 Principles of Animation theories of 12 with examples, and application using tools inside After Effects"],
            },
            {
              number: 4,
              title: "12 Principles of Animation Part 2",
              content: ["Introduction to the other 6 Principles of Animation theories of 12 with examples, and application using tools inside After Effects"],
            },
            {
              number: 5,
              title: "Color",
              content: ["Introduction to type of colors, usages, meanings, and combinations for design"],
            },
            {
              number: 6,
              title: "Composition",
              content: ["Introduction to factors inside a composition and its functions"],
            },
            {
              number: 7,
              title: "Mise en Scene Part 1",
              content: ["Introduction to 4 Mise en Scene theories of 8 for filming and its usage"],
            },
            {
              number: 8,
              title: "Mise en Scene Part 2",
              content: ["Introduction to the other 4 Mise en Scene theories of 8 for filming and its usage"],
            },
            {
              number: 9,
              title: "Final Evaluation",
              content: ["Evaluate completed assigments and analyze growth, strength, and weakness of each student"],
            },
          ]
        }
      ]
    },
    "2D-Motion-Design-Specialist-Course": {
      title: "2D Motion Design Specialist Course",
      levels: [
        {
          title: "Level 1",
          modules: [
            {
              number: 1,
              title: "Illustrator Basics",
              content: ["Introduction to Adobe Illustrator, and shape types, creations, and simplification"],
            },
            {
              number: 2,
              title: "Shading",
              content: ["Learn color combination for shades, tints, and tones, and how to analyze color scheme from reference for shading"],
            },
            {
              number: 3,
              title: "Perspective",
              content: ["Introduction to types of perspective and how to create it in Adobe Illustrator"],
            },
            {
              number: 4,
              title: "Animation and Effect Part 1",
              content: ["Learn how to transfer work from Adobe Illustrator to Adobe After Effects, and animate it inside After Effects"],
            },
            {
              number: 5,
              title: "Animation and Effect Part 2",
              content: ["Learn how to improve animation by adding basic effects"],
            },
            {
              number: 6,
              title: "Gesture",
              content: ["Introduction to personalities, expressions, and body languages in character expression"],
            },
            {
              number: 7,
              title: "Video Transition Part 1",
              content: ["Introduction to transition, its function, and its creation"],
            },
            {
              number: 8,
              title: "Storyboard and Animatic",
              content: ["Learn functions of storyboard and animatic, and its creation process"],
            },
            {
              number: 9,
              title: "Workflow and Soft Skill",
              content: ["Learn how to determine correct workflow, improving soft skill, and other important knowledge regarding career in 3D animation industry"],
            }
          ]
        },
        {
          title: "Level 2",
          modules: [
            {
              number: 10,
              title: "Object Detail",
              content: ["Learn how to analyze reference and create a detailed object"],
            },
            {
              number: 11,
              title: "Background Detail",
              content: ["Learn how to create a detailed background"],
            },
            {
              number: 12,
              title: "Video Transition Part 2",
              content: ["Learn how to create shape transition with masking"],
            },
            {
              number: 13,
              title: "Character Creation Basics and Layering",
              content: ["Learn how to create a basic character and prepare its layer for animation"],
            },
            {
              number: 14,
              title: "Character Detail",
              content: ["Learn how to create a detailed character and prepare its layer for animation"],
            },
            {
              number: 15,
              title: "Rigging Basics and Character Animation Part 1",
              content: ["Introduction to rigging and simple character rigging"],
            },
            {
              number: 16,
              title: "Rigging Basics and Character Animation Part 2",
              content: ["Learn character animation"],
            },
            {
              number: 17,
              title: "Character Interaction, Body Language and Expression",
              content: ["Learn body language of a character during expressions or interactions"],
            },
            {
              number: 18,
              title: "Priority",
              content: ["Learn how to priotize task and its common practice in industry"],
            }
          ]
        },
        {
          title: "Level 3",
          modules: [
            {
              number: 19,
              title: "Animation Detail",
              content: ["Learn how to be aware of animation details"],
            },
            {
              number: 20,
              title: "Fake 3D",
              content: ["Learn how to create fake 3D"],
            },
            {
              number: 21,
              title: "Introduction of Rigging with Script",
              content: ["Introduction to rigging using script"],
            },
            {
              number: 22,
              title: "Understanding Scripting",
              content: ["Learn how to make script to improve efficiency or workflow using ExtendScript"],
            },
            {
              number: 23,
              title: "Final Evaluation",
              content: ["Evaluate completed assignments and analyze growth, strength, and weakness of each student"],
            }
          ]
        }
      ]
    },
    "Unreal-Engine-5-Render-Specialist-Course": {
      title: "Unreal Engine 5 Render Specialist Course",
      levels: [
        {
          title: "Level 1",
          modules: [
            {
              number: 1,
              title: "Unreal Engine 5 Setup",
              content: ["Learn the basics of Unreal Engine 5"],
            },
            {
              number: 2,
              title: "Landscape and Foliage",
              content: ["Learn how to modify Landscape and Foliage"],
            },
            {
              number: 3,
              title: "Sequencer",
              content: ["Learn how to render with sequencer"],
            },
            {
              number: 4,
              title: "Shader",
              content: ["Learn how shader and texture operates in 3D and in Unreal Engine 5"],
            },
            {
              number: 5,
              title: "Lighting, Render, and Decal",
              content: ["Introduction to type of lightings available in Unreal Engine 5, how to improve scene lighting, and the usage of Decal"],
            },
            {
              number: 6,
              title: "Glass and Presentation",
              content: ["Learn how to render glass correctly, and the importance of presentation"],
            },
            {
              number: 7,
              title: "Renderpass",
              content: ["Introduction to 3D renderpass, availability in Unreal Engine 5, and how to output with render"],
            },
            {
              number: 8,
              title: "CryptoMatte, Material ID, dan Object ID",
              content: ["Introduction to render mattes, and how to output with render"],
            },
            {
              number: 9,
              title: "3D Pipeline",
              content: ["Learn 3D animation pipeline, and the role of Unreal Engine 5 in it"],
            }
          ]
        },
        {
          title: "Level 2",
          modules: [
            {
              number: 10,
              title: "Mastering Unreal Engine 5 Setup",
              content: ["Learn advance scene setup in Unreal Engine 5"],
            },
            {
              number: 11,
              title: "3D Porting Part 1",
              content: ["Learn how to move 3D object and camera data from other programs to Unreal Engine 5"],
            },
            {
              number: 12,
              title: "MetaHuman",
              content: ["Learn how to create MetaHuman, and its usage in Unreal Engine 5"],
            },
            {
              number: 13,
              title: "Animation in Unreal Engine 5",
              content: ["Learn how to create animations in Unreal Engine 5"],
            },
            {
              number: 14,
              title: "MetaHuman Animation",
              content: ["Learn how to input animation to MetaHuman"],
            },
            {
              number: 15,
              title: "Blueprint",
              content: ["Learn blueprint and its function"],
            },
            {
              number: 16,
              title: "Niagara FX",
              content: ["Learn how to implement Niagara FX into a scene"],
            },
            {
              number: 17,
              title: "Specialization",
              content: ["Introduction to specialized roles in 3D animation production related to Unreal Engine 5"],
            }
          ]
        },
        {
          title: "Level 3",
          modules: [
            {
              number: 18,
              title: "Shader Creation : Hard Surface",
              content: ["Learn how to make a complex hard surface shader"],
            },
            {
              number: 19,
              title: "Shader Creation : Organic",
              content: ["Learn how to make a complex organic shader"],
            },
            {
              number: 20,
              title: "Shader Creation : Crystal",
              content: ["Learn how to make a crystal shader"],
            },
            {
              number: 21,
              title: "Underwater",
              content: ["Learn the details of underwater scene and creation"],
            },
            {
              number: 22,
              title: "3D Porting Part 2",
              content: ["Learn the common technical issues of exporting and importing 3D data from other programs to Unreal Engine 5 and how to identify, analyze, and solve them"],
            },
            {
              number: 23,
              title: "Procedural Content Generator",
              content: ["Learn how to use PCG to speed up scene setup"],
            },
            {
              number: 24,
              title: "Physics",
              content: ["Learn how to implement physics and its types"],
            },
            {
              number: 25,
              title: "Workflow and Soft Skill",
              content: ["Learn how to determine correct workflow, improving soft skill, and other important knowledge regarding career in 3D animation industry"],
            },
            {
              number: 26,
              title: "Final Evaluation",
              content: ["Evaluate completed assignments and analyze growth, strength, and weakness of each student"],
            }
          ]
        }
      ]
    },
    "Comp-FX-Specialist-Course": {
      title: "Comp-FX Specialist Course",
      levels: [
        {
          title: "Level 1",
          modules: [
            {
              number: 1,
              title: "Native Part 1",
              content: ["Learn basic native effects in After Effects"],
            },
            {
              number: 2,
              title: "Native Part 2",
              content: ["Learn complex combination of native effects in After Effects"],
            },
            {
              number: 3,
              title: "Particular Part 1",
              content: ["Learn how to use Particular"],
            },
            {
              number: 4,
              title: "Particular Part 2",
              content: ["Learn common effects usage from Particular"],
            },
            {
              number: 5,
              title: "Element 3D Part 1",
              content: ["Introduction to Element 3D"],
            },
            {
              number: 6,
              title: "Element 3D Part 2",
              content: ["Learn Element 3D shader functions and textures"],
            },
            {
              number: 7,
              title: "Optical Flare",
              content: ["Introduction to Optical Flare"],
            },
            {
              number: 8,
              title: "Shine and Blur",
              content: ["Introduction to Shine and Blur"],
            },
            {
              number: 9,
              title: "3D Pipeline, Roto, and Tracking",
              content: ["Introduction to 3D Pipelines, Comp FX artist roles, and learn Rotoscoping and Tracking"],
            }
          ]
        },
        {
          title: "Level 2",
          modules: [
            {
              number: 10,
              title: "3D Render Pass",
              content: ["Introduction to 3D renderpass and its usage with Element 3D"],
            },
            {
              number: 11,
              title: "Mocha Tracking",
              content: ["Learn how to track with mocha"],
            },
            {
              number: 12,
              title: "Particular Part 3",
              content: ["Learn advanced effects created with Particular"],
            },
            {
              number: 13,
              title: "Particular Part 4",
              content: ["Learn Physics inside particular"],
            },
            {
              number: 14,
              title: "3D Stroke",
              content: ["Learn how to use 3D stroke for effects creation"],
            },
            {
              number: 15,
              title: "Auto-Trace and Displacement",
              content: ["Learn how to use Auto-Trace and Displacement effects"],
            },
            {
              number: 16,
              title: "Integration of Native and Plugin",
              content: ["Learn combination examples of native effects and plugin effects"],
            },
            {
              number: 17,
              title: "Reel and Breakdown",
              content: ["Introduction to Reels and Breakdowns"],
            }
          ]
        },
        {
          title: "Level 3",
          modules: [
            {
              number: 18,
              title: "Advanced Thunder",
              content: ["Learn how to create types of thunder effect for multiple purposes"],
            },
            {
              number: 19,
              title: "Advanced Smoke",
              content: ["Learn how to create types of smoke effect for multiple purposes"],
            },
            {
              number: 20,
              title: "Advanced Rain",
              content: ["Learn the details of rain and how to create it"],
            },
            {
              number: 21,
              title: "Workflow and Soft Skill",
              content: ["Learn how to determine correct workflow, improving soft skill, and other important knowledge regarding career in 3D animation industry"],
            },
            {
              number: 22,
              title: "Final Evaluation",
              content: ["Evaluate completed assignments and analyze growth, strength, and weakness of each student"],
            }
          ]
        }
      ]
    }
  }

  const course = courseData[courseId as keyof typeof courseData] || defaultCourse
  const hasMultipleLevels = course.levels.length > 1

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation/>
      <div className="container mx-auto px-4 py-12 flex-grow flex flex-col items-center mt-[100px]">
        <div className="w-full max-w-3xl" ref={containerRef}>
          <button
            onClick={() => window.history.back()}
            className="text-purple-600 hover:underline flex items-center mb-4 cursor-pointer"
          >
            <ArrowRight className="mr-2 rotate-180" /> Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">KeyLumina Course Module</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{course.title}</h2>

          {course.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="mb-8">
              {/* Only show the level header if there are multiple levels */}
              {hasMultipleLevels && (
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h2 className="text-xl font-semibold text-purple-800">
                    {level.title || `Level ${levelIndex + 1}`}
                  </h2>
                </div>
              )}
              
              {level.modules.map((module, moduleIndex) => (
                <Module
                  key={moduleIndex}
                  number={module.number}
                  title={module.title}
                  content={module.content}
                  isOpen={!!openModules[`${levelIndex}-${moduleIndex}`]}
                  onToggle={() => toggleModule(levelIndex, moduleIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
