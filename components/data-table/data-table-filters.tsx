"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Search, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileSpreadsheet, FileText, FileIcon } from "lucide-react"

export interface FilterParams {
  search?: string
  startDate?: string
  endDate?: string
  status?: string
  currency?: string
  [key: string]: any
}

interface SelectOption {
  label: string
  value: string
}

interface DataTableFiltersProps {
  onFilter: (filters: FilterParams) => void
  onReset?: () => void
  isLoading?: boolean
  showStatus?: boolean
  showCurrency?: boolean
  statusOptions?: SelectOption[]
  currencyOptions?: SelectOption[]
  placeholder?: string
  onExport?: (format: "excel" | "word" | "pdf") => void
}

export function DataTableFilters(props: DataTableFiltersProps) {
  const {
    onFilter,
    onReset,
    isLoading = false,
    showStatus = false,
    showCurrency = false,
    statusOptions = [],
    currencyOptions = [],
    placeholder = "Search...",
    onExport,
  } = props
  const [search, setSearch] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [status, setStatus] = useState<string>("")
  const [currency, setCurrency] = useState<string>("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const filters: FilterParams = { search }

    if (startDate) {
      filters.startDate = format(startDate, "yyyy-MM-dd")
    }

    if (endDate) {
      filters.endDate = format(endDate, "yyyy-MM-dd")
    }

    if (status) {
      filters.status = status
    }

    if (currency) {
      filters.currency = currency
    }

    onFilter(filters)
  }

  const handleReset = () => {
    setSearch("")
    setStartDate(undefined)
    setEndDate(undefined)
    setStatus("")
    setCurrency("")

    if (onReset) {
      onReset()
    } else {
      onFilter({})
    }
  }

  return (
    <div className="mb-4 space-y-4">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={placeholder}
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-9 w-9 p-0"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal sm:w-[160px]",
                    !startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal sm:w-[160px]",
                    !endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          {showStatus && statusOptions.length > 0 && (
            <div className="sm:w-[160px]">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showCurrency && currencyOptions.length > 0 && (
            <div className="sm:w-[160px]">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Currencies</SelectItem>
                  {currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {onExport && (
            <div className="sm:w-[160px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onExport("excel")}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport("word")}>
                    <FileText className="mr-2 h-4 w-4" />
                    Word
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport("pdf")}>
                    <FileIcon className="mr-2 h-4 w-4" />
                    PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="flex space-x-2 sm:ml-auto">
            <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Filtering..." : "Filter"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
