"use client"

import { useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableFilter, type FilterParams } from "@/components/table-filter"
import { useFilteredData } from "@/hooks/use-filtered-data"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Transaction {
  id: string
  date: string
  clientName: string
  amount: number
  currency: string
  netPremium: number
  status: string
}

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])

  // Define table columns
  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "id",
        header: "Transaction ID",
      },
      {
        accessorKey: "clientName",
        header: "Client Name",
      },
      {
        accessorKey: "amount",
        header: "Gross Premium",
        cell: ({ row }) => (
          <div className="text-right">
            {row.original.currency} {row.getValue<number>("amount").toFixed(2)}
          </div>
        ),
      },
      {
        accessorKey: "netPremium",
        header: "Net Premium",
        cell: ({ row }) => (
          <div className="text-right">
            {row.original.currency} {row.getValue<number>("netPremium").toFixed(2)}
          </div>
        ),
      },
      {
        accessorKey: "currency",
        header: "Currency",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    [],
  )

  // Setup filter hook
  const {
    data: transactions,
    isLoading,
    pagination,
    applyFilters,
    resetFilters,
    changePage,
    changePageSize,
  } = useFilteredData<Transaction>({
    apiEndpoint: "transactions",
    defaultPagination: { page: 1, limit: 10 },
  })

  // Setup table with tanstack/react-table
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    manualPagination: true, // We're handling pagination on the server
    state: {
      sorting,
      pagination: {
        pageIndex: pagination.page - 1, // TanStack Table uses 0-indexed pages
        pageSize: pagination.limit,
      },
    },
    pageCount: pagination.totalPages,
  })

  // Additional filters for transactions
  const additionalFilters = (
    <Select onValueChange={(value) => applyFilters({ status: value })}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Failed">Failed</SelectItem>
      </SelectContent>
    </Select>
  )

  // Handle filter application
  const handleFilter = (filters: FilterParams) => {
    applyFilters(filters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <TableFilter
          onFilter={handleFilter}
          onReset={resetFilters}
          isLoading={isLoading}
          placeholder="Search transactions..."
          additionalFilters={additionalFilters}
        />

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-purple-100 text-purple-900">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {Array.from({ length: columns.length }).map((_, cellIndex) => (
                    <TableCell key={`loading-cell-${cellIndex}`}>
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {transactions.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select value={pagination.limit.toString()} onValueChange={(value) => changePageSize(Number(value))}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pagination.limit} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => changePage(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => changePage(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

