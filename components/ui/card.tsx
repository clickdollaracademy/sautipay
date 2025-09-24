"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Download, Mail, Check, AlertCircle } from "lucide-react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-md border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "Successful" | "Failed" | null
  reference?: string
  date?: string
  amount?: number
  currency?: string
  hasReceipt?: boolean
  receiptUrl?: string
  emailStatus?: "Sent" | "Not Sent" | "Failed"
  emailAddress?: string
  emailSentDate?: string
  onResendEmail?: () => void
  transactionId?: string
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      className,
      status,
      reference,
      date,
      amount,
      currency,
      hasReceipt,
      receiptUrl,
      emailStatus,
      emailAddress,
      emailSentDate,
      onResendEmail,
      transactionId,
      ...props
    },
    ref,
  ) => {
    const statusStyles = status
      ? {
          Successful: "border-l-4 border-green-500",
          Failed: "border-l-4 border-red-500",
        }[status]
      : ""

    return (
      <div ref={ref} className={cn("p-6 pt-0", statusStyles, className)} data-status={status || undefined} {...props}>
        {(reference || date || (amount !== undefined && currency) || transactionId) && (
          <div className="mb-4 flex flex-col space-y-2 border-b pb-3">
            <div className="flex justify-between items-center">
              {reference && (
                <span className="font-mono text-sm">
                  Ref: <span className="font-medium">{reference}</span>
                </span>
              )}
              {date && <span className="text-sm text-muted-foreground">Date: {date}</span>}
            </div>

            {transactionId && (
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Transaction:</span>
                <span className="font-mono text-sm">{transactionId}</span>
              </div>
            )}

            {amount !== undefined && currency && (
              <div className="flex justify-between items-center">
                <span className="text-sm">Amount:</span>
                <span className="font-medium">
                  {currency} {amount.toFixed(2)}
                </span>
              </div>
            )}

            {emailStatus && (
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Status:</span>
                <div className="flex items-center">
                  {emailStatus === "Sent" ? (
                    <span className="flex items-center text-green-600 text-sm">
                      <Check className="h-4 w-4 mr-1" /> Sent
                      {emailAddress && emailSentDate && (
                        <span
                          className="ml-1 text-xs text-muted-foreground"
                          title={`Sent to ${emailAddress} on ${emailSentDate}`}
                        >
                          (to {emailAddress.split("@")[0]}...@{emailAddress.split("@")[1]})
                        </span>
                      )}
                    </span>
                  ) : emailStatus === "Failed" ? (
                    <span className="flex items-center text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" /> Failed
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-600 text-sm">
                      <Mail className="h-4 w-4 mr-1" /> Not Sent
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {props.children}

        <div className="mt-4 flex justify-end space-x-2">
          {hasReceipt && (
            <a
              href={receiptUrl || "#"}
              download
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
              title="Download receipt as PDF"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </a>
          )}

          {emailStatus !== "Sent" && onResendEmail && (
            <button
              onClick={onResendEmail}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              title="Resend receipt to client's email"
            >
              <Mail className="mr-2 h-4 w-4" />
              Resend Email
            </button>
          )}
        </div>
      </div>
    )
  },
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
