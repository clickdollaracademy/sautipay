import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="w-64 hidden md:block">
        <AdminSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="container py-6">{children}</div>
      </div>
    </div>
  )
}

