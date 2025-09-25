"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  CreditCard,
  Plus,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"

// Mock data for analytics
const revenueData = [
  { month: "Jan", revenue: 45000, policies: 120 },
  { month: "Feb", revenue: 52000, policies: 145 },
  { month: "Mar", revenue: 48000, policies: 132 },
  { month: "Apr", revenue: 61000, policies: 168 },
  { month: "May", revenue: 55000, policies: 155 },
  { month: "Jun", revenue: 67000, policies: 189 },
]

const dailyMetrics = [
  { day: "Mon", bookings: 12, claims: 3 },
  { day: "Tue", bookings: 15, claims: 2 },
  { day: "Wed", bookings: 18, claims: 4 },
  { day: "Thu", bookings: 14, claims: 1 },
  { day: "Fri", bookings: 22, claims: 5 },
  { day: "Sat", bookings: 28, claims: 3 },
  { day: "Sun", bookings: 19, claims: 2 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your travel insurance business.
          </p>
        </div>
      </div>

      {/* KPI Cards - ESSENTIAL */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,000</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,309</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+189</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claims Processed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - ESSENTIAL */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions to streamline your workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Plus className="h-5 w-5" />
              New Policy
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <FileText className="h-5 w-5" />
              Process Claim
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Users className="h-5 w-5" />
              Add Customer
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <CreditCard className="h-5 w-5" />
              View Payments
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section - ESSENTIAL */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 items-start">
        {/* Revenue Trends */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and policy sales over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                policies: {
                  label: "Policies",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    fill="var(--color-revenue)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Daily bookings and claims for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "hsl(var(--chart-1))",
                },
                claims: {
                  label: "Claims",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="var(--color-bookings)" />
                  <Bar dataKey="claims" fill="var(--color-claims)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Key Business Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Business Performance</CardTitle>
            <CardDescription>Key indicators for business health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="text-sm text-muted-foreground">68.5%</span>
              </div>
              <Progress value={68.5} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm text-muted-foreground">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Policy Renewal Rate</span>
                <span className="text-sm text-muted-foreground">76.8%</span>
              </div>
              <Progress value={76.8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest important updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Policy #TI-2024-001 approved</p>
                  <p className="text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-blue-500" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Payment received: $1,250</p>
                  <p className="text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Claim requires review</p>
                  <p className="text-muted-foreground">12 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
