import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
// import Image from "next/image"
// import { Play } from "lucide-react"
import { TutorSection } from "@/app/components/tutor-section"

export default function TutorsPage() {
  return (
    <div className="min-h-screen bg-[#fff8d9] mt-[65px]">
      <Navigation />
        <TutorSection />
      <Footer />
    </div>
  )
}

