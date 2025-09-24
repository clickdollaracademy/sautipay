import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // In a real application, you would fetch payment history from a database
    // For demo purposes, we'll return mock data

    const payments = [
      {
        id: "PAY001",
        date: "2023-06-15",
        amount: 1000,
        currency: "USD",
        method: "Stripe",
        status: "Successful",
      },
      {
        id: "PAY002",
        date: "2023-06-16",
        amount: 750,
        currency: "EUR",
        method: "Visa",
        status: "Successful",
      },
      {
        id: "PAY003",
        date: "2023-06-17",
        amount: 500,
        currency: "GBP",
        method: "MTN Mobile Money",
        status: "Failed",
      },
      {
        id: "PAY004",
        date: "2023-06-18",
        amount: 100000,
        currency: "JPY",
        method: "Airtel Money",
        status: "Successful",
      },
    ]

    // Calculate pagination
    const total = payments.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // Get paginated data
    const paginatedData = payments.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching payment history:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch payment history" }, { status: 500 })
  }
}
