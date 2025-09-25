interface Settlement {
  date: string
  settledAmount: number
  bill: number
  transferredAmount: number
  transactions: number
}

interface SettlementQueryParams {
  page: number
  limit: number
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  companyId?: string
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

// Mock data for settlements
const mockSettlements: Settlement[] = [
  {
    date: "2023-06-15",
    settledAmount: 4500,
    bill: 2446,
    transferredAmount: 5100,
    transactions: 2,
  },
  {
    date: "2023-06-16",
    settledAmount: 10000,
    bill: 3000,
    transferredAmount: 7000,
    transactions: 2,
  },
  {
    date: "2023-06-17",
    settledAmount: 7500,
    bill: 1500,
    transferredAmount: 6000,
    transactions: 3,
  },
  {
    date: "2023-06-18",
    settledAmount: 3200,
    bill: 800,
    transferredAmount: 2400,
    transactions: 1,
  },
  {
    date: "2023-06-19",
    settledAmount: 6800,
    bill: 1700,
    transferredAmount: 5100,
    transactions: 4,
  },
]

export async function getSettlements(params: SettlementQueryParams): Promise<PaginatedResponse<Settlement>> {
  const { page, limit, search, startDate, endDate, status, companyId } = params

  let filteredData = [...mockSettlements]

  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(
      (settlement) => settlement.date.includes(search) || settlement.settledAmount.toString().includes(search),
    )
  }

  // Apply date range filter
  if (startDate) {
    filteredData = filteredData.filter((settlement) => settlement.date >= startDate)
  }
  if (endDate) {
    filteredData = filteredData.filter((settlement) => settlement.date <= endDate)
  }

  // Calculate pagination
  const total = filteredData.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = filteredData.slice(startIndex, endIndex)

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

export async function getTodaySettlementSum(): Promise<number> {
  // In a real application, you would calculate this from the database
  // For demo purposes, we'll return 0
  return 0
}
