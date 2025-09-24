import { type NextRequest, NextResponse } from "next/server"

// GET /api/payments/status/[transactionId] - Get payment status
export async function GET(request: NextRequest, { params }: { params: { transactionId: string } }) {
  try {
    const { transactionId } = params

    if (!transactionId) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 })
    }

    console.log("[v0] Checking payment status:", transactionId)

    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock payment status data
    const mockPaymentStatus = {
      transactionId,
      status: "completed",
      amount: 125.0,
      paymentMethod: "card",
      processedAt: new Date().toISOString(),
      bookingId: `TB${Date.now() - 10000}`,
      policyNumber: `POL${transactionId}`,
      receiptUrl: `/api/receipts/${transactionId}`,
    }

    return NextResponse.json({
      success: true,
      payment: mockPaymentStatus,
    })
  } catch (error) {
    console.error("[v0] Error checking payment status:", error)
    return NextResponse.json({ error: "Failed to check payment status" }, { status: 500 })
  }
}
