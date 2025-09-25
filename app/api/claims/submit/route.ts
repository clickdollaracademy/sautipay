import { type NextRequest, NextResponse } from "next/server"

interface ClaimData {
  policyNumber: string
  fullName: string
  email: string
  phone: string
  incidentDescription: string
  claimType: string
  preferredSettlement: string
  bankDetails: string
  documents?: Array<{
    name: string
    type: string
    size: number
    url: string
  }>
}

// POST /api/claims/submit - Submit insurance claim
export async function POST(request: NextRequest) {
  try {
    const claimData: ClaimData = await request.json()

    // Validate required fields
    const requiredFields = ["policyNumber", "fullName", "email", "phone", "incidentDescription", "claimType"]
    for (const field of requiredFields) {
      if (!claimData[field as keyof ClaimData]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate claim reference number
    const claimReference = `CLM${Date.now()}`

    console.log("[v0] Claim submitted:", {
      claimReference,
      policyNumber: claimData.policyNumber,
      claimType: claimData.claimType,
      claimant: claimData.fullName,
    })

    const claimTransactionData = {
      id: `TRAN${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}${Math.floor(Math.random() * 99) + 1}JAZZ`,
      date: new Date().toISOString().split("T")[0],
      clientName: claimData.fullName,
      amount: 0, // Will be updated when claim is approved
      currency: "USD",
      netPremium: 0,
      status: "Pending",
      companyId: "company1",
      claimReference: claimReference,
      policyNumber: claimData.policyNumber,
      transactionType: "claim_submission",
    }

    console.log("[v0] Claim transaction created:", claimTransactionData)

    // In a real implementation:
    // 1. Save claim to database
    // 2. Upload and process documents
    // 3. Send confirmation email/SMS
    // 4. Notify claims processing team
    // 5. Update policy status
    // 6. Create audit trail

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Send confirmation notification
    const notificationResponse = await fetch(`${request.nextUrl.origin}/api/notifications/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "both",
        recipient: {
          email: claimData.email,
          phone: claimData.phone,
          name: claimData.fullName,
        },
        template: "claim_update",
        data: {
          claimReference,
          policyNumber: claimData.policyNumber,
          status: "submitted",
        },
      }),
    })

    console.log("[v0] Claim confirmation sent:", claimReference)

    return NextResponse.json({
      success: true,
      claimReference,
      status: "submitted",
      estimatedProcessingTime: "5-7 business days",
      nextSteps: [
        "Your claim has been received and assigned reference number " + claimReference,
        "You will receive email and SMS updates on claim progress",
        "Our claims team will review your submission within 24 hours",
        "Additional documentation may be requested if needed",
      ],
      message: "Claim submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error submitting claim:", error)
    return NextResponse.json({ error: "Failed to submit claim" }, { status: 500 })
  }
}
