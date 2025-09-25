"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { DollarSign, Eye, CheckCircle } from "lucide-react"
import { calculateNetPremium } from "@/utils/calculateNetPremium"
import type { DeductibleFee } from "@/types/settings"
import { TableFilter, type FilterParams } from "@/components/table-filter"

interface CommissionEntry {
  id: string
  brokerName: string
  brokerCode: string
  totalSales: number
  commissionRate: number
  commissionAmount: number
  status: "Pending" | "Paid"
  period: string
  netPremium?: number
  currency: string
}

const initialCommissionData: CommissionEntry[] = [
  {
    id: "COM001",
    brokerName: "John Doe",
    brokerCode: "JD001",
    totalSales: 50000,
    commissionRate: 5,
    commissionAmount: 2500,
    status: "Pending",
    period: "June 2023",
    currency: "USD",
  },
  {
    id: "COM002",
    brokerName: "Jane Smith",
    brokerCode: "JS002",
    totalSales: 75000,
    commissionRate: 4.5,
    commissionAmount: 3375,
    status: "Paid",
    period: "June 2023",
    currency: "EUR",
  },
  {
    id: "COM003",
    brokerName: "Bob Johnson",
    brokerCode: "BJ003",
    totalSales: 60000,
    commissionRate: 6,
    commissionAmount: 3600,
    status: "Pending",
    period: "June 2023",
    currency: "GBP",
  },
  {
    id: "COM004",
    brokerName: "Alice Brown",
    brokerCode: "AB004",
    totalSales: 40000,
    commissionRate: 5.5,
    commissionAmount: 2200,
    status: "Pending",
    period: "June 2023",
    currency: "JPY",
  },
  {
    id: "COM005",
    brokerName: "Charlie Wilson",
    brokerCode: "CW005",
    totalSales: 55000,
    commissionRate: 5,
    commissionAmount: 2750,
    status: "Paid",
    period: "June 2023",
    currency: "UGX",
  },
]

export function CommissionTable() {
  const [commissionData, setCommissionData] = useState<CommissionEntry[]>([])
  const [filteredData, setFilteredData] = useState<CommissionEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [deductibleFees, setDeductibleFees] = useState<DeductibleFee[]>([])

  const memoizedDeductibleFees = useMemo(
    () =>
      [
        { name: "Taxes", type: "percentage", value: 5, enabled: true, currency: "USD" },
        { name: "VAT", type: "percentage", value: 7.5, enabled: true, currency: "USD" },
        { name: "Stamp Duty", type: "flat", value: 50, enabled: true, currency: "USD" },
        { name: "Industrial Training Levy", type: "percentage", value: 1, enabled: true, currency: "USD" },
      ] as DeductibleFee[],
    [],
  )

  const processedCommissionData = useMemo(() => {
    return initialCommissionData.map((entry) => {
      const netPremium = calculateNetPremium(entry.totalSales, memoizedDeductibleFees, entry.currency)
      return {
        ...entry,
        netPremium,
        commissionAmount: (netPremium * entry.commissionRate) / 100,
      }
    })
  }, [memoizedDeductibleFees])

  useEffect(() => {
    setDeductibleFees(memoizedDeductibleFees)
    setCommissionData(processedCommissionData)
    setFilteredData(processedCommissionData)
  }, [memoizedDeductibleFees, processedCommissionData])

  const handleMarkAsPaid = useCallback((id: string) => {
    setCommissionData((prev) => prev.map((entry) => (entry.id === id ? { ...entry, status: "Paid" } : entry)))
  }, [])

  const totalCommissionsPaid = useMemo(() => {
    return commissionData.reduce((sum, entry) => sum + (entry.status === "Paid" ? entry.commissionAmount : 0), 0)
  }, [commissionData])

  const totalCommissionsPending = useMemo(() => {
    return commissionData.reduce((sum, entry) => sum + (entry.status === "Pending" ? entry.commissionAmount : 0), 0)
  }, [commissionData])

  const handleFilter = useCallback(
    ({ query, startDate, endDate }: FilterParams) => {
      setIsLoading(true)

      // Use requestAnimationFrame to defer heavy computation
      requestAnimationFrame(() => {
        const queryLower = query.toLowerCase()
        const filtered = commissionData.filter((item) => {
          const matchesQuery =
            queryLower === "" ||
            item.brokerName.toLowerCase().includes(queryLower) ||
            item.brokerCode.toLowerCase().includes(queryLower) ||
            item.period.toLowerCase().includes(queryLower) ||
            item.status.toLowerCase().includes(queryLower)

          const itemDate = new Date(item.period)
          const matchesDateRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate)

          return matchesQuery && matchesDateRange
        })

        setFilteredData(filtered)
        setIsLoading(false)
      })
    },
    [commissionData],
  )

  const handleReset = useCallback(() => {
    setFilteredData(commissionData)
  }, [commissionData])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissionsPaid.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissionsPending.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Commission Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <TableFilter
            onFilter={handleFilter}
            onReset={handleReset}
            isLoading={isLoading}
            placeholder="Search commissions..."
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Broker Name (Code)</TableHead>
                <TableHead>Gross Premium</TableHead>
                <TableHead>Net Premium</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Commission Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {entry.brokerName} ({entry.brokerCode})
                  </TableCell>
                  <TableCell>
                    {entry.currency} {entry.totalSales.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {entry.currency} {entry.netPremium?.toFixed(2)}
                  </TableCell>
                  <TableCell>{entry.commissionRate}%</TableCell>
                  <TableCell>
                    {entry.currency} {entry.commissionAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={entry.status === "Paid" ? "success" : "default"}>{entry.status}</Badge>
                  </TableCell>
                  <TableCell>{entry.period}</TableCell>
                  <TableCell>{entry.currency}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Commission Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <h4 className="font-semibold">
                              Broker: {entry.brokerName} ({entry.brokerCode})
                            </h4>
                            <p>Period: {entry.period}</p>
                            <p>
                              Gross Premium: {entry.currency} {entry.totalSales.toFixed(2)}
                            </p>
                            <p>
                              Net Premium: {entry.currency} {entry.netPremium?.toFixed(2)}
                            </p>
                            <p>Commission Rate: {entry.commissionRate}%</p>
                            <p>
                              Commission Amount: {entry.currency} {entry.commissionAmount.toFixed(2)}
                            </p>
                            <p>Status: {entry.status}</p>
                            <p>Currency: {entry.currency}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {entry.status === "Pending" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Mark Commission as Paid</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to mark this commission as paid? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleMarkAsPaid(entry.id)}>
                              Mark as Paid
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
