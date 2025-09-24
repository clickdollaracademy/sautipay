"use client"

import React from "react"

import { useState } from "react"
import {
  Search,
  FileDown,
  FileText,
  FileSpreadsheet,
  Check,
  X,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the refund request status types
type RefundStatus = "company_pending" | "company_approved" | "company_rejected" | "admin_paid" | "admin_declined"

// Define the refund request interface
interface RefundRequest {
  reference: string
  customer: string
  amount: string
  reason: string
  status: RefundStatus
  date: string
}

// Status display configuration
const statusConfig = {
  company_pending: {
    label: "Pending Company Review",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
    icon: Clock,
  },
  company_approved: {
    label: "Approved by Company",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    icon: Check,
  },
  company_rejected: {
    label: "Rejected by Company",
    color: "bg-red-100 text-red-800 hover:bg-red-100/80",
    icon: X,
  },
  admin_paid: {
    label: "Payment Processed",
    color: "bg-green-100 text-green-800 hover:bg-green-100/80",
    icon: Check,
  },
  admin_declined: {
    label: "Payment Declined",
    color: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
    icon: AlertCircle,
  },
}

// Sample data with different statuses
const mockRefundRequests: RefundRequest[] = [
  {
    reference: "REF20240301JAZZ",
    customer: "Alice Johnson",
    amount: "$233.00",
    reason: "Duplicate payment",
    status: "company_rejected",
    date: "2024-03-22",
  },
  {
    reference: "REF20240302JAZZ",
    customer: "Bob Smith",
    amount: "$128.00",
    reason: "Wrong size",
    status: "admin_paid",
    date: "2024-03-11",
  },
  {
    reference: "REF20240401JAZZ",
    customer: "Charlie Brown",
    amount: "$718.00",
    reason: "Defective product",
    status: "company_pending",
    date: "2024-04-25",
  },
  {
    reference: "REF20240402JAZZ",
    customer: "Diana Prince",
    amount: "$450.00",
    reason: "Policy cancellation",
    status: "company_pending",
    date: "2024-04-27",
  },
  {
    reference: "REF20240403JAZZ",
    customer: "Edward Norton",
    amount: "$325.00",
    reason: "Service not provided",
    status: "company_approved",
    date: "2024-04-28",
  },
  {
    reference: "REF20240404JAZZ",
    customer: "Fiona Apple",
    amount: "$199.50",
    reason: "Duplicate charge",
    status: "company_approved",
    date: "2024-04-29",
  },
  {
    reference: "REF20240405JAZZ",
    customer: "George Clooney",
    amount: "$550.75",
    reason: "Incorrect policy",
    status: "admin_declined",
    date: "2024-04-30",
  },
  {
    reference: "REF20240406JAZZ",
    customer: "Helen Mirren",
    amount: "$275.25",
    reason: "Customer dissatisfaction",
    status: "company_rejected",
    date: "2024-05-01",
  },
  {
    reference: "REF20240407JAZZ",
    customer: "Ian McKellen",
    amount: "$625.00",
    reason: "Policy cancellation",
    status: "admin_paid",
    date: "2024-05-02",
  },
  {
    reference: "REF20240408JAZZ",
    customer: "Julia Roberts",
    amount: "$412.75",
    reason: "Service interruption",
    status: "company_pending",
    date: "2024-05-03",
  },
  {
    reference: "REF20240409JAZZ",
    customer: "Kevin Hart",
    amount: "$189.99",
    reason: "Billing error",
    status: "company_pending",
    date: "2024-05-04",
  },
  {
    reference: "REF20240410JAZZ",
    customer: "Laura Dern",
    amount: "$299.50",
    reason: "Product recall",
    status: "company_approved",
    date: "2024-05-05",
  },
  {
    reference: "REF20240411JAZZ",
    customer: "Michael Jordan",
    amount: "$499.99",
    reason: "Coverage dispute",
    status: "admin_paid",
    date: "2024-05-06",
  },
  {
    reference: "REF20240412JAZZ",
    customer: "Nicole Kidman",
    amount: "$150.25",
    reason: "Duplicate payment",
    status: "admin_declined",
    date: "2024-05-07",
  },
  {
    reference: "REF20240413JAZZ",
    customer: "Owen Wilson",
    amount: "$375.50",
    reason: "Policy cancellation",
    status: "company_rejected",
    date: "2024-05-08",
  },
]

export function RefundManagement() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // State for pagination
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // State for horizontal scroll
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const tableRef = React.useRef<HTMLDivElement>(null)

  // Function to show notifications
  const showNotification = (title: string, description: string, variant: "default" | "destructive" = "default") => {
    toast({
      title,
      description,
      variant,
    })
  }

  // Handle company approval
  const handleCompanyApprove = (reference: string) => {
    // In a real app, this would call an API to update the status
    showNotification(
      "Refund approved by company",
      `Refund ${reference} has been approved and is awaiting admin payment.`,
    )
  }

  // Handle company rejection
  const handleCompanyReject = (reference: string) => {
    // In a real app, this would call an API to update the status
    showNotification(
      "Refund rejected by company",
      `Refund ${reference} has been rejected by the company.`,
      "destructive",
    )
  }

  // Handle admin payment processing
  const handleAdminPay = (reference: string) => {
    // In a real app, this would call an API to process payment
    showNotification("Payment processed", `Payment for refund ${reference} has been processed successfully.`)
  }

  // Handle admin payment decline
  const handleAdminDecline = (reference: string) => {
    // In a real app, this would call an API to decline payment
    showNotification("Payment declined", `Payment for refund ${reference} has been declined.`, "destructive")
  }

  // Handle export
  const handleExport = (format: string) => {
    showNotification("Export started", `Exporting refund data as ${format.toUpperCase()}...`)

    // Simulate export delay
    setTimeout(() => {
      showNotification("Export complete", `Refund data has been exported as ${format.toUpperCase()}.`)
    }, 1500)
  }

  // Filter refunds based on search, date, and status
  const filteredRefunds = mockRefundRequests.filter((refund) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      refund.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.reason.toLowerCase().includes(searchQuery.toLowerCase())

    // Date filter
    const refundDate = new Date(refund.date)
    const matchesStartDate = startDate === "" || new Date(startDate) <= refundDate
    const matchesEndDate = endDate === "" || new Date(endDate) >= refundDate

    // Status filter
    const matchesStatus = statusFilter === "all" || refund.status === statusFilter

    return matchesSearch && matchesStartDate && matchesEndDate && matchesStatus
  })

  // Calculate pagination
  const totalRefunds = filteredRefunds.length
  const totalPages = Math.ceil(totalRefunds / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, totalRefunds)
  const paginatedRefunds = filteredRefunds.slice(startIndex, endIndex)

  // Reset filters
  const handleReset = () => {
    setSearchQuery("")
    setStartDate("")
    setEndDate("")
    setStatusFilter("all")
    setCurrentPage(1)
  }

  // Update scroll position when table scrolls
  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableRef.current
      setScrollPosition(scrollLeft)
      setMaxScroll(scrollWidth - clientWidth)
    }
  }

  // Initialize scroll values on component mount and window resize
  React.useEffect(() => {
    const updateScrollValues = () => {
      if (tableRef.current) {
        const { scrollWidth, clientWidth } = tableRef.current
        setMaxScroll(scrollWidth - clientWidth)
      }
    }

    updateScrollValues()
    window.addEventListener("resize", updateScrollValues)

    return () => {
      window.removeEventListener("resize", updateScrollValues)
    }
  }, [])

  // Render status badge with appropriate color and icon
  const renderStatusBadge = (status: RefundStatus) => {
    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  // Render action buttons based on status
  const renderActions = (refund: RefundRequest) => {
    switch (refund.status) {
      case "company_pending":
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleCompanyApprove(refund.reference)}
            >
              <Check className="w-4 h-4 mr-1" /> Approve
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  <X className="w-4 h-4 mr-1" /> Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reject Refund</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to reject this refund request? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleCompanyReject(refund.reference)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Reject
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )

      case "company_approved":
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleAdminPay(refund.reference)}
            >
              <Check className="w-4 h-4 mr-1" /> Process Payment
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  <X className="w-4 h-4 mr-1" /> Decline
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Decline Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to decline payment for this approved refund? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleAdminDecline(refund.reference)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Decline
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )

      default:
        return (
          <Button size="sm" variant="outline">
            View Details
          </Button>
        )
    }
  }

  // Render workflow timeline indicator
  const renderWorkflowIndicator = (status: RefundStatus) => {
    const steps = [
      { key: "submitted", label: "Submitted", completed: true },
      { key: "company_review", label: "Company Review", completed: status !== "company_pending" },
      {
        key: "admin_payment",
        label: "Admin Payment",
        completed: status === "admin_paid" || status === "admin_declined",
      },
      { key: "completed", label: "Completed", completed: status === "admin_paid" || status === "admin_declined" },
    ]

    return (
      <div className="flex items-center space-x-1">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            {index > 0 && <div className={`h-0.5 w-4 ${step.completed ? "bg-green-500" : "bg-gray-300"}`} />}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs
                      ${step.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}
                  >
                    {step.completed ? "✓" : ""}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{step.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Date filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search refunds..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full" />
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full" />
            </div>
          </div>

          {/* Status filter and buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-green-500">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="company_pending">Pending Company Review</SelectItem>
                <SelectItem value="company_approved">Approved by Company</SelectItem>
                <SelectItem value="company_rejected">Rejected by Company</SelectItem>
                <SelectItem value="admin_paid">Payment Processed</SelectItem>
                <SelectItem value="admin_declined">Payment Declined</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>

            <Button variant="default">Filter</Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("word")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Word
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  <FileDown className="mr-2 h-4 w-4" />
                  PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Horizontal scrollbar */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={scrollPosition <= 0}
              onClick={() => {
                if (tableRef.current) {
                  tableRef.current.scrollLeft = 0
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="relative flex-1 h-2 bg-muted rounded-full">
              <div
                className="absolute h-full bg-primary rounded-full"
                style={{
                  width: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 100}%`,
                  maxWidth: "100%",
                }}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={scrollPosition >= maxScroll}
              onClick={() => {
                if (tableRef.current) {
                  tableRef.current.scrollLeft = maxScroll
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Table with horizontal scroll */}
          <div
            className="border rounded-md overflow-x-auto"
            ref={tableRef}
            onScroll={handleScroll}
            style={{ minWidth: "100%" }}
          >
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRefunds.length > 0 ? (
                  paginatedRefunds.map((refund) => (
                    <TableRow key={refund.reference}>
                      <TableCell className="font-medium">{refund.reference}</TableCell>
                      <TableCell>{refund.customer}</TableCell>
                      <TableCell>{refund.amount}</TableCell>
                      <TableCell>{refund.reason}</TableCell>
                      <TableCell>{renderStatusBadge(refund.status)}</TableCell>
                      <TableCell>{renderWorkflowIndicator(refund.status)}</TableCell>
                      <TableCell>{new Date(refund.date).toLocaleDateString()}</TableCell>
                      <TableCell>{renderActions(refund)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No refund requests found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {totalRefunds > 0 ? startIndex + 1 : 0} to {endIndex} of {totalRefunds} entries
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm whitespace-nowrap">Rows per page</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number.parseInt(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-sm whitespace-nowrap">
                Page {currentPage} of {totalPages || 1}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
