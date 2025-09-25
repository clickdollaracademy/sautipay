import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protect Your Journey with Comprehensive Travel Insurance
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Get protected against medical emergencies, trip cancellations, baggage loss, and more with our easy-to-use
              booking system. Instant coverage for your upcoming trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-travel-policy"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Book Travel Policy
              </Link>
              <Link
                href="/claims"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                File a Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Comprehensive Travel Insurance Coverage</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Travel with confidence knowing you're protected against unexpected events during your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Medical Coverage</h3>
              <p className="text-gray-600 mb-2">Up to $100,000</p>
              <p className="text-sm text-gray-500">
                Emergency medical expenses, hospital stays, and medical evacuation coverage worldwide.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Trip Cancellation</h3>
              <p className="text-gray-600 mb-2">100% Coverage</p>
              <p className="text-sm text-gray-500">
                Full reimbursement for non-refundable trip costs due to covered reasons.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🧳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Baggage Protection</h3>
              <p className="text-gray-600 mb-2">Up to $2,500</p>
              <p className="text-sm text-gray-500">
                Coverage for lost, stolen, or damaged luggage and personal belongings.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Worldwide Coverage</h3>
              <p className="text-gray-600 mb-2">24/7 Support</p>
              <p className="text-sm text-gray-500">
                Global coverage with round-the-clock emergency assistance wherever you travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to protect your next adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of travelers who trust us to protect their journeys. Get instant coverage and travel with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-travel-policy"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Travel Insurance Now
            </Link>
            <Link
              href="/claims"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              File a Claim
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
