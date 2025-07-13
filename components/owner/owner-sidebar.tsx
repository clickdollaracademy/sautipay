"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CreditCard,
  FileSpreadsheet,
  RefreshCcw,
  DollarSign,
  Building,
  Users,
  Settings,
  AlertCircle,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Simplified interface without count
interface SectionData {
  loading: boolean
  error: boolean
}

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/owner",
    icon: LayoutDashboard,
    prefetch: true,
    priority: true,
  },
  {
    title: "Settlements",
    href: "/owner/settlements",
    icon: CreditCard,
    prefetch: true,
  },
  {
    title: "Commissions",
    href: "/owner/commissions",
    icon: DollarSign,
    prefetch: true,
    priority: true,
  },
  {
    title: "Refunds",
    href: "/owner/refunds",
    icon: RefreshCcw,
  },
  {
    title: "Reports",
    href: "/owner/reports",
    icon: FileSpreadsheet,
  },
  {
    title: "Sauti Bag",
    href: "/owner/accounts",
    icon: Users,
    dataKey: "accounts",
  },
  {
    title: "All Companies",
    href: "/owner/companies",
    icon: Building,
  },
  {
    title: "Company Management",
    href: "/owner/companies/management",
    icon: Settings,
    dataKey: "companyManagement",
  },
  {
    title: "Settings",
    href: "/owner/settings",
    icon: Settings,
  },
]

export function OwnerSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [sectionData, setSectionData] = useState<Record<string, SectionData>>({
    accounts: { loading: false, error: false },
    companyManagement: { loading: false, error: false },
  })

  // Preload commissions page data to prevent lag
  useEffect(() => {
    // Preload commissions data in the background
    const preloadCommissionsData = async () => {
      try {
        // This would be a real API call in production
        // For now, we're just simulating the preloading
        const controller = new AbortController()
        const signal = controller.signal

        // Simulate fetching commissions data in the background
        fetch("/api/commissions/preload", { signal }).catch(() => {
          // Ignore errors in preloading
        })

        return () => {
          // Clean up if component unmounts
          controller.abort()
        }
      } catch (error) {
        // Silent fail for preloading
      }
    }

    preloadCommissionsData()
  }, [])

  // Simplified fetch function without count data
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        // Update accounts data - only loading and error states
        setSectionData((prev) => ({
          ...prev,
          accounts: { loading: true, error: false },
        }))

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Update with "fetched" data - no count
        setSectionData((prev) => ({
          ...prev,
          accounts: { loading: false, error: false },
        }))

        // Update company management data - only loading and error states
        setSectionData((prev) => ({
          ...prev,
          companyManagement: { loading: true, error: false },
        }))

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Update with "fetched" data - no count
        setSectionData((prev) => ({
          ...prev,
          companyManagement: { loading: false, error: false },
        }))
      } catch (error) {
        console.error("Error fetching section data:", error)
        toast({
          title: "Error loading sidebar data",
          description: "Please refresh the page to try again.",
          variant: "destructive",
        })

        // Update error states
        setSectionData((prev) => ({
          ...prev,
          accounts: { loading: false, error: true },
          companyManagement: { loading: false, error: true },
        }))
      }
    }

    fetchSectionData()
  }, [])

  return (
    <nav className="w-64 min-h-screen border-r bg-background px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Building className="h-6 w-6" />
        <span className="font-bold text-xl">Admin Dashboard</span>
      </div>
      <div className="space-y-2">
        {sidebarNavItems.map((item) => {
          // Get data for this section if available
          const data = item.dataKey ? sectionData[item.dataKey] : null
          const isLoading = data?.loading || false
          const hasError = data?.error || false

          // Special handling for commissions tab to prevent lag
          const isCommissions = item.href === "/owner/commissions"

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={item.prefetch}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                hasError && "border-l-2 border-red-500",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <div className="flex items-center gap-2">
                <item.icon className={cn("h-4 w-4", isLoading && "animate-pulse")} />
                {item.title}
                {hasError && <AlertCircle className="h-3 w-3 text-red-500 ml-1" />}
              </div>
              {/* Count badge removed */}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

