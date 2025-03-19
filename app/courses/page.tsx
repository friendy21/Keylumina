"use client";

import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const courses = [
  {
    id: "Intro-AE-Course",
    title: "Introduction to After Effects Course",
    tag: "After Effects",
    duration: "2x Online Class",
    preview: "Preview of AE Specialist Course",
    image: "/Courses_Icon/Course_Intro_AE.png?height=200&width=350",
  },
  {
    id: "Intro-UE5-Course",
    title: "Introduction to Unreal Engine 5 Course",
    tag: "Unreal Engine",
    duration: "1x Online Class",
    preview: "Preview of UE 5 Specialist Course",
    image: "/Courses_Icon/Course_Intro_Ue.png?height=200&width=350",
  },
  {
    id: "Design-Foundation-Course",
    title: "Design Foundation Course",
    tag: "Foundation",
    duration: "1 Month class",
    preview: "Condensed foundational course",
    image: "/Courses_Icon/Course_Foundation.png?height=200&width=350",
  },
  {
    id: "2D-Motion-Design-Specialist-Course",
    title: "2D Motion Design Specialist Course",
    tag: "2D",
    duration: "3 Month class",
    preview: "Recommended after Foundation",
    image: "/Courses_Icon/Course_Specialist_2DMD.png?height=200&width=350",
  },
  {
    id: "Unreal-Engine-5-Render-Specialist-Course",
    title: "Unreal Engine 5 Render Specialist Course",
    tag: "UE 5",
    duration: "3 Month class",
    preview: "Recommended after Foundation",
    image: "/Courses_Icon/Course_Specialist_UE.png?height=200&width=350",
  },
  {
    id: "Comp-FX-Specialist-Course",
    title: "Comp-FX Specialist Course",
    tag: "Comp-FX",
    duration: "3 Month class",
    preview: "Recommended after Foundation",
    image: "/Courses_Icon/Course_Specialist_CompFX.png?height=200&width=350",
  },
];

export default function CoursesPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#660099] mb-8 text-center"
          >
            Our Courses
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto cursor-pointer h-full"
              >
                <div className="p-5">
                  <motion.h3 variants={childVariants} className="text-xl font-bold text-gray-800 mb-1">
                    {course.title}
                  </motion.h3>
                  <motion.div variants={childVariants} className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-700">{course.duration}</p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full border border-gray-300">
                      {course.tag}
                    </span>
                  </motion.div>
                  <motion.div variants={childVariants} className="mb-4">
                    <p className="text-sm font-medium text-gray-700">{course.preview}</p>
                  </motion.div>
                  <motion.div variants={childVariants} className="bg-[#FBCF41] rounded-lg">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={350}
                      height={200}
                      className="w-full h-auto rounded mb-4"
                    />
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        variant="outline"
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 border-none"
                      >
                        Learn more
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}