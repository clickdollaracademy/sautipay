"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Eye, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DataTableFilters, type FilterParams } from "@/components/data-table-filters"
import { DataTablePagination } from "@/components/data-table-pagination"
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
}

export function CommissionSummary() {
  // Setup filtered data hook
  const {
    data: commissionData = [],
    isLoading,
    pagination,
    applyFilters,
    resetFilters,
    changePage,
    changePageSize,
  } = useFilteredData<CommissionEntry>({
    endpoint: "commissions",
  })

  // For totals we'd typically get these from a separate API endpoint
  // but for demo we can calculate from our data
  const getTotalCommissionsPaid = () => {
    if (!commissionData || commissionData.length === 0) return 0
    return commissionData.reduce((sum, entry) => sum + (entry.status === "Paid" ? entry.commissionAmount || 0 : 0), 0)
  }

  const getTotalCommissionsPending = () => {
    if (!commissionData || commissionData.length === 0) return 0
    return commissionData.reduce(
      (sum, entry) => sum + (entry.status === "Pending" ? entry.commissionAmount || 0 : 0),
      0,
    )
  }

  // Handle mark as paid action
  const handleMarkAsPaid = async (id: string) => {
    try {
      const response = await fetch(`/api/commissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Paid" }),
      })

      if (!response.ok) {
        throw new Error("Failed to mark commission as paid")
      }

      // Refresh the data
      applyFilters({}) // Re-apply current filters to refresh
    } catch (error) {
      console.error("Error marking commission as paid:", error)
    }
  }

  // Status options for filter
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Paid", value: "Paid" },
  ]

  // Currency options for filter
  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "JPY", value: "JPY" },
    { label: "UGX", value: "UGX" },
  ]

  // Handle filter application
  const handleFilter = (filters: FilterParams) => {
    applyFilters(filters)
  }

  // Add this function after the handleFilter function
  const handleExport = async (format: "excel" | "word" | "pdf") => {
    // Show notification that export is starting
    const event = new CustomEvent("notification", {
      detail: {
        message: `Starting ${format.toUpperCase()} export of commissions...`,
        type: "info",
      },
    })
    window.dispatchEvent(event)

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success notification
      const successEvent = new CustomEvent("notification", {
        detail: {
          message: `Commissions exported to ${format.toUpperCase()} successfully`,
          type: "success",
        },
      })
      window.dispatchEvent(successEvent)
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error)
      const errorEvent = new CustomEvent("notification", {
        detail: {
          message: `Failed to export to ${format.toUpperCase()}. Please try again.`,
          type: "error",
        },
      })
      window.dispatchEvent(errorEvent)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Commission Summary</h1>

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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableFilters
            onFilter={handleFilter}
            isLoading={isLoading}
            showStatus={true}
            showCurrency={true}
            statusOptions={statusOptions}
            currencyOptions={currencyOptions}
            placeholder="Search commissions..."
            onExport={handleExport}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Broker Name (Code)</TableHead>
                  <TableHead>Gross Premium</TableHead>
                  <TableHead>Net Premium</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Commission Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`loading-${index}`}>
                      {Array.from({ length: 9 }).map((_, cellIndex) => (
                        <TableCell key={`loading-cell-${cellIndex}`}>
                          <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : commissionData.length > 0 ? (
                  commissionData.map((entry) => (
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
                      <TableCell>{entry.currency}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    {/* Sample commission entries */}
                    <TableRow>
                      <TableCell>
                        <span className="font-mono">COMM20240301JAZZ</span>
                      </TableCell>
                      <TableCell>John Doe (JD001)</TableCell>
                      <TableCell>USD 50000.00</TableCell>
                      <TableCell>USD 45000.00</TableCell>
                      <TableCell>5%</TableCell>
                      <TableCell>USD 2250.00</TableCell>
                      <TableCell>
                        <Badge variant="success">Approved</Badge>
                      </TableCell>
                      <TableCell>March 2024</TableCell>
                      <TableCell>USD</TableCell>
                      <TableCell>
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
                                <h4 className="font-semibold">Broker: John Doe (JD001)</h4>
                                <p>Reference: COMM20240301JAZZ</p>
                                <p>Period: March 2024</p>
                                <p>Gross Premium: USD 50000.00</p>
                                <p>Net Premium: USD 45000.00</p>
                                <p>Commission Rate: 5%</p>
                                <p>Commission Amount: USD 2250.00</p>
                                <p>Status: Approved</p>
                                <p>Currency: USD</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="font-mono">COMM20240302JAZZ</span>
                      </TableCell>
                      <TableCell>Jane Smith (JS002)</TableCell>
                      <TableCell>EUR 75000.00</TableCell>
                      <TableCell>EUR 68000.00</TableCell>
                      <TableCell>4.5%</TableCell>
                      <TableCell>EUR 3060.00</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Rejected</Badge>
                      </TableCell>
                      <TableCell>March 2024</TableCell>
                      <TableCell>EUR</TableCell>
                      <TableCell>
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
                                <h4 className="font-semibold">Broker: Jane Smith (JS002)</h4>
                                <p>Reference: COMM20240302JAZZ</p>
                                <p>Period: March 2024</p>
                                <p>Gross Premium: EUR 75000.00</p>
                                <p>Net Premium: EUR 68000.00</p>
                                <p>Commission Rate: 4.5%</p>
                                <p>Commission Amount: EUR 3060.00</p>
                                <p>Status: Rejected</p>
                                <p>Currency: EUR</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="font-mono">COMM20240303JAZZ</span>
                      </TableCell>
                      <TableCell>Bob Johnson (BJ003)</TableCell>
                      <TableCell>GBP 60000.00</TableCell>
                      <TableCell>GBP 55000.00</TableCell>
                      <TableCell>6%</TableCell>
                      <TableCell>GBP 3300.00</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>March 2024</TableCell>
                      <TableCell>GBP</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
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
                                  <h4 className="font-semibold">Broker: Bob Johnson (BJ003)</h4>
                                  <p>Reference: COMM20240303JAZZ</p>
                                  <p>Period: March 2024</p>
                                  <p>Gross Premium: GBP 60000.00</p>
                                  <p>Net Premium: GBP 55000.00</p>
                                  <p>Commission Rate: 6%</p>
                                  <p>Commission Amount: GBP 3300.00</p>
                                  <p>Status: Pending</p>
                                  <p>Currency: GBP</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-500 border-green-500 hover:bg-green-50"
                          >
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination pagination={pagination} onPageChange={changePage} onPageSizeChange={changePageSize} />
        </CardContent>
      </Card>
    </div>
  )
}
