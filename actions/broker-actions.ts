"use server"

import { revalidatePath } from "next/cache"

export async function createBroker(formData: FormData) {
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

export async function updateBroker(id: string, formData: FormData) {
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

    // In a real application, you would update the broker in a database
    // For demo purposes, we'll just return success

    // Revalidate the brokers page to show the updated broker
    revalidatePath("/dashboard/brokers")

    return {
      success: true,
      message: "Broker updated successfully",
    }
  } catch (error) {
    console.error(`Error updating broker:`, error)
    return {
      error: "Failed to update broker",
    }
  }
}

export async function deleteBroker(id: string) {
  try {
    // In a real application, you would delete the broker from a database
    // For demo purposes, we'll just return success

    // Revalidate the brokers page to remove the deleted broker
    revalidatePath("/dashboard/brokers")

    return {
      success: true,
      message: "Broker deleted successfully",
    }
  } catch (error) {
    console.error(`Error deleting broker:`, error)
    return {
      error: "Failed to delete broker",
    }
  }
}
