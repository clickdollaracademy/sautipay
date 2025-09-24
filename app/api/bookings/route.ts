import { type NextRequest, NextResponse } from "next/server"

interface BookingData {
  surname: string
  firstName: string
  email: string
  mobile: string
  destination: string
  adults: number
  children: number
  departureDate: string
  arrivalDate: string
  additionalComments: string
  premium: number
  bookingId: string
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json()

    // Validate required fields
    const requiredFields = ["surname", "firstName", "email", "mobile", "destination", "departureDate", "arrivalDate"]
    for (const field of requiredFields) {
      if (!bookingData[field as keyof BookingData]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Generate booking ID if not provided
    if (!bookingData.bookingId) {
      bookingData.bookingId = `TB${Date.now()}`
    }

    // Calculate premium if not provided
    if (!bookingData.premium) {
      const basePremium = 50
      const childDiscount = 0.5
      bookingData.premium = bookingData.adults * basePremium + bookingData.children * basePremium * childDiscount
    }

    // In a real implementation, save to database
    console.log("[v0] Booking created:", bookingData)

    // Simulate database save
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      bookingId: bookingData.bookingId,
      premium: bookingData.premium,
      message: "Booking created successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

// GET /api/bookings/[id] - Get booking by ID
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const bookingId = url.pathname.split("/").pop()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 })
    }

    // In a real implementation, fetch from database
    console.log("[v0] Fetching booking:", bookingId)

    // Simulate database fetch
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Mock booking data
    const mockBooking = {
      bookingId,
      surname: "Doe",
      firstName: "John",
      email: "john.doe@example.com",
      mobile: "+1234567890",
      destination: "Paris, France",
      adults: 2,
      children: 1,
      departureDate: "2024-06-15",
      arrivalDate: "2024-06-22",
      premium: 125.0,
      status: "confirmed",
      policyNumber: `POL${bookingId}`,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      booking: mockBooking,
    })
  } catch (error) {
    console.error("[v0] Error fetching booking:", error)
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}
