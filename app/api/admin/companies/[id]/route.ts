import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Ensure only admins can access this endpoint
  const authResult = await requireAdmin(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { id } = params

    // In a real application, you would fetch the company from a database
    // For demo purposes, we'll return mock data

    return NextResponse.json({
      success: true,
      data: {
        id,
        name: "Acme Corp",
        industry: "Technology",
        onboardingDate: "Jan 15, 2023",
        transactionStartDate: "Feb 1, 2023",
        contractStartDate: "Jan 15, 2023",
        contractEndDate: "Jan 15, 2025",
        status: "Active",
        nearingExpiry: true,
        contractUrl: "/contracts/acme-corp.pdf",
      },
    })
  } catch (error) {
    console.error(`Error fetching company ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to fetch company" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  // Ensure only admins can access this endpoint
  const authResult = await requireAdmin(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { id } = params
    const data = await request.json()

    // In a real application, you would update the company in a database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Company updated successfully",
      data: {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error(`Error updating company ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to update company" }, { status: 500 })
  }
}
