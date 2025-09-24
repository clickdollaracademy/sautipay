"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTableFilters, type FilterParams } from "@/components/data-table-filters"
import { DataTablePagination } from "@/components/data-table-pagination"
import { useFilteredData } from "@/hooks/use-filtered-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface Transaction {
  id: string
  date: string
  clientName: string
  amount: number
  currency: string
  netPremium: number
  status: string
}

export function TransactionRecords() {
  // Setup filtered data hook
  const {
    data: initialTransactions,
    isLoading,
    pagination,
    applyFilters,
    resetFilters,
    changePage,
    changePageSize,
  } = useFilteredData<Transaction>({
    endpoint: "transactions",
    defaultData: [],
  })

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TRAN20240301JAZZ",
      date: "2024-03-10",
      clientName: "Client 1",
      amount: 4620.0,
      currency: "EUR",
      netPremium: 4423.0,
      status: "Successful",
    },
    {
      id: "TRAN20240302JAZZ",
      date: "2024-03-23",
      clientName: "Client 2",
      amount: 6871.0,
      currency: "USD",
      netPremium: 7753.0,
      status: "Failed",
    },
    {
      id: "TRAN20240303JAZZ",
      date: "2024-03-08",
      clientName: "Client 3",
      amount: 9639.0,
      currency: "JPY",
      netPremium: 8824.0,
      status: "Successful",
    },
    {
      id: "TRAN20240304JAZZ",
      date: "2024-03-08",
      clientName: "Client 4",
      amount: 1365.0,
      currency: "USD",
      netPremium: 6557.0,
      status: "Successful",
    },
  ])

  // Currency options for filter
  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "JPY", value: "JPY" },
    { label: "UGX", value: "UGX" },
  ]

  // Status options for filter
  const statusOptions = [
    { label: "Successful", value: "Successful" },
    { label: "Failed", value: "Failed" },
  ]

  // Handle filter application
  const handleFilter = (filters: FilterParams) => {
    applyFilters(filters)
  }

  // Function to handle export
  const handleExport = (format: "excel" | "word" | "pdf") => {
    // Show notification for export
    showNotification(`Exporting transactions as ${format.toUpperCase()}...`)

    // In a real application, you would implement the actual export functionality here
    console.log(`Exporting transactions as ${format}`, transactions)

    // Simulate export completion
    setTimeout(() => {
      showNotification(`Transactions exported successfully as ${format.toUpperCase()}`)
    }, 1500)
  }

  // Function to show notification
  const showNotification = (message: string) => {
    const notification = document.getElementById("action-notification")
    const notificationMessage = document.getElementById("notification-message")

    if (notification && notificationMessage) {
      notificationMessage.textContent = message
      notification.classList.remove("opacity-0", "translate-y-0")
      notification.classList.add("opacity-100", "translate-y-2")

      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.classList.remove("opacity-100", "translate-y-2")
        notification.classList.add("opacity-0", "translate-y-0")
      }, 3000)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transaction Records</h1>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableFilters
            onFilter={handleFilter}
            onReset={resetFilters}
            isLoading={isLoading}
            showCurrency={true}
            showStatus={true}
            currencyOptions={currencyOptions}
            statusOptions={statusOptions}
            placeholder="Search transactions..."
            onExport={handleExport}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Gross Premium</TableHead>
                  <TableHead>Net Premium</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Status</TableHead>
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
                ) : transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <span className="font-mono text-xs">{transaction.id}</span>
                      </TableCell>
                      <TableCell>{transaction.clientName}</TableCell>
                      <TableCell>
                        {transaction.currency} {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {transaction.currency} {transaction.netPremium.toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.currency}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Successful"
                              ? "default"
                              : transaction.status === "Failed"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            transaction.status === "Successful"
                              ? "bg-green-500"
                              : transaction.status === "Failed"
                                ? "bg-red-500"
                                : ""
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
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
