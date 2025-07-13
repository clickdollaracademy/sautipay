"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const SECTIONS = [
  "Transactions",
  "Settlement Amount",
  "Refund",
  "Commission",
  "Receipting",
  "Brokers/Agents",
  "Settings",
]

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function MainNav({ className, activeSection, setActiveSection, ...props }: MainNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Button variant="ghost" className="lg:hidden" size="icon" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col space-y-2">
              {SECTIONS.map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection(section)
                    setOpen(false)
                  }}
                  className="justify-start"
                >
                  {section}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <div className="hidden lg:flex lg:space-x-2">
        {SECTIONS.map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? "default" : "ghost"}
            onClick={() => setActiveSection(section)}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {section}
          </Button>
        ))}
      </div>
    </nav>
  )
}

