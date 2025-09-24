import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: Request) {
  // Ensure only admins can access this endpoint
  const authResult = await requireAdmin(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    // In a real application, you would calculate these metrics from your database
    // For demo purposes, we'll return mock data

    const metrics = {
      totalDue: {
        amount: "$45,231.89",
        percentage: "20.1%",
        period: "last month",
      },
      pendingCommissions: {
        amount: "$12,234.00",
        count: 23,
      },
      activeRefunds: {
        count: 7,
        value: "$3,123.00",
      },
      totalTransactions: {
        count: 1245,
        value: "$156,789.45",
      },
      recentActivity: [
        {
          type: "transaction",
          description: "New transaction from Client 12",
          amount: "$1,234.56",
          timestamp: new Date().toISOString(),
        },
        {
          type: "refund",
          description: "Refund request approved",
          amount: "$567.89",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          type: "commission",
          description: "Commission payment processed",
          amount: "$890.12",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    }

    return NextResponse.json({
      success: true,
      data: metrics,
    })
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch dashboard metrics" }, { status: 500 })
  }
}
