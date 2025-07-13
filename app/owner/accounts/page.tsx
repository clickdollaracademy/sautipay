"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, BarChart3, PieChart, Calendar } from "lucide-react"

export default function RevenueOverviewPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Revenue Overview</h1>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,563.82</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
            <div className="mt-4 h-1 w-full bg-secondary">
              <div className="h-1 bg-primary" style={{ width: "75%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>$0</div>
              <div>Target: $32,000</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,942.50</div>
            <p className="text-xs text-muted-foreground">+5.7% from last month</p>
            <div className="mt-4 h-1 w-full bg-secondary">
              <div className="h-1 bg-primary" style={{ width: "60%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>$0</div>
              <div>Target: $15,000</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Impact</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-$1,234.56</div>
            <p className="text-xs text-green-500">-12.3% from last month</p>
            <div className="mt-4 flex items-center">
              <span className="text-xs text-muted-foreground">Refund Rate:</span>
              <span className="ml-2 text-xs font-medium">4.2%</span>
              <div className="ml-auto flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                Good
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,271.76</div>
            <p className="text-xs text-muted-foreground">+10.8% from last month</p>
            <div className="mt-4 grid grid-cols-3 gap-1 text-xs">
              <div className="rounded bg-blue-100 p-1 text-center text-blue-700">
                <div className="font-medium">Transactions</div>
                <div>76%</div>
              </div>
              <div className="rounded bg-purple-100 p-1 text-center text-purple-700">
                <div className="font-medium">Commissions</div>
                <div>28%</div>
              </div>
              <div className="rounded bg-red-100 p-1 text-center text-red-700">
                <div className="font-medium">Refunds</div>
                <div>-4%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Revenue Analysis */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Monthly revenue by source</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                  <div className="ml-4 text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                    <p className="text-xs text-muted-foreground">Showing monthly revenue trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>By revenue source</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full flex-col items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="ml-2 text-sm">Transactions (65%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="ml-2 text-sm">Commissions (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-sm">Other (5%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Avg. Transaction Value</div>
                  <div className="mt-1 text-2xl font-bold">$127.45</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Commission Rate</div>
                  <div className="mt-1 text-2xl font-bold">12.5%</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Profit Margin</div>
                  <div className="mt-1 text-2xl font-bold">32.8%</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">YTD Growth</div>
                  <div className="mt-1 text-2xl font-bold">+24.3%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Revenue</CardTitle>
              <CardDescription>Detailed breakdown of transaction earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Total Transactions</div>
                    <div className="mt-1 text-2xl font-bold">1,245</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Transaction Volume</div>
                    <div className="mt-1 text-2xl font-bold">$158,675.32</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Fee Revenue</div>
                    <div className="mt-1 text-2xl font-bold">$24,563.82</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Transaction Fee Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Processing Fees (2.5%)</span>
                      <span className="font-medium">$3,966.88</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Platform Fees (5%)</span>
                      <span className="font-medium">$7,933.77</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Service Fees (8%)</span>
                      <span className="font-medium">$12,694.03</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Earnings</CardTitle>
              <CardDescription>Detailed breakdown of commission revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Total Commissions</div>
                    <div className="mt-1 text-2xl font-bold">$8,942.50</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Commission Rate</div>
                    <div className="mt-1 text-2xl font-bold">12.5%</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Broker Payouts</div>
                    <div className="mt-1 text-2xl font-bold">$5,365.50</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Top Earning Brokers</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">John Smith</span>
                      <span className="font-medium">$1,245.30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sarah Johnson</span>
                      <span className="font-medium">$987.65</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Michael Brown</span>
                      <span className="font-medium">$876.40</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refund Analysis</CardTitle>
              <CardDescription>Impact of refunds on revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Total Refunds</div>
                    <div className="mt-1 text-2xl font-bold">$1,234.56</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Refund Rate</div>
                    <div className="mt-1 text-2xl font-bold">4.2%</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Net Impact</div>
                    <div className="mt-1 text-2xl font-bold text-red-500">-$987.65</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Refund Reasons</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Service Issues</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Payment Errors</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Requests</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Suggestions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Additional Ways to Track Earnings</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Real-time Revenue Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm">
                    Set up a real-time dashboard with live revenue metrics and alerts for significant changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Revenue Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm">
                    Implement predictive analytics to forecast future revenue based on historical trends.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Mobile Revenue Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <div className="ml-4">
                  <p className="text-sm">
                    Set up mobile notifications for daily revenue summaries and milestone achievements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

