"use client"
import { QueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

interface Toast {
  title: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

const queryClient = new QueryClient()

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast])
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 5000)

    return () => clearTimeout(timer)
  }, [toasts])

  return {
    toast: addToast,
    toasts,
  }
}

export const toast = (toast: Toast) => {
  const { toast: addToast } = useToast()
  addToast(toast)
}

