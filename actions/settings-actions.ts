"use server"

import { revalidatePath } from "next/cache"

export async function updateGeneralSettings(formData: FormData) {
  try {
    const companyName = formData.get("companyName") as string
    const contactEmail = formData.get("contactEmail") as string
    const defaultCurrency = formData.get("defaultCurrency") as string

    if (!companyName || !contactEmail || !defaultCurrency) {
      return {
        error: "All fields are required",
      }
    }

    // In a real application, you would update settings in a database
    // For demo purposes, we'll just return success

    // Revalidate the settings page to show the updated settings
    revalidatePath("/dashboard/settings")

    return {
      success: true,
      message: "General settings updated successfully",
    }
  } catch (error) {
    console.error("Error updating general settings:", error)
    return {
      error: "Failed to update general settings",
    }
  }
}

export async function updateBrandingSettings(formData: FormData) {
  try {
    const logoUrl = formData.get("logoUrl") as string
    const headerText = formData.get("headerText") as string
    const footerText = formData.get("footerText") as string
    const primaryColor = formData.get("primaryColor") as string
    const secondaryColor = formData.get("secondaryColor") as string

    // In a real application, you would update settings in a database
    // For demo purposes, we'll just return success

    // Revalidate the settings page to show the updated settings
    revalidatePath("/dashboard/settings")

    return {
      success: true,
      message: "Branding settings updated successfully",
    }
  } catch (error) {
    console.error("Error updating branding settings:", error)
    return {
      error: "Failed to update branding settings",
    }
  }
}

