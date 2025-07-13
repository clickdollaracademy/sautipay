// This is a mock implementation - in a real app, this would connect to your database
import type { DeductibleFee } from "@/types/settings"
import { calculateNetPremium } from "@/utils/calculateNetPremium"

interface TransactionFilters {
  page?: number
  limit?: number
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  currency?: string
  companyId?: string
}

interface Transaction {
  id: string
  date: string
  clientName: string
  amount: number
  currency: string
  netPremium: number
  status: string
  companyId: string
}

interface PaginatedResponse {
  data: Transaction[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Mock data
const mockTransactions: Transaction[] = Array.from({ length: 100 }, (_, i) => {
  // Create date - randomly distributed across March and April 2024
  const month = Math.random() > 0.5 ? "03" : "04"
  const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, "0")
  const date = `2024-${month}-${day}`

  // Calculate transaction number within the month (01, 02, etc.)
  const transactionNumber = ((i % 99) + 1).toString().padStart(2, "0")

  // Generate transaction ID in the format: TRANYYYY+MM+NN+JAZZ
  const id = `TRAN2024${month}${transactionNumber}JAZZ`

  return {
    id,
    date,
    clientName: `Client ${i + 1}`,
    amount: Math.floor(Math.random() * 10000) + 1000,
    currency: ["USD", "EUR", "GBP", "JPY", "UGX"][Math.floor(Math.random() * 5)],
    netPremium: 0, // Will be calculated later
    status: ["Completed", "Pending", "Failed"][Math.floor(Math.random() * 3)],
    companyId: Math.random() > 0.3 ? "company1" : "company2",
  }
})

// Mock deductible fees
const mockDeductibleFees: DeductibleFee[] = [
  { name: "Taxes", type: "percentage", value: 5, enabled: true, currency: "USD" },
  { name: "VAT", type: "percentage", value: 7.5, enabled: true, currency: "USD" },
  { name: "Stamp Duty", type: "flat", value: 50, enabled: true, currency: "USD" },
  { name: "Industrial Training Levy", type: "percentage", value: 1, enabled: true, currency: "USD" },
]

// Calculate net premium for all transactions
const transactionsWithNetPremium = mockTransactions.map((transaction) => ({
  ...transaction,
  netPremium: calculateNetPremium(transaction.amount, mockDeductibleFees, transaction.currency),
}))

export async function getTransactions(filters: TransactionFilters = {}): Promise<PaginatedResponse> {
  const {
    page = 1,
    limit = 10,
    search = "",
    startDate = "",
    endDate = "",
    status = "",
    currency = "",
    companyId = "",
  } = filters

  // Apply filters
  let filteredData = [...transactionsWithNetPremium]

  // Filter by company ID
  if (companyId) {
    filteredData = filteredData.filter((item) => item.companyId === companyId)
  }

  // Filter by search term (across multiple fields)
  if (search) {
    const searchLower = search.toLowerCase()
    filteredData = filteredData.filter(
      (item) =>
        item.clientName.toLowerCase().includes(searchLower) ||
        item.id.toString().includes(searchLower) ||
        item.currency.toLowerCase().includes(searchLower) ||
        item.status.toLowerCase().includes(searchLower),
    )
  }

  // Filter by date range
  if (startDate) {
    const start = new Date(startDate)
    filteredData = filteredData.filter((item) => new Date(item.date) >= start)
  }

  if (endDate) {
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999) // End of day
    filteredData = filteredData.filter((item) => new Date(item.date) <= end)
  }

  // Filter by status
  if (status && status !== "all") {
    filteredData = filteredData.filter((item) => item.status === status)
  }

  // Filter by currency
  if (currency && currency !== "all") {
    filteredData = filteredData.filter((item) => item.currency === currency)
  }

  // Calculate pagination
  const total = filteredData.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = filteredData.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  }
}

