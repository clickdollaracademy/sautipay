"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Mail, Phone, FileText, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")
  const [confirmationSent, setConfirmationSent] = useState(false)
  const exchangeRate = 3700 // UGX per USD - should be fetched from admin settings
  const mockPremium = 125.0 // This should come from the actual booking data

  useEffect(() => {
    // Simulate sending confirmation email/SMS
    const timer = setTimeout(() => {
      setConfirmationSent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const downloadPolicy = () => {
    // In a real implementation, this would generate and download a PDF
    alert("Policy document download would start here")
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-green-700">Booking Confirmed!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your travel insurance policy has been successfully activated. You are now protected for your upcoming journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Confirmation Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Policy Confirmation
              </CardTitle>
              <CardDescription>Your travel insurance policy is now active</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500">Premium Paid</h4>
                    <p className="font-mono text-lg">${mockPremium.toFixed(2)} USD</p>
                    <p className="text-sm text-gray-600">UGX {(mockPremium * exchangeRate).toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500">Policy Status</h4>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">What happens next?</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Confirmation Email Sent</p>
                        <p className="text-sm text-gray-600">
                          {confirmationSent ? (
                            <span className="text-green-600">✓ Confirmation email has been sent to your inbox</span>
                          ) : (
                            "Sending confirmation email with policy details..."
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Policy Documents</p>
                        <p className="text-sm text-gray-600">
                          Download your policy certificate and keep it handy during travel
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-blue-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium">24/7 Support</p>
                        <p className="text-sm text-gray-600">
                          Our emergency assistance team is available round the clock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Payment Note:</strong> Mobile money payments are processed in UGX at the current exchange
                    rate of 1 USD = {exchangeRate.toLocaleString()} UGX
                  </p>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-3">
                  <Button onClick={downloadPolicy} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Policy Certificate
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/claims">
                      <FileText className="h-4 w-4 mr-2" />
                      File a Claim
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Assistance</CardTitle>
              <CardDescription>Available 24/7 during your travel period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Emergency Hotline</h4>
                    <p className="text-sm text-gray-600">+1-800-EMERGENCY</p>
                    <p className="text-xs text-gray-500">Available 24/7 worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Emergency Email</h4>
                    <p className="text-sm text-gray-600">emergency@sautipay.com</p>
                    <p className="text-xs text-gray-500">Response within 1 hour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policy Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Policy Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-gray-500">Coverage Limits</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Medical Emergency</span>
                    <span className="font-medium">$100,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Trip Cancellation</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Baggage Protection</span>
                    <span className="font-medium">$2,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Personal Liability</span>
                    <span className="font-medium">$50,000</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-sm text-gray-500">Important Reminders</h4>
                <div className="space-y-2 mt-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Keep policy documents accessible during travel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Coverage is valid worldwide</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 text-blue-600" />
                    <span>Contact us immediately in case of emergency</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800 text-center">
                  <CheckCircle className="inline h-3 w-3 mr-1" />
                  Your policy is active and ready for travel
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
