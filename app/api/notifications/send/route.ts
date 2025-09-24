import { type NextRequest, NextResponse } from "next/server"

interface NotificationData {
  type: "email" | "sms" | "both"
  recipient: {
    email?: string
    phone?: string
    name?: string
  }
  template: "booking_confirmation" | "payment_success" | "policy_activated" | "claim_update"
  data: Record<string, any>
}

// POST /api/notifications/send - Send notification
export async function POST(request: NextRequest) {
  try {
    const notificationData: NotificationData = await request.json()

    // Validate required fields
    if (!notificationData.type || !notificationData.recipient || !notificationData.template) {
      return NextResponse.json({ error: "Missing required notification data" }, { status: 400 })
    }

    console.log("[v0] Sending notification:", {
      type: notificationData.type,
      template: notificationData.template,
      recipient: notificationData.recipient.email || notificationData.recipient.phone,
    })

    // Simulate notification sending
    const notifications = []

    if (notificationData.type === "email" || notificationData.type === "both") {
      if (!notificationData.recipient.email) {
        return NextResponse.json({ error: "Email address required for email notification" }, { status: 400 })
      }

      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000))
      notifications.push({
        type: "email",
        status: "sent",
        recipient: notificationData.recipient.email,
        sentAt: new Date().toISOString(),
      })
    }

    if (notificationData.type === "sms" || notificationData.type === "both") {
      if (!notificationData.recipient.phone) {
        return NextResponse.json({ error: "Phone number required for SMS notification" }, { status: 400 })
      }

      // Simulate SMS sending
      await new Promise((resolve) => setTimeout(resolve, 800))
      notifications.push({
        type: "sms",
        status: "sent",
        recipient: notificationData.recipient.phone,
        sentAt: new Date().toISOString(),
      })
    }

    console.log("[v0] Notifications sent successfully:", notifications)

    return NextResponse.json({
      success: true,
      notifications,
      message: "Notifications sent successfully",
    })
  } catch (error) {
    console.error("[v0] Error sending notifications:", error)
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 })
  }
}
