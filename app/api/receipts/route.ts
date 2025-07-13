import { NextResponse } from "next/server"
import { getReceipts } from "@/lib/data/receipts"
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
    const currency = searchParams.get("currency") || ""

    // Company filter (for admin/owner, regular users are limited to their company)
    const companyId =
      searchParams.get("companyId") || (authResult.user.role === "owner" ? "" : authResult.user.companyId)

    const receipts = await getReceipts({
      page,
      limit,
      search,
      startDate,
      endDate,
      currency,
      companyId,
    })

    return NextResponse.json({
      success: true,
      data: receipts.data,
      pagination: receipts.pagination,
    })
  } catch (error) {
    console.error("Error fetching receipts:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch receipts" }, { status: 500 })
  }
}

