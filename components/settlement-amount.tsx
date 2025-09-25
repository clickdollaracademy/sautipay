"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowDownToLine, AlertCircle } from "lucide-react"
import { TransactionExtractModal } from "./transaction-extract-modal"

interface Transaction {
  id: string
  date: string
  clientName: string
  amount: number
  description: string
}

interface SettlementData {
  date: string
  settledAmount: number
  bill: number
  transferredAmount: number
  transactions: Transaction[]
}

const settlementData: SettlementData[] = [
  {
    date: "2023-06-15",
    settledAmount: 4500.0,
    bill: 2446.0,
    transferredAmount: 5100.0,
    transactions: [
      { id: "T001", date: "2023-06-15", clientName: "John Doe", amount: 2000.0, description: "Product A Sale" },
      { id: "T002", date: "2023-06-15", clientName: "Jane Smith", amount: 2500.0, description: "Product B Sale" },
    ],
  },
  {
    date: "2023-06-16",
    settledAmount: 10000.0,
    bill: 3000.0,
    transferredAmount: 7000.0,
    transactions: [
      { id: "T003", date: "2023-06-16", clientName: "Alice Johnson", amount: 5000.0, description: "Service X" },
      { id: "T004", date: "2023-06-16", clientName: "Bob Williams", amount: 5000.0, description: "Service Y" },
    ],
  },
  // Add more settlement data items as needed
]

export function SettlementAmount() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([])
  const [selectedTotalAmount, setSelectedTotalAmount] = useState(0)
  const [selectedSettlementDate, setSelectedSettlementDate] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute instead of every second
    return () => clearInterval(timer)
  }, [])

  const dailySum = useMemo(() => {
    const today = currentTime.toISOString().split("T")[0]
    return settlementData.filter((item) => item.date === today).reduce((sum, item) => sum + item.settledAmount, 0)
  }, [currentTime])

  const totalSettlement = useMemo(() => {
    return settlementData.reduce((sum, item) => sum + item.settledAmount, 0)
  }, [])

  const isTransferReady = useMemo(() => {
    return dailySum >= 1000 && currentTime.getHours() === 0 && currentTime.getMinutes() === 0
  }, [dailySum, currentTime])

  const handleDetailClick = useCallback((transactions: Transaction[], totalAmount: number, date: string) => {
    setSelectedTransactions(transactions)
    setSelectedTotalAmount(totalAmount)
    setSelectedSettlementDate(date)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div className="space-y-4">
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

            <div className="space-y-2">
              <div className="grid grid-cols-6 gap-4 font-medium text-sm py-2 border-b">
                <div>Date</div>
                <div>Settled Amount</div>
                <div>Bill</div>
                <div>Transferred Amount</div>
                <div>Transactions</div>
                <div>Detail</div>
              </div>
              {settlementData.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 text-sm">
                  <div>{item.date}</div>
                  <div>${item.settledAmount.toFixed(2)}</div>
                  <div>${item.bill.toFixed(2)}</div>
                  <div>${item.transferredAmount.toFixed(2)}</div>
                  <div>{item.transactions.length}</div>
                  <div>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-normal"
                      onClick={() => handleDetailClick(item.transactions, item.settledAmount, item.date)}
                    >
                      Ok
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Total Settlement (All Time)</span>
              </div>
              <span className="font-bold text-lg">${totalSettlement.toFixed(2)}</span>
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

      <TransactionExtractModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transactions={selectedTransactions}
        totalAmount={selectedTotalAmount}
        settlementDate={selectedSettlementDate}
      />
    </div>
  )
}
