"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function FinancialReport() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("monthly")
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const fetchFinancialData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const labels =
          timeframe === "monthly"
            ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            : ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]

        const revenue = labels.map(() => Math.floor(Math.random() * 500000) + 100000)
        const expenses = labels.map(() => Math.floor(Math.random() * 200000) + 50000)
        const profit = revenue.map((rev, i) => rev - expenses[i])

        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue",
              data: revenue,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Expenses",
              data: expenses,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
            {
              label: "Profit",
              data: profit,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
          ],
        })
      } catch (error) {
        console.error("Failed to fetch financial data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFinancialData()
  }, [timeframe])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: timeframe === "monthly" ? "Monthly Financial Overview" : "Weekly Financial Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => "$" + value.toLocaleString(),
        },
      },
    },
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>{chartData && <Bar data={chartData} options={options} height={120} />}</div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$4.2M</div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$1.8M</div>
            <p className="text-xs text-muted-foreground">Total Expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">Total Profit</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

