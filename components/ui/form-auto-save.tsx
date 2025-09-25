"use client"

import { useEffect, useRef } from "react"
import { toast } from "@/components/ui/use-toast"

interface FormAutoSaveProps {
  data: Record<string, any>
  storageKey: string
  onRestore?: (data: Record<string, any>) => void
  saveInterval?: number
}

export function FormAutoSave({ data, storageKey, onRestore, saveInterval = 30000 }: FormAutoSaveProps) {
  const lastSaveRef = useRef<string>("")
  const hasRestoredRef = useRef(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-save functionality
  useEffect(() => {
    if (!data || typeof data !== "object") return

    const dataString = JSON.stringify(data)

    // Only save if data has changed and we have meaningful data
    if (
      dataString !== lastSaveRef.current &&
      Object.keys(data).some((key) => {
        const value = data[key]
        return value !== null && value !== undefined && value !== ""
      })
    ) {
      // Clear any existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, dataString)
          lastSaveRef.current = dataString

          // Show subtle save indicator
          toast({
            title: "Progress Saved",
            description: "Your form data has been automatically saved.",
            duration: 2000,
          })
        } catch (error) {
          console.error("Failed to save form data:", error)
        }
      }, saveInterval)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [data, storageKey, saveInterval])

  useEffect(() => {
    if (hasRestoredRef.current || !onRestore) return

    try {
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        if (parsedData && typeof parsedData === "object") {
          hasRestoredRef.current = true
          onRestore(parsedData)
          toast({
            title: "Previous Session Restored",
            description: "We've restored your previously saved progress.",
            duration: 3000,
          })
        }
      }
    } catch (error) {
      console.error("Failed to restore saved data:", error)
      try {
        localStorage.removeItem(storageKey)
      } catch (clearError) {
        console.error("Failed to clear corrupted data:", clearError)
      }
    }
  }, [storageKey, onRestore]) // Added missing dependencies

  return null
}
