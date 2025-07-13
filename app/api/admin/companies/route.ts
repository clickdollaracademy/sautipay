import { NextResponse } from "next/server"
import { getCompanies } from "@/lib/data/companies"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: Request) {
  // Ensure only admins can access this endpoint
  const authResult = await requireAdmin(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status") || ""
    const search = searchParams.get("search") || ""

    const companies = await getCompanies({ page, limit, status, search })

    return NextResponse.json({
      success: true,
      data: companies.data,
      pagination: companies.pagination,
    })
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch companies" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // Ensure only admins can access this endpoint
  const authResult = await requireAdmin(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const data = await request.json()

    // In a real application, you would validate and save the company to a database
    // For demo purposes, we'll just return the data with an ID

    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      data: {
        id: Math.floor(Math.random() * 1000).toString(),
        ...data,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error creating company:", error)
    return NextResponse.json({ success: false, message: "Failed to create company" }, { status: 500 })
  }
}

