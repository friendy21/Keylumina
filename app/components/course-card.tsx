import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CourseCardProps {
  id: string
  title: string
  tag: string
  duration: string
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
  // Check if the tag represents a discount or special offer
  const isDiscount = tag?.includes('%') || tag?.toLowerCase().includes('off') || tag?.includes('Rp');

  return (
    <div className="h-full w-full">
      <div
        key={id}
        className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer flex flex-col w-full h-full"
      >
        <div className="p-5 flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-700 text-left">{duration}</p>
            <p className="text-sm text-gray-700">{levels}</p>
          </div>

          <div className="mb-4 flex-grow">
            <p className="text-sm font-medium text-gray-700 line-clamp-3">{description}</p>
          </div>

          {/* Image container with responsive sizing */}
          <div className="relative bg-[#FBCF41] rounded-lg w-full mb-4 overflow-hidden aspect-video">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover rounded"
              priority
            />
          </div>

          {showButton && (
            <div className="mt-auto">
              <Link href={`/courses/${id}`} className="block w-full">
                <Button
                  variant="outline"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 border-none"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
