"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Table, BarChart3, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ExportJob {
  id: string
  name: string
  type: string
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  createdAt: string
  fileSize?: string
}

const exportFormats = [
  { value: "csv", label: "CSV", icon: Table },
  { value: "xlsx", label: "Excel", icon: FileText },
  { value: "pdf", label: "PDF Report", icon: FileText },
  { value: "json", label: "JSON", icon: BarChart3 },
]

const dataTypes = [
  { id: "policies", label: "Insurance Policies", description: "All policy data including customer info" },
  { id: "claims", label: "Claims Data", description: "Claims history and processing details" },
  { id: "settlements", label: "Settlements", description: "Settlement records and payments" },
  { id: "commissions", label: "Commissions", description: "Commission calculations and payouts" },
  { id: "customers", label: "Customer Data", description: "Customer profiles and contact information" },
  { id: "analytics", label: "Analytics Data", description: "Performance metrics and KPIs" },
]

export function DataExport() {
  const [selectedFormat, setSelectedFormat] = useState("csv")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [dateRange, setDateRange] = useState("30d")
  const [isExporting, setIsExporting] = useState(false)
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([
    {
      id: "1",
      name: "Monthly Claims Report",
      type: "PDF Report",
      status: "completed",
      progress: 100,
      createdAt: "2024-01-15T10:30:00Z",
      fileSize: "2.4 MB",
    },
    {
      id: "2",
      name: "Customer Data Export",
      type: "CSV",
      status: "processing",
      progress: 65,
      createdAt: "2024-01-15T11:15:00Z",
    },
    {
      id: "3",
      name: "Settlement Records",
      type: "Excel",
      status: "pending",
      progress: 0,
      createdAt: "2024-01-15T11:45:00Z",
    },
  ])

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  const handleExport = async () => {
    if (selectedTypes.length === 0) {
      toast({
        title: "No Data Selected",
        description: "Please select at least one data type to export.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    // Simulate export process
    const newJob: ExportJob = {
      id: Date.now().toString(),
      name: `${selectedTypes.length > 1 ? "Multi-type" : dataTypes.find((t) => t.id === selectedTypes[0])?.label} Export`,
      type: exportFormats.find((f) => f.value === selectedFormat)?.label || selectedFormat,
      status: "processing",
      progress: 0,
      createdAt: new Date().toISOString(),
    }

    setExportJobs((prev) => [newJob, ...prev])

    // Simulate progress
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        clearInterval(progressInterval)
        setExportJobs((prev) =>
          prev.map((job) =>
            job.id === newJob.id ? { ...job, status: "completed", progress: 100, fileSize: "1.8 MB" } : job,
          ),
        )
        setIsExporting(false)
        toast({
          title: "Export Completed",
          description: "Your data export is ready for download.",
        })
      } else {
        setExportJobs((prev) => prev.map((job) => (job.id === newJob.id ? { ...job, progress } : job)))
      }
    }, 500)

    setTimeout(() => {
      setIsExporting(false)
    }, 3000)
  }

  const getStatusIcon = (status: ExportJob["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: ExportJob["status"]) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Export
            </CardTitle>
            <CardDescription>Export your data in various formats for analysis and reporting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div>
              <Label className="text-base font-semibold">Export Format</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {exportFormats.map((format) => {
                  const Icon = format.icon
                  return (
                    <Button
                      key={format.value}
                      variant={selectedFormat === format.value ? "default" : "outline"}
                      onClick={() => setSelectedFormat(format.value)}
                      className="h-16 flex flex-col items-center gap-1"
                      disabled={isExporting}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{format.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Label htmlFor="dateRange" className="text-base font-semibold">
                Date Range
              </Label>
              <Select value={dateRange} onValueChange={setDateRange} disabled={isExporting}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data Type Selection */}
            <div>
              <Label className="text-base font-semibold">Data Types</Label>
              <div className="space-y-3 mt-2">
                {dataTypes.map((type) => (
                  <div key={type.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => handleTypeToggle(type.id)}
                      disabled={isExporting}
                    />
                    <div className="flex-1">
                      <Label htmlFor={type.id} className="font-medium cursor-pointer">
                        {type.label}
                      </Label>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleExport} disabled={isExporting || selectedTypes.length === 0} className="w-full">
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing Export...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Start Export
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Export History */}
        <Card>
          <CardHeader>
            <CardTitle>Export History</CardTitle>
            <CardDescription>Track your recent data exports and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exportJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(job.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{job.name}</p>
                        <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {job.type} • {new Date(job.createdAt).toLocaleDateString()}
                        {job.fileSize && ` • ${job.fileSize}`}
                      </p>
                      {job.status === "processing" && (
                        <div className="mt-2">
                          <Progress value={job.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{Math.round(job.progress)}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {job.status === "completed" && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export Templates</CardTitle>
          <CardDescription>Pre-configured exports for common reporting needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2 bg-transparent">
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Monthly Report</p>
                <p className="text-xs text-gray-500">All data, PDF format</p>
              </div>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2 bg-transparent">
              <Table className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Claims Analysis</p>
                <p className="text-xs text-gray-500">Claims data, Excel</p>
              </div>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2 bg-transparent">
              <BarChart3 className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Performance Metrics</p>
                <p className="text-xs text-gray-500">Analytics, JSON</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
