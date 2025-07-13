"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface CompanyData {
  id: string
  name: string
  revenue: number
  transactionCount: number
  userCount: number
  growth: number
  status: "increasing" | "decreasing" | "stable"
}

export function CompanyPerformance() {
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState<CompanyData[]>([])
  const [sortBy, setSortBy] = useState("revenue")

  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setCompanies([
          {
            id: "1",
            name: "Acme Inc",
            revenue: 1250000,
            transactionCount: 4532,
            userCount: 156,
            growth: 12.5,
            status: "increasing",
          },
          {
            id: "2",
            name: "Globex Corp",
            revenue: 983000,
            transactionCount: 3218,
            userCount: 87,
            growth: 8.3,
            status: "increasing",
          },
          {
            id: "3",
            name: "Umbrella LLC",
            revenue: 542000,
            transactionCount: 1897,
            userCount: 42,
            growth: -2.1,
            status: "decreasing",
          },
          {
            id: "4",
            name: "Stark Industries",
            revenue: 1752000,
            transactionCount: 5624,
            userCount: 215,
            growth: 18.7,
            status: "increasing",
          },
          {
            id: "5",
            name: "Wayne Enterprises",
            revenue: 1425000,
            transactionCount: 4210,
            userCount: 178,
            growth: 5.4,
            status: "stable",
          },
          {
            id: "6",
            name: "Oscorp",
            revenue: 876000,
            transactionCount: 2935,
            userCount: 93,
            growth: -4.6,
            status: "decreasing",
          },
          {
            id: "7",
            name: "Daily Planet",
            revenue: 638000,
            transactionCount: 2148,
            userCount: 68,
            growth: 3.2,
            status: "stable",
          },
          {
            id: "8",
            name: "LexCorp",
            revenue: 1135000,
            transactionCount: 3842,
            userCount: 124,
            growth: 9.8,
            status: "increasing",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch company data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanyData()
  }, [])

  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortBy === "revenue") return b.revenue - a.revenue
    if (sortBy === "transactions") return b.transactionCount - a.transactionCount
    if (sortBy === "users") return b.userCount - a.userCount
    if (sortBy === "growth") return b.growth - a.growth
    return 0
  })

  const getStatusBadge = (status: string, growth: number) => {
    if (status === "increasing") {
      return <Badge className="bg-green-500">+{growth.toFixed(1)}%</Badge>
    }
    if (status === "decreasing") {
      return <Badge variant="destructive">{growth.toFixed(1)}%</Badge>
    }
    return <Badge variant="outline">{growth.toFixed(1)}%</Badge>
  }

  const getProgressColor = (percent: number) => {
    const normalized = Math.min(100, Math.max(0, percent))
    if (normalized < 33) return "bg-red-500"
    if (normalized < 66) return "bg-yellow-500"
    return "bg-green-500"
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  // Find the highest values for relative comparison
  const maxRevenue = Math.max(...companies.map((c) => c.revenue))
  const maxTransactions = Math.max(...companies.map((c) => c.transactionCount))
  const maxUsers = Math.max(...companies.map((c) => c.userCount))

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="transactions">Transactions</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCompanies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>${company.revenue.toLocaleString()}</span>
                    <span>{((company.revenue / maxRevenue) * 100).toFixed(0)}%</span>
                  </div>
                  <Progress
                    value={(company.revenue / maxRevenue) * 100}
                    className={`h-2 ${getProgressColor((company.revenue / maxRevenue) * 100)}`}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{company.transactionCount.toLocaleString()}</span>
                    <span>{((company.transactionCount / maxTransactions) * 100).toFixed(0)}%</span>
                  </div>
                  <Progress
                    value={(company.transactionCount / maxTransactions) * 100}
                    className={`h-2 ${getProgressColor((company.transactionCount / maxTransactions) * 100)}`}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{company.userCount.toLocaleString()}</span>
                    <span>{((company.userCount / maxUsers) * 100).toFixed(0)}%</span>
                  </div>
                  <Progress
                    value={(company.userCount / maxUsers) * 100}
                    className={`h-2 ${getProgressColor((company.userCount / maxUsers) * 100)}`}
                  />
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(company.status, company.growth)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

