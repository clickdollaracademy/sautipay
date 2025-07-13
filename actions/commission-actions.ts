"use server"

import { revalidatePath } from "next/cache"

export async function updateCommissionStatus(id: string, status: "Paid") {
  try {
    // In a real application, you would update the commission status in a database
    // For demo purposes, we'll just return success

    // Revalidate the commissions page to show the updated status
    revalidatePath("/dashboard/commission")

    return {
      success: true,
      message: "Commission marked as paid successfully",
    }
  } catch (error) {
    console.error(`Error updating commission status:`, error)
    return {
      error: "Failed to update commission status",
    }
  }
}

