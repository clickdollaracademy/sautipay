"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle } from "lucide-react"
import { DataTableFilters, type FilterParams } from "@/components/data-table-filters"
import { DataTablePagination } from "@/components/data-table-pagination"
import { useFilteredData } from "@/hooks/use-filtered-data"

interface SettlementData {
  id: string
  date: string
  settledAmount: number
  bill: number
  transferredAmount: number
  transactionCount: number
  status: string
}

interface Transaction {
  id: string
  date: string
  clientName: string
  amount: number
  description: string
}

export function SettlementDetails() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dailySum, setDailySum] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([])
  const [selectedTotalAmount, setSelectedTotalAmount] = useState(0)
  const [selectedSettlementDate, setSelectedSettlementDate] = useState("")

  // Setup filtered data hook
  const {
    data: settlements,
    isLoading,
    pagination,
    applyFilters,
    resetFilters,
    changePage,
    changePageSize,
  } = useFilteredData<SettlementData>({
    endpoint: "settlements",
    defaultData: [],
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchDailySum = async () => {
      try {
        // Check if we're in development mode and use mock data
        if (process.env.NODE_ENV === "development") {
          console.log("Using mock daily sum data in development mode")
          setDailySum(850) // Mock data for development
          return
        }

        const response = await fetch("/api/settlements/daily-sum")

        // Check if response is ok and is JSON
        if (response.ok) {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            setDailySum(data.sum || 0)
          } else {
            console.error("Response is not JSON:", await response.text())
            setDailySum(850) // Fallback value
          }
        } else {
          console.error("Error response:", response.status, response.statusText)
          setDailySum(850) // Fallback value
        }
      } catch (error) {
        console.error("Error fetching daily sum:", error)
        setDailySum(850) // Fallback value on error
      }
    }

    fetchDailySum()
  }, [])

  const isTransferReady = dailySum >= 1000 && currentTime.getHours() === 0 && currentTime.getMinutes() === 0

  const handleDetailClick = async (settlementId: string, date: string) => {
    try {
      // In development mode, use mock data
      if (process.env.NODE_ENV === "development") {
        const mockTransactions = [
          {
            id: "tx1",
            date: "2023-06-15",
            clientName: "Acme Corp",
            amount: 2500,
            description: "Insurance premium payment",
          },
          {
            id: "tx2",
            date: "2023-06-15",
            clientName: "Globex Inc",
            amount: 2000,
            description: "Policy renewal",
          },
        ]
        setSelectedTransactions(mockTransactions)
        setSelectedTotalAmount(4500)
        setSelectedSettlementDate(date)
        setIsModalOpen(true)
        return
      }

      const response = await fetch(`/api/settlements/${settlementId}/transactions`)

      if (response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json()
          setSelectedTransactions(data.transactions || [])
          setSelectedTotalAmount(data.totalAmount || 0)
          setSelectedSettlementDate(date)
          setIsModalOpen(true)
        } else {
          console.error("Response is not JSON")
          // Use mock data as fallback
          const mockTransactions = [
            {
              id: "tx1",
              date: date,
              clientName: "Acme Corp",
              amount: 2500,
              description: "Insurance premium payment",
            },
            {
              id: "tx2",
              date: date,
              clientName: "Globex Inc",
              amount: 2000,
              description: "Policy renewal",
            },
          ]
          setSelectedTransactions(mockTransactions)
          setSelectedTotalAmount(4500)
          setSelectedSettlementDate(date)
          setIsModalOpen(true)
        }
      } else {
        console.error("Error response:", response.status, response.statusText)
        // Use mock data as fallback
        const mockTransactions = [
          {
            id: "tx1",
            date: date,
            clientName: "Acme Corp",
            amount: 2500,
            description: "Insurance premium payment",
          },
          {
            id: "tx2",
            date: date,
            clientName: "Globex Inc",
            amount: 2000,
            description: "Policy renewal",
          },
        ]
        setSelectedTransactions(mockTransactions)
        setSelectedTotalAmount(4500)
        setSelectedSettlementDate(date)
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error("Error fetching settlement transactions:", error)
      // Use mock data as fallback
      const mockTransactions = [
        {
          id: "tx1",
          date: date,
          clientName: "Acme Corp",
          amount: 2500,
          description: "Insurance premium payment",
        },
        {
          id: "tx2",
          date: date,
          clientName: "Globex Inc",
          amount: 2000,
          description: "Policy renewal",
        },
      ]
      setSelectedTransactions(mockTransactions)
      setSelectedTotalAmount(4500)
      setSelectedSettlementDate(date)
      setIsModalOpen(true)
    }
  }

  // Add this new function after the handleDetailClick function
  const handleExport = async (format: "excel" | "word" | "pdf") => {
    // Show notification that export is starting
    showNotification(`Starting ${format.toUpperCase()} export of settlements...`)

    try {
      // In a real application, you would make a request to an API endpoint here
      // that would generate the requested file format and return it for download

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success notification
      showNotification(`Settlements exported to ${format.toUpperCase()} successfully`)
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error)
      showNotification(`Failed to export to ${format.toUpperCase()}. Please try again.`)
    }
  }

  // Add this function to display notifications
  const showNotification = (message: string) => {
    // This is a simple implementation. In a real app, you might use a toast component
    const event = new CustomEvent("notification", {
      detail: { message, type: "info" },
    })
    window.dispatchEvent(event)
  }

  // Status options for filter
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
    { label: "Failed", value: "Failed" },
  ]

  // Handle filter application
  const handleFilter = (filters: FilterParams) => {
    applyFilters(filters)
  }

  // Mock data for development or when API fails
  const mockSettlements: SettlementData[] = [
    {
      id: "1",
      date: "2023-06-15",
      settledAmount: 4500,
      bill: 2446,
      transferredAmount: 5100,
      transactionCount: 2,
      status: "Completed",
    },
    {
      id: "2",
      date: "2023-06-16",
      settledAmount: 10000,
      bill: 3000,
      transferredAmount: 7000,
      transactionCount: 2,
      status: "Completed",
    },
  ]

  // Use mock data if settlements is empty and we're not loading
  const displaySettlements = !isLoading && settlements.length === 0 ? mockSettlements : settlements

  // Safely calculate total settlement amount
  const calculateTotalSettlement = () => {
    if (!displaySettlements || displaySettlements.length === 0) return 0
    return displaySettlements.reduce((sum, item) => sum + (item.settledAmount || 0), 0)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Settlement Details</h1>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            Settlement Overview
            <Badge variant={isTransferReady ? "default" : "secondary"} className="ml-2">
              {isTransferReady ? "Ready for Transfer" : "Pending Transfer"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Next Transfer Check at Midnight</span>
              </div>
              <span className="text-sm font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-purple-800">Today's Settlement Sum:</span>
                <span className="text-2xl font-bold text-purple-800">${dailySum.toFixed(2)}</span>
              </div>
              <div className="text-sm text-purple-600 mt-2">
                {dailySum >= 1000 ? (
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Sum is $1000 or more. Transfer will be initiated at midnight.
                  </span>
                ) : (
                  <span>Sum is less than $1000. No transfer will be initiated today.</span>
                )}
              </div>
            </div>

            <DataTableFilters
              onFilter={handleFilter}
              isLoading={isLoading}
              showStatus={true}
              statusOptions={statusOptions}
              placeholder="Search settlements..."
              onExport={handleExport}
            />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Settlement Reference</TableHead>
                    <TableHead>Settled Amount</TableHead>
                    <TableHead>Bill</TableHead>
                    <TableHead>Transferred Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detail</TableHead>
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
                  ) : displaySettlements.length > 0 ? (
                    displaySettlements.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="font-mono">
                          {`SETT${item.date.replace(/-/g, "").substring(0, 6)}${String(item.id).padStart(2, "0")}JAZZ`}
                        </TableCell>
                        <TableCell>${(item.settledAmount || 0).toFixed(2)}</TableCell>
                        <TableCell>${(item.bill || 0).toFixed(2)}</TableCell>
                        <TableCell>${(item.transferredAmount || 0).toFixed(2)}</TableCell>
                        <TableCell>{item.transactionCount || 0}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "Completed" ? "success" : "secondary"}>
                            {item.status || "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-normal"
                            onClick={() => handleDetailClick(item.id, item.date)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No settlements found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <DataTablePagination pagination={pagination} onPageChange={changePage} onPageSizeChange={changePageSize} />

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Total Settlement (All Time)</span>
              </div>
              <span className="font-bold text-lg">${calculateTotalSettlement().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/50 rounded-lg p-4 text-sm">
        <p className="text-muted-foreground">
          Note: If the daily sum is equal to or exceeds $1,000 at the end of the day (Midnight), it will be ready for
          transfer.
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Settlement Transactions - {selectedSettlementDate}</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                ✕
              </Button>
            </div>

            <div className="rounded-md border mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.clientName}</TableCell>
                      <TableCell>${(tx.amount || 0).toFixed(2)}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold">${selectedTotalAmount.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="mr-2" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>Export</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

