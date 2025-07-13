import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#003366] dark:bg-[#001830] text-white relative overflow-hidden">
      {/* Subtle background pattern - very lightweight SVG */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Revolutionizing Travel Finance Management
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4">
              Streamline your travel insurance, refunds, and commissions with Sauti Pay. Experience the power of
              efficient, effective, and everywhere accessible financial solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#services">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white transition-all duration-200">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature highlights - lightweight badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Fast Processing", "Secure Payments", "Real-time Tracking"].map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-blue-800/50 rounded-full text-sm font-medium backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

