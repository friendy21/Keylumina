import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CourseCardProps {
  id: string
  title: string
  tag: string
  duration:string
  description: string
  levels: string
  schedule: string
  image: string
  showButton?: boolean
}

export function CourseCard({
  id,
  title,
  tag,
  duration,
  description,
  levels,
  schedule,
  image,
  showButton = true,
}: CourseCardProps) {
  return (
    <div className="container mx-auto px-4">

    <div>
      <div
        key={id}
        className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto transition-transform hover:scale-105 cursor-pointer h-full"
      >
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-gray-700 text-left">{duration}</p>
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-700">{levels}</p>
            
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full border border-gray-300">
              {tag}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">{description}</p>
            {/* <p className="text-xs text-gray-600">{schedule}</p> */}
          </div>

          <div className="bg-[#FBCF41] rounded-lg ">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={350}
              height={200}
              className="w-full h-auto rounded mb-4"
            />
          </div>

          {/* class schedule */}
          {/* <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Class Schedule:</p>
            <p className="text-xs text-gray-600">{schedule}</p>
          </div> */}

          {showButton && (
          <Link href={`/courses/${id}`}>
            <Button
              variant="outline"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 border-none"
            >
              Learn more
            </Button>
          </Link>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}