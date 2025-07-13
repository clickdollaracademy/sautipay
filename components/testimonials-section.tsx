"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#e6f0fa] dark:bg-[#0a1a2a]" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#003366] dark:text-white">What Our Clients Say</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by travel agencies, insurance companies, and financial institutions around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  name,
  role,
  company,
  image,
  rating,
  quote,
}: {
  name: string
  role: string
  company: string
  image: string
  rating: number
  quote: string
}) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col bg-white dark:bg-gray-900">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="mb-4">
          <Quote className="h-8 w-8 text-[#003366]/20 dark:text-blue-500/20" />
        </div>

        <p className="text-gray-700 dark:text-gray-300 flex-grow mb-6">{quote}</p>

        <div className="flex items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-[#003366] text-white">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-[#003366] dark:text-blue-300">{name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {role}, {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Finance Director",
    company: "Global Travel Agency",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "The settlement tracking and commission management has transformed our operations. We've reduced processing time by 70% and our agents love the transparency.",
  },
  {
    name: "Michael Chen",
    role: "CFO",
    company: "Horizon Insurance",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    quote:
      "The reporting capabilities are exceptional. We can now generate detailed financial reports across all our branches in minutes instead of days. The ROI has been tremendous.",
  },
  {
    name: "Emily Rodriguez",
    role: "Travel Operations Manager",
    company: "Corporate Travel Solutions",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4,
    quote:
      "Customer support has been outstanding. Any time we've had questions, the team responds quickly. The refund processing feature alone has saved us countless hours of manual work.",
  },
]

