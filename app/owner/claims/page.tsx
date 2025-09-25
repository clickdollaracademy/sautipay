"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClaimDetailsModal } from "@/components/dashboard/claim-details-modal"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock claims data
const mockClaims = [
  {
    id: "CLM-001",
    policyNumber: "POL-2024-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+1234567890",
    incidentDate: "2024-01-15",
    submissionDate: "2024-01-16",
    claimType: "Medical Emergency",
    amount: 2500,
    status: "pending",
    description: "Emergency medical treatment during trip to Kenya",
    location: "Nairobi, Kenya",
    documents: [
      { id: "1", name: "Medical Report.pdf", type: "application/pdf", url: "/documents/medical-report.pdf" },
      { id: "2", name: "Hospital Bill.jpg", type: "image/jpeg", url: "/documents/hospital-bill.jpg" },
    ],
    timeline: [
      { date: "2024-01-16", event: "Claim submitted", status: "submitted" },
      { date: "2024-01-17", event: "Under review", status: "review" },
      { date: "2024-01-18", event: "Additional documents requested", status: "pending" },
    ],
    assessorNotes: "Reviewing medical documentation. May require additional verification.",
  },
  {
    id: "CLM-002",
    policyNumber: "POL-2024-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+1234567891",
    incidentDate: "2024-01-10",
    submissionDate: "2024-01-11",
    claimType: "Trip Cancellation",
    amount: 1800,
    status: "approved",
    description: "Flight cancelled due to airline strike",
    location: "Lagos, Nigeria",
    documents: [
      { id: "3", name: "Cancellation Notice.pdf", type: "application/pdf", url: "/documents/cancellation.pdf" },
    ],
    timeline: [
      { date: "2024-01-11", event: "Claim submitted", status: "submitted" },
      { date: "2024-01-12", event: "Under review", status: "review" },
      { date: "2024-01-14", event: "Approved", status: "approved" },
    ],
    assessorNotes: "Valid cancellation due to airline strike. Approved for full amount.",
  },
  {
    id: "CLM-003",
    policyNumber: "POL-2024-003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+1234567892",
    incidentDate: "2024-01-05",
    submissionDate: "2024-01-06",
    claimType: "Baggage Loss",
    amount: 800,
    status: "rejected",
    description: "Lost baggage during connecting flight",
    location: "Cairo, Egypt",
    documents: [{ id: "4", name: "Baggage Report.pdf", type: "application/pdf", url: "/documents/baggage-report.pdf" }],
    timeline: [
      { date: "2024-01-06", event: "Claim submitted", status: "submitted" },
      { date: "2024-01-07", event: "Under review", status: "review" },
      { date: "2024-01-10", event: "Rejected", status: "rejected" },
    ],
    assessorNotes: "Insufficient documentation. Baggage was recovered within 24 hours.",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "under_review":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "approved":
      return <CheckCircle className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
    case "under_review":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function AdminClaimsPage() {
  const [claims] = useState(mockClaims)
  const [filteredClaims, setFilteredClaims] = useState(mockClaims)
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterClaims(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterClaims(searchTerm, status)
  }

  const filterClaims = (search: string, status: string) => {
    let filtered = claims

    if (search) {
      filtered = filtered.filter(
        (claim) =>
          claim.customerName.toLowerCase().includes(search.toLowerCase()) ||
          claim.policyNumber.toLowerCase().includes(search.toLowerCase()) ||
          claim.id.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status !== "all") {
      filtered = filtered.filter((claim) => claim.status === status)
    }

    setFilteredClaims(filtered)
  }

  const handleApprove = async (claimId: string) => {
    try {
      // In a real app, this would be an API call
      toast({
        title: "Claim Approved",
        description: `Claim ${claimId} has been approved successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve claim. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (claimId: string) => {
    try {
      // In a real app, this would be an API call
      toast({
        title: "Claim Rejected",
        description: `Claim ${claimId} has been rejected.`,
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject claim. Please try again.",
        variant: "destructive",
      })
    }
  }

  const pendingClaims = claims.filter((claim) => claim.status === "pending").length
  const approvedClaims = claims.filter((claim) => claim.status === "approved").length
  const rejectedClaims = claims.filter((claim) => claim.status === "rejected").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Claims Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{claims.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingClaims}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedClaims}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedClaims}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name, policy number, or claim ID..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Policy</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{claim.customerName}</div>
                      <div className="text-sm text-muted-foreground">{claim.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{claim.policyNumber}</TableCell>
                  <TableCell>{claim.claimType}</TableCell>
                  <TableCell>${claim.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(claim.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(claim.status)}
                        {claim.status.replace("_", " ")}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(claim.submissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedClaim(claim)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {claim.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(claim.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(claim.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
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

      {/* Claim Details Modal */}
      {selectedClaim && (
        <ClaimDetailsModal claim={selectedClaim} isOpen={!!selectedClaim} onClose={() => setSelectedClaim(null)} />
      )}
    </div>
  )
}
