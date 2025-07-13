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
import { useState, useEffect } from "react"

interface UserNavProps {
  isOwner?: boolean
}

export function UserNav({ isOwner = false }: UserNavProps) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        // In a real app, this would be an API call to get the current user
        // For example: const response = await fetch('/api/user/me')

        // Simulating a fetch response for demonstration
        const userData = {
          name: isOwner ? "Sarah Johnson" : "Michael Chen",
          email: isOwner ? "sarah.johnson@example.com" : "michael.chen@example.com",
        }

        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      }
    }

    fetchUserData()
  }, [isOwner])

  const handleLogout = () => {
    // In a real app, you would call your auth service's signOut method
    // For example: await supabase.auth.signOut() or auth.signOut()

    // Then redirect to login page
    router.push("/auth")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={isOwner ? "Admin" : "User"} />
            <AvatarFallback>{isOwner ? "AD" : "JD"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {isOwner ? "Admin: " : ""}
              {user?.name || (isOwner ? "Admin User" : "John Doe")}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || (isOwner ? "admin@example.com" : "john@example.com")}
            </p>
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
              href={isOwner ? "/owner" : "/dashboard"}
              className="flex items-center cursor-pointer w-full"
              onClick={(e) => {
                // Prevent default only if you want to do something special
                // e.preventDefault();
                // Use router for programmatic navigation if needed
                // router.push(isOwner ? "/owner" : "/dashboard");
                console.log("Navigating to dashboard...")
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={isOwner ? "/owner/settings" : "/dashboard/settings"}
              className="flex items-center cursor-pointer"
            >
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

