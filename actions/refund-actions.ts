"use server"

import { revalidatePath } from "next/cache"

export async function createRefundRequest(formData: FormData) {
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

export async function updateRefundStatus(id: string, status: "Approved" | "Rejected") {
  try {
    // In a real application, you would update the refund status in a database
    // For demo purposes, we'll just return success

    // Revalidate the refunds page to show the updated status
    revalidatePath("/dashboard/refund")

    return {
      success: true,
      message: `Refund ${status.toLowerCase()} successfully`,
    }
  } catch (error) {
    console.error(`Error updating refund status:`, error)
    return {
      error: "Failed to update refund status",
    }
  }
}
