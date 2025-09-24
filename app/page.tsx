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
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                  Protect Your Journey with Comprehensive Travel Insurance
                </h1>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                  Get protected against medical emergencies, trip cancellations, baggage loss, and more with our
                  easy-to-use booking system. Instant coverage for your upcoming trip.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Link href="/book-travel-policy">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Book Travel Policy
                    </Button>
                  </Link>
                  <Link href="/claims">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white/10"
                    >
                      File a Claim
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#002B5B]">Comprehensive Travel Insurance Coverage</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Travel with confidence knowing you're protected against unexpected events during your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Feature 1 - Medical Coverage */}
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Medical Coverage</h3>
                <p className="text-gray-600 mb-2">Up to $100,000</p>
                <p className="text-sm text-gray-500">
                  Emergency medical expenses, hospital stays, and medical evacuation coverage worldwide.
                </p>
              </div>

              {/* Feature 2 - Trip Cancellation */}
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Trip Cancellation</h3>
                <p className="text-gray-600 mb-2">100% Coverage</p>
                <p className="text-sm text-gray-500">
                  Full reimbursement for non-refundable trip costs due to covered reasons.
                </p>
              </div>

              {/* Feature 3 - Baggage Protection */}
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Baggage Protection</h3>
                <p className="text-gray-600 mb-2">Up to $2,500</p>
                <p className="text-sm text-gray-500">
                  Coverage for lost, stolen, or damaged luggage and personal belongings.
                </p>
              </div>

              {/* Feature 4 - Worldwide Coverage */}
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Worldwide Coverage</h3>
                <p className="text-gray-600 mb-2">24/7 Support</p>
                <p className="text-sm text-gray-500">
                  Global coverage with round-the-clock emergency assistance wherever you travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-blue-50 text-gray-800" id="testimonials">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3 text-[#002B5B]">What Our Travelers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Hear from travelers who have experienced peace of mind with our comprehensive travel insurance coverage.
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
                    <p className="text-xs text-gray-500">Business Traveler</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  "When my flight was cancelled due to weather, the trip cancellation coverage saved me thousands. The
                  claim process was smooth and I was reimbursed quickly."
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
                    <p className="text-xs text-gray-500">Adventure Traveler</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  "I had a medical emergency while hiking in Nepal. The 24/7 support team arranged medical evacuation
                  and covered all expenses. Truly lifesaving coverage!"
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
                    <p className="text-xs text-gray-500">Family Traveler</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug">
                  "Our luggage was lost for 3 days during our family vacation. The baggage protection coverage helped us
                  buy essentials and we were fully reimbursed."
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
              <p className="text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about travel insurance coverage.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* FAQ Item 1 */}
              <div className="mb-6 border-b pb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">What does travel insurance cover?</h3>
                <p className="text-gray-600">
                  Our comprehensive travel insurance covers medical emergencies, trip cancellations, baggage loss,
                  travel delays, and emergency evacuation. Coverage varies by plan selected.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="mb-6 border-b pb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">When should I purchase travel insurance?</h3>
                <p className="text-gray-600">
                  We recommend purchasing travel insurance as soon as you book your trip. This ensures maximum coverage
                  including pre-existing medical conditions and cancel-for-any-reason benefits.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="mb-6 border-b pb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">How do I file a claim?</h3>
                <p className="text-gray-600">
                  Filing a claim is easy through our online portal. Simply provide your policy details, incident
                  information, and supporting documents. Our team will review and process your claim promptly.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#002B5B]">Is coverage available worldwide?</h3>
                <p className="text-gray-600">
                  Yes, our travel insurance provides worldwide coverage with 24/7 emergency assistance. Whether you're
                  traveling domestically or internationally, you're protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#002B5B] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to protect your next adventure?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of travelers who trust us to protect their journeys. Get instant coverage and travel with
              confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-travel-policy">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Get Travel Insurance Now
                </Button>
              </Link>
              <Link href="/claims">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  File a Claim
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
                  Protecting travelers worldwide with comprehensive travel insurance coverage and 24/7 support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Coverage</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#features" className="text-gray-400 hover:text-white">
                      Medical Coverage
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="text-gray-400 hover:text-white">
                      Trip Cancellation
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="text-gray-400 hover:text-white">
                      Baggage Protection
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="text-gray-400 hover:text-white">
                      Emergency Assistance
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/claims" className="text-gray-400 hover:text-white">
                      File a Claim
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Track Claim
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Emergency Hotline
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Help Center
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
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonials" className="text-gray-400 hover:text-white">
                      Reviews
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
