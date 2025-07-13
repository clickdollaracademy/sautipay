import { NextResponse } from "next/server"

export async function PATCH(request: Request) {
  try {
    const data = await request.json()

    // In a real application, you would save this data to a database
    console.log("Received deductibles update:", data)

    return NextResponse.json({
      success: true,
      message: "Deductibles updated successfully",
    })
  } catch (error) {
    console.error("Error updating deductibles:", error)
    return NextResponse.json({ success: false, message: "Failed to update deductibles" }, { status: 500 })
  }
}

