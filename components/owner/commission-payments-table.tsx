"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

interface CommissionPayment {
  id: string
  agent: string
  commission: string
  transactions: number
  status: "Ready" | "Pending" | "Paid"
}

export function CommissionPaymentsTable() {
  const [commissionPayments, setCommissionPayments] = useState<CommissionPayment[]>([
    {
      id: "1",
      agent: "John Smith",
      commission: "$1,234.56",
      transactions: 45,
      status: "Ready",
    },
  ])

  const handlePayment = (id: string) => {
    setCommissionPayments(
      commissionPayments.map((payment) => (payment.id === id ? { ...payment, status: "Paid" as const } : payment)),
    )
    toast({
      title: "Payment processed",
      description: "Commission payment has been processed successfully.",
    })
  }

  return (
    <div className="rounded-md border">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Commission Payments</h2>
        <p className="text-sm text-muted-foreground">Track and process commission payments for brokers and agents.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commissionPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.agent}</TableCell>
              <TableCell>{payment.commission}</TableCell>
              <TableCell>{payment.transactions}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>
                <Button onClick={() => handlePayment(payment.id)} disabled={payment.status === "Paid"}>
                  Pay
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
