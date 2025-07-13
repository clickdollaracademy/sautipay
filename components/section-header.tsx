"use client"

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  isActive: boolean
  onClick: () => void
}

export function SectionHeader({ title, isActive, onClick }: SectionHeaderProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200",
        isActive ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
      )}
    >
      {title}
    </button>
  )
}

