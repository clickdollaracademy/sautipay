import { NextResponse } from "next/server"
import { getSettlements } from "@/lib/data/settlements"
import { requireAuth } from "@/lib/auth"

export async function GET(request: Request) {
  // Ensure user is authenticated
  const authResult = await requireAuth(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)

    // Pagination params
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Filter params
    const search = searchParams.get("search") || ""
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""
    const status = searchParams.get("status") || ""

    // Company filter (for admin/owner, regular users are limited to their company)
    const companyId =
      searchParams.get("companyId") || (authResult.user.role === "owner" ? "" : authResult.user.companyId)

    const settlements = await getSettlements({
      page,
      limit,
      search,
      startDate,
      endDate,
      status,
      companyId,
    })

    return NextResponse.json({
      success: true,
      data: settlements.data,
      pagination: settlements.pagination,
    })
  } catch (error) {
    console.error("Error fetching settlements:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch settlements" }, { status: 500 })
  }
}
