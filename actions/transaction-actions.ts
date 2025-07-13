"use server"

import { revalidatePath } from "next/cache"

export async function createTransaction(formData: FormData) {
  try {
    const clientName = formData.get("clientName") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const currency = formData.get("currency") as string

    if (!clientName || isNaN(amount) || !currency) {
      return {
        error: "All fields are required",
      }
    }

    // In a real application, you would save the transaction to a database
    // For demo purposes, we'll just return success

    // Revalidate the transactions page to show the new transaction
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Transaction created successfully",
    }
  } catch (error) {
    console.error("Error creating transaction:", error)
    return {
      error: "Failed to create transaction",
    }
  }
}

