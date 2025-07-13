"use client"

import { useState, useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"

export function QRScanner() {
  const [scanResult, setScanResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })

    scanner.render(success, error)

    function success(result: string) {
      scanner.clear()
      setScanResult(result)
      handleQRLogin(result)
    }

    function error(err: any) {
      console.warn(err)
    }

    return () => {
      scanner.clear().catch(console.error)
    }
  }, [])

  const handleQRLogin = async (qrData: string) => {
    setIsLoading(true)
    try {
      // Here you would typically verify the QR code data with your backend
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard")
    } catch (error) {
      console.error("QR login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-lg border p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[250px]">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div id="reader" />
        )}
      </div>
      <p className="text-sm text-muted-foreground text-center">Position the QR code within the frame to scan</p>
    </div>
  )
}

