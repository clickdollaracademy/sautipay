import { type NextRequest, NextResponse } from "next/server"

interface PaymentData {
  bookingId: string
  paymentMethod: string
  amount: number
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
  mobileNumber?: string
  bankAccount?: string
}

// POST /api/payments/process - Process payment
export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentData = await request.json()

    // Validate required fields
    if (!paymentData.bookingId || !paymentData.paymentMethod || !paymentData.amount) {
      return NextResponse.json({ error: "Missing required payment information" }, { status: 400 })
    }

    console.log("[v0] Processing payment:", {
      bookingId: paymentData.bookingId,
      method: paymentData.paymentMethod,
      amount: paymentData.amount,
    })

    // Simulate payment processing based on method
    let processingTime = 2000 // Default processing time

    switch (paymentData.paymentMethod) {
      case "card":
        // Validate card details
        if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
          return NextResponse.json({ error: "Missing card details" }, { status: 400 })
        }
        processingTime = 3000
        break

      case "mobile":
        // Validate mobile number
        if (!paymentData.mobileNumber) {
          return NextResponse.json({ error: "Missing mobile number" }, { status: 400 })
        }
        processingTime = 5000 // Mobile money takes longer
        break

      case "bank":
        // Validate bank account
        if (!paymentData.bankAccount) {
          return NextResponse.json({ error: "Missing bank account details" }, { status: 400 })
        }
        processingTime = 1000 // Bank transfer is quick to initiate
        break

      default:
        return NextResponse.json({ error: "Invalid payment method" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    // Generate transaction ID
    const transactionId = `TXN${Date.now()}`
    const policyNumber = `POL${paymentData.bookingId}`

    // In a real implementation:
    // 1. Process payment with payment gateway
    // 2. Update booking status in database
    // 3. Generate policy document
    // 4. Send confirmation email/SMS
    // 5. Update commission tracking
    // 6. Schedule settlement

    console.log("[v0] Payment processed successfully:", {
      transactionId,
      policyNumber,
      bookingId: paymentData.bookingId,
    })

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05

    if (!isSuccess) {
      return NextResponse.json(
        {
          error: "Payment failed",
          message: "Your payment could not be processed. Please try again or use a different payment method.",
        },
        { status: 402 },
      )
    }

    return NextResponse.json({
      success: true,
      transactionId,
      policyNumber,
      bookingId: paymentData.bookingId,
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      status: paymentData.paymentMethod === "bank" ? "pending" : "completed",
      message:
        paymentData.paymentMethod === "bank"
          ? "Payment initiated. Policy will be activated upon bank transfer confirmation."
          : "Payment successful! Your travel insurance policy is now active.",
    })
  } catch (error) {
    console.error("[v0] Error processing payment:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
