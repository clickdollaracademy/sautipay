"use client"

import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

interface NotificationData {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export function NotificationsToast() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      // Check for new notifications (in real app, this would be WebSocket or polling)
      const mockNotifications: NotificationData[] = [
        {
          id: `notif_${Date.now()}`,
          type: "success",
          title: "Payment Confirmed",
          message: "Your travel insurance payment has been processed successfully.",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: `notif_${Date.now() + 1}`,
          type: "info",
          title: "Claim Update",
          message: "Your claim CLM123456 is now under review.",
          timestamp: new Date().toISOString(),
          read: false,
        },
      ]

      // Randomly show notifications (simulate real-time updates)
      if (Math.random() > 0.95) {
        // 5% chance every interval
        const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)]

        setNotifications((prev) => [randomNotification, ...prev.slice(0, 9)]) // Keep last 10

        // Show toast notification
        const icon = {
          success: <CheckCircle className="h-4 w-4" />,
          error: <AlertCircle className="h-4 w-4" />,
          info: <Info className="h-4 w-4" />,
          warning: <AlertCircle className="h-4 w-4" />,
        }[randomNotification.type]

        toast({
          title: (
            <div className="flex items-center gap-2">
              {icon}
              {randomNotification.title}
            </div>
          ),
          description: randomNotification.message,
          duration: 5000,
        })
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return null // This component only handles background notifications
}
