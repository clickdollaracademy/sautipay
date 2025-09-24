"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function onboardCompany(formData: FormData) {
  // Check if user is admin
  const userRole = cookies().get("user_role")?.value
  if (userRole !== "owner" && userRole !== "admin") {
    return {
      error: "Admin privileges required",
    }
  }

  try {
    const name = formData.get("name") as string
    const industry = formData.get("industry") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const contractNumber = formData.get("contractNumber") as string
    const contactName = formData.get("contactName") as string
    const contactEmail = formData.get("contactEmail") as string
    const contactPhone = formData.get("contactPhone") as string
    const subscriptionPlan = formData.get("subscriptionPlan") as string

    if (!name || !industry || !email || !contractNumber) {
      return {
        error: "Required fields are missing",
      }
    }

    // In a real application, you would save the company to a database
    // For demo purposes, we'll just return success

    // Revalidate the companies page to show the new company
    revalidatePath("/owner/companies")

    return {
      success: true,
      message: "Company onboarded successfully",
    }
  } catch (error) {
    console.error("Error onboarding company:", error)
    return {
      error: "Failed to onboard company",
    }
  }
}

export async function processApproval(id: string, status: "approved" | "rejected", notes?: string) {
  // Check if user is admin
  const userRole = cookies().get("user_role")?.value
  if (userRole !== "owner" && userRole !== "admin") {
    return {
      error: "Admin privileges required",
    }
  }

  try {
    // In a real application, you would update the approval in a database
    // For demo purposes, we'll just return success

    // Revalidate the approvals page to show the updated status
    revalidatePath("/owner/approvals")

    return {
      success: true,
      message: `Approval ${status} successfully`,
    }
  } catch (error) {
    console.error(`Error processing approval:`, error)
    return {
      error: "Failed to process approval",
    }
  }
}

export async function generateReport(formData: FormData) {
  // Check if user is admin
  const userRole = cookies().get("user_role")?.value
  if (userRole !== "owner" && userRole !== "admin") {
    return {
      error: "Admin privileges required",
    }
  }

  try {
    const reportType = formData.get("reportType") as string
    const format = formData.get("format") as string
    const startDate = formData.get("startDate") as string
    const endDate = formData.get("endDate") as string

    if (!reportType) {
      return {
        error: "Report type is required",
      }
    }

    // In a real application, you would generate the report
    // For demo purposes, we'll just return success

    return {
      success: true,
      message: "Report generated successfully",
      data: {
        downloadUrl: `/reports/${reportType}_${startDate}_${endDate}.${format || "excel"}`,
      },
    }
  } catch (error) {
    console.error("Error generating report:", error)
    return {
      error: "Failed to generate report",
    }
  }
}

export async function suspendCompany(id: string) {
  // Check if user is admin
  const userRole = cookies().get("user_role")?.value
  if (userRole !== "owner" && userRole !== "admin") {
    return {
      error: "Admin privileges required",
    }
  }

  try {
    // In a real application, you would update the company status in a database
    // For demo purposes, we'll just return success

    // Revalidate the companies page to show the updated status
    revalidatePath("/owner/companies")

    return {
      success: true,
      message: "Company suspended successfully",
    }
  } catch (error) {
    console.error(`Error suspending company:`, error)
    return {
      error: "Failed to suspend company",
    }
  }
}
