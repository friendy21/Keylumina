"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

interface ModuleContentProps {
  isOpen: boolean
  content: string[]
}

function ModuleContent({ isOpen, content }: ModuleContentProps) {
  if (!isOpen) return null

  return (
    <div className="py-4 pl-4">
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
    <div className="border-b border-gray-200">
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

  const courseData = {
    "Intro-AE-Course": {
      title: "Introduction to After Effects Course",
      levels: [
        {
          modules: [
            {
              number: 1,
              title: "Animation in After Effects",
              content: ["Animation in After Effects"],
            },
            {
              number: 2,
              title: "FX in After Effects",
              content: ["FX in After Effects"],
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
              title: "Introduction to Unreal Engine 5 Course",
              content: ["Introduction to Unreal Engine 5 Course"],
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
              content: ["After Effects Basics"],
            },
            {
              number: 2,
              title: "Typography Basics",
              content: ["Typography Basics"],
            },
            {
              number: 3,
              title: "12 Principles of Animation Part 1",
              content: ["12 Principles of Animation Part 1"],
            },
            {
              number: 4,
              title: "12 Principles of Animation Part 2",
              content: ["12 Principles of Animation Part 2"],
            },
            {
              number: 5,
              title: "Color",
              content: ["Color"],
            },
            {
              number: 6,
              title: "Composition",
              content: ["Composition"],
            },
            {
              number: 7,
              title: "Mise en Scene Part 1",
              content: ["Mise en Scene Part 1"],
            },
            {
              number: 8,
              title: "Mise en Scene Part 2",
              content: ["Mise en Scene Part 2"],
            },
            {
              number: 9,
              title: "Final Evaluation",
              content: ["Final Evaluation"],
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
              content: ["Illustrator Basics"],
            },
            {
              number: 2,
              title: "Shading",
              content: ["Shading"],
            },
            {
              number: 3,
              title: "Perspective",
              content: ["Perspective"],
            },
            {
              number: 4,
              title: "Animation and Effect Part 1",
              content: ["Animation and Effect Part 1"],
            },
            {
              number: 5,
              title: "Animation and Effect Part 2",
              content: ["Animation and Effect Part 2"],
            },
            {
              number: 6,
              title: "Gesture",
              content: ["Gesture"],
            },
            {
              number: 7,
              title: "Video Transition Part 1",
              content: ["Video Transition Part 1"],
            },
            {
              number: 8,
              title: "Storyboard and Animatic",
              content: ["Storyboard and Animatic"],
            },
            {
              number: 9,
              title: "Workflow and Soft Skill",
              content: ["Workflow and Soft Skill"],
            }
          ]
        },
        {
          title: "Level 2",
          modules: [
            {
              number: 10,
              title: "Object Detail",
              content: ["Object Detail"],
            },
            {
              number: 11,
              title: "Background Detail",
              content: ["Background Detail"],
            },
            {
              number: 12,
              title: "Video Transition Part 2",
              content: ["Video Transition Part 2"],
            },
            {
              number: 13,
              title: "Character Creation Basics and Layering",
              content: [" Character Creation Basics and Layering"],
            },
            {
              number: 14,
              title: "Character Detail",
              content: ["Character Detail"],
            },
            {
              number: 15,
              title: "Rigging Basics and Character Animation Part 1",
              content: [" Rigging Basics and Character Animation Part 1"],
            },
            {
              number: 16,
              title: " Rigging Basics and Character Animation Part 2",
              content: [" Rigging Basics and Character Animation Part 2"],
            },
            {
              number: 17,
              title: "Character Interaction, Body Language and Expression",
              content: ["Character Interaction, Body Language and Expression"],
            },
            {
              number: 18,
              title: "Priority",
              content: ["Priority"],
            }
          ]
        },{
          title: "Level 3",
          modules: [
            {
              number: 19,
              title: "Animation Detail",
              content: ["Animation Detail"],
            },
            {
              number: 20,
              title: "Fake 3D",
              content: ["Fake 3D"],
            },
            {
              number: 21,
              title: "Introduction of Rigging with Script",
              content: ["Introduction of Rigging with Script"],
            },
            {
              number: 22,
              title: "Understanding Scripting",
              content: ["Understanding Scripting"],
            },
            {
              number: 23,
              title: "Final Evaluation",
              content: ["Final Evaluation"],
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
              content: ["Unreal Engine 5 Setup"],
            },
            {
              number: 2,
              title: "Landscape",
              content: ["Landscape"],
            },
            {
              number: 3,
              title: "Sequencer",
              content: ["Sequencer"],
            },
            {
              number: 4,
              title: "Shader",
              content: ["Shader"],
            },
            {
              number: 5,
              title: "Lighting and Render",
              content: ["Lighting and Render"],
            },
            {
              number: 6,
              title: "Glass",
              content: ["Glass"],
            },
            {
              number: 7,
              title: " Renderpass",
              content: [" Renderpass"],
            },
            {
              number: 8,
              title: "Matte",
              content: ["Matte"],
            },
            {
              number: 9,
              title: "3D Pipeline",
              content: ["3D Pipeline"],
            }
          ]
        },
        {
          title: "Level 2",
          modules: [
            {
              number: 10,
              title: "Mastering Unreal Engine 5 Setup",
              content: ["Mastering Unreal Engine 5 Setup"],
            },
            {
              number: 11,
              title: "3D Porting Part 1",
              content: ["3D Porting Part 1"],
            },
            {
              number: 12,
              title: "MetaHuman",
              content: ["MetaHuman"],
            },
            {
              number: 13,
              title: "Animation in Unreal Engine 5",
              content: ["Animation in Unreal Engine 5"],
            },
            {
              number: 14,
              title: "MetaHuman Animation",
              content: ["MetaHuman Animation"],
            },
            {
              number: 15,
              title: "Blueprint",
              content: ["Blueprint"],
            },
            {
              number: 16,
              title: "Niagara FX",
              content: ["Niagara FX"],
            },
            {
              number: 17,
              title: "Specialization",
              content: ["Specialization"],
            }
          ]
        },
        {
          title: "Level 3",
          modules: [
            {
              number: 18,
              title: "Shader Creation Part 1",
              content: ["Shader Creation Part 1"],
            },
            {
              number: 19,
              title: "Shader Creation Part 2",
              content: ["Shader Creation Part 2"],
            },
            {
              number: 20,
              title: "Shader Creation Part 3",
              content: ["Shader Creation Part 3"],
            },
            {
              number: 21,
              title: "Underwater",
              content: ["Underwater"],
            },
            {
              number: 22,
              title: "3D Porting Part 2",
              content: ["3D Porting Part 2"],
            },
            {
              number: 23,
              title: "Procedural Content Generator",
              content: ["Procedural Content Generator"],
            },
            {
              number: 24,
              title: " Physics",
              content: [" Physics"],
            },
            {
              number: 25,
              title: "Workflow and Soft Skill",
              content: ["Workflow and Soft Skill"],
            },
            {
              number: 26,
              title: "Final Evaluation",
              content: ["Final Evaluation"],
            },

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
              content: ["Native Part 1"],
            },
            {
              number: 2,
              title: "Native Part 2",
              content: ["Native Part 2"],
            },
            {
              number: 3,
              title: "Particular Part 1",
              content: ["Particular Part 1"],
            },
            {
              number: 4,
              title: "Particular Part 2",
              content: ["Particular Part 2"],
            },
            {
              number: 5,
              title: "Element 3D Part 1",
              content: ["Element 3D Part 1"],
            },
            {
              number: 6,
              title: "Element 3D Part 2",
              content: ["Element 3D Part 2"],
            },
            {
              number: 7,
              title: "Optical Flare",
              content: ["Optical Flare"],
            },
            {
              number: 8,
              title: "Shine and Blur",
              content: ["Shine and Blur"],
            },
            {
              number: 9,
              title: "3D Pipeline, Roto, and Tracking",
              content: ["3D Pipeline, Roto, and Tracking"],
            },
          ]
        },
        {
          title: "Level 2",
          modules: [
            {
              number: 10,
              title: "3D Render Pass",
              content: ["3D Render Pass"],
            },
            {
              number: 11,
              title: "Mocha Tracking",
              content: ["Mocha Tracking"],
            },
            {
              number: 12,
              title: "Particular Part 3",
              content: ["Particular Part 3"],
            },
            {
              number: 13,
              title: "Particular Part 4",
              content: ["Particular Part 4"],
            },
            {
              number: 14,
              title: "3D Stroke",
              content: ["3D Stroke"],
            },
            {
              number: 15,
              title: "Auto-Trace and Displacement",
              content: ["Auto-Trace and Displacement"],
            },
            {
              number: 16,
              title: "Integration of Native and Plugin",
              content: ["Integration of Native and Plugin"],
            },
            {
              number: 17,
              title: "Reel and Breakdown",
              content: ["Reel and Breakdown"],
            }
          ]
        },{
          title: "Level 3",
          modules: [
            {
              number: 18,
              title: "Advanced Thunder",
              content: ["Advanced Thunder"],
            },
            {
              number: 19,
              title: "Advanced Smoke",
              content: ["Advanced Smoke"],
            },
            {
              number: 20,
              title: "Advanced Rain",
              content: ["Advanced Rain"],
            },
            {
              number: 21,
              title: "Workflow and Soft Skil",
              content: ["Workflow and Soft Skil"],
            },
            {
              number: 22,
              title: "Final Evaluation",
              content: ["Final Evaluation"],
            }
          ]
        }

      ]
    }
  }

  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({})

  const toggleModule = (levelIndex: number, moduleIndex: number) => {
    const key = `${levelIndex}-${moduleIndex}`
    setOpenModules(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const defaultCourse = {
    title: "Course Not Found",
    levels: [
      {
        title: "Level 1",
        modules: [
          {
            number: 1,
            title: "Introduction",
            content: ["Course content not available"],
          },
        ],
      },
    ],
  }

  const course = courseData[courseId as keyof typeof courseData] || defaultCourse

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => window.history.back()}
          className="text-purple-600 hover:underline flex items-center mb-4 cursor-pointer"
        >
          <ArrowRight className="mr-2 rotate-180" /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keylumina Academy</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>

        <div className="max-w-3xl">
          {course.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="mb-8">
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-purple-800">
                  {level.title || `Level ${levelIndex + 1}`}
                </h2>
              </div>
              
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
    </div>
  )
}