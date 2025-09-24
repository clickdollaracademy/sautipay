import { ExchangeRatesConfig } from "@/components/settings/exchange-rates-config"
import { SectionHeader } from "@/components/section-header"

export default function OwnerSettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader heading="Platform Settings" subheading="Configure system-wide settings and preferences" />

      <div className="grid gap-6">
        <ExchangeRatesConfig />
      </div>
    </div>
  )
}
