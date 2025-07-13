import { NextResponse } from "next/server"
import { getBrokers } from "@/lib/data/brokers"
import { requireAuth } from "@/lib/auth"

export async function GET(request: Request) {
  // Ensure user is authenticated
  const authResult = await requireAuth(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const companyId = searchParams.get("companyId") || authResult.user.companyId

    const brokers = await getBrokers({
      page,
      limit,
      search,
      companyId, // Filter by company ID for regular users
    })

    return NextResponse.json({
      success: true,
      data: brokers.data,
      pagination: brokers.pagination,
    })
  } catch (error) {
    console.error("Error fetching brokers:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch brokers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // Ensure user is authenticated
  const authResult = await requireAuth(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const data = await request.json()

    // In a real application, you would validate and save the broker to a database
    // For demo purposes, we'll just return the data with an ID

    return NextResponse.json({
      success: true,
      message: "Broker created successfully",
      data: {
        id: Math.floor(Math.random() * 1000),
        ...data,
        companyId: authResult.user.companyId, // Associate with the user's company
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error creating broker:", error)
    return NextResponse.json({ success: false, message: "Failed to create broker" }, { status: 500 })
  }
}

