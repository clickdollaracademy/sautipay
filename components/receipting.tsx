"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Transaction {
  id: string
  date: string
  clientName: string
  originalAmount: number
  originalCurrency: string
  convertedAmount: number
  receiptUrl: string
}

// Simulated exchange rates (in a real application, these would be fetched from an API)
const exchangeRates = {
  USD: 1,
  EUR: 0.84,
  GBP: 0.72,
  JPY: 110.14,
}

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-06-15",
    clientName: "John Doe",
    originalAmount: 1000,
    originalCurrency: "USD",
    convertedAmount: 1000,
    receiptUrl: "/receipts/receipt1.pdf",
  },
  {
    id: "2",
    date: "2023-06-16",
    clientName: "Jane Smith",
    originalAmount: 1500,
    originalCurrency: "EUR",
    convertedAmount: 1785.71,
    receiptUrl: "/receipts/receipt2.pdf",
  },
  {
    id: "3",
    date: "2023-06-17",
    clientName: "Bob Johnson",
    originalAmount: 2000,
    originalCurrency: "GBP",
    convertedAmount: 2777.78,
    receiptUrl: "/receipts/receipt3.pdf",
  },
  {
    id: "4",
    date: "2023-06-18",
    clientName: "Alice Brown",
    originalAmount: 200000,
    originalCurrency: "JPY",
    convertedAmount: 1815.87,
    receiptUrl: "/receipts/receipt4.pdf",
  },
]

function convertCurrency(amount: number, fromCurrency: string, toCurrency = "USD"): number {
  if (fromCurrency === toCurrency) return amount
  return amount / exchangeRates[fromCurrency as keyof typeof exchangeRates]
}

export function Receipting() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Simulate fetching and converting transactions
    const convertedTransactions = dummyTransactions.map((transaction) => ({
      ...transaction,
      convertedAmount: convertCurrency(transaction.originalAmount, transaction.originalCurrency),
    }))
    setTransactions(convertedTransactions)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Receipts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Original Amount</TableHead>
              <TableHead>Converted Amount (USD)</TableHead>
              <TableHead>Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.clientName}</TableCell>
                <TableCell>
                  {transaction.originalAmount.toFixed(2)} {transaction.originalCurrency}
                </TableCell>
                <TableCell>${transaction.convertedAmount.toFixed(2)} USD</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={transaction.receiptUrl} download>
                      <Download className="mr-2 h-4 w-4" /> Download Receipt
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

