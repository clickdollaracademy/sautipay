import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a real application, you would fetch payment methods from a database
    // For demo purposes, we'll return mock data

    const paymentMethods = [
      {
        id: "stripe",
        name: "Stripe",
        enabled: true,
        supportedCurrencies: ["USD", "EUR", "GBP"],
        processingFee: "2.9% + $0.30",
      },
      {
        id: "visa",
        name: "Visa",
        enabled: true,
        supportedCurrencies: ["USD", "EUR", "GBP", "JPY"],
        processingFee: "2.5%",
      },
      {
        id: "mtn",
        name: "MTN Mobile Money",
        enabled: true,
        supportedCurrencies: ["UGX"],
        processingFee: "1.5%",
      },
      {
        id: "airtel",
        name: "Airtel Money",
        enabled: true,
        supportedCurrencies: ["UGX"],
        processingFee: "1.5%",
      },
    ]

    return NextResponse.json({
      success: true,
      data: paymentMethods,
    })
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch payment methods" }, { status: 500 })
  }
}

