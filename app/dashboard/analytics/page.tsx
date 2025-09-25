"use client"

import { AdvancedAnalytics } from "@/components/dashboard/advanced-analytics"
import { DataExport } from "@/components/dashboard/data-export"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Business Intelligence</h1>
        <p className="text-gray-600">
          Advanced analytics, insights, and data export capabilities for your insurance business.
        </p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          <TabsTrigger value="export">Data Export</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AdvancedAnalytics />
        </TabsContent>

        <TabsContent value="export">
          <DataExport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
