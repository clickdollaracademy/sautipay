import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sauti Pay",
  description: "Comprehensive payment solutions for your business",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-[#FAFAFA]")}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-semibold hover:text-primary transition-colors duration-200"
                title="Go to Sauti Pay Homepage"
              >
                Sauti Pay
              </Link>
              <div className="flex items-center space-x-8">
                <div className="hidden md:flex space-x-8">
                  <Link
                    href="/services"
                    prefetch={true}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    Services
                  </Link>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Pricing
                  </Link>
                  <Link href="/refund" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Refund
                  </Link>
                  <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    FAQ
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    Contact
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/register"
                    className="text-[#002B5B] hover:text-[#0056b3] font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="bg-[#002B5B] hover:bg-[#0056b3] text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}

