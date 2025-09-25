import { type NextRequest, NextResponse } from "next/server"

interface ClaimApprovalData {
  claimReference: string
  approvedAmount: number
  approvalNotes?: string
  settlementMethod: "bank_transfer" | "mobile_money" | "check"
}

// POST /api/claims/approve - Approve claim and create settlement transaction
export async function POST(request: NextRequest) {
  try {
    const approvalData: ClaimApprovalData = await request.json()

    // Validate required fields
    if (!approvalData.claimReference || !approvalData.approvedAmount) {
      return NextResponse.json({ error: "Missing required approval information" }, { status: 400 })
    }

    console.log("[v0] Processing claim approval:", {
      claimReference: approvalData.claimReference,
      amount: approvalData.approvedAmount,
    })

    const settlementTransactionData = {
      id: `TRAN${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}${Math.floor(Math.random() * 99) + 1}JAZZ`,
      date: new Date().toISOString().split("T")[0],
      clientName: `Claim Settlement ${approvalData.claimReference}`,
      amount: -approvalData.approvedAmount, // Negative amount for outgoing payment
      currency: "USD",
      netPremium: -approvalData.approvedAmount,
      status: "Completed",
      companyId: "company1",
      claimReference: approvalData.claimReference,
      transactionType: "claim_settlement",
    }

    console.log("[v0] Settlement transaction created:", settlementTransactionData)

    // In a real implementation:
    // 1. Update claim status in database
    // 2. Create settlement transaction
    // 3. Initiate payment to claimant
    // 4. Send approval notification
    // 5. Update policy records
    // 6. Generate settlement report

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      claimReference: approvalData.claimReference,
      approvedAmount: approvalData.approvedAmount,
      settlementTransactionId: settlementTransactionData.id,
      status: "approved",
      message: "Claim approved and settlement transaction created",
    })
  } catch (error) {
    console.error("[v0] Error approving claim:", error)
    return NextResponse.json({ error: "Failed to approve claim" }, { status: 500 })
  }
}
