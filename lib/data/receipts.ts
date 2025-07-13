interface Receipt {
  id: string
  date: string
  clientName: string
  originalAmount: number
  originalCurrency: string
  convertedAmount: number
  convertedCurrency: string
}

interface ReceiptQueryParams {
  page: number
  limit: number
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

// Mock data for receipts
const mockReceipts: Receipt[] = [
  {
    id: "REC001",
    date: "2023-06-15",
    clientName: "John Doe",
    originalAmount: 1000,
    originalCurrency: "USD",
    convertedAmount: 1000,
    convertedCurrency: "USD",
  },
  {
    id: "REC002",
    date: "2023-06-16",
    clientName: "Jane Smith",
    originalAmount: 1500,
    originalCurrency: "EUR",
    convertedAmount: 1785.71,
    convertedCurrency: "USD",
  },
  {
    id: "REC003",
    date: "2023-06-17",
    clientName: "Bob Johnson",
    originalAmount: 2000,
    originalCurrency: "GBP",
    convertedAmount: 2777.78,
    convertedCurrency: "USD",
  },
  {
    id: "REC004",
    date: "2023-06-18",
    clientName: "Alice Brown",
    originalAmount: 200000,
    originalCurrency: "JPY",
    convertedAmount: 1815.87,
    convertedCurrency: "USD",
  },
]

export async function getReceipts(params: ReceiptQueryParams): Promise<PaginatedResponse<Receipt>> {
  const { page, limit } = params

  // Calculate pagination
  const total = mockReceipts.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = mockReceipts.slice(startIndex, endIndex)

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

