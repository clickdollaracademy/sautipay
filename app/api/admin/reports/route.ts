import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: Request) {
  // Ensure only admins can access this endpoint
  const authResult = await requireAdmin(request)
  if (!authResult.success) {
    return NextResponse.json({ success: false, message: authResult.message }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const reportType = searchParams.get("type") || "financial"
    const format = searchParams.get("format") || "excel"
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""

    // In a real application, you would generate the report based on the parameters
    // For demo purposes, we'll just return a success message with a download URL

    return NextResponse.json({
      success: true,
      message: "Report generated successfully",
      data: {
        downloadUrl: `/reports/${reportType}_${startDate}_${endDate}.${format}`,
        reportType,
        format,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ success: false, message: "Failed to generate report" }, { status: 500 })
  }
}
