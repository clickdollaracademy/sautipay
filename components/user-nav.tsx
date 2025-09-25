"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Settings, User, LogOut, Building, UserPlus, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect, useMemo, useCallback } from "react"

interface UserNavProps {
  isOwner?: boolean
}

const getUserData = (isOwner: boolean) => ({
  name: isOwner ? "Sarah Johnson" : "Michael Chen",
  email: isOwner ? "sarah.johnson@example.com" : "michael.chen@example.com",
})

export function UserNav({ isOwner = false }: UserNavProps) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const userData = useMemo(() => getUserData(isOwner), [isOwner])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In production, this would be a real API call
        // For demo, set data immediately to avoid loading states
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        setUser(userData)
      }
    }

    fetchUserData()
  }, [userData])

  const handleLogout = useCallback(() => {
    // In a real app, you would call your auth service's signOut method
    router.push("/auth")
  }, [router])

  const handleDashboardClick = useCallback(() => {
    console.log("Navigating to dashboard...")
  }, [])

  const avatarProps = useMemo(
    () => ({
      src: "/placeholder.svg?height=32&width=32",
      alt: isOwner ? "Admin" : "User",
      fallback: isOwner ? "AD" : "JD",
    }),
    [isOwner],
  )

  const displayData = useMemo(
    () => ({
      name: user?.name || (isOwner ? "Admin User" : "John Doe"),
      email: user?.email || (isOwner ? "admin@example.com" : "john@example.com"),
      dashboardPath: isOwner ? "/owner" : "/dashboard",
      settingsPath: isOwner ? "/owner/settings" : "/dashboard/settings",
    }),
    [user, isOwner],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarProps.src || "/placeholder.svg"} alt={avatarProps.alt} />
            <AvatarFallback>{avatarProps.fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {isOwner ? "Admin: " : ""}
              {displayData.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{displayData.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center cursor-pointer">
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
              <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={displayData.dashboardPath}
              className="flex items-center cursor-pointer w-full"
              onClick={handleDashboardClick}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={displayData.settingsPath} className="flex items-center cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {isOwner && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/owner/companies" className="flex items-center cursor-pointer">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Manage Companies</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/owner/users" className="flex items-center cursor-pointer">
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Manage Users</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/owner/reports" className="flex items-center cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Reports</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
