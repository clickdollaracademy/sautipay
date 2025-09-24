"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function createTransaction(formData: FormData) {
  // Check if user is authenticated
  const authToken = cookies().get("auth_token")?.value
  if (!authToken) {
    return {
      error: "Authentication required",
    }
  }

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

export async function createRefundRequest(formData: FormData) {
  // Check if user is authenticated
  const authToken = cookies().get("auth_token")?.value
  if (!authToken) {
    return {
      error: "Authentication required",
    }
  }

  try {
    const customer = formData.get("customer") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const reason = formData.get("reason") as string

    if (!customer || isNaN(amount) || !reason) {
      return {
        error: "All fields are required",
      }
    }

    // In a real application, you would save the refund request to a database
    // For demo purposes, we'll just return success

    // Revalidate the refunds page to show the new refund request
    revalidatePath("/dashboard/refund")

    return {
      success: true,
      message: "Refund request created successfully",
    }
  } catch (error) {
    console.error("Error creating refund request:", error)
    return {
      error: "Failed to create refund request",
    }
  }
}

export async function createBroker(formData: FormData) {
  // Check if user is authenticated
  const authToken = cookies().get("auth_token")?.value
  if (!authToken) {
    return {
      error: "Authentication required",
    }
  }

  try {
    const name = formData.get("name") as string
    const company = formData.get("company") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const commissionRate = Number.parseFloat(formData.get("commissionRate") as string)

    if (!name || !company || !email || !phone || isNaN(commissionRate)) {
      return {
        error: "All fields are required",
      }
    }

    // In a real application, you would save the broker to a database
    // For demo purposes, we'll just return success

    // Revalidate the brokers page to show the new broker
    revalidatePath("/dashboard/brokers")

    return {
      success: true,
      message: "Broker created successfully",
    }
  } catch (error) {
    console.error("Error creating broker:", error)
    return {
      error: "Failed to create broker",
    }
  }
}

export async function updateSettings(formData: FormData) {
  // Check if user is authenticated
  const authToken = cookies().get("auth_token")?.value
  if (!authToken) {
    return {
      error: "Authentication required",
    }
  }

  try {
    // In a real application, you would update settings in a database
    // For demo purposes, we'll just return success

    // Revalidate the settings page to show the updated settings
    revalidatePath("/dashboard/settings")

    return {
      success: true,
      message: "Settings updated successfully",
    }
  } catch (error) {
    console.error("Error updating settings:", error)
    return {
      error: "Failed to update settings",
    }
  }
}
