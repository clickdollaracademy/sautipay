"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t py-12 md:py-16 bg-[#003366] text-white">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sauti Pay</h3>
          <p className="text-sm text-gray-300 max-w-xs">
            Revolutionizing travel finance management with efficient, effective, and accessible solutions.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Get Started</h3>
          <p className="text-sm text-gray-300">Ready to transform your travel finance operations?</p>
          <div className="flex space-x-4">
            <Link href="/auth">
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white transition-all duration-200">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-300">© {new Date().getFullYear()} Sauti Pay. All rights reserved.</p>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full mt-4 md:mt-0 text-white hover:bg-blue-800"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  )
}
