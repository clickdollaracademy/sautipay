import { type NextRequest, NextResponse } from "next/server"

interface CommissionData {
  bookingId: string
  policyNumber: string
  premium: number
  agentId?: string
  brokerCode?: string
  commissionRate: number
}

// POST /api/commissions/travel-insurance - Record commission for travel insurance sale
export async function POST(request: NextRequest) {
  try {
    const commissionData: CommissionData = await request.json()

    // Validate required fields
    if (!commissionData.bookingId || !commissionData.premium) {
      return NextResponse.json({ error: "Missing required commission data" }, { status: 400 })
    }

    // Default commission rate if not provided (10%)
    const commissionRate = commissionData.commissionRate || 0.1
    const commissionAmount = commissionData.premium * commissionRate

    // Generate commission record ID
    const commissionId = `COM${Date.now()}`

    console.log("[v0] Recording travel insurance commission:", {
      commissionId,
      bookingId: commissionData.bookingId,
      premium: commissionData.premium,
      commissionAmount,
      rate: commissionRate,
    })

    // In a real implementation:
    // 1. Save commission record to database
    // 2. Update agent/broker commission balance
    // 3. Schedule commission payment
    // 4. Update settlement tracking
    // 5. Generate commission statement

    // Simulate database operations
    await new Promise((resolve) => setTimeout(resolve, 500))

    const commissionRecord = {
      commissionId,
      bookingId: commissionData.bookingId,
      policyNumber: commissionData.policyNumber || `POL${commissionData.bookingId}`,
      productType: "travel_insurance",
      premium: commissionData.premium,
      commissionRate,
      commissionAmount,
      agentId: commissionData.agentId || "default_agent",
      brokerCode: commissionData.brokerCode,
      status: "pending",
      createdAt: new Date().toISOString(),
      paymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    }

    return NextResponse.json({
      success: true,
      commission: commissionRecord,
      message: "Commission recorded successfully",
    })
  } catch (error) {
    console.error("[v0] Error recording commission:", error)
    return NextResponse.json({ error: "Failed to record commission" }, { status: 500 })
  }
}

// GET /api/commissions/travel-insurance - Get travel insurance commissions
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const agentId = url.searchParams.get("agentId")
    const status = url.searchParams.get("status")
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")

    console.log("[v0] Fetching travel insurance commissions:", { agentId, status, limit })

    // Simulate database query
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock commission data
    const mockCommissions = [
      {
        commissionId: "COM1234567890",
        bookingId: "TB1234567890",
        policyNumber: "POL1234567890",
        productType: "travel_insurance",
        premium: 125.0,
        commissionRate: 0.1,
        commissionAmount: 12.5,
        agentId: "agent_001",
        status: "paid",
        createdAt: "2024-01-15T10:30:00Z",
        paidAt: "2024-01-20T15:45:00Z",
      },
      {
        commissionId: "COM1234567891",
        bookingId: "TB1234567891",
        policyNumber: "POL1234567891",
        productType: "travel_insurance",
        premium: 200.0,
        commissionRate: 0.1,
        commissionAmount: 20.0,
        agentId: "agent_001",
        status: "pending",
        createdAt: "2024-01-18T14:20:00Z",
        paymentDue: "2024-02-17T14:20:00Z",
      },
    ]

    // Filter by agentId if provided
    let filteredCommissions = mockCommissions
    if (agentId) {
      filteredCommissions = filteredCommissions.filter((c) => c.agentId === agentId)
    }

    // Filter by status if provided
    if (status) {
      filteredCommissions = filteredCommissions.filter((c) => c.status === status)
    }

    // Apply limit
    filteredCommissions = filteredCommissions.slice(0, limit)

    const totalAmount = filteredCommissions.reduce((sum, c) => sum + c.commissionAmount, 0)
    const pendingAmount = filteredCommissions
      .filter((c) => c.status === "pending")
      .reduce((sum, c) => sum + c.commissionAmount, 0)

    return NextResponse.json({
      success: true,
      commissions: filteredCommissions,
      summary: {
        total: filteredCommissions.length,
        totalAmount,
        pendingAmount,
        paidAmount: totalAmount - pendingAmount,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching commissions:", error)
    return NextResponse.json({ error: "Failed to fetch commissions" }, { status: 500 })
  }
}
