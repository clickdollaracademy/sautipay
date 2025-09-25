"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, Settings, Users, RefreshCcw, Receipt, PieChart, FileText } from "lucide-react"

const navItems = [
  {
    title: "Transactions",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Settlement Amount",
    href: "/dashboard/settlement",
    icon: CreditCard,
  },
  {
    title: "Refund",
    href: "/dashboard/refund",
    icon: RefreshCcw,
  },
  {
    title: "Commission",
    href: "/dashboard/commission",
    icon: PieChart,
  },
  {
    title: "Claims",
    href: "/dashboard/claims",
    icon: FileText,
  },
  {
    title: "Receipting",
    href: "/dashboard/receipting",
    icon: Receipt,
  },
  {
    title: "Brokers/Agents",
    href: "/dashboard/brokers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen border-r bg-background shrink-0">
      <div className="p-4 border-b">
        <h2 className="font-bold text-xl">Dashboard</h2>
      </div>
      <div className="py-4">
        {navItems.map((item) => {
          // Check if the current path starts with the item's href
          // This handles both exact matches and nested routes
          const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 mx-2 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
