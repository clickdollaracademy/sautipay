"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface TabNavigationProps {
  items: {
    title: string
    href: string
  }[]
}

export function TabNavigation({ items }: TabNavigationProps) {
  const pathname = usePathname()

  // Add a default empty array if items is undefined
  const tabItems = items || []

  return (
    <nav className="flex space-x-4 border-b">
      {tabItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "border-b-2 border-primary text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
