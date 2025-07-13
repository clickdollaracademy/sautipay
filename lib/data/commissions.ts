interface Commission {
  id: string
  broker: string
  code: string
  grossPremium: number
  netPremium: number
  rate: number
  amount: number
  status: "Pending" | "Paid"
  period: string
  currency: string
}

interface CommissionQueryParams {
  page: number
  limit: number
  status?: string
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Mock data for commissions
const mockCommissions: Commission[] = [
  {
    id: "COM001",
    broker: "John Doe",
    code: "JD001",
    grossPremium: 50000,
    netPremium: 50000,
    rate: 5,
    amount: 2500,
    status: "Pending",
    period: "June 2023",
    currency: "USD",
  },
  {
    id: "COM002",
    broker: "Jane Smith",
    code: "JS002",
    grossPremium: 75000,
    netPremium: 75000,
    rate: 4.5,
    amount: 3375,
    status: "Paid",
    period: "June 2023",
    currency: "EUR",
  },
  {
    id: "COM003",
    broker: "Bob Johnson",
    code: "BJ003",
    grossPremium: 60000,
    netPremium: 60000,
    rate: 6,
    amount: 3600,
    status: "Pending",
    period: "June 2023",
    currency: "GBP",
  },
  {
    id: "COM004",
    broker: "Alice Brown",
    code: "AB004",
    grossPremium: 40000,
    netPremium: 40000,
    rate: 5.5,
    amount: 2200,
    status: "Pending",
    period: "June 2023",
    currency: "JPY",
  },
  {
    id: "COM005",
    broker: "Charlie Wilson",
    code: "CW005",
    grossPremium: 55000,
    netPremium: 55000,
    rate: 5,
    amount: 2750,
    status: "Paid",
    period: "June 2023",
    currency: "UGX",
  },
]

export async function getCommissions(params: CommissionQueryParams): Promise<PaginatedResponse<Commission>> {
  const { page, limit, status } = params

  // Filter commissions based on status
  let filteredCommissions = [...mockCommissions]

  if (status) {
    filteredCommissions = filteredCommissions.filter(
      (commission) => commission.status.toLowerCase() === status.toLowerCase(),
    )
  }

  // Calculate pagination
  const total = filteredCommissions.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = filteredCommissions.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  }
}

export async function getTotalCommissionsPaid(): Promise<number> {
  // Calculate total paid commissions
  return mockCommissions
    .filter((commission) => commission.status === "Paid")
    .reduce((total, commission) => total + commission.amount, 0)
}

export async function getTotalCommissionsPending(): Promise<number> {
  // Calculate total pending commissions
  return mockCommissions
    .filter((commission) => commission.status === "Pending")
    .reduce((total, commission) => total + commission.amount, 0)
}

