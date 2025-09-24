"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, Settings, Users, RefreshCcw, Receipt, PieChart } from "lucide-react"

const sidebarNavItems = [
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

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen border-r bg-background px-4 py-8">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="font-bold text-xl">Sauti Travels</span>
      </Link>
      <div className="space-y-2">
        {sidebarNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
