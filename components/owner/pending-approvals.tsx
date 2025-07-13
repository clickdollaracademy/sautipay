"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface Approval {
  id: string
  type: "Payment" | "Refund" | "Commission" | "Company"
  companyName: string
  amount?: number
  currency?: string
  requestDate: string
  priority: "High" | "Medium" | "Low"
}

export function PendingApprovals() {
  const [approvals, setApprovals] = useState<Approval[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setApprovals([
          {
            id: "1",
            type: "Payment",
            companyName: "Acme Inc",
            amount: 15000,
            currency: "USD",
            requestDate: "2023-08-15",
            priority: "High",
          },
          {
            id: "2",
            type: "Refund",
            companyName: "Globex Corp",
            amount: 2500,
            currency: "EUR",
            requestDate: "2023-08-14",
            priority: "Medium",
          },
          {
            id: "3",
            type: "Commission",
            companyName: "Stark Industries",
            amount: 7500,
            currency: "USD",
            requestDate: "2023-08-13",
            priority: "Low",
          },
          { id: "4", type: "Company", companyName: "Umbrella LLC", requestDate: "2023-08-12", priority: "High" },
          {
            id: "5",
            type: "Payment",
            companyName: "Wayne Enterprises",
            amount: 9000,
            currency: "GBP",
            requestDate: "2023-08-11",
            priority: "Medium",
          },
        ])
      } catch (error) {
        console.error("Error fetching approvals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApprovals()
  }, [])

  const handleApprove = (id: string, type: string) => {
    setApprovals(approvals.filter((approval) => approval.id !== id))
    toast({
      title: "Approved",
      description: `${type} has been approved successfully`,
    })
  }

  const handleReject = (id: string, type: string) => {
    setApprovals(approvals.filter((approval) => approval.id !== id))
    toast({
      title: "Rejected",
      description: `${type} has been rejected`,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {approvals.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No pending approvals</div>
      ) : (
        approvals.map((approval) => (
          <div key={approval.id} className="flex flex-col p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {approval.type} Approval
                  <Badge
                    variant={
                      approval.priority === "High"
                        ? "destructive"
                        : approval.priority === "Medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {approval.priority}
                  </Badge>
                </h4>
                <p className="text-sm text-muted-foreground">{approval.companyName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{approval.requestDate}</p>
                {approval.amount && (
                  <p className="font-medium">
                    {approval.currency} {approval.amount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/owner/approvals/${approval.id}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Details
                </Link>
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleReject(approval.id, approval.type)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button variant="default" size="sm" onClick={() => handleApprove(approval.id, approval.type)}>
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        ))
      )}

      {approvals.length > 0 && (
        <Button className="w-full" variant="outline" asChild>
          <Link href="/owner/approvals">View All Approvals</Link>
        </Button>
      )}
    </div>
  )
}

