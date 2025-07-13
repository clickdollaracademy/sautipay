import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real application, you would fetch the broker from a database
    // For demo purposes, we'll return mock data

    return NextResponse.json({
      success: true,
      data: {
        id,
        name: "John Doe",
        company: "Doe Insurance",
        code: "JD001",
        email: "john@example.com",
        phone: "123-456-7890",
        commissionRate: 5,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
    })
  } catch (error) {
    console.error(`Error fetching broker ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to fetch broker" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await request.json()

    // In a real application, you would update the broker in a database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Broker updated successfully",
      data: {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error(`Error updating broker ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to update broker" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real application, you would delete the broker from a database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      success: true,
      message: "Broker deleted successfully",
    })
  } catch (error) {
    console.error(`Error deleting broker ${params.id}:`, error)
    return NextResponse.json({ success: false, message: "Failed to delete broker" }, { status: 500 })
  }
}

