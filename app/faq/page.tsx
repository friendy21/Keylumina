"use client";

import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, index }: FAQItemProps) => {
  const itemRef = useRef(null);
  
  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [index]);

  return (
    <div ref={itemRef} className="border-b border-purple-200 last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-5 px-4 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <div className="text-purple-600 bg-purple-100 p-1 rounded-full">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-5"
        >
          <div className="text-gray-600 whitespace-pre-line">{answer}</div>
        </motion.div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
  const lenisRef = useRef<Lenis | null>(null);
  const headingRef = useRef(null);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    // Create Lenis instance for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      // Set to 90fps (1000ms / 90 = ~11.11ms per frame)
      wheelMultiplier: 1,
      syncTouch: true,
    });
    
    // Synchronize Lenis with GSAP's ticker
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });
    
    // Update ScrollTrigger when Lenis scrolls
    lenisRef.current.on('scroll', ScrollTrigger.update);

    // Configure GSAP's ticker with a higher frame rate (90fps)
    gsap.ticker.fps(90);
    
    // Optimize animations for high FPS
    gsap.ticker.lagSmoothing(2000, 16);
    gsap.config({
      force3D: "auto",
      autoSleep: 60,
      nullTargetWarn: false,
    });
    
    // Clean up on component unmount
    return () => {
      gsap.ticker.remove(lenisRef.current?.raf);
      lenisRef.current?.destroy();
      
      // Kill all GSAP animations and ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Apply animations to the heading
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    
    // Scroll to the opened item with smooth animation
    if (!openItems[index] && lenisRef.current) {
      setTimeout(() => {
        const element = document.getElementById(`faq-item-${index}`);
        if (element) {
          lenisRef.current?.scrollTo(element, { 
            offset: -100, 
            duration: 1, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }, 50);
    }
  };

  const faqItems = [
    {
      question: "What is the benefit of Online and Offline Class?",
      answer: (
        <div>
          <p>Since most of what we teach involves animation, delay, lags, or online video compression may break what is shown.</p>
          
          <p className="font-semibold mt-4">Offline Class:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Real time, what is shown is high quality as intended by teacher.</li>
            <li>Teacher is able to visit student's desk if help is needed. Since the programs we used are highly technical, sometimes, the teacher needs to intervene directly to help with the error on their programs.</li>
            <li>Able to share data quickly</li>
            <li>Unaffected by internet speed and stability, especially when the program is doing heavy processing and is causing the computer to slow down and even disconnect from the internet.</li>
            <li>Able to use class computers.</li>
            <li>Teacher are able to quickly identify shy and struggling students and help them.</li>
            <li>Better student and teacher relationship means better motivation.</li>
          </ul>
          
          <p className="font-semibold mt-4">Online Class:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Can be done anywhere</li>
            <li>More flexible schedule for student</li>
            <li>Cheaper</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Where is the Offline Class located?",
      answer: "Our Offline class is located near ITC Roxy Square, Central Jakarta. But if many students are located in other location, we will consider opening a class there.",
    },
    {
      question: "Should I bring my laptop to Offline Class?",
      answer: "Not necessary. We provide computers and softwares needed for the courses. But, we recommend you to bring a flash disk with at least 16 GB storage to take your work home and vice versa.",
    },
    {
      question: "What is the recommended Age to take our courses?",
      answer: "17-28 years old.",
    },
    {
      question: "Who are the teachers?",
      answer: (
        <div>
          <p>For Comp FX and Unreal Engine 5:</p>
          <a
            href="https://www.linkedin.com/in/fredy-tan-5591a885/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            https://www.linkedin.com/in/fredy-tan-5591a885/
          </a>
          
          <p className="mt-2">For 2D motion Design:</p>
          <a
            href="https://www.linkedin.com/in/novi-jingga-3ba074a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            https://www.linkedin.com/in/novi-jingga-3ba074a5/
          </a>
        </div>
      ),
    },
    {
      question: "When is the class schedule and how long is each session?",
      answer: (
        <div>
          <p>We have 4 class schedules that will be available depending on the student's number from Monday to Sunday.</p>
          
          <ul className="list-none ml-6 space-y-1 mt-2">
            <li>10.30 - 12.00 WIB</li>
            <li>13.30 - 15.00 WIB</li>
            <li>16.00 - 17.30 WIB</li>
            <li>18.30 - 20.30 WIB</li>
          </ul>
          
          <p className="mt-4">During registration, we will inquire about your time preference. If there is conflict, we will offer alternatives to you.</p>
          <p>Introduction courses are only 45 minutes.</p>
          <p>Foundation and Specialist is 90 minutes.</p>
          <p>For non introduction class, we may have a short online only session (30 minutes) before the next session to help with questions from students.</p>
        </div>
      ),
    },
    {
      question: "What are the lessons?",
      answer: (
        <div>
          <p>
            For our complete modules for each course, please check the{" "}
            <Link href="/courses" className="text-purple-600 hover:underline">
              Courses page
            </Link>
            .
          </p>
          
          <p className="font-semibold mt-4">TL;DR:</p>
          <ul className="space-y-2 mt-2">
            <li>
              <Link href="/courses/Intro-AE-Course" className="font-medium text-purple-600 hover:underline">
                Introduction to After Effects Course
              </Link>
              : Showing After Effects potential to animate and create effects.
            </li>
            
            <li>
              <Link href="/courses/Intro-UE5-Course" className="font-medium text-purple-600 hover:underline">
                Introduction to Unreal Engine 5 Course
              </Link>
              : Showing Unreal Engine 5 as a better alternative to traditional 3D animation render
            </li>
            
            <li>
              <Link href="/courses/Design-Foundation-Course" className="font-medium text-purple-600 hover:underline">
                Design Foundation Course
              </Link>
              : Learning design theories and applying it to assignments
            </li>
            
            <li>
              <Link href="/courses/Unreal-Engine-5-Render-Specialist-Course" className="font-medium text-purple-600 hover:underline">
                Unreal Engine 5 Render Specialist Course
              </Link>
              : Learning how to use Unreal Engine 5 from basic setup to render, 3D data between programs, variation of tools, and responsibility of render artist in 3D animation industry.
            </li>
            
            <li>
              <Link href="/courses/Comp-FX-Specialist-Course" className="font-medium text-purple-600 hover:underline">
                Comp-FX Specialist Course
              </Link>
              : Learning how to create effects with Adobe After Effects, from native tools to multiple plugins, and understanding the role of a Comp FX artist.
            </li>
            
            <li>
              <Link href="/courses/2D-Motion-Design-Specialist-Course" className="font-medium text-purple-600 hover:underline">
                2D Motion Design Specialist Course
              </Link>
              : Learning how to create 2D animation from asset creation with Adobe Illustrator, rigging, and animation with Adobe After Effects.
            </li>
          </ul>
          
          <p className="mt-4">Besides that, each course also covers industry workflows, soft skills and critical thinking to build positive habits and overcoming challenges caused by program limitations and client expectations for career growth.</p>
        </div>
      ),
    },
    {
      question: "How many session for each Course?",
      answer: (
        <div>
          <p>Sessions are similar to modules as each module is taught per Primary Class.</p>
          
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Courses type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Number of Sessions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/courses/Intro-AE-Course" className="text-purple-600 hover:underline">
                      Introduction to After Effects Course
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">2</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/courses/Intro-UE5-Course" className="text-purple-600 hover:underline">
                      Introduction to Unreal Engine 5 Course
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">1</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/courses/Design-Foundation-Course" className="text-purple-600 hover:underline">
                      Design Foundation Course
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">9</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/courses/Unreal-Engine-5-Render-Specialist-Course" className="text-purple-600 hover:underline">
                      Unreal Engine 5 Render Specialist Course
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">26</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/courses/Comp-FX-Specialist-Course" className="text-purple-600 hover:underline">
                      Comp-FX Specialist Course
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">22</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/courses/2D-Motion-Design-Specialist-Course" className="text-purple-600 hover:underline">
                      2D Motion Design Specialist Course
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      question: "What programs will we use?",
      answer: (
        <div>
          <ul className="space-y-4">
            <li>
              <Link href="/courses/Intro-AE-Course" className="font-medium text-purple-600 hover:underline">
                Introduction to After Effects Course
              </Link>
              : Adobe After Effects 2025
            </li>
            
            <li>
              <Link href="/courses/Intro-UE5-Course" className="font-medium text-purple-600 hover:underline">
                Introduction to Unreal Engine 5 Course
              </Link>
              : Unreal Engine 5.3
            </li>
            
            <li>
              <Link href="/courses/Design-Foundation-Course" className="font-medium text-purple-600 hover:underline">
                Design Foundation Course
              </Link>
              : Adobe After Effects 2025, Adobe Media Encoder 2025 (Optional)
            </li>
            
            <li>
              <Link href="/courses/Unreal-Engine-5-Render-Specialist-Course" className="font-medium text-purple-600 hover:underline">
                Unreal Engine 5 Render Specialist Course
              </Link>
              : Unreal Engine 5.3, Unreal Engine 5.5, Ultra Dynamic Sky, Blender, Autodesk Maya (Optional), Adobe After Effects 2025 (Optional, can be switched with other compositing program), VC Optical Flare (Optional), RSMB (Optional), Adobe Media Encoder 2025 (Optional)
            </li>
            
            <li>
              <Link href="/courses/Comp-FX-Specialist-Course" className="font-medium text-purple-600 hover:underline">
                Comp-FX Specialist Course
              </Link>
              : Adobe After Effects 2025, Redgiant Trapcode 2025, VC Element 3D v2.2, VC Optical Flare, RSMB (Optional)
            </li>
            
            <li>
              <Link href="/courses/2D-Motion-Design-Specialist-Course" className="font-medium text-purple-600 hover:underline">
                2D Motion Design Specialist Course
              </Link>
              : Adobe Illustrator 2025, Adobe After Effects 2025, Adobe Media Encoder 2025 (Optional), Adobe Script Extender
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "What if the lesson is too fast for me?",
      answer: "We try to ensure every material we teach is well received by students. Each session will be recorded, and we will send it to student after class via email for personal review. Students can also contact us via Discord group for questions. Complex questions will be gathered and answered in a small online only session.",
    },
    {
      question: "What if I cannot attend a session?",
      answer: "You will still receive the recording from the class, and you have the option to follow the class from the other batch (depends on availability).",
    },
    {
      question: "What if I have additional Questions?",
      answer: (
        <div>
          <p>You can contact us at <a href="http://www.keylumina.com" className="text-purple-600 hover:underline">www.keylumina.com</a></p>
          <p className="mt-2">Or can fill in <a href="http://bit.ly/keyluminasurvey" className="text-purple-600 hover:underline">bit.ly/keyluminasurvey</a></p>
          <p>There is a section there for questions</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
      <Navigation />
      <main className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-[#660099] mb-8 text-center"
          >
            Frequently Asked Questions
          </h1>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {faqItems.map((item, index) => (
              <div id={`faq-item-${index}`} key={index}>
                <FAQItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={!!openItems[index]}
                  toggleOpen={() => toggleItem(index)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}