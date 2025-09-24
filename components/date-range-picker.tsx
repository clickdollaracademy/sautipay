"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface DateRangePickerProps {
  onSearch: () => void
  onReset: () => void
}

export function DateRangePicker({ onSearch, onReset }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2023, 0, 1))
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2023, 11, 31))

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "MMM dd, yyyy") : "Jan 01, 2023"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "MMM dd, yyyy") : "Dec 31, 2023"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
        </PopoverContent>
      </Popover>

      <Button variant="default" onClick={onSearch} className="bg-black text-white hover:bg-gray-800">
        Search
      </Button>
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  )
}
