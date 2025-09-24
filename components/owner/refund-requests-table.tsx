"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface RefundRequest {
  reference: string
  customer: string
  amount: string
  reason: string
}

export function RefundRequestsTable() {
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([
    {
      reference: "REF001",
      customer: "Alice Johnson",
      amount: "$233.00",
      reason: "Duplicate payment",
    },
  ])

  const handleApprove = (reference: string) => {
    setRefundRequests(refundRequests.filter((request) => request.reference !== reference))
    toast({
      title: "Refund approved",
      description: "The refund request has been approved successfully.",
    })
  }

  const handleReject = (reference: string) => {
    setRefundRequests(refundRequests.filter((request) => request.reference !== reference))
    toast({
      title: "Refund rejected",
      description: "The refund request has been rejected.",
    })
  }

  return (
    <div className="rounded-md border">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Refund Requests</h2>
        <p className="text-sm text-muted-foreground">Review and process pending refund requests.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refundRequests.map((request) => (
            <TableRow key={request.reference}>
              <TableCell>{request.reference}</TableCell>
              <TableCell>{request.customer}</TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="default" onClick={() => handleApprove(request.reference)}>
                    Approve
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Reject</Button>
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
                        <AlertDialogAction onClick={() => handleReject(request.reference)}>Reject</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
