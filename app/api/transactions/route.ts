import { NextResponse } from "next/server"
import { getTransactions } from "@/lib/data/transactions"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page") as string) : 1
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit") as string) : 10
  const search = searchParams.get("search") || ""
  const startDate = searchParams.get("startDate") || ""
  const endDate = searchParams.get("endDate") || ""
  const status = searchParams.get("status") || ""
  const currency = searchParams.get("currency") || ""
  const companyId = searchParams.get("companyId") || ""

  const filters = {
    page,
    limit,
    search,
    startDate,
    endDate,
    status,
    currency,
    companyId,
  }

  try {
    const result = await getTransactions(filters)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

