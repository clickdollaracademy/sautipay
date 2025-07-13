"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, DollarSign, LayoutDashboard, RefreshCcw, FileText, Users, Building2, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Settlements",
    href: "/admin/settlements",
    icon: CreditCard,
  },
  {
    title: "Commissions",
    href: "/admin/commissions",
    icon: DollarSign,
  },
  {
    title: "Refunds",
    href: "/admin/refunds",
    icon: RefreshCcw,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Sauti Bag",
    href: "/admin/sauti-bag",
    icon: Users,
  },
  {
    title: "All Companies",
    href: "/admin/companies",
    icon: Building2,
  },
  {
    title: "Company Management",
    href: "/admin/companies/management",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 text-white">
      <div className="flex h-14 items-center border-b border-slate-800 px-4">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-800",
                  isActive ? "bg-slate-800 text-white" : "text-slate-400",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

