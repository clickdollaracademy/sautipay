"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

interface Payment {
  id: string
  date: string
  amount: number
  currency: string
  method: string
  status: "Successful" | "Failed"
}

export function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true)
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const mockPayments: Payment[] = [
          { id: "PAY001", date: "2023-06-15", amount: 1000, currency: "USD", method: "Stripe", status: "Successful" },
          { id: "PAY002", date: "2023-06-16", amount: 750, currency: "EUR", method: "Visa", status: "Successful" },
          {
            id: "PAY003",
            date: "2023-06-17",
            amount: 500,
            currency: "GBP",
            method: "MTN Mobile Money",
            status: "Failed",
          },
          {
            id: "PAY004",
            date: "2023-06-18",
            amount: 100000,
            currency: "JPY",
            method: "Airtel Money",
            status: "Successful",
          },
        ]

        setPayments(mockPayments)
      } catch (err) {
        setError("Failed to fetch payment history. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.id}</TableCell>
                <TableCell>
                  {payment.currency} {payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Payment Details</DialogTitle>
                      </DialogHeader>
                      {selectedPayment && (
                        <div className="space-y-2">
                          <p>
                            <strong>Payment ID:</strong> {selectedPayment.id}
                          </p>
                          <p>
                            <strong>Date:</strong> {selectedPayment.date}
                          </p>
                          <p>
                            <strong>Amount:</strong> {selectedPayment.currency} {selectedPayment.amount.toFixed(2)}
                          </p>
                          <p>
                            <strong>Method:</strong> {selectedPayment.method}
                          </p>
                          <p>
                            <strong>Status:</strong> {selectedPayment.status}
                          </p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
