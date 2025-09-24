import { NextResponse } from "next/server"
import { requireAuth, requireAdmin } from "@/lib/auth"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  // Ensure user is authenticated
  const authResult = await requireAuth(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { id } = params
    const { status } = await request.json()

    // Only admins can approve/reject refunds
    if (status === "Approved" || status === "Rejected") {
      const adminResult = await requireAdmin(request)
      if (!adminResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Only administrators can approve or reject refunds",
          },
          { status: 403 },
        )
      }
    }

    // In a real application, you would update the refund status in a database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      success: true,
      message: `Refund ${id} ${status === "Approved" ? "approved" : "rejected"} successfully`,
      data: {
        id,
        status,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error(`Error updating refund ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to update refund" }, { status: 500 })
  }
}
