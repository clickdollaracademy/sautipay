import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingSection() {
  return (
    <section className="py-16 bg-[#002B5B]" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Choose the plan that best fits your business needs. All plans include our core features with different
            levels of support and customization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Pro Plan */}
          <Card className="bg-white border-0 w-full">
            <CardHeader className="pb-0 px-8">
              <CardTitle className="text-2xl font-bold text-[#002B5B] mb-6">Pro</CardTitle>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#002B5B]">$2000</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for growing travel businesses</p>
            </CardHeader>
            <CardContent className="px-8">
              <ul className="space-y-5 mb-8">
                <Feature
                  title="Payment Processing"
                  description="Accept payments via credit cards, mobile money, and bank transfers"
                />
                <Feature
                  title="Settlement Management"
                  description="Automated transfers to insurance companies with reconciliation reports"
                />
                <Feature title="Basic Broker Management" description="Track broker/agent sales activity" />
                <Feature title="Essential Reporting" description="Transaction and settlement reports" />
                <Feature title="Digital Receipting" description="Generate and send digital receipts to customers" />
                <Feature title="Customer Support" description="Email support" />
              </ul>
              <Button className="w-full bg-[#1a56db] hover:bg-[#1e40af] text-white">Get Started</Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-white border-2 border-orange-500 relative w-full">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-base font-bold shadow-lg border-2 border-white">
                MOST POPULAR
              </span>
            </div>
            <CardHeader className="pb-0 px-8">
              <CardTitle className="text-2xl font-bold text-[#002B5B] mb-6">Enterprise</CardTitle>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#002B5B]">Custom</span>
              </div>
              <p className="text-gray-600 mb-6">For established travel organizations</p>
            </CardHeader>
            <CardContent className="px-8">
              <ul className="space-y-5 mb-8">
                <Feature title="Everything in Pro Plan plus:" description="" className="font-bold text-[#002B5B]" />
                <Feature title="Refund Processing" description="Handle full/partial refunds with complete tracking" />
                <Feature
                  title="Commission Management"
                  description="Automated calculations with customizable structures"
                />
                <Feature
                  title="Enhanced Analytics"
                  description="Advanced tracking, customizable dashboards, exportable reports"
                />
                <Feature title="Premium Support" description="Dedicated account manager for personalized assistance" />
                <Feature
                  title="Security & Compliance"
                  description="PCI DSS compliance, end-to-end encryption, advanced fraud detection"
                />
              </ul>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Feature({ title, description, className = "" }: { title: string; description?: string; className?: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
      <div>
        <span className={`font-bold text-[#002B5B] text-base ${className}`}>{title}</span>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
    </li>
  )
}

