"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface Settlement {
  id: string
  business: string
  amount: string
  dueDate: string
  status: "Pending" | "Processed"
}

export function PendingSettlementsTable() {
  const [settlements, setSettlements] = useState<Settlement[]>([
    {
      id: "001",
      business: "Acme Corp",
      amount: "$5,234.89",
      dueDate: "Dec 24, 2023",
      status: "Pending",
    },
    {
      id: "002",
      business: "Global Services",
      amount: "$3,123.45",
      dueDate: "Dec 25, 2023",
      status: "Pending",
    },
  ])

  const handleProcess = (id: string) => {
    setSettlements(
      settlements.map((settlement) =>
        settlement.id === id ? { ...settlement, status: "Processed" as const } : settlement,
      ),
    )
    toast({
      title: "Settlement processed",
      description: "The settlement has been processed successfully.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input placeholder="Search settlements..." className="max-w-xs" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Button>Process Selected</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Pending Settlements</h2>
          <p className="text-sm text-muted-foreground">A list of all pending settlements that require processing.</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map((settlement) => (
              <TableRow key={settlement.id}>
                <TableCell>{settlement.id}</TableCell>
                <TableCell>{settlement.business}</TableCell>
                <TableCell>{settlement.amount}</TableCell>
                <TableCell>{settlement.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={settlement.status === "Pending" ? "default" : "success"}>{settlement.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleProcess(settlement.id)} disabled={settlement.status === "Processed"}>
                    Process
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">Showing 2 of 15 results</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
