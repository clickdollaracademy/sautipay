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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let paymentData: PaymentData

    try {
      paymentData = await request.json()
    } catch (parseError) {
      clearTimeout(timeoutId)
      console.error("[v0] Invalid JSON in payment request:", parseError)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    clearTimeout(timeoutId)

    const validationErrors = []

    if (!paymentData.bookingId || typeof paymentData.bookingId !== "string") {
      validationErrors.push("Valid booking ID is required")
    }

    if (!paymentData.paymentMethod || typeof paymentData.paymentMethod !== "string") {
      validationErrors.push("Payment method is required")
    }

    if (!paymentData.amount || typeof paymentData.amount !== "number" || paymentData.amount <= 0) {
      validationErrors.push("Valid payment amount is required")
    }

    if (paymentData.amount && paymentData.amount > 100000) {
      validationErrors.push("Payment amount exceeds maximum limit ($100,000)")
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    console.log("[v0] Processing payment:", {
      bookingId: paymentData.bookingId,
      method: paymentData.paymentMethod,
      amount: paymentData.amount,
    })

    let processingTime = 2000 // Default processing time

    switch (paymentData.paymentMethod) {
      case "card":
        // Validate card details
        const cardErrors = []
        if (!paymentData.cardNumber || typeof paymentData.cardNumber !== "string") {
          cardErrors.push("Card number is required")
        } else {
          const cardNumber = paymentData.cardNumber.replace(/\s/g, "")
          if (!/^\d{13,19}$/.test(cardNumber)) {
            cardErrors.push("Invalid card number format")
          }
        }

        if (!paymentData.expiryDate || typeof paymentData.expiryDate !== "string") {
          cardErrors.push("Expiry date is required")
        } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
          cardErrors.push("Invalid expiry date format (MM/YY)")
        }

        if (!paymentData.cvv || typeof paymentData.cvv !== "string") {
          cardErrors.push("CVV is required")
        } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
          cardErrors.push("Invalid CVV format")
        }

        if (
          !paymentData.cardholderName ||
          typeof paymentData.cardholderName !== "string" ||
          paymentData.cardholderName.trim().length < 2
        ) {
          cardErrors.push("Valid cardholder name is required")
        }

        if (cardErrors.length > 0) {
          return NextResponse.json(
            {
              error: "Card validation failed",
              details: cardErrors,
            },
            { status: 400 },
          )
        }

        processingTime = 3000
        break

      case "mobile":
        // Validate mobile number
        if (!paymentData.mobileNumber || typeof paymentData.mobileNumber !== "string") {
          return NextResponse.json({ error: "Mobile number is required" }, { status: 400 })
        }

        const cleanMobile = paymentData.mobileNumber.replace(/\s/g, "")
        if (!/^[+]?[\d]{8,15}$/.test(cleanMobile)) {
          return NextResponse.json({ error: "Invalid mobile number format" }, { status: 400 })
        }

        processingTime = 5000 // Mobile money takes longer
        break

      case "bank":
        // Validate bank account
        if (!paymentData.bankAccount || typeof paymentData.bankAccount !== "string") {
          return NextResponse.json({ error: "Bank account number is required" }, { status: 400 })
        }

        if (paymentData.bankAccount.trim().length < 8) {
          return NextResponse.json({ error: "Invalid bank account number" }, { status: 400 })
        }

        processingTime = 1000 // Bank transfer is quick to initiate
        break

      default:
        return NextResponse.json(
          { error: "Invalid payment method. Supported methods: card, mobile, bank" },
          { status: 400 },
        )
    }

    const rateLimitKey = `payment_${request.ip || "unknown"}`
    const now = Date.now()

    // Simple in-memory rate limiting (in production, use Redis or similar)
    if (!global.paymentRateLimit) {
      global.paymentRateLimit = new Map()
    }

    const lastRequest = global.paymentRateLimit.get(rateLimitKey) || 0
    if (now - lastRequest < 5000) {
      // 5 second rate limit per IP
      return NextResponse.json(
        {
          error: "Too many payment requests. Please wait before trying again.",
        },
        { status: 429 },
      )
    }

    global.paymentRateLimit.set(rateLimitKey, now)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 8).toUpperCase()
    const transactionId = `TXN${timestamp}${random}`
    const policyNumber = `POL${paymentData.bookingId.replace(/[^A-Z0-9]/gi, "").toUpperCase()}`

    const transactionData = {
      id: `TRAN${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}${Math.floor(Math.random() * 99) + 1}JAZZ`,
      date: new Date().toISOString().split("T")[0],
      clientName: `Booking ${paymentData.bookingId}`,
      amount: paymentData.amount,
      currency: "USD",
      netPremium: Math.round(paymentData.amount * 0.85 * 100) / 100, // Assuming 15% fees, rounded to 2 decimals
      status: paymentData.paymentMethod === "bank" ? "Pending" : "Completed",
      companyId: "company1",
      bookingId: paymentData.bookingId,
      policyNumber: policyNumber,
      transactionType: "premium_payment",
      createdAt: new Date().toISOString(),
    }

    // In a real implementation, save transaction to database
    console.log("[v0] Transaction created:", transactionData)

    let successRate = 0.95 // Default 95% success rate

    switch (paymentData.paymentMethod) {
      case "card":
        successRate = 0.92 // Cards have slightly lower success rate
        break
      case "mobile":
        successRate = 0.88 // Mobile money has more variability
        break
      case "bank":
        successRate = 0.98 // Bank transfers are more reliable
        break
    }

    const isSuccess = Math.random() < successRate

    if (!isSuccess) {
      let errorMessage = "Your payment could not be processed. Please try again or use a different payment method."

      switch (paymentData.paymentMethod) {
        case "card":
          errorMessage = "Card payment declined. Please check your card details or try a different card."
          break
        case "mobile":
          errorMessage = "Mobile money payment failed. Please ensure you have sufficient balance and try again."
          break
        case "bank":
          errorMessage = "Bank transfer could not be initiated. Please verify your account details."
          break
      }

      return NextResponse.json(
        {
          error: "Payment failed",
          message: errorMessage,
          transactionId: transactionId, // Still provide transaction ID for tracking
        },
        { status: 402 },
      )
    }

    console.log("[v0] Payment processed successfully:", {
      transactionId,
      policyNumber,
      bookingId: paymentData.bookingId,
    })

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
      estimatedActivation:
        paymentData.paymentMethod === "bank"
          ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours for bank transfer
          : new Date().toISOString(), // Immediate for other methods
    })
  } catch (error) {
    console.error("[v0] Error processing payment:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Payment request timed out" }, { status: 408 })
    }

    return NextResponse.json(
      {
        error: "Payment processing failed",
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    )
  }
}
