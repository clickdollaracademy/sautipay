"use client"

import { DollarSign, Users, RefreshCcw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricsProps {
  totalDue?: {
    amount: string
    percentage: string
    period: string
  }
  pendingCommissions?: {
    amount: string
    count: number
  }
  activeRefunds?: {
    count: number
    value: string
  }
}

export function MetricsCards({ totalDue, pendingCommissions, activeRefunds }: MetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {totalDue && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Due</p>
                <p className="text-2xl font-bold">{totalDue.amount}</p>
                <p className="text-xs text-muted-foreground">
                  +{totalDue.percentage} from {totalDue.period}
                </p>
              </div>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      )}

      {pendingCommissions && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending Commissions</p>
                <p className="text-2xl font-bold">{pendingCommissions.amount}</p>
                <p className="text-xs text-muted-foreground">{pendingCommissions.count} payments pending</p>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      )}

      {activeRefunds && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Refunds</p>
                <p className="text-2xl font-bold">{activeRefunds.count}</p>
                <p className="text-xs text-muted-foreground">{activeRefunds.value} total value</p>
              </div>
              <RefreshCcw className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
