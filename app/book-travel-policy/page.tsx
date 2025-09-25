"use client"

import type React from "react"
import { useCallback } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CalendarIcon, Plane, Shield, CreditCard, Users, MapPin, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { FormAutoSave } from "@/components/ui/form-auto-save"
import { SmartFormField } from "@/components/ui/smart-form-field"
import { ProgressStepper } from "@/components/ui/progress-stepper"

interface BookingFormData {
  surname: string
  firstName: string
  email: string
  mobile: string
  destination: string
  adults: number
  children: number
  departureDate: Date | undefined
  arrivalDate: Date | undefined
  additionalComments: string
}

// Popular travel destinations for autocomplete
const popularDestinations = [
  "London, United Kingdom",
  "Paris, France",
  "New York, USA",
  "Tokyo, Japan",
  "Dubai, UAE",
  "Singapore",
  "Bangkok, Thailand",
  "Rome, Italy",
  "Barcelona, Spain",
  "Amsterdam, Netherlands",
  "Istanbul, Turkey",
  "Sydney, Australia",
  "Hong Kong",
  "Berlin, Germany",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "Zurich, Switzerland",
  "Stockholm, Sweden",
  "Copenhagen, Denmark",
  "Oslo, Norway",
  "Helsinki, Finland",
  "Dublin, Ireland",
  "Edinburgh, Scotland",
  "Brussels, Belgium",
  "Luxembourg City, Luxembourg",
  "Lisbon, Portugal",
  "Madrid, Spain",
  "Athens, Greece",
  "Budapest, Hungary",
  "Warsaw, Poland",
  "Mumbai, India",
  "Delhi, India",
  "Beijing, China",
  "Shanghai, China",
  "Seoul, South Korea",
  "Kuala Lumpur, Malaysia",
  "Jakarta, Indonesia",
  "Manila, Philippines",
  "Ho Chi Minh City, Vietnam",
  "Hanoi, Vietnam",
  "Phnom Penh, Cambodia",
  "Yangon, Myanmar",
  "Colombo, Sri Lanka",
  "Kathmandu, Nepal",
  "Dhaka, Bangladesh",
  "Karachi, Pakistan",
  "Islamabad, Pakistan",
  "Lahore, Pakistan",
  "Cairo, Egypt",
  "Cape Town, South Africa",
  "Johannesburg, South Africa",
  "Nairobi, Kenya",
  "Lagos, Nigeria",
  "Accra, Ghana",
  "Casablanca, Morocco",
  "Tunis, Tunisia",
  "Algiers, Algeria",
  "Toronto, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "Mexico City, Mexico",
  "Cancun, Mexico",
  "Buenos Aires, Argentina",
  "Rio de Janeiro, Brazil",
  "São Paulo, Brazil",
  "Lima, Peru",
  "Santiago, Chile",
  "Bogotá, Colombia",
  "Caracas, Venezuela",
  "Quito, Ecuador",
  "La Paz, Bolivia",
  "Montevideo, Uruguay",
  "Asunción, Paraguay",
]

export default function BookTravelPolicyPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const exchangeRate = 3700 // UGX per USD - should be fetched from admin settings
  const [formData, setFormData] = useState<BookingFormData>({
    surname: "",
    firstName: "",
    email: "",
    mobile: "",
    destination: "",
    adults: 1,
    children: 0,
    departureDate: undefined,
    arrivalDate: undefined,
    additionalComments: "",
  })

  const formSteps = [
    { id: 1, title: "Personal Info", description: "Your contact details" },
    { id: 2, title: "Travel Details", description: "Destination and dates" },
    { id: 3, title: "Review & Pay", description: "Confirm and proceed" },
  ]

  const validateEmail = async (email: string): Promise<{ valid: boolean; message?: string }> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Please enter a valid email address" }
    }
    return { valid: true, message: "Email format is valid" }
  }

  const validatePhone = async (phone: string): Promise<{ valid: boolean; message?: string }> => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return { valid: false, message: "Please enter a valid phone number" }
    }
    return { valid: true, message: "Phone number is valid" }
  }

  const handleFormRestore = useCallback((savedData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...savedData }))
  }, [])

  const handleInputChange = (field: keyof BookingFormData, value: string | number | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculatePremium = () => {
    // Simple premium calculation based on travelers and duration
    const totalTravelers = formData.adults + formData.children
    const basePremium = 50 // Base premium per person
    const childDiscount = 0.5 // 50% discount for children

    const adultPremium = formData.adults * basePremium
    const childPremium = formData.children * basePremium * childDiscount

    return adultPremium + childPremium
  }

  const nextStep = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = [
      { field: "surname", label: "Surname" },
      { field: "firstName", label: "First Name" },
      { field: "email", label: "Email" },
      { field: "mobile", label: "Mobile Number" },
      { field: "destination", label: "Destination" },
      { field: "departureDate", label: "Departure Date" },
      { field: "arrivalDate", label: "Arrival Date" },
    ]

    const missingFields = requiredFields.filter(({ field }) => {
      const value = formData[field as keyof BookingFormData]
      return !value || (typeof value === "string" && value.trim() === "")
    })

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.map((f) => f.label).join(", ")}`,
        variant: "destructive",
      })
      return
    }

    if (formData.departureDate && formData.arrivalDate) {
      if (formData.departureDate >= formData.arrivalDate) {
        toast({
          title: "Invalid Dates",
          description: "Arrival date must be after departure date.",
          variant: "destructive",
        })
        return
      }

      // Check if departure date is in the past
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (formData.departureDate < today) {
        toast({
          title: "Invalid Departure Date",
          description: "Departure date cannot be in the past.",
          variant: "destructive",
        })
        return
      }
    }

    if (formData.adults < 1) {
      toast({
        title: "Invalid Traveler Count",
        description: "At least one adult traveler is required.",
        variant: "destructive",
      })
      return
    }

    if (formData.adults + formData.children > 10) {
      toast({
        title: "Too Many Travelers",
        description: "Maximum 10 travelers allowed per policy.",
        variant: "destructive",
      })
      return
    }

    try {
      // Store booking data in sessionStorage for payment page
      const bookingData = {
        ...formData,
        premium: calculatePremium(),
        bookingId: `TB${Date.now()}`,
        departureDate: formData.departureDate?.toISOString(),
        arrivalDate: formData.arrivalDate?.toISOString(),
      }

      sessionStorage.setItem("travelBooking", JSON.stringify(bookingData))
      localStorage.removeItem("travel-booking-draft")

      toast({
        title: "Booking Details Confirmed",
        description: "Redirecting to secure payment portal...",
      })

      // Redirect to payment page after short delay
      setTimeout(() => {
        router.push("/payment")
      }, 1500)
    } catch (error) {
      console.error("Error saving booking data:", error)
      toast({
        title: "Error",
        description: "Failed to save booking data. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <FormAutoSave
        data={formData}
        storageKey="travel-booking-draft"
        onRestore={handleFormRestore}
        saveInterval={15000}
      />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-[#002B5B]">Book Travel Insurance Policy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Protect your journey with comprehensive travel insurance coverage. Fill out the form below to get instant
          coverage for your upcoming trip.
        </p>
      </div>

      <div className="mb-8">
        <ProgressStepper steps={formSteps} currentStep={currentStep} onStepClick={setCurrentStep} allowSkip={true} />
      </div>

      {/* Coverage Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="font-semibold text-sm">Medical Coverage</h3>
            <p className="text-xs text-gray-600">Up to $100,000</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <Plane className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="font-semibold text-sm">Trip Cancellation</h3>
            <p className="text-xs text-gray-600">100% Coverage</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
          <Users className="h-8 w-8 text-purple-600" />
          <div>
            <h3 className="font-semibold text-sm">Baggage Protection</h3>
            <p className="text-xs text-gray-600">Up to $2,500</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
          <MapPin className="h-8 w-8 text-orange-600" />
          <div>
            <h3 className="font-semibold text-sm">Worldwide Coverage</h3>
            <p className="text-xs text-gray-600">24/7 Support</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Travel Insurance Booking Form
            </CardTitle>
            <CardDescription>Please provide accurate information for your travel insurance policy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      value={formData.surname}
                      onChange={(e) => handleInputChange("surname", e.target.value)}
                      placeholder="Enter your surname"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <SmartFormField
                    id="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    placeholder="Enter your email address"
                    type="email"
                    required
                    validation={validateEmail}
                  />
                  <SmartFormField
                    id="mobile"
                    label="Mobile Number"
                    value={formData.mobile}
                    onChange={(value) => handleInputChange("mobile", value)}
                    placeholder="Enter your mobile number"
                    type="tel"
                    required
                    validation={validatePhone}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Travel Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Travel Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="destination">Destination *</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between bg-transparent"
                        >
                          {formData.destination
                            ? popularDestinations.find((destination) => destination === formData.destination)
                            : "Select or type your destination..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search destinations..."
                            value={formData.destination}
                            onValueChange={(value) => handleInputChange("destination", value)}
                          />
                          <CommandList>
                            <CommandEmpty>No destination found.</CommandEmpty>
                            <CommandGroup>
                              {popularDestinations
                                .filter((destination) =>
                                  destination.toLowerCase().includes(formData.destination.toLowerCase()),
                                )
                                .slice(0, 10)
                                .map((destination) => (
                                  <CommandItem
                                    key={destination}
                                    value={destination}
                                    onSelect={(currentValue) => {
                                      handleInputChange(
                                        "destination",
                                        currentValue === formData.destination ? "" : currentValue,
                                      )
                                      setOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.destination === destination ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {destination}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="adults">Number of Adults *</Label>
                    <Select
                      value={formData.adults.toString()}
                      onValueChange={(value) => handleInputChange("adults", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of adults" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="children">Number of Children</Label>
                    <Select
                      value={formData.children.toString()}
                      onValueChange={(value) => handleInputChange("children", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of children" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Departure Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.departureDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.departureDate ? format(formData.departureDate, "PPP") : "Select departure date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.departureDate}
                          onSelect={(date) => handleInputChange("departureDate", date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Arrival Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.arrivalDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.arrivalDate ? format(formData.arrivalDate, "PPP") : "Select arrival date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.arrivalDate}
                          onSelect={(date) => handleInputChange("arrivalDate", date)}
                          disabled={(date) => date < (formData.departureDate || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Review & Additional Information</h3>
                <div>
                  <Label htmlFor="additionalComments">Additional Comments or Special Requests</Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                    placeholder="Any special requests, medical conditions, or additional information..."
                    rows={4}
                  />
                </div>

                {/* Premium Summary */}
                {(formData.adults > 0 || formData.children > 0) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Premium Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Adults ({formData.adults})</span>
                        <span>${(formData.adults * 50).toFixed(2)} USD</span>
                      </div>
                      {formData.children > 0 && (
                        <div className="flex justify-between">
                          <span>Children ({formData.children})</span>
                          <span>${(formData.children * 25).toFixed(2)} USD</span>
                        </div>
                      )}
                      <div className="border-t pt-1 flex justify-between font-semibold">
                        <span>Total Premium</span>
                        <span>${calculatePremium().toFixed(2)} USD</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                        <div className="flex justify-between">
                          <span>Mobile Money Equivalent:</span>
                          <span>UGX {(calculatePremium() * exchangeRate).toLocaleString()}</span>
                        </div>
                        <div className="text-center mt-1">
                          <span>Exchange Rate: 1 USD = {exchangeRate.toLocaleString()} UGX</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <div>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {currentStep < formSteps.length ? (
                  <Button type="button" onClick={nextStep}>
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Proceed to Payment
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Policy Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Policy Coverage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Medical Coverage</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Emergency medical expenses up to $100,000</li>
                <li>• Emergency dental treatment up to $1,000</li>
                <li>• Medical evacuation and repatriation</li>
                <li>• 24/7 medical assistance hotline</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Trip Protection</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Trip cancellation up to 100% of trip cost</li>
                <li>• Trip interruption coverage</li>
                <li>• Travel delay compensation</li>
                <li>• Missed connection coverage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Baggage & Personal Effects</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Baggage loss/damage up to $2,500</li>
                <li>• Baggage delay compensation</li>
                <li>• Personal money and documents</li>
                <li>• Personal liability coverage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Additional Benefits</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 24/7 emergency assistance</li>
                <li>• Legal expenses coverage</li>
                <li>• Personal accident coverage</li>
                <li>• Hijack and kidnap coverage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
