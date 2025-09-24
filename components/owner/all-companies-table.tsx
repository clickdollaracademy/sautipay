"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { FileText, Download, TriangleAlertIcon as AlertTriangle2 } from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  onboardingDate: string
  transactionStartDate: string
  contractStartDate: string
  contractEndDate: string
  status: "Active" | "Pending"
  nearingExpiry?: boolean
  contractUrl?: string
}

export function AllCompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Acme Corp",
      industry: "Technology",
      onboardingDate: "Jan 15, 2023",
      transactionStartDate: "Feb 1, 2023",
      contractStartDate: "Jan 15, 2023",
      contractEndDate: "Jan 15, 2025",
      status: "Active",
      nearingExpiry: true,
      contractUrl: "/contracts/acme-corp.pdf",
    },
    {
      id: "2",
      name: "Global Services Ltd",
      industry: "Consulting",
      onboardingDate: "Mar 22, 2023",
      transactionStartDate: "Apr 1, 2023",
      contractStartDate: "Mar 22, 2023",
      contractEndDate: "Sep 22, 2024",
      status: "Pending",
      nearingExpiry: true,
      contractUrl: "/contracts/global-services.pdf",
    },
    {
      id: "3",
      name: "EcoSolutions Inc",
      industry: "Environmental",
      onboardingDate: "Jun 10, 2023",
      transactionStartDate: "Jul 1, 2023",
      contractStartDate: "Jun 10, 2023",
      contractEndDate: "Jun 10, 2025",
      status: "Active",
      nearingExpiry: true,
      contractUrl: "/contracts/eco-solutions.pdf",
    },
  ])

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const viewCompanyDetails = (company: Company) => {
    setSelectedCompany(company)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input placeholder="Search companies..." className="max-w-xs" />
        <Button asChild>
          <Link href="/owner/onboarding">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Company
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-6">
          <h2 className="text-lg font-semibold">All Companies</h2>
          <p className="text-sm text-muted-foreground">Overview of all companies onboarded to the platform.</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Onboarding Date</TableHead>
              <TableHead>Transaction Start</TableHead>
              <TableHead>Contract Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.onboardingDate}</TableCell>
                <TableCell>{company.transactionStartDate}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Start: {company.contractStartDate}</span>
                    <div className="flex items-center gap-2">
                      <span>End: {company.contractEndDate}</span>
                      {company.nearingExpiry && (
                        <div className="tooltip-wrapper relative group">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span className="absolute bottom-full mb-2 hidden rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
                            Contract nearing expiry
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={company.status === "Active" ? "success" : "default"}>{company.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => viewCompanyDetails(company)}>
                      View Details
                    </Button>
                    {company.contractUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={company.contractUrl} target="_blank" rel="noopener noreferrer">
                          View Contract
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">Showing 3 of 3 companies</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedCompany?.name} Details</DialogTitle>
            <DialogDescription>Company information and contract details</DialogDescription>
          </DialogHeader>

          {selectedCompany && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Company Information</h3>
                  <div className="rounded-lg border p-3 space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Industry:</span>
                      <span>{selectedCompany.industry}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Onboarding Date:</span>
                      <span>{selectedCompany.onboardingDate}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span>
                        <Badge variant={selectedCompany.status === "Active" ? "success" : "default"}>
                          {selectedCompany.status}
                        </Badge>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Transaction Information</h3>
                  <div className="rounded-lg border p-3 space-y-2">
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Transaction Start:</span>
                      <span>{selectedCompany.transactionStartDate}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Contract Start:</span>
                      <span>{selectedCompany.contractStartDate}</span>
                    </div>
                    <div className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground">Contract End:</span>
                      <span className="flex items-center gap-2">
                        {selectedCompany.contractEndDate}
                        {selectedCompany.nearingExpiry && <AlertTriangle2 className="h-4 w-4 text-amber-500" />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Contract Document</h3>
                <div className="rounded-lg border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{selectedCompany.name} Contract</p>
                      <p className="text-xs text-muted-foreground">
                        PDF Document • Valid from {selectedCompany.contractStartDate} to{" "}
                        {selectedCompany.contractEndDate}
                      </p>
                    </div>
                  </div>
                  {selectedCompany.contractUrl && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedCompany.contractUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          View
                        </a>
                      </Button>
                      <Button variant="default" size="sm" asChild>
                        <a href={selectedCompany.contractUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
