"use client"

import { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Carousel } from "./components/carousel"
import { KeyluminaScene } from "./components/keylumina-scene"
import { Navigation } from "./components/navigation"
import { TutorSection } from "./components/tutor-section"
import { Commitment } from "./components/Commitment"
import { Footer } from "./components/footer"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
}

const slideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "anticipate" } }
}

const scaleUp = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.2 } }
}
const courses = [
  {
    id: "Intro-AE-Course",
    title: "Introduction to After Effects Course",
    tag: "After Effects",
    duration: "2x Online Class",
    description: "Preview of AE Specialist Course",
    levels: [],
    // schedule: "",
    image: "/Courses_Icon/Course_Intro_AE.png?height=200&width=350",
  },
  {
    id: "Intro-UE5-Course",
    title: "Introduction to Unreal Engine 5 Course",
    tag: "Unreal Engine",
    duration: "1x Online Class",
    description: "Preview of UE 5 Specialist Course",
    levels: [],
    // schedule: "",
    image: "/Courses_Icon/Course_Intro_Ue.png?height=200&width=350",
  },
  {
    id: "Design-Foundation-Course",
    title: "Design Foundation Course",
    tag: "Foundation",
    duration: "1 Month class",
    description: "Condensed foundational course",
    levels: [],
    // schedule: "",
    image: "/Courses_Icon/Course_Foundation.png?height=200&width=350",
  },
  {
    id: "2D-Motion-Design-Specialist-Course",
    title: "2D Motion Design Specialist Course",
    tag: "2D",
    duration: "3 Month class",
    description: "Recommended after Foundation",
    levels: [],
    // schedule: "",
    image: "/Courses_Icon/Course_Specialist_2DMD.png?height=200&width=350",
  },
  {
    id: "Unreal-Engine-5-Render-Specialist-Course",
    title: "Unreal Engine 5 Render Specialist Course",
    tag: "UE 5",
    duration: "3 Month class",
    description: "Recommended after Foundation",
    levels: [],
    // schedule: "",
    image: "/Courses_Icon/Course_Specialist_UE.png?height=200&width=350",
  },
  {
    id: "Comp-FX-Specialist-Course",
    title: "Comp-FX Specialist Course",
    tag: "Comp-FX",
    duration: "3 Month class",
    description: "Recommended after Foundation",
    levels: [],
    // schedule: "",
    image: "/Courses_Icon/Course_Specialist_CompFX.png?height=200&width=350",
  },
]

const OurCommitment = [
  {
    id: "expert-tutors",
    title: "100% Live class",
    description: "All class are live and recorded so students can review after class if needed. Students can ask teachers any day, and small class are held to answer complex questions.",
    icon: <img src="Commitment_Icons/CI_01.png" className="w-6 h-6" alt="Live class icon" />,
  },
  {
    id: "flexible-learning",
    title: "Taught by industry experts",
    description: "All class are directly taught by industry experienced artist, and feedback for assignments is given directly on LIVE class.",
    icon: <img src="Commitment_Icons/CI_02.png" className="w-6 h-6" alt="Live class icon" />,
  },
  {
    id: "practical-projects",
    title: "Intensive and challenging classes",
    description: "Industry level complex material are taught to student. Feedbacks for assignment are a mix of guidance from teacher, and critics from senior.",
    icon: <img src="Commitment_Icons/CI_03.png" className="w-6 h-6" alt="Live class icon" />,
  },
  {
    id: "career-support",
    title: "Soft-skill, timeline, and workflow",
    description: "We teach how to plan a workflow and an efficient timeline while also building positive habit of students, how to diagnose weakness, and improve in the future. ",
    icon: <img src="Commitment_Icons/CI_04.png" className="w-6 h-6" alt="Live class icon" />,
  },
]
export default function HomePage() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Courses and Commitment data arrays remain unchanged from original

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      <Navigation />

      {/* Animated Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#c8b6d8] pt-16">
        <Canvas className="absolute inset-0">
          <Suspense fallback={null}>
            <KeyluminaScene />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.h1
            variants={slideUp}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#660099] mb-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              keylumina
            </motion.div>
          </motion.h1>
        </motion.div>
      </section>

      {/* Animated Courses Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="relative bg-[#d48fb6] py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={slideUp}
            className="text-[#3a0e58] text-5xl md:text-6xl font-bold mb-8 text-center"
          >
            Courses
          </motion.h2>
          
          <motion.div variants={scaleUp}>
            <Carousel courses={courses} />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-center mt-8"
          >
            <Link href="/courses">
              <Button 
                className="bg-[#660099] hover:bg-[#4d0073] text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Courses
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Animated Tutor Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <TutorSection />
      </motion.div>

      {/* Animated Commitment Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-[#660099] text-5xl md:text-6xl font-bold mb-4 text-center"
          >
            Our Commitment to Quality Learning
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {OurCommitment.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Commitment
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-[#660099]">
            Communication is key to learning. We encourage student to ask a lot and explore as creatively as they can. As each student is unique and have their own pace, we will give them guidance according to their strengths and gave tips on how to use it to cover for their weaknesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Footer */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}