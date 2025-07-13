"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "@/components/date-range-picker"
import { DollarSign, Eye, CheckCircle, Download, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface CommissionEntry {
  id: string
  brokerName: string
  brokerCode: string
  totalSales: number
  commissionRate: number
  commissionAmount: number
  status: "Pending" | "Paid"
  period: string
  netPremium: number
  currency: string
  date: string
}

export default function CommissionsPage() {
  const [commissionData, setCommissionData] = useState<CommissionEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    // Simulate API call to fetch commission data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data
        const data: CommissionEntry[] = [
          {
            id: "COM-001",
            brokerName: "Global Insurance Brokers",
            brokerCode: "GIB-2023",
            totalSales: 45000,
            commissionRate: 15,
            commissionAmount: 6750,
            status: "Pending",
            period: "Jan 2023",
            netPremium: 42000,
            currency: "USD",
            date: "2023-01-15",
          },
          {
            id: "COM-002",
            brokerName: "Premier Financial Services",
            brokerCode: "PFS-2023",
            totalSales: 32000,
            commissionRate: 12,
            commissionAmount: 3840,
            status: "Paid",
            period: "Jan 2023",
            netPremium: 30000,
            currency: "USD",
            date: "2023-01-20",
          },
          {
            id: "COM-003",
            brokerName: "Alliance Insurance Group",
            brokerCode: "AIG-2023",
            totalSales: 28500,
            commissionRate: 10,
            commissionAmount: 2850,
            status: "Pending",
            period: "Feb 2023",
            netPremium: 26000,
            currency: "USD",
            date: "2023-02-05",
          },
          {
            id: "COM-004",
            brokerName: "Secure Insurance Solutions",
            brokerCode: "SIS-2023",
            totalSales: 52000,
            commissionRate: 18,
            commissionAmount: 9360,
            status: "Paid",
            period: "Feb 2023",
            netPremium: 48000,
            currency: "USD",
            date: "2023-02-12",
          },
          {
            id: "COM-005",
            brokerName: "Trustworthy Brokers Ltd",
            brokerCode: "TBL-2023",
            totalSales: 38000,
            commissionRate: 15,
            commissionAmount: 5700,
            status: "Pending",
            period: "Mar 2023",
            netPremium: 35000,
            currency: "USD",
            date: "2023-03-08",
          },
          {
            id: "COM-006",
            brokerName: "Elite Insurance Partners",
            brokerCode: "EIP-2023",
            totalSales: 65000,
            commissionRate: 20,
            commissionAmount: 13000,
            status: "Paid",
            period: "Mar 2023",
            netPremium: 60000,
            currency: "USD",
            date: "2023-03-15",
          },
          {
            id: "COM-007",
            brokerName: "Global Insurance Brokers",
            brokerCode: "GIB-2023",
            totalSales: 42000,
            commissionRate: 15,
            commissionAmount: 6300,
            status: "Pending",
            period: "Apr 2023",
            netPremium: 39000,
            currency: "USD",
            date: "2023-04-10",
          },
          {
            id: "COM-008",
            brokerName: "Premier Financial Services",
            brokerCode: "PFS-2023",
            totalSales: 30000,
            commissionRate: 12,
            commissionAmount: 3600,
            status: "Paid",
            period: "Apr 2023",
            netPremium: 28000,
            currency: "USD",
            date: "2023-04-18",
          },
          {
            id: "COM-009",
            brokerName: "Alliance Insurance Group",
            brokerCode: "AIG-2023",
            totalSales: 25000,
            commissionRate: 10,
            commissionAmount: 2500,
            status: "Pending",
            period: "May 2023",
            netPremium: 23000,
            currency: "USD",
            date: "2023-05-05",
          },
          {
            id: "COM-010",
            brokerName: "Secure Insurance Solutions",
            brokerCode: "SIS-2023",
            totalSales: 48000,
            commissionRate: 18,
            commissionAmount: 8640,
            status: "Paid",
            period: "May 2023",
            netPremium: 45000,
            currency: "USD",
            date: "2023-05-12",
          },
          {
            id: "COM-011",
            brokerName: "Trustworthy Brokers Ltd",
            brokerCode: "TBL-2023",
            totalSales: 35000,
            commissionRate: 15,
            commissionAmount: 5250,
            status: "Pending",
            period: "Jun 2023",
            netPremium: 32000,
            currency: "USD",
            date: "2023-06-08",
          },
          {
            id: "COM-012",
            brokerName: "Elite Insurance Partners",
            brokerCode: "EIP-2023",
            totalSales: 60000,
            commissionRate: 20,
            commissionAmount: 12000,
            status: "Paid",
            period: "Jun 2023",
            netPremium: 55000,
            currency: "USD",
            date: "2023-06-15",
          },
        ]

        setCommissionData(data)
      } catch (error) {
        console.error("Error fetching commission data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // For totals we'd typically get these from a separate API endpoint
  // but for demo we can calculate from our data
  const getTotalCommissionsPaid = () => {
    return commissionData.reduce((sum, entry) => sum + (entry.status === "Paid" ? entry.commissionAmount || 0 : 0), 0)
  }

  const getTotalCommissionsPending = () => {
    return commissionData.reduce(
      (sum, entry) => sum + (entry.status === "Pending" ? entry.commissionAmount || 0 : 0),
      0,
    )
  }

  const getTotalCommissionsDue = () => {
    return getTotalCommissionsPaid() + getTotalCommissionsPending()
  }

  // Handle mark as paid action
  const handleMarkAsPaid = async (id: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setCommissionData((prevData) => prevData.map((entry) => (entry.id === id ? { ...entry, status: "Paid" } : entry)))
    } catch (error) {
      console.error("Error marking commission as paid:", error)
    }
  }

  // Filter and search functionality
  const filteredData = commissionData.filter((entry) => {
    const matchesStatus = filterStatus === "all" || entry.status === filterStatus
    const matchesSearch =
      entry.brokerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.brokerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Commission Management</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalCommissionsPaid().toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalCommissionsPending().toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions Due</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalCommissionsDue().toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
          <CardDescription>Manage and track all commission payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <DateRangePicker onSearch={() => {}} onReset={() => {}} />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by broker name, code or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" className="md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Broker Name (Code)</TableHead>
                  <TableHead>Gross Premium</TableHead>
                  <TableHead>Net Premium</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Commission Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`loading-${index}`}>
                      {Array.from({ length: 8 }).map((_, cellIndex) => (
                        <TableCell key={`loading-cell-${cellIndex}`}>
                          <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {entry.brokerName} ({entry.brokerCode})
                      </TableCell>
                      <TableCell>
                        {entry.currency} {(entry.totalSales || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {entry.currency} {(entry.netPremium || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>{entry.commissionRate || 0}%</TableCell>
                      <TableCell>
                        {entry.currency} {(entry.commissionAmount || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.status === "Paid" ? "success" : "default"}>{entry.status}</Badge>
                      </TableCell>
                      <TableCell>{entry.period}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Commission Details</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div>
                                  <h4 className="font-semibold">
                                    Broker: {entry.brokerName} ({entry.brokerCode})
                                  </h4>
                                  <p>Period: {entry.period}</p>
                                  <p>Date: {entry.date}</p>
                                  <p>
                                    Gross Premium: {entry.currency} {(entry.totalSales || 0).toFixed(2)}
                                  </p>
                                  <p>
                                    Net Premium: {entry.currency} {(entry.netPremium || 0).toFixed(2)}
                                  </p>
                                  <p>Commission Rate: {entry.commissionRate || 0}%</p>
                                  <p>
                                    Commission Amount: {entry.currency} {(entry.commissionAmount || 0).toFixed(2)}
                                  </p>
                                  <p>Status: {entry.status}</p>
                                  <p>Currency: {entry.currency}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {entry.status === "Pending" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Mark Commission as Paid</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to mark this commission as paid? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleMarkAsPaid(entry.id)}>
                                    Mark as Paid
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No commission entries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
                <span className="font-medium">{filteredData.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

