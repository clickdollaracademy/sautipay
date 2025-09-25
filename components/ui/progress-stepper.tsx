"use client"

import { CheckCircle } from "lucide-react"

interface Step {
  id: number
  title: string
  description?: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
  allowSkip?: boolean
}

export function ProgressStepper({ steps, currentStep, onStepClick, allowSkip = false }: ProgressStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isClickable = allowSkip || isCompleted || isCurrent

          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                } ${isClickable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"}`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </button>

              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <h3 className="font-medium text-gray-900">{steps.find((s) => s.id === currentStep)?.title}</h3>
        {steps.find((s) => s.id === currentStep)?.description && (
          <p className="text-sm text-gray-500 mt-1">{steps.find((s) => s.id === currentStep)?.description}</p>
        )}
      </div>
    </div>
  )
}
