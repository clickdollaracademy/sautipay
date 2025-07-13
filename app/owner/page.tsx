"use client"
import { DashboardSummary } from "@/components/dashboard-summary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, RefreshCcw, DollarSign, Building, Users } from "lucide-react"

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <DashboardSummary />

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest transactions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">New Commission Payment</p>
                <p className="text-sm text-muted-foreground">$1,250.00 paid to Global Finance</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">New User Account</p>
                <p className="text-sm text-muted-foreground">Thomas Clark added to Tech Solutions</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="bg-primary/10 p-2 rounded-full">
                <RefreshCcw className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Refund Processed</p>
                <p className="text-sm text-muted-foreground">$350.00 refunded to customer #45892</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Monthly Report Generated</p>
                <p className="text-sm text-muted-foreground">February 2023 financial report</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Pending Approvals</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <RefreshCcw className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Refund Request #RF-2023-089</p>
                  <p className="text-sm text-muted-foreground">$750.00 - Customer: John Smith</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                Pending
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Commission Approval #CM-2023-156</p>
                  <p className="text-sm text-muted-foreground">$2,340.00 - Broker: Elite Insurance Partners</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                Pending
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Building className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New Company Registration</p>
                  <p className="text-sm text-muted-foreground">Apex Insurance Group - Submitted 1 day ago</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                Review
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

