import { PricingSection } from "@/components/pricing-section"
import { LandingNav } from "@/components/landing-nav"
import { SiteFooter } from "@/components/site-footer"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  )
}

