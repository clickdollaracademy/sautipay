"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Eye, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReportType {
  id: string
  name: string
}

export function ReportsGenerator() {
  const [selectedReportType, setSelectedReportType] = useState<string>("")
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewFormat, setPreviewFormat] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const reportTypes: ReportType[] = [
    { id: "financial", name: "Financial Summary" },
    { id: "commission", name: "Commission Report" },
    { id: "settlement", name: "Settlement Transactions" },
    { id: "refund", name: "Refund Analysis" },
    { id: "company", name: "Company Performance" },
  ]

  const handlePreviewReport = (format: string) => {
    if (!selectedReportType) {
      toast({
        title: "Report type required",
        description: "Please select a report type first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setPreviewFormat(format)
      setPreviewVisible(true)
      setIsLoading(false)
    }, 500)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: `Your ${getReportName()} has been downloaded in ${previewFormat.toUpperCase()} format.`,
    })

    setPreviewVisible(false)
  }

  const closePreview = () => {
    setPreviewVisible(false)
  }

  const getReportName = () => {
    const report = reportTypes.find((r) => r.id === selectedReportType)
    return report ? report.name : "report"
  }

  // Simple preview content based on report type
  const renderPreviewContent = () => {
    switch (selectedReportType) {
      case "financial":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Financial Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$125,430.50</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,230.80</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$80,199.70</div>
                </CardContent>
              </Card>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-left py-2">Revenue</th>
                  <th className="text-left py-2">Expenses</th>
                  <th className="text-left py-2">Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">January</td>
                  <td className="py-2">$10,230.40</td>
                  <td className="py-2">$4,120.30</td>
                  <td className="py-2">$6,110.10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">February</td>
                  <td className="py-2">$12,450.80</td>
                  <td className="py-2">$5,230.40</td>
                  <td className="py-2">$7,220.40</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">March</td>
                  <td className="py-2">$15,670.30</td>
                  <td className="py-2">$6,340.50</td>
                  <td className="py-2">$9,329.80</td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      case "commission":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Commission Report</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,560.30</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Paid Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$18,340.50</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$6,219.80</div>
                </CardContent>
              </Card>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Agent</th>
                  <th className="text-left py-2">Commissions</th>
                  <th className="text-left py-2">Transactions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">John Smith</td>
                  <td className="py-2">$4,230.40</td>
                  <td className="py-2">45</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Sarah Johnson</td>
                  <td className="py-2">$3,890.70</td>
                  <td className="py-2">38</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Michael Brown</td>
                  <td className="py-2">$3,450.20</td>
                  <td className="py-2">32</td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      case "settlement":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Settlement Transactions</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Settlements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$98,670.40</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$85,430.20</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$13,240.20</div>
                </CardContent>
              </Card>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">SET-001</td>
                  <td className="py-2">$4,560.30</td>
                  <td className="py-2">Completed</td>
                  <td className="py-2">2023-03-15</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">SET-002</td>
                  <td className="py-2">$3,890.70</td>
                  <td className="py-2">Pending</td>
                  <td className="py-2">2023-03-16</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">SET-003</td>
                  <td className="py-2">$5,230.40</td>
                  <td className="py-2">Completed</td>
                  <td className="py-2">2023-03-17</td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      case "refund":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Refund Analysis</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,340.50</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$10,230.40</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,110.10</div>
                </CardContent>
              </Card>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Reason</th>
                  <th className="text-left py-2">Count</th>
                  <th className="text-left py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Customer Dissatisfaction</td>
                  <td className="py-2">15</td>
                  <td className="py-2">$5,670.30</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Service Not Rendered</td>
                  <td className="py-2">8</td>
                  <td className="py-2">$3,450.20</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Duplicate Payment</td>
                  <td className="py-2">5</td>
                  <td className="py-2">$3,220.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      case "company":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">10</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inactive</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                </CardContent>
              </Card>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Revenue</th>
                  <th className="text-left py-2">Transactions</th>
                  <th className="text-left py-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">ABC Corp</td>
                  <td className="py-2">$34,560.30</td>
                  <td className="py-2">145</td>
                  <td className="py-2">+12%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">XYZ Ltd</td>
                  <td className="py-2">$28,970.50</td>
                  <td className="py-2">120</td>
                  <td className="py-2">+8%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">123 Industries</td>
                  <td className="py-2">$35,139.60</td>
                  <td className="py-2">150</td>
                  <td className="py-2">+15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      default:
        return (
          <div className="p-4 bg-muted rounded-md">
            <p>Please select a report type to preview content.</p>
          </div>
        )
    }
  }

  return (
    <div className="rounded-md border">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Generate Reports</h2>
        <p className="text-sm text-muted-foreground">
          Create, preview, and download reports for various aspects of your business.
        </p>
      </div>

      <div className="p-6 pt-0 space-y-6">
        <div className="max-w-md">
          <Select value={selectedReportType} onValueChange={setSelectedReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={() => handlePreviewReport("excel")} disabled={isLoading}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Excel
          </Button>
          <Button variant="outline" onClick={() => handlePreviewReport("pdf")} disabled={isLoading}>
            <Eye className="h-4 w-4 mr-2" />
            Preview PDF
          </Button>
          <Button variant="outline" onClick={() => handlePreviewReport("word")} disabled={isLoading}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Word
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {previewVisible && (
          <div className="mt-6 border rounded-md">
            <div className="p-4 border-b bg-muted flex justify-between items-center">
              <h3 className="font-medium">
                {getReportName()} ({previewFormat.toUpperCase()})
              </h3>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">{renderPreviewContent()}</div>
            <div className="p-4 border-t bg-muted flex justify-end gap-2">
              <Button variant="outline" onClick={closePreview}>
                Cancel
              </Button>
              <Button onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
