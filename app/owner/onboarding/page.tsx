import { CompanyOnboardingForm } from "@/components/owner/company-onboarding-form"

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Company Onboarding</h2>
      <p className="text-muted-foreground max-w-2xl">
        Add a new company to the platform. Make sure you have all company details and the signed contract ready before
        proceeding.
      </p>

      <CompanyOnboardingForm />
    </div>
  )
}
