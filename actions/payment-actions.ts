"use server"

import { revalidatePath } from "next/cache"

export async function processPayment(formData: FormData) {
  try {
    const amount = Number.parseFloat(formData.get("amount") as string)
    const currency = formData.get("currency") as string
    const paymentMethod = formData.get("paymentMethod") as string

    if (isNaN(amount) || !currency || !paymentMethod) {
      return {
        error: "Amount, currency, and payment method are required",
      }
    }

    // In a real application, you would process the payment through a payment gateway
    // For demo purposes, we'll just return success

    // Revalidate the payments page to show the new payment
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Payment processed successfully",
      data: {
        transactionId: `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
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
      error: "Failed to process payment",
    }
  }
}

export async function getPaymentHistory() {
  try {
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
      error: "Failed to fetch payment history",
    }
  }
}

