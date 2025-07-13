import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "monthly"

    // In a real application, you would fetch performance data from a database
    // For demo purposes, we'll return mock data

    const labels =
      timeframe === "monthly"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        : ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]

    const revenue = labels.map(() => Math.floor(Math.random() * 500000) + 100000)
    const expenses = labels.map(() => Math.floor(Math.random() * 200000) + 50000)
    const profit = revenue.map((rev, i) => rev - expenses[i])

    return NextResponse.json({
      success: true,
      data: {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: revenue,
          },
          {
            label: "Expenses",
            data: expenses,
          },
          {
            label: "Profit",
            data: profit,
          },
        ],
        totals: {
          revenue: revenue.reduce((sum, val) => sum + val, 0),
          expenses: expenses.reduce((sum, val) => sum + val, 0),
          profit: profit.reduce((sum, val) => sum + val, 0),
        },
      },
    })
  } catch (error) {
    console.error("Error fetching performance data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch performance data" }, { status: 500 })
  }
}

