"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Mail, Check, AlertCircle, Info } from "lucide-react"
import { DataTableFilters, type FilterParams } from "@/components/data-table-filters"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Receipt {
  id: string
  date: string
  clientName: string
  originalAmount: number
  originalCurrency: string
  convertedAmount: number
  receiptUrl: string
  transactionId: string
  emailStatus: "Sent" | "Failed" | "Not Sent"
  emailAddress: string
  emailSentDate?: string
  transactionStatus?: "Successful" | "Failed"
}

// Mock data for demonstration
const mockReceipts: Receipt[] = [
  {
    id: "RCPT20240301JAZZ",
    date: "2024-03-10",
    clientName: "Client 1",
    originalAmount: 4620.0,
    originalCurrency: "EUR",
    convertedAmount: 4423.0,
    receiptUrl: "#",
    transactionId: "TRAN20240301JAZZ",
    emailStatus: "Sent",
    emailAddress: "client1@example.com",
    emailSentDate: "2024-03-10 14:32:45",
    transactionStatus: "Successful",
  },
  {
    id: "RCPT20240302JAZZ",
    date: "2024-03-23",
    clientName: "Client 2",
    originalAmount: 6871.0,
    originalCurrency: "USD",
    convertedAmount: 6871.0,
    receiptUrl: "#",
    transactionId: "TRAN20240302JAZZ",
    emailStatus: "Failed",
    emailAddress: "client2@example.com",
    transactionStatus: "Failed",
  },
  {
    id: "RCPT20240303JAZZ",
    date: "2024-03-08",
    clientName: "Client 5",
    originalAmount: 10689.0,
    originalCurrency: "GBP",
    convertedAmount: 13206.0,
    receiptUrl: "#",
    transactionId: "TRAN20240303JAZZ",
    emailStatus: "Not Sent",
    emailAddress: "client5@example.com",
    transactionStatus: "Successful",
  },
]

export function TransactionReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>(mockReceipts)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Currency options for filter
  const currencyOptions = [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "JPY", value: "JPY" },
    { label: "UGX", value: "UGX" },
  ]

  // Email status options for filter
  const emailStatusOptions = [
    { label: "All", value: "all" },
    { label: "Sent", value: "Sent" },
    { label: "Failed", value: "Failed" },
    { label: "Not Sent", value: "Not Sent" },
  ]

  // Handle filter application
  const handleFilter = (filters: FilterParams) => {
    // In a real app, this would filter the data
    console.log("Filters applied:", filters)
  }

  // Handle resend email
  const handleResendEmail = (receiptId: string) => {
    // In a real app, this would call an API to resend the email
    console.log("Resending email for receipt:", receiptId)

    // Update the receipt status
    setReceipts((prevReceipts) =>
      prevReceipts.map((receipt) =>
        receipt.id === receiptId
          ? {
              ...receipt,
              emailStatus: "Sent",
              emailSentDate: new Date().toLocaleString(),
            }
          : receipt,
      ),
    )

    // Show notification
    setNotification({
      message: `Receipt ${receiptId} has been sent to the client's email.`,
      type: "success",
    })

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Receipting</h1>

      {notification && (
        <div
          className={`mb-4 p-4 rounded-md ${notification.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
        >
          {notification.type === "success" ? (
            <Check className="inline h-4 w-4 mr-2" />
          ) : (
            <AlertCircle className="inline h-4 w-4 mr-2" />
          )}
          {notification.message}
        </div>
      )}

      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-sm">
        <Info className="inline h-4 w-4 mr-2" />
        Receipts are automatically sent to clients' email addresses after transactions are completed.
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableFilters
            onFilter={handleFilter}
            isLoading={false}
            showCurrency={true}
            currencyOptions={currencyOptions}
            placeholder="Search receipts..."
          />

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-sm font-medium">Email Status:</span>
            {emailStatusOptions.map((option) => (
              <Badge
                key={option.value}
                variant={option.value === "all" ? "outline" : "secondary"}
                className="cursor-pointer"
              >
                {option.label}
              </Badge>
            ))}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Original Amount</TableHead>
                  <TableHead>Converted Amount (USD)</TableHead>
                  <TableHead>Email Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-mono text-sm">
                              {receipt.id}
                              <div className="text-xs text-muted-foreground">Transaction: {receipt.transactionId}</div>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Receipt for transaction {receipt.transactionId}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.clientName}</TableCell>
                    <TableCell>
                      {receipt.originalCurrency} {receipt.originalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>${receipt.convertedAmount.toFixed(2)} USD</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              {receipt.emailStatus === "Sent" ? (
                                <Badge variant="success" className="flex items-center gap-1">
                                  <Check className="h-3 w-3" /> Sent
                                </Badge>
                              ) : receipt.emailStatus === "Failed" ? (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> Failed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" /> Not Sent
                                </Badge>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {receipt.emailStatus === "Sent"
                              ? `Sent to ${receipt.emailAddress} on ${receipt.emailSentDate}`
                              : `Not yet sent to ${receipt.emailAddress}`}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Download className="mr-2 h-4 w-4" /> Download
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download receipt as PDF</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {receipt.emailStatus !== "Sent" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="flex items-center"
                                  onClick={() => handleResendEmail(receipt.id)}
                                >
                                  <Mail className="mr-2 h-4 w-4" /> Send Email
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send receipt to client's email</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
            <div className="flex-1 text-sm text-muted-foreground">Showing 1 to 3 of 3 entries</div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <select className="h-8 w-[70px] rounded-md border border-input bg-transparent px-2 py-1 text-sm">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="h-8 w-8 p-0" disabled>
                  <span className="sr-only">Go to first page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0" disabled>
                  <span className="sr-only">Go to previous page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </Button>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">Page 1</span>
                  <span className="text-sm text-muted-foreground">of 1</span>
                </div>
                <Button variant="outline" className="h-8 w-8 p-0" disabled>
                  <span className="sr-only">Go to next page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0" disabled>
                  <span className="sr-only">Go to last page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
