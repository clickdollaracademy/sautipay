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
  bookingId?: string
  policyNumber?: string
  claimReference?: string
  transactionType?: "premium_payment" | "claim_settlement" | "commission" | "refund" | "other"
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

// Mock data - enhanced with transaction types and references
const mockTransactions: Transaction[] = [
  // Premium payments from bookings
  {
    id: "TRAN20240315JAZZ",
    date: "2024-03-15",
    clientName: "John Doe",
    amount: 125.0,
    currency: "USD",
    netPremium: 106.25,
    status: "Completed",
    companyId: "company1",
    bookingId: "TB1710234567890",
    policyNumber: "POLTB1710234567890",
    transactionType: "premium_payment",
  },
  {
    id: "TRAN20240318JAZZ",
    date: "2024-03-18",
    clientName: "Jane Smith",
    amount: 89.5,
    currency: "USD",
    netPremium: 76.08,
    status: "Completed",
    companyId: "company1",
    bookingId: "TB1710234567891",
    policyNumber: "POLTB1710234567891",
    transactionType: "premium_payment",
  },
  // Claim settlements (negative amounts for outgoing payments)
  {
    id: "TRAN20240318JAZZ",
    date: "2024-03-18",
    clientName: "Claim Settlement CLM1710234567890",
    amount: -2500.0,
    currency: "USD",
    netPremium: -2500.0,
    status: "Completed",
    companyId: "company1",
    claimReference: "CLM1710234567890",
    policyNumber: "POLTB1710234567890",
    transactionType: "claim_settlement",
  },
  {
    id: "TRAN20240312JAZZ",
    date: "2024-03-12",
    clientName: "Claim Settlement CLM1710234567892",
    amount: -750.0,
    currency: "USD",
    netPremium: -750.0,
    status: "Completed",
    companyId: "company1",
    claimReference: "CLM1710234567892",
    policyNumber: "POLTB1710234567892",
    transactionType: "claim_settlement",
  },
  // Commission transactions
  {
    id: "TRAN20240315COMM",
    date: "2024-03-15",
    clientName: "Commission - Travel Policy",
    amount: 12.5,
    currency: "USD",
    netPremium: 12.5,
    status: "Completed",
    companyId: "company1",
    bookingId: "TB1710234567890",
    transactionType: "commission",
  },
  // Generate additional mock transactions
  ...Array.from({ length: 95 }, (_, i) => {
    const month = Math.random() > 0.5 ? "03" : "04"
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, "0")
    const date = `2024-${month}-${day}`
    const transactionNumber = ((i % 99) + 1).toString().padStart(2, "0")
    const id = `TRAN2024${month}${transactionNumber}JAZZ`

    const transactionTypes = ["premium_payment", "commission", "refund", "other"]
    const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)] as any

    return {
      id,
      date,
      clientName: `Client ${i + 6}`,
      amount: Math.floor(Math.random() * 10000) + 1000,
      currency: ["USD", "EUR", "GBP", "JPY", "UGX"][Math.floor(Math.random() * 5)],
      netPremium: 0, // Will be calculated later
      status: ["Completed", "Pending", "Failed"][Math.floor(Math.random() * 3)],
      companyId: Math.random() > 0.3 ? "company1" : "company2",
      transactionType,
    }
  }),
]

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
        item.status.toLowerCase().includes(searchLower) ||
        (item.bookingId && item.bookingId.toLowerCase().includes(searchLower)) ||
        (item.policyNumber && item.policyNumber.toLowerCase().includes(searchLower)) ||
        (item.claimReference && item.claimReference.toLowerCase().includes(searchLower)) ||
        (item.transactionType && item.transactionType.toLowerCase().includes(searchLower)),
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

  // Filter by transaction type
  if (filters.transactionType && filters.transactionType !== "all") {
    filteredData = filteredData.filter((item) => item.transactionType === filters.transactionType)
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
