import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sauti Travels - Travel Insurance Solutions",
  description: "Comprehensive travel insurance solutions for your peace of mind",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
              <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-semibold text-blue-900 hover:text-blue-700 transition-colors">
                  Sauti Travels
                </Link>
                <div className="flex items-center space-x-8">
                  <div className="hidden md:flex space-x-8">
                    <Link href="/book-travel-policy" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Buy Insurance
                    </Link>
                    <Link href="/claims" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Claims
                    </Link>
                    <Link href="/refund" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Refund
                    </Link>
                    <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                      FAQ
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Contact
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/auth/register"
                      className="text-blue-900 hover:text-blue-700 font-medium transition-colors"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/login"
                      className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </nav>
            </header>
            <main className="flex-1">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
