"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Users, FileText, DollarSign } from "lucide-react"

interface BookingData {
  firstName: string
  surname: string
  email: string
  mobileNumber: string
  passportNumber: string
  destination: string
  departureDate: string
  arrivalDate: string
  numberOfAdults: string
  numberOfChildren: string
  transactionNumber: string
}

export default function BookingSummaryPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const exchangeRate = 3700 // UGX per USD - should be fetched from admin settings

  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      setBookingData(JSON.parse(storedData))
    } else {
      // Redirect back to form if no data found
      router.push("/buy")
    }
  }, [router])

  const handleProceedToPayment = () => {
    router.push("/payment")
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#002B5B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your booking summary...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const totalTravelers = Number.parseInt(bookingData.numberOfAdults) + Number.parseInt(bookingData.numberOfChildren)

  const calculatePremium = () => {
    const basePremium = 50 // Base premium per adult
    const childDiscount = 0.5 // 50% discount for children
    const adults = Number.parseInt(bookingData.numberOfAdults)
    const children = Number.parseInt(bookingData.numberOfChildren)

    return adults * basePremium + children * basePremium * childDiscount
  }

  const premiumUSD = calculatePremium()
  const premiumUGX = premiumUSD * exchangeRate

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#002B5B] mb-2">Booking Summary</h1>
            <p className="text-gray-600">Please review your travel insurance application details</p>
          </div>

          {/* Transaction Number */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-[#002B5B]" />
                  <span className="text-sm font-medium text-gray-600">Transaction Number</span>
                </div>
                <p className="text-2xl font-bold text-[#002B5B] font-mono">{bookingData.transactionNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-[#002B5B]">Travel Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-[#002B5B]">Traveler</p>
                    <p className="text-gray-600">
                      {bookingData.firstName} {bookingData.surname}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-[#002B5B]">Destination</p>
                    <p className="text-gray-600">{bookingData.destination}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-[#002B5B]">Departure</p>
                    <p className="text-gray-600">{formatDate(bookingData.departureDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-[#002B5B]">Arrival</p>
                    <p className="text-gray-600">{formatDate(bookingData.arrivalDate)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-[#002B5B]">Total Travelers</p>
                  <p className="text-gray-600">
                    {totalTravelers} {totalTravelers === 1 ? "person" : "people"}({bookingData.numberOfAdults} adult
                    {bookingData.numberOfAdults !== "1" ? "s" : ""}, {bookingData.numberOfChildren} child
                    {bookingData.numberOfChildren !== "1" ? "ren" : ""})
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-[#002B5B] flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Premium Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#002B5B]">Adults ({bookingData.numberOfAdults})</span>
                    <span className="text-gray-700">
                      ${(Number.parseInt(bookingData.numberOfAdults) * 50).toFixed(2)} USD
                    </span>
                  </div>
                  {Number.parseInt(bookingData.numberOfChildren) > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#002B5B]">Children ({bookingData.numberOfChildren})</span>
                      <span className="text-gray-700">
                        ${(Number.parseInt(bookingData.numberOfChildren) * 25).toFixed(2)} USD
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#002B5B]">Total Premium</span>
                    <span className="text-lg font-bold text-[#002B5B]">${premiumUSD.toFixed(2)} USD</span>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Mobile Money Equivalent:</span>
                        <span className="font-semibold">UGX {premiumUGX.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-center text-gray-500">
                        Exchange Rate: 1 USD = {exchangeRate.toLocaleString()} UGX
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-[#002B5B]">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-[#002B5B]">Email</p>
                <p className="text-gray-600">{bookingData.email}</p>
              </div>
              <div>
                <p className="font-medium text-[#002B5B]">Mobile Number</p>
                <p className="text-gray-600">{bookingData.mobileNumber}</p>
              </div>
              <div>
                <p className="font-medium text-[#002B5B]">Passport Number</p>
                <p className="text-gray-600">{bookingData.passportNumber}</p>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Message */}
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">
              Upon confirmation, you will be directed to the payment page to complete your booking.
            </p>
            <Button
              onClick={handleProceedToPayment}
              size="lg"
              className="bg-[#002B5B] hover:bg-[#0056b3] text-white px-12"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
