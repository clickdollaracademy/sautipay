interface Approval {
  id: string
  type: "Payment" | "Refund" | "Commission" | "Company"
  companyName: string
  amount?: number
  currency?: string
  requestDate: string
  priority: "High" | "Medium" | "Low"
  description: string
}

interface ApprovalQueryParams {
  page: number
  limit: number
  type?: string
  priority?: string
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

// Mock data for approvals
const mockApprovals: Approval[] = [
  {
    id: "1",
    type: "Payment",
    companyName: "Acme Inc",
    amount: 15000,
    currency: "USD",
    requestDate: "2023-08-15",
    priority: "High",
    description: "Large payment requiring approval due to exceeding threshold.",
  },
  {
    id: "2",
    type: "Refund",
    companyName: "Globex Corp",
    amount: 2500,
    currency: "EUR",
    requestDate: "2023-08-14",
    priority: "Medium",
    description: "Customer requested refund for canceled service.",
  },
  {
    id: "3",
    type: "Commission",
    companyName: "Stark Industries",
    amount: 7500,
    currency: "USD",
    requestDate: "2023-08-13",
    priority: "Low",
    description: "Monthly commission payout for broker network.",
  },
  {
    id: "4",
    type: "Company",
    companyName: "Umbrella LLC",
    requestDate: "2023-08-12",
    priority: "High",
    description: "New company onboarding approval required.",
  },
  {
    id: "5",
    type: "Payment",
    companyName: "Wayne Enterprises",
    amount: 9000,
    currency: "GBP",
    requestDate: "2023-08-11",
    priority: "Medium",
    description: "International payment requiring owner approval.",
  },
  {
    id: "6",
    type: "Refund",
    companyName: "Acme Inc",
    amount: 1200,
    currency: "USD",
    requestDate: "2023-08-10",
    priority: "Low",
    description: "Disputed charge refund request.",
  },
  {
    id: "7",
    type: "Commission",
    companyName: "Globex Corp",
    amount: 3500,
    currency: "EUR",
    requestDate: "2023-08-09",
    priority: "Medium",
    description: "Special commission rate adjustment approval.",
  },
  {
    id: "8",
    type: "Company",
    companyName: "Daily Planet",
    requestDate: "2023-08-08",
    priority: "Medium",
    description: "Company requesting plan upgrade approval.",
  },
]

export async function getApprovals(params: ApprovalQueryParams): Promise<PaginatedResponse<Approval>> {
  const { page, limit, type, priority } = params

  // Filter approvals based on type and priority
  let filteredApprovals = [...mockApprovals]

  if (type && type !== "all") {
    filteredApprovals = filteredApprovals.filter((approval) => approval.type.toLowerCase() === type.toLowerCase())
  }

  if (priority) {
    filteredApprovals = filteredApprovals.filter(
      (approval) => approval.priority.toLowerCase() === priority.toLowerCase(),
    )
  }

  // Calculate pagination
  const total = filteredApprovals.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = filteredApprovals.slice(startIndex, endIndex)

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

export async function getPendingApprovalsCount(): Promise<number> {
  return mockApprovals.length
}

