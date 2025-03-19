import type React from "react"

interface CommitmentCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export function Commitment({ title, description, icon }: CommitmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-[#660099] text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

