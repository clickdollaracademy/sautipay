interface Refund {
  id: string
  customer: string
  amount: number
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  date: string
}

interface RefundQueryParams {
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

// Mock data for refunds
const mockRefunds: Refund[] = [
  {
    id: "REF001",
    customer: "John Doe",
    amount: 150,
    reason: "Product not as described",
    status: "Pending",
    date: "2023-06-15",
  },
  {
    id: "REF002",
    customer: "Jane Smith",
    amount: 75.5,
    reason: "Wrong size",
    status: "Approved",
    date: "2023-06-14",
  },
  {
    id: "REF003",
    customer: "Bob Johnson",
    amount: 200,
    reason: "Changed mind",
    status: "Rejected",
    date: "2023-06-13",
  },
  {
    id: "REF004",
    customer: "Alice Brown",
    amount: 50,
    reason: "Defective product",
    status: "Pending",
    date: "2023-06-16",
  },
  {
    id: "REF005",
    customer: "Charlie Wilson",
    amount: 125.75,
    reason: "Late delivery",
    status: "Pending",
    date: "2023-06-17",
  },
]

export async function getRefunds(params: RefundQueryParams): Promise<PaginatedResponse<Refund>> {
  const { page, limit, status } = params

  // Filter refunds based on status
  let filteredRefunds = [...mockRefunds]

  if (status) {
    filteredRefunds = filteredRefunds.filter((refund) => refund.status.toLowerCase() === status.toLowerCase())
  }

  // Calculate pagination
  const total = filteredRefunds.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = filteredRefunds.slice(startIndex, endIndex)

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

export async function getTotalRefunded(): Promise<number> {
  // Calculate total refunded amount from approved refunds
  return mockRefunds
    .filter((refund) => refund.status === "Approved")
    .reduce((total, refund) => total + refund.amount, 0)
}

export async function getPendingRefundsCount(): Promise<number> {
  // Count pending refunds
  return mockRefunds.filter((refund) => refund.status === "Pending").length
}
