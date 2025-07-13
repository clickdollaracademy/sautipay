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

    // Only admins can mark commissions as paid
    if (status === "Paid") {
      const adminResult = await requireAdmin(request)
      if (!adminResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Only administrators can mark commissions as paid",
          },
          { status: 403 },
        )
      }
    }

    // In a real application, you would update the commission status in a database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      success: true,
      message: `Commission ${id} marked as ${status} successfully`,
      data: {
        id,
        status,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error(`Error updating commission ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to update commission" }, { status: 500 })
  }
}

