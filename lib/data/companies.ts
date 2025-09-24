interface Company {
  id: string
  name: string
  industry: string
  onboardingDate: string
  transactionStartDate: string
  contractStartDate: string
  contractEndDate: string
  status: "Active" | "Pending" | "Suspended" | "Inactive"
  nearingExpiry?: boolean
  contractUrl?: string
}

interface CompanyQueryParams {
  page: number
  limit: number
  status?: string
  search?: string
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

// Mock data for companies
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corp",
    industry: "Technology",
    onboardingDate: "Jan 15, 2023",
    transactionStartDate: "Feb 1, 2023",
    contractStartDate: "Jan 15, 2023",
    contractEndDate: "Jan 15, 2025",
    status: "Active",
    nearingExpiry: true,
    contractUrl: "/contracts/acme-corp.pdf",
  },
  {
    id: "2",
    name: "Global Services Ltd",
    industry: "Consulting",
    onboardingDate: "Mar 22, 2023",
    transactionStartDate: "Apr 1, 2023",
    contractStartDate: "Mar 22, 2023",
    contractEndDate: "Sep 22, 2024",
    status: "Pending",
    nearingExpiry: true,
    contractUrl: "/contracts/global-services.pdf",
  },
  {
    id: "3",
    name: "EcoSolutions Inc",
    industry: "Environmental",
    onboardingDate: "Jun 10, 2023",
    transactionStartDate: "Jul 1, 2023",
    contractStartDate: "Jun 10, 2023",
    contractEndDate: "Jun 10, 2025",
    status: "Active",
    nearingExpiry: false,
    contractUrl: "/contracts/eco-solutions.pdf",
  },
  {
    id: "4",
    name: "Stark Industries",
    industry: "Manufacturing",
    onboardingDate: "Jul 12, 2023",
    transactionStartDate: "Aug 1, 2023",
    contractStartDate: "Jul 12, 2023",
    contractEndDate: "Jul 12, 2025",
    status: "Active",
    nearingExpiry: false,
    contractUrl: "/contracts/stark-industries.pdf",
  },
  {
    id: "5",
    name: "Wayne Enterprises",
    industry: "Technology",
    onboardingDate: "Apr 5, 2023",
    transactionStartDate: "May 1, 2023",
    contractStartDate: "Apr 5, 2023",
    contractEndDate: "Apr 5, 2024",
    status: "Inactive",
    nearingExpiry: true,
    contractUrl: "/contracts/wayne-enterprises.pdf",
  },
]

export async function getCompanies(params: CompanyQueryParams): Promise<PaginatedResponse<Company>> {
  const { page, limit, status, search } = params

  // Filter companies based on status and search
  let filteredCompanies = [...mockCompanies]

  if (status) {
    filteredCompanies = filteredCompanies.filter((company) => company.status.toLowerCase() === status.toLowerCase())
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredCompanies = filteredCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchLower) || company.industry.toLowerCase().includes(searchLower),
    )
  }

  // Calculate pagination
  const total = filteredCompanies.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = filteredCompanies.slice(startIndex, endIndex)

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

export async function getRecentCompanies(limit = 5): Promise<Company[]> {
  // Sort companies by onboarding date (most recent first) and return the specified number
  return [...mockCompanies]
    .sort((a, b) => new Date(b.onboardingDate).getTime() - new Date(a.onboardingDate).getTime())
    .slice(0, limit)
}
