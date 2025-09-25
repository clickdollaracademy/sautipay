"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Edit, Ban, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Company {
  id: string
  name: string
  industry: string
  status: "Active" | "Pending" | "Suspended" | "Inactive"
  joinDate: string
  plan: string
  usersCount: number
}

const MOCK_COMPANIES: Company[] = [
  {
    id: "1",
    name: "Acme Inc",
    industry: "Technology",
    status: "Active",
    joinDate: "2023-05-15",
    plan: "Enterprise",
    usersCount: 156,
  },
  {
    id: "2",
    name: "Globex Corp",
    industry: "Healthcare",
    status: "Active",
    joinDate: "2023-06-22",
    plan: "Professional",
    usersCount: 87,
  },
  {
    id: "3",
    name: "Umbrella LLC",
    industry: "Insurance",
    status: "Pending",
    joinDate: "2023-08-01",
    plan: "Standard",
    usersCount: 42,
  },
  {
    id: "4",
    name: "Stark Industries",
    industry: "Manufacturing",
    status: "Active",
    joinDate: "2023-07-12",
    plan: "Enterprise",
    usersCount: 215,
  },
  {
    id: "5",
    name: "Wayne Enterprises",
    industry: "Technology",
    status: "Inactive",
    joinDate: "2023-04-05",
    plan: "Professional",
    usersCount: 0,
  },
  {
    id: "6",
    name: "Oscorp",
    industry: "Biotechnology",
    status: "Active",
    joinDate: "2023-03-18",
    plan: "Standard",
    usersCount: 93,
  },
  {
    id: "7",
    name: "Daily Planet",
    industry: "Media",
    status: "Suspended",
    joinDate: "2023-01-30",
    plan: "Starter",
    usersCount: 68,
  },
  {
    id: "8",
    name: "LexCorp",
    industry: "Energy",
    status: "Active",
    joinDate: "2023-02-14",
    plan: "Enterprise",
    usersCount: 124,
  },
  {
    id: "9",
    name: "Cyberdyne Systems",
    industry: "Technology",
    status: "Active",
    joinDate: "2023-07-01",
    plan: "Professional",
    usersCount: 76,
  },
  {
    id: "10",
    name: "Massive Dynamics",
    industry: "Research",
    status: "Pending",
    joinDate: "2023-08-05",
    plan: "Enterprise",
    usersCount: 53,
  },
]

export function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const filteredCompanies = useMemo(() => {
    if (!companies.length) return []

    const searchLower = searchQuery.toLowerCase()
    return companies.filter((company) => {
      const matchesSearch =
        searchLower === "" ||
        company.name.toLowerCase().includes(searchLower) ||
        company.industry.toLowerCase().includes(searchLower)

      const matchesStatus = statusFilter === "all" || company.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [companies, searchQuery, statusFilter])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setCompanies(MOCK_COMPANIES)
      } catch (error) {
        console.error("Error fetching companies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const handleSuspendCompany = useCallback(
    (id: string, name: string) => {
      setCompanies((prev) =>
        prev.map((company) => (company.id === id ? { ...company, status: "Suspended" as const } : company)),
      )

      toast({
        title: "Company Suspended",
        description: `${name} has been suspended successfully.`,
      })
    },
    [toast],
  )

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value)
  }, [])

  const getBadgeVariant = useCallback((status: Company["status"]) => {
    switch (status) {
      case "Active":
        return "success"
      case "Pending":
        return "default"
      case "Suspended":
        return "destructive"
      default:
        return "outline"
    }
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="max-w-md"
          />
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/owner/onboarding">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Company
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No companies found
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(company.status)}>{company.status}</Badge>
                  </TableCell>
                  <TableCell>{company.joinDate}</TableCell>
                  <TableCell>{company.plan}</TableCell>
                  <TableCell>{company.usersCount}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/owner/companies/${company.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/owner/companies/${company.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      {company.status !== "Suspended" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Ban className="h-4 w-4" />
                              <span className="sr-only">Suspend</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Suspend Company</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to suspend {company.name}? This will prevent all users from
                                accessing the platform.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleSuspendCompany(company.id, company.name)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Suspend
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
