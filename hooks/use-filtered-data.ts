"use client"

import { useState, useEffect, useCallback } from "react"

export interface FilterParams {
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  currency?: string
}

export interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface UseFilteredDataProps<T> {
  endpoint: string
  defaultData: T[]
  initialFilters?: FilterParams
  initialPage?: number
  initialLimit?: number
}

export function useFilteredData<T>({
  endpoint,
  defaultData,
  initialFilters = {},
  initialPage = 1,
  initialLimit = 10,
}: UseFilteredDataProps<T>) {
  const [data, setData] = useState<T[]>(defaultData)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterParams>(initialFilters)
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  })

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      if (process.env.NODE_ENV === "development") {
        console.log(`[v0] Development mode: Using mock data for ${endpoint}`)

        // Mock data for different endpoints
        const mockData = {
          settlements: [
            {
              id: "1",
              date: "2023-06-15",
              settledAmount: 4500,
              bill: 2446,
              transferredAmount: 5100,
              transactionCount: 2,
              status: "Completed",
            },
            {
              id: "2",
              date: "2023-06-16",
              settledAmount: 10000,
              bill: 3000,
              transferredAmount: 7000,
              transactionCount: 2,
              status: "Completed",
            },
            {
              id: "3",
              date: "2023-06-17",
              settledAmount: 7500,
              bill: 2200,
              transferredAmount: 5300,
              transactionCount: 3,
              status: "Pending",
            },
          ],
          commissions: [
            {
              id: "1",
              date: "2023-06-15",
              amount: 250,
              type: "Travel Insurance",
              status: "Paid",
            },
            {
              id: "2",
              date: "2023-06-16",
              amount: 180,
              type: "Travel Insurance",
              status: "Pending",
            },
          ],
          transactions: [
            {
              id: "TRAN20240615001JAZZ",
              date: "2023-06-15",
              amount: 2500,
              description: "Insurance premium payment",
              status: "Completed",
            },
            {
              id: "TRAN20240616002JAZZ",
              date: "2023-06-16",
              amount: 1800,
              description: "Policy renewal",
              status: "Completed",
            },
          ],
        }

        const endpointData = mockData[endpoint as keyof typeof mockData] || []

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setData(endpointData as T[])
        setPagination({
          page: 1,
          limit: initialLimit,
          total: endpointData.length,
          totalPages: Math.ceil(endpointData.length / initialLimit),
        })

        setIsLoading(false)
        return
      }

      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (filters.search) queryParams.append("search", filters.search)
      if (filters.startDate) queryParams.append("startDate", filters.startDate)
      if (filters.endDate) queryParams.append("endDate", filters.endDate)
      if (filters.status) queryParams.append("status", filters.status)
      if (filters.currency) queryParams.append("currency", filters.currency)

      console.log(`[v0] Fetching data from /api/${endpoint}`)
      const response = await fetch(`/api/${endpoint}?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error(`[v0] Response is not JSON for ${endpoint}:`, await response.text())
        throw new Error(`API returned non-JSON response for ${endpoint}`)
      }

      const result = await response.json()

      // For mock data, ensure IDs are properly formatted
      if (endpoint === "transactions" && Array.isArray(result.data)) {
        const formattedData = result.data.map((item: any, index: number) => {
          if (typeof item.id === "number" || !item.id.startsWith("TRAN")) {
            const month = item.date.substring(5, 7)
            const transactionNumber = (index + 1).toString().padStart(2, "0")
            return {
              ...item,
              id: `TRAN2024${month}${transactionNumber}JAZZ`,
            }
          }
          return item
        })
        setData(formattedData as T[])
      } else {
        setData(result.data)
      }

      setPagination({
        page: result.pagination.page,
        limit: result.pagination.limit,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages,
      })
    } catch (error) {
      console.error(`[v0] Error fetching data from ${endpoint}:`, error)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }, [endpoint, filters, pagination.page, pagination.limit, initialLimit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const applyFilters = useCallback((newFilters: FilterParams) => {
    setFilters(newFilters)
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page when filters change
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({})
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const changePage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }))
  }, [])

  return {
    data,
    isLoading,
    pagination,
    filters,
    applyFilters,
    resetFilters,
    changePage,
    changePageSize,
    refreshData: fetchData,
  }
}
