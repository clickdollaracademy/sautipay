import { NextResponse } from "next/server"
import { getApprovals } from "@/lib/data/approvals"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") || ""
    const priority = searchParams.get("priority") || ""

    const approvals = await getApprovals({ page, limit, type, priority })

    return NextResponse.json({
      success: true,
      data: approvals.data,
      pagination: approvals.pagination,
    })
  } catch (error) {
    console.error("Error fetching approvals:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch approvals" }, { status: 500 })
  }
}
