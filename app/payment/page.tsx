"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Shield, Lock, CheckCircle, Smartphone, Building, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface BookingData {
  surname: string
  firstName: string
  email: string
  mobile: string
  destination: string
  adults: number
  children: number
  departureDate: string
  arrivalDate: string
  premium: number
  bookingId: string
}

interface PaymentFormData {
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  mobileNumber: string
  mobileProvider: string // Added mobile provider field
  bankAccount: string
  savePaymentMethod: boolean
}

export default function PaymentPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    mobileNumber: "",
    mobileProvider: "", // Initialized mobile provider field
    bankAccount: "",
    savePaymentMethod: false,
  })
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    try {
      const storedBooking = sessionStorage.getItem("travelBooking")
      if (storedBooking) {
        const parsedBooking = JSON.parse(storedBooking)
        if (parsedBooking && typeof parsedBooking === "object" && parsedBooking.bookingId) {
          setBookingData(parsedBooking)
        } else {
          throw new Error("Invalid booking data structure")
        }
      } else {
        throw new Error("No booking data found")
      }
    } catch (error) {
      console.error("Error retrieving booking data:", error)
      toast({
        title: "Booking Data Error",
        description: "Unable to retrieve booking information. Redirecting to booking page.",
        variant: "destructive",
      })
      // Redirect back to booking if no data found or data is corrupted
      router.push("/book-travel-policy")
    }
  }, [router])

  const handleInputChange = (field: keyof PaymentFormData, value: string | boolean) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    handleInputChange("cardNumber", formatted)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4)
    }
    handleInputChange("expiryDate", value)
  }

  const processPayment = async () => {
    if (!bookingData) {
      toast({
        title: "Error",
        description: "Booking data not available. Please restart the booking process.",
        variant: "destructive",
      })
      router.push("/book-travel-policy")
      return
    }

    setIsProcessing(true)

    if (!paymentData.paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    if (paymentData.paymentMethod === "card") {
      const cardErrors = []
      if (!paymentData.cardholderName.trim()) cardErrors.push("Cardholder name")
      if (!paymentData.cardNumber.replace(/\s/g, "")) cardErrors.push("Card number")
      if (!paymentData.expiryDate) cardErrors.push("Expiry date")
      if (!paymentData.cvv) cardErrors.push("CVV")

      if (cardErrors.length > 0) {
        toast({
          title: "Card Information Required",
          description: `Please provide: ${cardErrors.join(", ")}`,
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      const cardNumber = paymentData.cardNumber.replace(/\s/g, "")
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid card number.",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      const [month, year] = paymentData.expiryDate.split("/")
      if (!month || !year || Number.parseInt(month) < 1 || Number.parseInt(month) > 12) {
        toast({
          title: "Invalid Expiry Date",
          description: "Please enter a valid expiry date (MM/YY).",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1
      if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
      ) {
        toast({
          title: "Expired Card",
          description: "Please use a card that hasn't expired.",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }
    }

    if (paymentData.paymentMethod === "mobile" && !paymentData.mobileNumber.trim()) {
      toast({
        title: "Mobile Number Required",
        description: "Please enter your mobile money number.",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    if (paymentData.paymentMethod === "mobile" && !paymentData.mobileProvider) {
      toast({
        title: "Mobile Provider Required",
        description: "Please select your mobile money provider (MTN or Airtel).",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    if (paymentData.paymentMethod === "bank" && !paymentData.bankAccount.trim()) {
      toast({
        title: "Bank Account Required",
        description: "Please enter your bank account number.",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const paymentResponse = await fetch("/api/payments/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingData.bookingId,
          paymentMethod: paymentData.paymentMethod,
          mobileProvider: paymentData.mobileProvider, // Added mobile provider to payment data
          amount: bookingData.premium,
          cardNumber: paymentData.cardNumber,
          expiryDate: paymentData.expiryDate,
          cvv: paymentData.cvv,
          cardholderName: paymentData.cardholderName,
          mobileNumber: paymentData.mobileNumber,
          bankAccount: paymentData.bankAccount,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json().catch(() => ({}))
        throw new Error(errorData.error || `Payment failed with status ${paymentResponse.status}`)
      }

      const paymentResult = await paymentResponse.json()

      try {
        await fetch("/api/commissions/travel-insurance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: bookingData.bookingId,
            policyNumber: paymentResult.policyNumber,
            premium: bookingData.premium,
            commissionRate: 0.1, // 10% commission
          }),
        })
      } catch (commissionError) {
        console.error("Commission processing failed:", commissionError)
        // Don't fail the payment for commission errors
      }

      try {
        await fetch("/api/notifications/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "both",
            recipient: {
              email: bookingData.email,
              phone: bookingData.mobile,
              name: `${bookingData.firstName} ${bookingData.surname}`,
            },
            template: "payment_success",
            data: {
              bookingId: bookingData.bookingId,
              policyNumber: paymentResult.policyNumber,
              transactionId: paymentResult.transactionId,
              amount: bookingData.premium,
            },
          }),
        })
      } catch (notificationError) {
        console.error("Notification sending failed:", notificationError)
        // Don't fail the payment for notification errors
      }

      // Clear booking data from sessionStorage
      sessionStorage.removeItem("travelBooking")

      toast({
        title: "Payment Successful!",
        description: paymentResult.message || "Your travel insurance policy is now active.",
      })

      // Redirect to confirmation page
      router.push(`/booking-confirmation?id=${bookingData.bookingId}&transaction=${paymentResult.transactionId}`)
    } catch (error) {
      console.error("[v0] Payment error:", error)

      let errorMessage = "There was an error processing your payment. Please try again."

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Payment request timed out. Please try again."
        } else if (error.message.includes("fetch")) {
          errorMessage = "Network error. Please check your connection and try again."
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!bookingData) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading booking information...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-[#002B5B]">Secure Payment Portal</h1>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <Lock className="h-4 w-4" />
          Your payment information is encrypted and secure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Choose your preferred payment method and complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label className="text-base font-semibold">Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <Button
                    variant={paymentData.paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => handleInputChange("paymentMethod", "card")}
                    className="h-16 flex flex-col items-center gap-1"
                    disabled={isProcessing}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Credit/Debit Card</span>
                  </Button>
                  <Button
                    variant={paymentData.paymentMethod === "mobile" ? "default" : "outline"}
                    onClick={() => handleInputChange("paymentMethod", "mobile")}
                    className="h-16 flex flex-col items-center gap-1"
                    disabled={isProcessing}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs">Mobile Money</span>
                  </Button>
                  <Button
                    variant={paymentData.paymentMethod === "bank" ? "default" : "outline"}
                    onClick={() => handleInputChange("paymentMethod", "bank")}
                    className="h-16 flex flex-col items-center gap-1"
                    disabled={isProcessing}
                  >
                    <Building className="h-5 w-5" />
                    <span className="text-xs">Bank Transfer</span>
                  </Button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentData.paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      placeholder="Enter cardholder name"
                      disabled={isProcessing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        disabled={isProcessing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").substring(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Money Form */}
              {paymentData.paymentMethod === "mobile" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold">Select Mobile Money Provider</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Button
                        variant={paymentData.mobileProvider === "mtn" ? "default" : "outline"}
                        onClick={() => handleInputChange("mobileProvider", "mtn")}
                        className="h-16 flex flex-col items-center gap-1"
                        disabled={isProcessing}
                      >
                        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                          <span className="text-black font-bold text-xs">MTN</span>
                        </div>
                        <span className="text-xs">MTN Mobile Money</span>
                      </Button>
                      <Button
                        variant={paymentData.mobileProvider === "airtel" ? "default" : "outline"}
                        onClick={() => handleInputChange("mobileProvider", "airtel")}
                        className="h-16 flex flex-col items-center gap-1"
                        disabled={isProcessing}
                      >
                        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">AL</span>
                        </div>
                        <span className="text-xs">Airtel Money</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      value={paymentData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      placeholder="Enter your mobile money number"
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    {paymentData.mobileProvider === "mtn" && (
                      <div>
                        <p className="text-sm text-blue-800 font-semibold mb-2">MTN Mobile Money Instructions:</p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• You will receive a payment prompt on your phone</li>
                          <li>• Enter your MTN Mobile Money PIN to confirm</li>
                          <li>• Processing fee: 1.5% of transaction amount</li>
                        </ul>
                      </div>
                    )}
                    {paymentData.mobileProvider === "airtel" && (
                      <div>
                        <p className="text-sm text-blue-800 font-semibold mb-2">Airtel Money Instructions:</p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• You will receive a payment prompt on your phone</li>
                          <li>• Enter your Airtel Money PIN to confirm</li>
                          <li>• Processing fee: 1.5% of transaction amount</li>
                        </ul>
                      </div>
                    )}
                    {!paymentData.mobileProvider && (
                      <p className="text-sm text-blue-800">
                        Please select your mobile money provider above to continue.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {paymentData.paymentMethod === "bank" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bankAccount">Bank Account Number</Label>
                    <Input
                      id="bankAccount"
                      value={paymentData.bankAccount}
                      onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                      placeholder="Enter your bank account number"
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      Bank transfer may take 1-3 business days to process. Your policy will be activated upon payment
                      confirmation.
                    </p>
                  </div>
                </div>
              )}

              {/* Save Payment Method */}
              {paymentData.paymentMethod && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="savePayment"
                    checked={paymentData.savePaymentMethod}
                    onCheckedChange={(checked) => handleInputChange("savePaymentMethod", checked as boolean)}
                    disabled={isProcessing}
                  />
                  <Label htmlFor="savePayment" className="text-sm">
                    Save this payment method for future purchases
                  </Label>
                </div>
              )}

              {/* Process Payment Button */}
              <Button
                onClick={processPayment}
                disabled={!paymentData.paymentMethod || isProcessing}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Complete Secure Payment - ${bookingData.premium.toFixed(2)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your travel insurance details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Traveler Information</h4>
                <p className="text-sm text-gray-600">
                  {bookingData.firstName} {bookingData.surname}
                </p>
                <p className="text-sm text-gray-600">{bookingData.email}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold">Trip Details</h4>
                <p className="text-sm text-gray-600">Destination: {bookingData.destination}</p>
                <p className="text-sm text-gray-600">
                  Travelers: {bookingData.adults} Adult{bookingData.adults > 1 ? "s" : ""}
                  {bookingData.children > 0 &&
                    `, ${bookingData.children} Child${bookingData.children > 1 ? "ren" : ""}`}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold">Coverage</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Medical Emergency ($100,000)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Trip Cancellation (100%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Baggage Protection ($2,500)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>24/7 Emergency Assistance</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Premium</span>
                  <Badge variant="secondary" className="text-lg font-bold">
                    ${bookingData.premium.toFixed(2)}
                  </Badge>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-800 text-center">
                  <Shield className="inline h-3 w-3 mr-1" />
                  Instant coverage upon payment confirmation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
