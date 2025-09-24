import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">What is Sauti Travels?</h3>
          <p className="text-gray-700">
            Sauti Travels is a comprehensive financial platform that enables businesses to process payments, manage
            settlements, handle commissions, and process refunds all in one place.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">How do I get started with Sauti Travels?</h3>
          <p className="text-gray-700">
            Getting started is easy. Simply contact our sales team through the contact page, and we'll guide you through
            the onboarding process. We'll help set up your account, integrate our payment solutions, and provide
            training for your team.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">What payment methods do you support?</h3>
          <p className="text-gray-700">
            We support a wide range of payment methods including credit/debit cards (Visa, Mastercard), mobile money
            services (MTN Mobile Money, Airtel Money), bank transfers, and more. Our platform is designed to accommodate
            the payment preferences of your customers.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">How are settlements processed?</h3>
          <p className="text-gray-700">
            Settlements are processed on a regular schedule (daily, weekly, or monthly) based on your business needs.
            Funds are transferred directly to your designated bank account after deducting any applicable fees.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">How do I handle refunds?</h3>
          <p className="text-gray-700">
            Refunds can be processed directly through your dashboard. Simply locate the transaction, click on the refund
            option, and follow the prompts. Refunds are typically processed within 3-5 business days.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Is Sauti Travels secure?</h3>
          <p className="text-gray-700">
            Yes, security is our top priority. We use industry-standard encryption, comply with PCI DSS requirements,
            and implement multiple layers of security to protect your data and transactions.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">What fees does Sauti Travels charge?</h3>
          <p className="text-gray-700">
            Our fee structure is transparent and competitive. We charge a small percentage per transaction, with no
            hidden fees. Please visit our pricing page or contact our sales team for detailed information about our
            pricing plans.
          </p>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">How can I get support?</h3>
          <p className="text-gray-700">
            We offer 24/7 customer support through multiple channels. You can reach us via email, phone, or live chat.
            Our dedicated support team is always ready to assist you with any questions or issues.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-700 mb-4">Still have questions? We're here to help.</p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
