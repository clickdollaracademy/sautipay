import { LandingNav } from "@/components/landing-nav"
import { LandingHero } from "@/components/landing-hero"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      <main className="flex-grow">
        <LandingHero />
        <ServicesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <SiteFooter />
    </div>
  )
}
