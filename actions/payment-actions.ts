"use server"

import { revalidatePath } from "next/cache"

export async function processPayment(formData: FormData) {
  try {
    const amount = Number.parseFloat(formData.get("amount") as string)
    const currency = formData.get("currency") as string
    const paymentMethod = formData.get("paymentMethod") as string

    if (!amount || isNaN(amount) || amount <= 0) {
      return {
        error: "Valid payment amount is required",
      }
    }

    if (amount > 1000000) {
      return {
        error: "Payment amount exceeds maximum limit",
      }
    }

    if (!currency || typeof currency !== "string" || currency.length !== 3) {
      return {
        error: "Valid currency code is required",
      }
    }

    if (!paymentMethod || typeof paymentMethod !== "string") {
      return {
        error: "Payment method is required",
      }
    }

    const now = Date.now()
    const lastPayment = global.lastPaymentTime || 0
    if (now - lastPayment < 1000) {
      // 1 second rate limit
      return {
        error: "Please wait before making another payment",
      }
    }
    global.lastPaymentTime = now

    // In a real application, you would process the payment through a payment gateway
    // For demo purposes, we'll just return success

    const transactionId = `TRX${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Revalidate the payments page to show the new payment
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Payment processed successfully",
      data: {
        transactionId,
        amount,
        currency,
        paymentMethod,
        status: "Completed",
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error processing payment:", error)
    return {
      error: "Failed to process payment. Please try again.",
    }
  }
}

export async function getPaymentHistory() {
  try {
    if (Math.random() < 0.01) {
      // 1% chance of simulated error
      throw new Error("Simulated database connection error")
    }

    // In a real application, you would fetch payment history from a database
    // For demo purposes, we'll return mock data

    return {
      success: true,
      data: [
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
      ],
    }
  } catch (error) {
    console.error("Error fetching payment history:", error)
    return {
      error: "Failed to fetch payment history. Please try again later.",
    }
  }
}
