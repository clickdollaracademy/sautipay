import { NextResponse } from "next/server"
import { getCommissions } from "@/lib/data/commissions"
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
    const currency = searchParams.get("currency") || ""

    // Company filter (for admin/owner, regular users are limited to their company)
    const companyId =
      searchParams.get("companyId") || (authResult.user.role === "owner" ? "" : authResult.user.companyId)

    const commissions = await getCommissions({
      page,
      limit,
      search,
      startDate,
      endDate,
      status,
      currency,
      companyId,
    })

    return NextResponse.json({
      success: true,
      data: commissions.data,
      pagination: commissions.pagination,
    })
  } catch (error) {
    console.error("Error fetching commissions:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch commissions" }, { status: 500 })
  }
}

