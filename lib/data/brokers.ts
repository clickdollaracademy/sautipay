interface Broker {
  id: string
  name: string
  company: string
  code: string
  email: string
  phone: string
  commissionRate: number
}

interface BrokerQueryParams {
  page: number
  limit: number
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

// Mock data for brokers
const mockBrokers: Broker[] = [
  {
    id: "1",
    name: "John Doe",
    company: "Doe Insurance",
    code: "JD001",
    email: "john@example.com",
    phone: "123-456-7890",
    commissionRate: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    company: "Smith Brokers",
    code: "JS002",
    email: "jane@example.com",
    phone: "098-765-4321",
    commissionRate: 4.5,
  },
  {
    id: "3",
    name: "Bob Johnson",
    company: "Johnson & Co",
    code: "BJ003",
    email: "bob@example.com",
    phone: "555-555-5555",
    commissionRate: 6,
  },
]

export async function getBrokers(params: BrokerQueryParams): Promise<PaginatedResponse<Broker>> {
  const { page, limit, search } = params

  // Filter brokers based on search
  let filteredBrokers = [...mockBrokers]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredBrokers = filteredBrokers.filter(
      (broker) =>
        broker.name.toLowerCase().includes(searchLower) ||
        broker.company.toLowerCase().includes(searchLower) ||
        broker.code.toLowerCase().includes(searchLower),
    )
  }

  // Calculate pagination
  const total = filteredBrokers.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get paginated data
  const paginatedData = filteredBrokers.slice(startIndex, endIndex)

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
