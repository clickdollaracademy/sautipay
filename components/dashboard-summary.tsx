"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { DollarSign, Activity, ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react"

interface SummaryData {
  commissions: {
    total: number
    pending: number
    paid: number
    percentChange: number
  }
  refunds: {
    total: number
    pending: number
    approved: number
    percentChange: number
  }
  transactions: {
    total: number
    completed: number
    pending: number
    percentChange: number
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function DashboardSummary() {
  const [data, setData] = useState<SummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data
        setData({
          commissions: {
            total: 62540,
            pending: 28450,
            paid: 34090,
            percentChange: 12.5,
          },
          refunds: {
            total: 8750,
            pending: 3200,
            approved: 5550,
            percentChange: -4.2,
          },
          transactions: {
            total: 156780,
            completed: 142300,
            pending: 14480,
            percentChange: 8.7,
          },
        })
      } catch (error) {
        console.error("Error fetching summary data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Chart data
  const monthlyData = [
    { name: "Jan", commissions: 4200, refunds: 400, transactions: 12500 },
    { name: "Feb", commissions: 5100, refunds: 600, transactions: 13200 },
    { name: "Mar", commissions: 4800, refunds: 550, transactions: 12800 },
    { name: "Apr", commissions: 5400, refunds: 700, transactions: 14100 },
    { name: "May", commissions: 5700, refunds: 800, transactions: 15300 },
    { name: "Jun", commissions: 6200, refunds: 950, transactions: 16500 },
  ]

  const pieData = [
    { name: "Commissions", value: data?.commissions.total || 0 },
    { name: "Refunds", value: data?.refunds.total || 0 },
    {
      name: "Net Revenue",
      value: (data?.transactions.total || 0) - (data?.commissions.total || 0) - (data?.refunds.total || 0),
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data?.commissions.total.toLocaleString()}</div>
              <div className="flex items-center pt-1 text-xs">
                <span
                  className={`flex items-center ${data?.commissions.percentChange && data.commissions.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {data?.commissions.percentChange && data.commissions.percentChange > 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(data?.commissions.percentChange || 0)}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">${data?.commissions.pending.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-medium">${data?.commissions.paid.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
              <RefreshCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data?.refunds.total.toLocaleString()}</div>
              <div className="flex items-center pt-1 text-xs">
                <span
                  className={`flex items-center ${data?.refunds.percentChange && data.refunds.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {data?.refunds.percentChange && data.refunds.percentChange > 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(data?.refunds.percentChange || 0)}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">${data?.refunds.pending.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Approved</span>
                  <span className="font-medium">${data?.refunds.approved.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data?.transactions.total.toLocaleString()}</div>
              <div className="flex items-center pt-1 text-xs">
                <span
                  className={`flex items-center ${data?.transactions.percentChange && data.transactions.percentChange > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {data?.transactions.percentChange && data.transactions.percentChange > 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(data?.transactions.percentChange || 0)}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium">${data?.transactions.completed.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">${data?.transactions.pending.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>
                Summary of commissions, refunds, and transactions over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="commissions" fill="#0088FE" name="Commissions" />
                    <Bar dataKey="refunds" fill="#FF8042" name="Refunds" />
                    <Bar dataKey="transactions" fill="#00C49F" name="Transactions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Commission Distribution</CardTitle>
              <CardDescription>Breakdown of commission status and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Pending", value: data?.commissions.pending || 0 },
                          { name: "Paid", value: data?.commissions.paid || 0 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Pending", value: data?.commissions.pending || 0 },
                          { name: "Paid", value: data?.commissions.paid || 0 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Top Earning Brokers</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Elite Insurance Partners</span>
                        <span className="font-medium">$25,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Global Insurance Brokers</span>
                        <span className="font-medium">$13,050</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Secure Insurance Solutions</span>
                        <span className="font-medium">$18,000</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Commission Trends</h3>
                    <p className="text-sm text-muted-foreground">
                      Commissions have increased by 12.5% compared to last month, with Elite Insurance Partners showing
                      the highest growth at 18%.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds">
          <Card>
            <CardHeader>
              <CardTitle>Refund Analysis</CardTitle>
              <CardDescription>Overview of refund requests and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Pending", value: data?.refunds.pending || 0 },
                          { name: "Approved", value: data?.refunds.approved || 0 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Pending", value: data?.refunds.pending || 0 },
                          { name: "Approved", value: data?.refunds.approved || 0 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Common Refund Reasons</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Policy Cancellation</span>
                        <span className="font-medium">45%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Duplicate Payment</span>
                        <span className="font-medium">28%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Service Dissatisfaction</span>
                        <span className="font-medium">18%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Other</span>
                        <span className="font-medium">9%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Refund Processing Time</h3>
                    <p className="text-sm text-muted-foreground">
                      Average refund processing time: 3.2 days
                      <br />
                      This is a 15% improvement from the previous quarter.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
              <CardDescription>Overview of all financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Transaction Breakdown</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Total Gross Revenue</span>
                        <span className="font-medium">${data?.transactions.total.toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Commissions Paid</span>
                        <span className="font-medium">${data?.commissions.paid.toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Refunds Issued</span>
                        <span className="font-medium">${data?.refunds.approved.toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-medium">Net Revenue</span>
                        <span className="font-medium">
                          $
                          {(
                            (data?.transactions.total || 0) -
                            (data?.commissions.total || 0) -
                            (data?.refunds.total || 0)
                          ).toLocaleString()}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Payment Methods</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">65%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Bank Transfer</span>
                        <span className="font-medium">25%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Mobile Money</span>
                        <span className="font-medium">10%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
