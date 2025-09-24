"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  HelpCircle,
  Loader2,
  Search,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ClaimFormData {
  policyNumber: string
  fullName: string
  email: string
  phone: string
  incidentDescription: string
  claimType: string
  preferredSettlement: string
  bankDetails: string
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  status: "uploading" | "completed" | "error"
}

interface ClaimTrackingData {
  claimReference: string
  status: string
  timeline: Array<{
    date: string | null
    status: string
    description: string
    completed: boolean
  }>
  nextSteps: string[]
}

export default function ClaimsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ClaimFormData>({
    policyNumber: "",
    fullName: "",
    email: "",
    phone: "",
    incidentDescription: "",
    claimType: "",
    preferredSettlement: "",
    bankDetails: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDraft, setIsDraft] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trackingReference, setTrackingReference] = useState("")
  const [trackingData, setTrackingData] = useState<ClaimTrackingData | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  const totalSteps = 4
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof ClaimFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        status: "uploading",
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload process
      setTimeout(() => {
        setUploadedFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, status: "completed" } : f)))
      }, 2000)
    })
  }

  const saveDraft = () => {
    setIsDraft(true)
    toast({
      title: "Draft Saved",
      description: "Your claim has been saved as a draft. You can return to complete it later.",
    })
  }

  const submitClaim = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/claims/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          documents: uploadedFiles
            .filter((f) => f.status === "completed")
            .map((f) => ({
              name: f.name,
              type: f.type,
              size: f.size,
              url: `/uploads/${f.id}`, // Mock URL
            })),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit claim")
      }

      toast({
        title: "Claim Submitted Successfully",
        description: `Your claim reference is ${result.claimReference}. You will receive confirmation via email and SMS.`,
      })

      // Reset form
      setFormData({
        policyNumber: "",
        fullName: "",
        email: "",
        phone: "",
        incidentDescription: "",
        claimType: "",
        preferredSettlement: "",
        bankDetails: "",
      })
      setUploadedFiles([])
      setCurrentStep(1)
    } catch (error) {
      console.error("[v0] Claim submission error:", error)
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit claim. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const trackClaim = async () => {
    if (!trackingReference.trim()) {
      toast({
        title: "Reference Required",
        description: "Please enter your claim reference number.",
        variant: "destructive",
      })
      return
    }

    setIsTracking(true)

    try {
      const response = await fetch(`/api/claims/track/${trackingReference}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to track claim")
      }

      setTrackingData(result.claim)
      toast({
        title: "Claim Found",
        description: `Claim ${trackingReference} is currently ${result.claim.status.replace("_", " ")}.`,
      })
    } catch (error) {
      console.error("[v0] Claim tracking error:", error)
      toast({
        title: "Tracking Failed",
        description: error instanceof Error ? error.message : "Could not find claim with that reference number.",
        variant: "destructive",
      })
      setTrackingData(null)
    } finally {
      setIsTracking(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-[#002B5B]">Travel Insurance Claims</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Submit your travel insurance claim with our easy-to-use online system. Follow the step-by-step process to
          ensure your claim is processed quickly and efficiently.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>Policy Info</span>
          <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>Incident Details</span>
          <span className={currentStep >= 3 ? "text-blue-600 font-medium" : ""}>Documents</span>
          <span className={currentStep >= 4 ? "text-blue-600 font-medium" : ""}>Settlement</span>
        </div>
      </div>

      <Tabs value="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submit">Submit New Claim</TabsTrigger>
          <TabsTrigger value="track">Track Existing Claim</TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Claim Submission Form
              </CardTitle>
              <CardDescription>
                Please fill out all required information to process your claim efficiently.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Policy Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Policy Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="policyNumber">Policy Number *</Label>
                      <Input
                        id="policyNumber"
                        value={formData.policyNumber}
                        onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                        placeholder="Enter your policy number"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Incident Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Incident Details</h3>
                  <div>
                    <Label htmlFor="claimType">Type of Claim *</Label>
                    <Select
                      value={formData.claimType}
                      onValueChange={(value) => handleInputChange("claimType", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select claim type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="trip-cancellation">Trip Cancellation</SelectItem>
                        <SelectItem value="trip-interruption">Trip Interruption</SelectItem>
                        <SelectItem value="baggage-loss">Baggage Loss/Delay</SelectItem>
                        <SelectItem value="flight-delay">Flight Delay</SelectItem>
                        <SelectItem value="personal-liability">Personal Liability</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="incidentDescription">Incident Description *</Label>
                    <Textarea
                      id="incidentDescription"
                      value={formData.incidentDescription}
                      onChange={(e) => handleInputChange("incidentDescription", e.target.value)}
                      placeholder="Please provide a detailed description of the incident..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Supporting Documents</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium mb-2">Upload Supporting Documents</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Accepted formats: PDF, JPG, PNG, DOC (Max 10MB per file)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" disabled={isSubmitting}>
                        Choose Files
                      </Button>
                    </Label>
                  </div>

                  {/* Document Guidelines */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Required Documents by Claim Type:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • <strong>Medical Claims:</strong> Medical reports, receipts, doctor's certificates
                      </li>
                      <li>
                        • <strong>Trip Cancellation:</strong> Booking confirmations, cancellation notices
                      </li>
                      <li>
                        • <strong>Baggage Claims:</strong> Airline reports, receipts, photos of damaged items
                      </li>
                      <li>
                        • <strong>Flight Delays:</strong> Airline delay certificates, additional expense receipts
                      </li>
                      <li>
                        • <strong>All Claims:</strong> Copy of travel insurance policy, passport/ID
                      </li>
                    </ul>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Uploaded Files:</h4>
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              file.status === "completed"
                                ? "default"
                                : file.status === "uploading"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {file.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {file.status === "uploading" && <Clock className="h-3 w-3 mr-1" />}
                            {file.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {file.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Settlement Details */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Settlement Information</h3>
                  <div>
                    <Label htmlFor="preferredSettlement">Preferred Settlement Method *</Label>
                    <Select
                      value={formData.preferredSettlement}
                      onValueChange={(value) => handleInputChange("preferredSettlement", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select settlement method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="mobile-money">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bankDetails">Bank Details / Payment Information *</Label>
                    <Textarea
                      id="bankDetails"
                      value={formData.bankDetails}
                      onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                      placeholder="Please provide your bank account details or mobile money information..."
                      rows={4}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                      Previous
                    </Button>
                  )}
                  <Button variant="outline" onClick={saveDraft} disabled={isSubmitting}>
                    Save as Draft
                  </Button>
                </div>
                <div>
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep} disabled={isSubmitting}>
                      Next Step
                    </Button>
                  ) : (
                    <Button onClick={submitClaim} className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Claim"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Claim</CardTitle>
              <CardDescription>Enter your claim reference number to check the status of your claim.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Enter claim reference number"
                  className="flex-1"
                  value={trackingReference}
                  onChange={(e) => setTrackingReference(e.target.value)}
                  disabled={isTracking}
                />
                <Button onClick={trackClaim} disabled={isTracking}>
                  {isTracking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Track Claim
                    </>
                  )}
                </Button>
              </div>

              {trackingData && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Claim Status</h4>
                      <Badge variant="secondary" className="capitalize">
                        {trackingData.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Reference: {trackingData.claimReference}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Claim Progress</h4>
                    <div className="space-y-4">
                      {trackingData.timeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              step.completed ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${step.completed ? "text-green-700" : "text-gray-500"}`}>
                              {step.description}
                            </p>
                            {step.date && (
                              <p className="text-xs text-gray-500">{new Date(step.date).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {trackingData.nextSteps.length > 0 && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Next Steps</h4>
                      <ul className="text-sm text-amber-800 space-y-1">
                        {trackingData.nextSteps.map((step, index) => (
                          <li key={index}>• {step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium">Phone Support</h4>
                <p className="text-sm text-gray-600">Call us at +1-800-CLAIMS (24/7)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium">Email Support</h4>
                <p className="text-sm text-gray-600">claims@sautipay.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
