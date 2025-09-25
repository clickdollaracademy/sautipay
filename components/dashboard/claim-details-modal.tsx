"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  User,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
} from "lucide-react"

interface ClaimDocument {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  url: string
}

interface ClaimTimeline {
  date: string
  status: string
  description: string
  completed: boolean
  notes?: string
}

interface ClaimDetails {
  id: string
  claimReference: string
  policyNumber: string
  claimantName: string
  email: string
  phone: string
  claimType: string
  amount: number
  status: "submitted" | "processing" | "approved" | "rejected" | "paid"
  submittedDate: string
  processedDate?: string
  transactionId?: string
  incidentDescription: string
  incidentDate: string
  incidentLocation: string
  preferredSettlement: string
  bankDetails: string
  documents: ClaimDocument[]
  timeline: ClaimTimeline[]
  assessorNotes?: string
  rejectionReason?: string
}

interface ClaimDetailsModalProps {
  claim: ClaimDetails | null
  isOpen: boolean
  onClose: () => void
}

export function ClaimDetailsModal({ claim, isOpen, onClose }: ClaimDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "documents" | "timeline">("details")

  if (!claim) return null

  const handleViewDocument = (doc: ClaimDocument) => {
    // Open document in new tab for viewing
    window.open(doc.url, "_blank", "noopener,noreferrer")
  }

  const handleDownloadDocument = async (doc: ClaimDocument) => {
    try {
      // Create a temporary link element to trigger download
      const response = await fetch(doc.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = doc.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading document:", error)
      // Fallback: open in new tab if download fails
      window.open(doc.url, "_blank", "noopener,noreferrer")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Submitted
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="default">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Claim Details - {claim.claimReference}</span>
            {getStatusBadge(claim.status)}
          </DialogTitle>
          <DialogDescription>Submitted on {new Date(claim.submittedDate).toLocaleDateString()}</DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === "details"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Claim Details
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === "documents"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            Documents ({claim.documents.length})
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === "timeline"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </button>
        </div>

        <div className="mt-6">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Claimant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="font-medium">{claim.claimantName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Policy Number</label>
                    <p className="font-medium">{claim.policyNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="font-medium flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {claim.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="font-medium flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {claim.phone}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Incident Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Incident Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Claim Type</label>
                      <p className="font-medium">{claim.claimType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Incident Date</label>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(claim.incidentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Claim Amount</label>
                      <p className="font-medium flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />${claim.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Incident Location</label>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {claim.incidentLocation}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Incident Description</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{claim.incidentDescription}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Settlement Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Settlement Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Preferred Settlement Method</label>
                    <p className="font-medium">{claim.preferredSettlement}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bank Details</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{claim.bankDetails}</p>
                  </div>
                  {claim.transactionId && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                      <p className="font-medium">{claim.transactionId}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assessor Notes */}
              {claim.assessorNotes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Assessor Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{claim.assessorNotes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Rejection Reason */}
              {claim.status === "rejected" && claim.rejectionReason && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Rejection Reason</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700 bg-red-50 p-3 rounded-lg">{claim.rejectionReason}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              {claim.documents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No documents uploaded</p>
              ) : (
                <div className="grid gap-4">
                  {claim.documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.type} • {(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded{" "}
                              {new Date(doc.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              {claim.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      event.completed ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {event.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${event.completed ? "text-green-700" : "text-gray-500"}`}>
                        {event.description}
                      </p>
                      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    {event.notes && <p className="text-sm text-gray-600 mt-1">{event.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
