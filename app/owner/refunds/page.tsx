"use client"

import { MetricsCards } from "@/components/metrics-cards"
import { DateRangePicker } from "@/components/date-range-picker"
import { TabNavigation } from "@/components/tab-navigation"
import { RefundRequestsTable } from "@/components/owner/refund-requests-table"

const tabs = [
  { name: "Settlements", href: "/settlements" },
  { name: "Commissions", href: "" },
  { name: "Refunds", href: "/refunds" },
  { name: "Reports", href: "/reports" },
  { name: "All Companies", href: "/companies" },
]

export default function RefundsPage() {
  return (
    <div className="space-y-6">
      <MetricsCards
        totalDue={{
          amount: "$45,231.89",
          percentage: "20.1%",
          period: "last month",
        }}
        pendingCommissions={{
          amount: "$12,234.00",
          count: 23,
        }}
        activeRefunds={{
          count: 7,
          value: "$3,123.00",
        }}
      />

      <div className="flex flex-col gap-6">
        <DateRangePicker onSearch={() => {}} onReset={() => {}} />

        <TabNavigation tabs={tabs} baseUrl="/owner" />

        <RefundRequestsTable />
      </div>
    </div>
  )
}
