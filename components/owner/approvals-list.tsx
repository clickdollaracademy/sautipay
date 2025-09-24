"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, AlertCircle, DollarSign, RefreshCcw, PieChart, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
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

interface Approval {
  id: string
  type: "Payment" | "Refund" | "Commission" | "Company"
  companyName: string
  amount?: number
  currency?: string
  requestDate: string
  priority: "High" | "Medium" | "Low"
  description: string
}

export function ApprovalsList() {
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
            description: "Large payment requiring approval due to exceeding threshold.",
          },
          {
            id: "2",
            type: "Refund",
            companyName: "Globex Corp",
            amount: 2500,
            currency: "EUR",
            requestDate: "2023-08-14",
            priority: "Medium",
            description: "Customer requested refund for canceled service.",
          },
          {
            id: "3",
            type: "Commission",
            companyName: "Stark Industries",
            amount: 7500,
            currency: "USD",
            requestDate: "2023-08-13",
            priority: "Low",
            description: "Monthly commission payout for broker network.",
          },
          {
            id: "4",
            type: "Company",
            companyName: "Umbrella LLC",
            requestDate: "2023-08-12",
            priority: "High",
            description: "New company onboarding approval required.",
          },
          {
            id: "5",
            type: "Payment",
            companyName: "Wayne Enterprises",
            amount: 9000,
            currency: "GBP",
            requestDate: "2023-08-11",
            priority: "Medium",
            description: "International payment requiring owner approval.",
          },
          {
            id: "6",
            type: "Refund",
            companyName: "Acme Inc",
            amount: 1200,
            currency: "USD",
            requestDate: "2023-08-10",
            priority: "Low",
            description: "Disputed charge refund request.",
          },
          {
            id: "7",
            type: "Commission",
            companyName: "Globex Corp",
            amount: 3500,
            currency: "EUR",
            requestDate: "2023-08-09",
            priority: "Medium",
            description: "Special commission rate adjustment approval.",
          },
          {
            id: "8",
            type: "Company",
            companyName: "Daily Planet",
            requestDate: "2023-08-08",
            priority: "Medium",
            description: "Company requesting plan upgrade approval.",
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Payment":
        return <DollarSign className="h-4 w-4" />
      case "Refund":
        return <RefreshCcw className="h-4 w-4" />
      case "Commission":
        return <PieChart className="h-4 w-4" />
      case "Company":
        return <Building className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
          <TabsTrigger value="refund">Refunds</TabsTrigger>
          <TabsTrigger value="commission">Commissions</TabsTrigger>
          <TabsTrigger value="company">Companies</TabsTrigger>
        </TabsList>

        {["all", "payment", "refund", "commission", "company"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === "all" ? "All Approvals" : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Approvals`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvals.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No pending approvals</div>
                  ) : (
                    approvals
                      .filter((approval) => tab === "all" || approval.type.toLowerCase() === tab)
                      .map((approval) => (
                        <div key={approval.id} className="flex flex-col p-4 border rounded-lg shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold flex items-center gap-2">
                                {getTypeIcon(approval.type)}
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
                              <p className="text-sm font-medium mt-1">{approval.companyName}</p>
                              <p className="text-sm text-muted-foreground mt-1">{approval.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">{approval.requestDate}</p>
                              {approval.amount && (
                                <p className="font-medium">
                                  {approval.currency} {approval.amount.toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-end items-center mt-4 gap-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                  <X className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will reject the {approval.type.toLowerCase()} approval request from{" "}
                                    {approval.companyName}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleReject(approval.id, approval.type)}>
                                    Confirm Rejection
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="default" size="sm">
                                  <Check className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will approve the {approval.type.toLowerCase()} request from{" "}
                                    {approval.companyName}.
                                    {approval.amount &&
                                      ` The amount is ${approval.currency} ${approval.amount.toFixed(2)}.`}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleApprove(approval.id, approval.type)}>
                                    Confirm Approval
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
