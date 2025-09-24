"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TableFilter } from "@/components/table-filter"
import { useFilteredData } from "@/hooks/use-filtered-data"
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
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RefundRequest {
  id: string
  customerName: string
  amount: number
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  date: string
}

export function RefundTable() {
  // Use the filtered data hook
  const {
    data: refundRequests,
    isLoading,
    pagination,
    applyFilters,
    resetFilters,
    changePage,
    changePageSize,
  } = useFilteredData<RefundRequest>({
    apiEndpoint: "refunds",
    defaultPagination: { page: 1, limit: 10 },
  })

  // For totals we'd typically get these from a separate API endpoint
  // but for demo we can calculate from our data
  const getTotalRefundAmount = () => {
    return refundRequests.reduce((sum, req) => sum + (req.status === "Approved" ? req.amount : 0), 0)
  }

  const getPendingRefundCount = () => {
    return refundRequests.filter((req) => req.status === "Pending").length
  }

  // Handle approve/reject actions
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/refunds/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Approved" }),
      })

      if (!response.ok) {
        throw new Error("Failed to approve refund")
      }

      // Refresh the data
      applyFilters({}) // Re-apply current filters to refresh
    } catch (error) {
      console.error("Error approving refund:", error)
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/refunds/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Rejected" }),
      })

      if (!response.ok) {
        throw new Error("Failed to reject refund")
      }

      // Refresh the data
      applyFilters({}) // Re-apply current filters to refresh
    } catch (error) {
      console.error("Error rejecting refund:", error)
    }
  }

  // Additional filters
  const additionalFilters = (
    <Select onValueChange={(value) => applyFilters({ status: value })}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="Rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalRefundAmount().toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingRefundCount()}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Refund Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <TableFilter
            onFilter={applyFilters}
            onReset={resetFilters}
            isLoading={isLoading}
            placeholder="Search refunds..."
            additionalFilters={additionalFilters}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <TableCell key={`loading-cell-${cellIndex}`}>
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : refundRequests.length > 0 ? (
                refundRequests.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell>{refund.id}</TableCell>
                    <TableCell>{refund.customerName}</TableCell>
                    <TableCell>${refund.amount.toFixed(2)}</TableCell>
                    <TableCell>{refund.reason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          refund.status === "Successful"
                            ? "default"
                            : refund.status === "Failed"
                              ? "destructive"
                              : "outline"
                        }
                        className={
                          refund.status === "Successful"
                            ? "bg-green-500"
                            : refund.status === "Failed"
                              ? "bg-red-500"
                              : ""
                        }
                      >
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{refund.date}</TableCell>
                    <TableCell>
                      {refund.status === "Pending" && (
                        <>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Approve Refund</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to approve this refund? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleApprove(refund.id)}>Approve</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Reject Refund</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to reject this refund? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleReject(refund.id)}>Reject</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No refund requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {refundRequests.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select value={pagination.limit.toString()} onValueChange={(value) => changePageSize(Number(value))}>
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={pagination.limit} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
