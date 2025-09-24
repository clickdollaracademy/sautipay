import { type NextRequest, NextResponse } from "next/server"

// GET /api/claims/track/[reference] - Track claim status
export async function GET(request: NextRequest, { params }: { params: { reference: string } }) {
  try {
    const { reference } = params

    if (!reference) {
      return NextResponse.json({ error: "Claim reference is required" }, { status: 400 })
    }

    console.log("[v0] Tracking claim:", reference)

    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock claim tracking data
    const mockClaimData = {
      claimReference: reference,
      policyNumber: "POL1234567890",
      status: "under_review",
      submittedDate: "2024-01-15T10:30:00Z",
      lastUpdated: "2024-01-18T14:20:00Z",
      estimatedCompletion: "2024-01-22T17:00:00Z",
      claimAmount: 2500.0,
      approvedAmount: null,
      timeline: [
        {
          date: "2024-01-15T10:30:00Z",
          status: "submitted",
          description: "Claim submitted successfully",
          completed: true,
        },
        {
          date: "2024-01-16T09:15:00Z",
          status: "documents_received",
          description: "All required documents received",
          completed: true,
        },
        {
          date: "2024-01-17T11:45:00Z",
          status: "initial_review",
          description: "Initial review completed",
          completed: true,
        },
        {
          date: "2024-01-18T14:20:00Z",
          status: "under_review",
          description: "Detailed assessment in progress",
          completed: true,
        },
        {
          date: null,
          status: "decision",
          description: "Claim decision pending",
          completed: false,
        },
        {
          date: null,
          status: "settlement",
          description: "Payment processing",
          completed: false,
        },
      ],
      documents: [
        { name: "Medical Report.pdf", uploadDate: "2024-01-15T10:30:00Z", status: "verified" },
        { name: "Receipts.pdf", uploadDate: "2024-01-15T10:32:00Z", status: "verified" },
        { name: "Police Report.pdf", uploadDate: "2024-01-16T09:15:00Z", status: "verified" },
      ],
      nextSteps: [
        "Claims assessor is reviewing your medical documentation",
        "You may be contacted for additional information if needed",
        "Decision expected by January 22, 2024",
      ],
    }

    return NextResponse.json({
      success: true,
      claim: mockClaimData,
    })
  } catch (error) {
    console.error("[v0] Error tracking claim:", error)
    return NextResponse.json({ error: "Failed to track claim" }, { status: 500 })
  }
}
