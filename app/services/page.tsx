import { CreditCard, RefreshCcw, DollarSign, Shield, BarChart, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-700">
          Sauti Pay offers a comprehensive suite of financial services designed to streamline your payment processes,
          manage settlements efficiently, and provide complete visibility into your financial operations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Payment Processing */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Processing</h3>
          <p className="text-gray-700 mb-4">
            Accept payments through multiple channels including credit cards, mobile money, and bank transfers. Our
            platform ensures secure and seamless transactions for your customers.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
              <span className="text-gray-700">Multiple payment methods</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
              <span className="text-gray-700">Real-time transaction monitoring</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
              <span className="text-gray-700">Fraud detection and prevention</span>
            </li>
          </ul>
        </div>

        {/* Settlement Management */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <BarChart className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Settlement Management</h3>
          <p className="text-gray-700 mb-4">
            Automate your settlement processes with customizable schedules. Receive funds directly to your bank account
            with detailed reconciliation reports.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></span>
              <span className="text-gray-700">Flexible settlement schedules</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></span>
              <span className="text-gray-700">Automated reconciliation</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 mr-2"></span>
              <span className="text-gray-700">Detailed settlement reports</span>
            </li>
          </ul>
        </div>

        {/* Commission Management */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Commission Management</h3>
          <p className="text-gray-700 mb-4">
            Manage agent and broker commissions with our automated system. Set commission rates, track transactions, and
            process payments efficiently.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
              <span className="text-gray-700">Customizable commission structures</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
              <span className="text-gray-700">Automated commission calculations</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2"></span>
              <span className="text-gray-700">Transparent payment tracking</span>
            </li>
          </ul>
        </div>

        {/* Refund Processing */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <RefreshCcw className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Refund Processing</h3>
          <p className="text-gray-700 mb-4">
            Streamline refund requests with our easy-to-use system. Process full or partial refunds quickly and maintain
            complete records of all transactions.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mr-2"></span>
              <span className="text-gray-700">Simple refund workflow</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mr-2"></span>
              <span className="text-gray-700">Full and partial refund options</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mr-2"></span>
              <span className="text-gray-700">Comprehensive refund history</span>
            </li>
          </ul>
        </div>

        {/* Security & Compliance */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
          <p className="text-gray-700 mb-4">
            Our platform adheres to the highest security standards with PCI DSS compliance, data encryption, and fraud
            prevention measures to protect your business and customers.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></span>
              <span className="text-gray-700">PCI DSS compliance</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></span>
              <span className="text-gray-700">End-to-end encryption</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></span>
              <span className="text-gray-700">Advanced fraud detection</span>
            </li>
          </ul>
        </div>

        {/* Reporting & Analytics */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Reporting & Analytics</h3>
          <p className="text-gray-700 mb-4">
            Gain valuable insights into your business with our comprehensive reporting tools. Track transactions,
            analyze trends, and make data-driven decisions.
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></span>
              <span className="text-gray-700">Customizable dashboards</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></span>
              <span className="text-gray-700">Exportable reports</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mr-2"></span>
              <span className="text-gray-700">Real-time analytics</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to streamline your payment processes?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join thousands of businesses that trust Sauti Pay for their financial operations. Contact us today to learn
          how we can help your business grow.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Contact Sales</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

