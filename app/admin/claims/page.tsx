"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Filter, Eye, CheckCircle, Clock, XCircle, CreditCard, UserCheck, Ban } from "lucide-react"
import { ClaimDetailsModal } from "@/components/dashboard/claim-details-modal"

interface Claim {
  id: string
  claimReference: string
  policyNumber: string
  claimantName: string
  claimType: string
  amount: number
  status: "submitted" | "processing" | "approved" | "rejected" | "paid"
  submittedDate: string
  processedDate?: string
  transactionId?: string
}

const mockClaimsDetailed = [
  {
    id: "1",
    claimReference: "CLM1710234567890",
    policyNumber: "POLTB1710234567890",
    claimantName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    claimType: "Medical Emergency",
    amount: 2500.0,
    status: "approved" as const,
    submittedDate: "2024-03-15",
    processedDate: "2024-03-18",
    transactionId: "TRAN202403180JAZZ",
    incidentDescription:
      "Emergency medical treatment required due to food poisoning during trip to Thailand. Required hospitalization for 2 days with IV fluids and medication.",
    incidentDate: "2024-03-10",
    incidentLocation: "Bangkok, Thailand",
    preferredSettlement: "Bank Transfer",
    bankDetails: "Bank of America - Account: ****1234 - Routing: 123456789",
    documents: [
      {
        id: "doc1",
        name: "Medical Report.pdf",
        type: "application/pdf",
        size: 2048000,
        uploadDate: "2024-03-15",
        url: "/documents/medical-report.pdf",
      },
      {
        id: "doc2",
        name: "Hospital Receipt.jpg",
        type: "image/jpeg",
        size: 1024000,
        uploadDate: "2024-03-15",
        url: "/documents/hospital-receipt.jpg",
      },
    ],
    timeline: [
      {
        date: "2024-03-15",
        status: "submitted",
        description: "Claim submitted",
        completed: true,
        notes: "All required documents provided",
      },
      {
        date: "2024-03-16",
        status: "processing",
        description: "Under review by medical assessor",
        completed: true,
        notes: "Medical records verified",
      },
      {
        date: "2024-03-18",
        status: "approved",
        description: "Claim approved for payment",
        completed: true,
        notes: "Approved for full amount of $2,500",
      },
    ],
    assessorNotes:
      "Medical emergency claim verified. All documentation provided is authentic and supports the claim. Treatment was necessary and reasonable.",
  },
  {
    id: "2",
    claimReference: "CLM1710234567891",
    policyNumber: "POLTB1710234567891",
    claimantName: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1-555-0456",
    claimType: "Trip Cancellation",
    amount: 1800.0,
    status: "processing" as const,
    submittedDate: "2024-03-20",
    incidentDescription:
      "Had to cancel trip due to sudden illness of elderly parent requiring immediate care and hospitalization.",
    incidentDate: "2024-03-18",
    incidentLocation: "New York, USA",
    preferredSettlement: "Bank Transfer",
    bankDetails: "Chase Bank - Account: ****5678 - Routing: 987654321",
    documents: [
      {
        id: "doc3",
        name: "Doctor Certificate.pdf",
        type: "application/pdf",
        size: 1536000,
        uploadDate: "2024-03-20",
        url: "/documents/doctor-certificate.pdf",
      },
    ],
    timeline: [
      {
        date: "2024-03-20",
        status: "submitted",
        description: "Claim submitted",
        completed: true,
      },
      {
        date: "2024-03-21",
        status: "processing",
        description: "Under review",
        completed: false,
      },
    ],
  },
  {
    id: "3",
    claimReference: "CLM1710234567892",
    policyNumber: "POLTB1710234567892",
    claimantName: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1-555-0789",
    claimType: "Baggage Loss",
    amount: 750.0,
    status: "paid" as const,
    submittedDate: "2024-03-10",
    processedDate: "2024-03-12",
    transactionId: "TRAN202403120JAZZ",
    incidentDescription:
      "Checked baggage was lost by airline during connecting flight. Baggage contained personal items and electronics.",
    incidentDate: "2024-03-08",
    incidentLocation: "London Heathrow Airport, UK",
    preferredSettlement: "Bank Transfer",
    bankDetails: "Wells Fargo - Account: ****9012 - Routing: 456789123",
    documents: [
      {
        id: "doc4",
        name: "Airline Baggage Report.pdf",
        type: "application/pdf",
        size: 1024000,
        uploadDate: "2024-03-10",
        url: "/documents/baggage-report.pdf",
      },
      {
        id: "doc5",
        name: "Purchase Receipts.pdf",
        type: "application/pdf",
        size: 2048000,
        uploadDate: "2024-03-10",
        url: "/documents/receipts.pdf",
      },
    ],
    timeline: [
      {
        date: "2024-03-10",
        status: "submitted",
        description: "Claim submitted",
        completed: true,
      },
      {
        date: "2024-03-11",
        status: "processing",
        description: "Under review",
        completed: true,
      },
      {
        date: "2024-03-12",
        status: "approved",
        description: "Claim approved and paid",
        completed: true,
        notes: "Payment processed via bank transfer",
      },
    ],
    assessorNotes: "Baggage loss confirmed by airline. All receipts provided are valid. Claim amount is reasonable.",
  },
]

// Mock claims data for table display
const mockClaims: Claim[] = mockClaimsDetailed.map((claim) => ({
  id: claim.id,
  claimReference: claim.claimReference,
  policyNumber: claim.policyNumber,
  claimantName: claim.claimantName,
  claimType: claim.claimType,
  amount: claim.amount,
  status: claim.status,
  submittedDate: claim.submittedDate,
  processedDate: claim.processedDate,
  transactionId: claim.transactionId,
}))

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims)
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>(mockClaims)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let filtered = claims

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (claim) =>
          claim.claimReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.claimantName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((claim) => claim.status === statusFilter)
    }

    setFilteredClaims(filtered)
  }, [claims, searchTerm, statusFilter])

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

  const totalClaims = claims.length
  const pendingClaims = claims.filter((c) => c.status === "submitted" || c.status === "processing").length
  const approvedClaims = claims.filter((c) => c.status === "approved" || c.status === "paid").length
  const totalClaimAmount = claims.reduce((sum, claim) => sum + claim.amount, 0)

  const handleViewClaim = (claimId: string) => {
    const claimDetails = mockClaimsDetailed.find((claim) => claim.id === claimId)
    if (claimDetails) {
      setSelectedClaim(claimDetails)
      setIsModalOpen(true)
    }
  }

  const handleApproveClaim = (claimId: string) => {
    setClaims((prev) =>
      prev.map((claim) =>
        claim.id === claimId
          ? { ...claim, status: "approved" as const, processedDate: new Date().toISOString().split("T")[0] }
          : claim,
      ),
    )
  }

  const handleRejectClaim = (claimId: string) => {
    setClaims((prev) =>
      prev.map((claim) =>
        claim.id === claimId
          ? { ...claim, status: "rejected" as const, processedDate: new Date().toISOString().split("T")[0] }
          : claim,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Claims Management</h1>
        <p className="text-muted-foreground">Review, approve, and manage insurance claims</p>
      </div>

      {/* Claims Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClaims}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingClaims}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Claims</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedClaims}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claim Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalClaimAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
          <CardDescription>Review and process insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search claims..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Claims Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim Reference</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Claimant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.claimReference}</TableCell>
                  <TableCell>{claim.policyNumber}</TableCell>
                  <TableCell>{claim.claimantName}</TableCell>
                  <TableCell>{claim.claimType}</TableCell>
                  <TableCell>${claim.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(claim.status)}</TableCell>
                  <TableCell>{new Date(claim.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewClaim(claim.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {(claim.status === "submitted" || claim.status === "processing") && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveClaim(claim.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectClaim(claim.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ClaimDetailsModal
        claim={selectedClaim}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedClaim(null)
        }}
      />
    </div>
  )
}
