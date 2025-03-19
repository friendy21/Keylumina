"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tutors = [
  {
    id: "novi-jingga",
    name: "Novi Jingga",
    linkedinUrl: "https://www.linkedin.com/in/novi-jingga-3ba074a5/",
    role: "Senior Animator",
    description:
      "Novi is a 2D Motion Design senior animator with 7 years of experience in industry, specializing in creating assets, effects, and animation with Adobe Illustrators and Adobe After Effects. Novi started as a traditional 2D artist eager to learn new skills and enhance her works. Discovering Adobe After Effects, Novi began passionately honing her 2D motion design skill, challenging herself every project. As she advanced to Senior Animator, Novi was given the responsibility to mentor juniors. In doing so, she discovered a new passion —guiding and inspiring the next generation of 2D motion designers.",
    image: "/Photo_Tutor_Left.png?height=400&width=300",
    videoThumbnail: "/Novi_Jingga_thumbnail.png?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/4pMGW_iiobI",
  },
  {
    id: "fredy",
    name: "Fredy",
    linkedinUrl: "https://www.linkedin.com/in/fredy-tan-5591a85/",
    role: "Lighting, Render, FX, and Compositing Supervisor",
    description:
      "A LRFC supervisor with 8 years of experience, proficient at multiple industry-standard software for lighting, render, and compositing. Fredy’s journey started as a Comp FX artist in high school using mostly Adobe After Effects. His passions led him to extensively experimenting with Adobe After Effects, and applying his skills to many commercial projects. As he rose to supervisor rank, Fredy has expanded his expertise to other 3D software such as Autodesk Maya, Blender, Clarisse, 3ds Max, and Unreal Engine 5. Fredy has been using UE 5 for 3D production since 2021 for its real time rendering power. Beyond production work, Fredy has a strong passion for teaching. He has trained junior artists on a project basis, focusing on personalized learning, skill sharing, and open communication as key for effective growth.",
    image: "/Photo_Tutor_Right.png?height=400&width=300",
    videoThumbnail: "/Fredy_thumbnail.png?height=200&width=350",
    videoUrl: "https://www.youtube.com/embed/Bgu6pTJOcJU?rel=0",
  },
];

function VideoPlayer({ videoUrl }) {
  return (
    <div className="relative w-full aspect-video">
      <iframe
        src={videoUrl}
        title="Tutor Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}

function VideoThumbnail({ thumbnail, onClick }) {
  return (
    <motion.div
      className="relative rounded-md overflow-hidden cursor-pointer group"
      initial="rest"
      whileHover="hover"
      onClick={onClick}
    >
      <div className="bg-black w-full aspect-video relative">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt="Video thumbnail"
          className="object-cover opacity-80 group-hover:opacity-60 transition-opacity w-full h-full"
        />
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="rounded-full bg-white/30 backdrop-blur-sm p-3"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-8 w-8"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TutorCard({ tutor }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-[#b8a6c9] rounded-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={tutor.image || "/placeholder.svg"}
            alt={tutor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h3
              className="text-2xl font-bold mb-1"
              variants={textVariants}
            >
              {tutor.name}
            </motion.h3>
            {tutor.linkedinUrl && (
              <motion.a
                href={tutor.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#660099] hover:text-purple-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/LinkedIn.png"
                  className="w-[20px] h-[20px] object-contain"
                />
              </motion.a>
            )}
            <motion.p
              className="text-gray-700 font-medium mb-2"
              variants={textVariants}
            >
              {tutor.role}
            </motion.p>
            <motion.p
              className="text-gray-700 mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
            >
              {tutor.description}
            </motion.p>
          </motion.div>
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VideoPlayer videoUrl={tutor.videoUrl} />
              </motion.div>
            ) : (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VideoThumbnail
                  thumbnail={tutor.videoThumbnail}
                  onClick={() => setIsPlaying(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function TutorSection() {
  return (
    <div className="min-h-screen bg-[#fff8d9] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#660099] mb-4 text-center">
          Our Tutors
        </h1>
        <p className="text-xl text-[#660099] mb-12 text-center">
          Learn from industry professionals with years of experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutors.map((tutor) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TutorCard tutor={tutor} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}