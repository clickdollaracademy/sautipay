"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye } from "lucide-react"
import Link from "next/link"

interface Company {
  id: string
  name: string
  industry: string
  status: "Active" | "Pending" | "Inactive"
  joinDate: string
  usersCount: number
}

export function RecentCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setCompanies([
          {
            id: "1",
            name: "Acme Inc",
            industry: "Technology",
            status: "Active",
            joinDate: "2023-05-15",
            usersCount: 156,
          },
          {
            id: "2",
            name: "Globex Corp",
            industry: "Healthcare",
            status: "Active",
            joinDate: "2023-06-22",
            usersCount: 87,
          },
          {
            id: "3",
            name: "Umbrella LLC",
            industry: "Insurance",
            status: "Pending",
            joinDate: "2023-08-01",
            usersCount: 42,
          },
          {
            id: "4",
            name: "Stark Industries",
            industry: "Manufacturing",
            status: "Active",
            joinDate: "2023-07-12",
            usersCount: 215,
          },
          {
            id: "5",
            name: "Wayne Enterprises",
            industry: "Technology",
            status: "Inactive",
            joinDate: "2023-04-05",
            usersCount: 0,
          },
        ])
      } catch (error) {
        console.error("Error fetching companies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.industry}</TableCell>
            <TableCell>
              <Badge
                variant={
                  company.status === "Active" ? "success" : company.status === "Pending" ? "default" : "destructive"
                }
              >
                {company.status}
              </Badge>
            </TableCell>
            <TableCell>{company.joinDate}</TableCell>
            <TableCell>{company.usersCount}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/owner/companies/${company.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
