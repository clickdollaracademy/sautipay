import { OwnerSidebar } from "@/components/owner/owner-sidebar"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Notifications } from "@/components/notifications"
import type React from "react"
import { Building } from "lucide-react"
import Link from "next/link"

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <OwnerSidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Building className="h-5 w-5" />
                <span>Financial Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Notifications />
              <UserNav isOwner={true} />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

