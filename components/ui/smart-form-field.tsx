"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface SmartFormFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  validation?: (value: string) => Promise<{ valid: boolean; message?: string }>
  suggestions?: string[]
  disabled?: boolean
}

export function SmartFormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  validation,
  suggestions = [],
  disabled = false,
}: SmartFormFieldProps) {
  const [validationState, setValidationState] = useState<{
    status: "idle" | "validating" | "valid" | "invalid"
    message?: string
  }>({ status: "idle" })
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const validationRef = useRef(validation)
  validationRef.current = validation

  const validateValue = useCallback(
    async (inputValue: string) => {
      const currentValidation = validationRef.current
      if (!currentValidation || !inputValue.trim()) {
        setValidationState({ status: "idle" })
        return
      }

      setValidationState({ status: "validating" })

      try {
        const result = await currentValidation(inputValue)
        setValidationState({
          status: result.valid ? "valid" : "invalid",
          message: result.message,
        })
      } catch (error) {
        console.error("[v0] Validation error:", error)
        setValidationState({
          status: "invalid",
          message: "Validation failed. Please check your input.",
        })
      }
    },
    [], // Remove validation from dependencies to prevent infinite loop
  )

  useEffect(() => {
    if (!validationRef.current || !value) {
      setValidationState({ status: "idle" })
      return
    }

    const validateTimer = setTimeout(() => {
      validateValue(value)
    }, 500)

    return () => {
      clearTimeout(validateTimer)
    }
  }, [value]) // Only depend on value, not validateValue

  useEffect(() => {
    try {
      if (value && suggestions.length > 0) {
        const trimmedValue = value.trim().toLowerCase()
        if (trimmedValue.length > 0) {
          const filtered = suggestions
            .filter((suggestion) => {
              if (!suggestion || typeof suggestion !== "string") return false
              return suggestion.toLowerCase().includes(trimmedValue)
            })
            .slice(0, 5)

          setFilteredSuggestions(filtered)
          setShowSuggestions(filtered.length > 0)
        } else {
          setShowSuggestions(false)
          setFilteredSuggestions([])
        }
      } else {
        setShowSuggestions(false)
        setFilteredSuggestions([])
      }
    } catch (error) {
      console.error("[v0] Error filtering suggestions:", error)
      setShowSuggestions(false)
      setFilteredSuggestions([])
    }
  }, [value, suggestions])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      // Basic input sanitization
      if (type === "email") {
        // Allow email characters only
        const sanitized = newValue.replace(/[^a-zA-Z0-9@._-]/g, "")
        onChange(sanitized)
      } else if (type === "tel") {
        // Allow phone number characters only
        const sanitized = newValue.replace(/[^0-9+\-\s()]/g, "")
        onChange(sanitized)
      } else if (type === "number") {
        // Allow numeric input only
        const sanitized = newValue.replace(/[^0-9.-]/g, "")
        onChange(sanitized)
      } else {
        onChange(newValue)
      }
    },
    [onChange, type],
  )

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      try {
        if (suggestion && typeof suggestion === "string") {
          onChange(suggestion)
          setShowSuggestions(false)
        }
      } catch (error) {
        console.error("[v0] Error selecting suggestion:", error)
      }
    },
    [onChange],
  )

  const getValidationIcon = () => {
    switch (validationState.status) {
      case "validating":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "invalid":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="relative">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={validationState.status === "invalid"}
          aria-describedby={validationState.message ? `${id}-validation` : undefined}
          className={`pr-10 ${
            validationState.status === "valid"
              ? "border-green-500 focus:border-green-600"
              : validationState.status === "invalid"
                ? "border-red-500 focus:border-red-600"
                : ""
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getValidationIcon()}</div>
      </div>

      {validationState.message && (
        <p
          id={`${id}-validation`}
          className={`text-xs mt-1 ${validationState.status === "valid" ? "text-green-600" : "text-red-600"}`}
          role={validationState.status === "invalid" ? "alert" : "status"}
        >
          {validationState.message}
        </p>
      )}

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto"
          role="listbox"
          aria-label={`Suggestions for ${label}`}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={`${id}-suggestion-${index}`}
              type="button"
              role="option"
              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 text-sm transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleSuggestionClick(suggestion)
                }
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
