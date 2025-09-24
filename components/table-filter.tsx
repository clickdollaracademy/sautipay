"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Loader2, Search, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface FilterParams {
  query: string
  startDate: Date | null
  endDate: Date | null
  [key: string]: any // Allow for additional custom filter parameters
}

interface TableFilterProps {
  onFilter: (params: FilterParams) => void
  onReset: () => void
  isLoading?: boolean
  placeholder?: string
  defaultValues?: Partial<FilterParams>
  additionalFilters?: React.ReactNode
}

export function TableFilter({
  onFilter,
  onReset,
  isLoading = false,
  placeholder = "Search...",
  defaultValues = {},
  additionalFilters,
}: TableFilterProps) {
  const [query, setQuery] = useState(defaultValues.query || "")
  const [startDate, setStartDate] = useState<Date | null>(defaultValues.startDate || null)
  const [endDate, setEndDate] = useState<Date | null>(defaultValues.endDate || null)

  const handleSearch = useCallback(() => {
    onFilter({
      query,
      startDate,
      endDate,
    })
  }, [query, startDate, endDate, onFilter])

  const handleReset = useCallback(() => {
    setQuery("")
    setStartDate(null)
    setEndDate(null)
    onReset()
  }, [onReset])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
      <div className="flex flex-1 flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="flex-1">
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal sm:w-[180px]",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate || undefined} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal sm:w-[180px]",
                  !endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate || undefined} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {additionalFilters && <div className="flex space-x-4">{additionalFilters}</div>}

      <div className="flex space-x-4">
        <Button variant="default" className="bg-black text-white" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          Search
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={isLoading}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
