"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, SearchIcon, TimerResetIcon as ResetIcon } from "lucide-react"

interface TableSearchProps {
  onSearch: (params: SearchParams) => void
  onReset: () => void
  isLoading?: boolean
}

export interface SearchParams {
  query: string
  startDate: Date | null
  endDate: Date | null
}

export function TableSearch({ onSearch, onReset, isLoading = false }: TableSearchProps) {
  const [query, setQuery] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleSearch = () => {
    onSearch({
      query,
      startDate,
      endDate,
    })
  }

  const handleReset = () => {
    setQuery("")
    setStartDate(null)
    setEndDate(null)
    onReset()
  }

  return (
    <div className="space-y-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("justify-start text-left font-normal w-[160px]", !startDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "MMM dd, yyyy") : "Start Date"}
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
                className={cn("justify-start text-left font-normal w-[160px]", !endDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "MMM dd, yyyy") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate || undefined} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSearch} disabled={isLoading}>
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <ResetIcon className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

