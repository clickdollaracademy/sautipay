import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real application, you would fetch the approval from a database
    // For demo purposes, we'll return mock data

    return NextResponse.json({
      success: true,
      data: {
        id,
        type: "Payment",
        companyName: "Acme Inc",
        amount: 15000,
        currency: "USD",
        requestDate: "2023-08-15",
        priority: "High",
        description: "Large payment requiring approval due to exceeding threshold.",
        requestedBy: "John Doe",
        details: {
          transactionId: "TRX123456",
          paymentMethod: "Credit Card",
          customerName: "Alice Johnson",
        },
      },
    })
  } catch (error) {
    console.error(`Error fetching approval ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to fetch approval" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { status, notes } = await request.json()

    // In a real application, you would update the approval in a database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      success: true,
      message: `Approval ${status === "approved" ? "approved" : "rejected"} successfully`,
      data: {
        id,
        status,
        notes,
        processedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error(`Error updating approval ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to update approval" }, { status: 500 })
  }
}
