"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, Filter, Download, Share, Eye, Target } from "lucide-react"

// Mock advanced analytics data
const performanceMetrics = [
  { metric: "Conversion Rate", value: "12.5%", change: "+2.3%", trend: "up" },
  { metric: "Customer Lifetime Value", value: "$2,450", change: "+8.7%", trend: "up" },
  { metric: "Churn Rate", value: "3.2%", change: "-0.8%", trend: "down" },
  { metric: "Average Policy Value", value: "$185", change: "+5.2%", trend: "up" },
]

const cohortData = [
  { month: "Jan", newCustomers: 120, retained: 108, churnRate: 10 },
  { month: "Feb", newCustomers: 135, retained: 125, churnRate: 7.4 },
  { month: "Mar", newCustomers: 148, retained: 142, churnRate: 4.1 },
  { month: "Apr", newCustomers: 162, retained: 156, churnRate: 3.7 },
  { month: "May", newCustomers: 178, retained: 171, churnRate: 3.9 },
  { month: "Jun", newCustomers: 195, retained: 189, churnRate: 3.1 },
]

const claimAnalytics = [
  { type: "Medical", count: 45, amount: 125000, avgProcessTime: 3.2 },
  { type: "Trip Cancellation", count: 32, amount: 89000, avgProcessTime: 2.1 },
  { type: "Baggage", count: 28, amount: 42000, avgProcessTime: 1.8 },
  { type: "Flight Delay", count: 18, amount: 15000, avgProcessTime: 1.2 },
]

const geographicData = [
  { region: "North America", policies: 1250, revenue: 245000, growth: 12.5 },
  { region: "Europe", policies: 980, revenue: 198000, growth: 8.3 },
  { region: "Asia Pacific", policies: 750, revenue: 156000, growth: 18.7 },
  { region: "Latin America", policies: 420, revenue: 89000, growth: 15.2 },
  { region: "Africa", policies: 280, revenue: 52000, growth: 22.1 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.metric}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="cohort" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cohort">Customer Cohorts</TabsTrigger>
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Performance</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="cohort" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Cohort Analysis</CardTitle>
              <CardDescription>Track customer retention and churn patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cohortData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="newCustomers"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="New Customers"
                    />
                    <Area
                      type="monotone"
                      dataKey="retained"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Retained Customers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Claims by Type</CardTitle>
                <CardDescription>Distribution of claim types and amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={claimAnalytics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {claimAnalytics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims Processing Performance</CardTitle>
                <CardDescription>Average processing time by claim type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claimAnalytics.map((claim, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{claim.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{claim.avgProcessTime} days</p>
                        <p className="text-sm text-gray-500">{claim.count} claims</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Performance</CardTitle>
              <CardDescription>Regional breakdown of policies and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{region.region}</h4>
                      <p className="text-sm text-gray-600">{region.policies} policies</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${region.revenue.toLocaleString()}</p>
                      <Badge variant={region.growth > 15 ? "default" : "secondary"}>+{region.growth}% growth</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Risk Predictions
                </CardTitle>
                <CardDescription>AI-powered risk assessment and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">High Churn Risk</p>
                        <p className="text-sm text-gray-600">23 customers identified</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Fraud Detection</p>
                        <p className="text-sm text-gray-600">2 suspicious claims flagged</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Upsell Opportunities</p>
                        <p className="text-sm text-gray-600">156 customers eligible</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Campaign
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Predicted revenue for next 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jul", actual: 245000, predicted: 248000 },
                        { month: "Aug", actual: null, predicted: 252000 },
                        { month: "Sep", actual: null, predicted: 258000 },
                        { month: "Oct", actual: null, predicted: 265000 },
                        { month: "Nov", actual: null, predicted: 272000 },
                        { month: "Dec", actual: null, predicted: 280000 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Revenue" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#82ca9d"
                        strokeDasharray="5 5"
                        name="Predicted Revenue"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
