import { NextResponse } from "next/server"

// Simplified auth route that always returns success
export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json()
    const { email, role } = body

    console.log("Simulated authentication for:", { email, role })

    // Always return success for now
    return NextResponse.json({
      success: true,
      message: "Authentication successful (simulated)",
      user: {
        email,
        role: role || "user",
      },
    })
  } catch (error: any) {
    console.error("Error in auth route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

