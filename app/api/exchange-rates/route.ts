import { NextResponse } from "next/server"
import { exchangeRates } from "@/lib/exchange-rates"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: exchangeRates,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch exchange rates" }, { status: 500 })
  }
}
