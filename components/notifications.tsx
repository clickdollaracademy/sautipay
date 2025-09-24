"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
            variant="destructive"
          >
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
          <div className="text-sm font-medium">New refund request</div>
          <div className="text-xs text-muted-foreground">Alice Johnson requested a refund of $233.00</div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
          <div className="text-sm font-medium">Commission payment pending</div>
          <div className="text-xs text-muted-foreground">John Smith has 45 transactions ready for processing</div>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
          <div className="text-sm font-medium">Settlement due</div>
          <div className="text-xs text-muted-foreground">Global Services settlement of $3,123.45 is due</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center text-primary text-sm w-full">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
