"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-28 bg-gradient-to-r from-[#002B5B] to-[#0056b3] text-white relative overflow-hidden">
          {/* Simplified animated circles */}
          <div className="absolute top-20 left-[15%] w-20 h-20 bg-orange-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 right-[20%] w-16 h-16 bg-blue-300 rounded-full opacity-50 animate-bounce"></div>
          <div className="absolute top-1/2 right-[30%] w-12 h-12 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-1/4 left-[30%] w-14 h-14 bg-green-400 rounded-full opacity-50 animate-bounce"></div>
          <div className="absolute bottom-1/3 left-[10%] w-10 h-10 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Simplify Your Travel Insurance Management</h1>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                  Streamline Your Travel Insurance Operations with Our Comprehensive Platform Designed for Insurance
                  Companies & Travel Insurance Agencies
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#002B5B]">
                Powerful Features for Travel Insurance Agencies
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform offers everything you need to manage travel insurance efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Policy Management</h3>
                <p className="text-gray-600">
                  Easily manage all your travel insurance policies in one place with our intuitive dashboard.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Commission Tracking</h3>
                <p className="text-gray-600">
                  Track your commissions in real-time and ensure you get paid for every policy sold.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Automated Settlements</h3>
                <p className="text-gray-600">
                  Automate your settlement process and reduce manual work with our powerful settlement engine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-blue-50 text-gray-800" id="testimonials">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3 text-[#002B5B]">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Hear from Travel Insurance Agencies that have transformed their insurance operations with Sauti Pay.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Testimonial 1 */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full mr-3 flex items-center justify-center text-orange-600 font-bold text-sm">
                    SJ
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#002B5B]">Sarah Johnson</h4>
                    <p className="text-xs text-gray-500">CEO, TravelRight Insurance Agency</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  "Sauti Pay has revolutionized how we handle travel insurance. Our processing time has been reduced by
                  70% and our commission tracking is now flawless."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full mr-3 flex items-center justify-center text-green-600 font-bold text-sm">
                    MC
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#002B5B]">Michael Chen</h4>
                    <p className="text-xs text-gray-500">Operations Manager, Global Travel Insurance</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  "The automated settlement feature alone has saved us countless hours of manual work. The platform is
                  intuitive and our agents love using it."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full mr-3 flex items-center justify-center text-purple-600 font-bold text-sm">
                    LO
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#002B5B]">Lisa Okoye</h4>
                    <p className="text-xs text-gray-500">Director, Sunshine Travel Insurance</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  "Since implementing Sauti Pay, our refund processing has become seamless. Our customers are happier
                  and our staff can focus on selling rather than paperwork."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#002B5B]">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">Find answers to common questions about our platform.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* FAQ Item 1 */}
              <div className="mb-6 border-b pb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">How does the commission tracking work?</h3>
                <p className="text-gray-600">
                  Our platform automatically calculates commissions based on your agreements with insurance providers.
                  You can view real-time reports and track pending payments.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="mb-6 border-b pb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">
                  Can I customize the platform for my agency?
                </h3>
                <p className="text-gray-600">
                  Yes, Sauti Pay offers customization options to match your branding and workflow requirements. Our
                  enterprise plan includes advanced customization features.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="mb-6 border-b pb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">How secure is my data on Sauti Pay?</h3>
                <p className="text-gray-600">
                  We implement bank-level security measures including encryption, secure authentication, and regular
                  security audits to ensure your data is always protected.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">What kind of support do you offer?</h3>
                <p className="text-gray-600">
                  We provide email support for all plans, with priority support and dedicated account managers available
                  for Professional and Enterprise plans respectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#002B5B] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your travel insurance operations?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of Travel Insurance Agencies already using Sauti Pay to streamline their insurance
              processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Sauti Pay</h3>
                <p className="text-gray-400">
                  Simplifying travel insurance management for Travel Insurance Agencies worldwide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#features" className="text-gray-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonials" className="text-gray-400 hover:text-white">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className="text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Sauti Pay. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

