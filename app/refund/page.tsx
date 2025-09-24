"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Upload, Info, CheckCircle } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarIcon } from "lucide-react"

// Define the form schema with Zod
const formSchema = z.object({
  transactionId: z.string().min(6, {
    message: "Transaction ID must be at least 6 characters.",
  }),
  transactionDate: z.date({
    required_error: "Please select the transaction date",
  }),
  refundAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  currency: z.string().default("USD"),
  refundReason: z.string({
    required_error: "Please select a reason for the refund.",
  }),
  additionalComments: z.string().optional(),
  refundMethod: z.enum(["original", "alternative"], {
    required_error: "Please select a refund method.",
  }),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
})

export default function RefundPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [refundId, setRefundId] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [lookupStatus, setLookupStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [transactionDetails, setTransactionDetails] = useState<any>(null)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "successful">("idle")

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionId: "",
      transactionDate: new Date(), // Add a default date
      refundAmount: "",
      currency: "USD",
      additionalComments: "",
      refundMethod: "original",
      contactEmail: "",
      contactPhone: "",
    },
  })

  // Handle transaction lookup
  const handleLookupTransaction = async () => {
    const transactionId = form.getValues("transactionId")

    if (!transactionId || transactionId.length < 6) {
      form.setError("transactionId", {
        type: "manual",
        message: "Please enter a valid transaction ID",
      })
      return
    }

    setLookupStatus("loading")

    try {
      // Simulating API response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock transaction data
      const mockTransaction = {
        id: transactionId,
        date: new Date(),
        amount: "1250.00",
        currency: "USD",
        status: "Completed",
        customer: "John Doe",
        description: "Premium subscription payment",
      }

      setTransactionDetails(mockTransaction)

      // Explicitly set the date with form.setValue
      form.setValue("transactionDate", mockTransaction.date, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })

      form.setValue("refundAmount", mockTransaction.amount)
      form.setValue("currency", mockTransaction.currency || "USD")
      setLookupStatus("success")
    } catch (error) {
      console.error("Error looking up transaction:", error)
      setLookupStatus("error")
    }
  }

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return // Prevent multiple submissions

    setIsSubmitting(true)
    setSubmitStatus("submitting")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Set status to successful
      setSubmitStatus("successful")

      // Generate a mock refund ID
      const mockRefundId = "REF" + Math.floor(100000 + Math.random() * 900000)
      setRefundId(mockRefundId)

      // Wait to show "Refund request Successful" before redirecting
      setTimeout(() => {
        setIsSuccess(true)
      }, 2000)

      console.log("Refund request submitted:", values)
    } catch (error) {
      console.error("Error submitting refund request:", error)
      setSubmitStatus("idle")
      alert("There was an error submitting your refund request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle next step
  const handleNextStep = () => {
    const currentStepFields = {
      1: ["transactionId", "transactionDate"],
      2: ["refundAmount", "refundReason", "additionalComments", "currency"],
      3: ["refundMethod", "contactEmail", "contactPhone"],
    }[step] as Array<keyof z.infer<typeof formSchema>>

    const isStepValid = currentStepFields.every((field) => {
      const fieldState = form.getFieldState(field)
      return !fieldState.invalid
    })

    if (isStepValid) {
      setStep((prev) => prev + 1)
    } else {
      // Trigger validation for the current step fields
      currentStepFields.forEach((field) => {
        form.trigger(field)
      })
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  // If form is successfully submitted, show success message
  if (isSuccess) {
    return (
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Card className="border-green-500 border-2">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">Refund Request Submitted</CardTitle>
            <CardDescription className="text-center text-lg">
              Your refund request has been successfully submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium">
                Refund Request ID: <span className="text-primary">{refundId}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">Please save this ID for future reference</p>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>What happens next?</AlertTitle>
              <AlertDescription>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                  <li>Your Insurance Provider administrator will review your request</li>
                  <li>Once approved by your company, Insurance Provider will process the refund</li>
                  <li>You will receive email notifications at each step of the process</li>
                  <li>The refund typically takes 5-7 business days to reflect in your account</li>
                </ol>
              </AlertDescription>
            </Alert>

            <p className="text-sm text-muted-foreground text-center mt-6">
              You may close this window. We'll send updates about your refund request to your email.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Request a Refund</h1>
        <p className="text-muted-foreground mt-2">
          Please complete the form below to request a refund for your transaction
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium",
                  step === stepNumber
                    ? "bg-primary text-primary-foreground"
                    : step > stepNumber
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {stepNumber}
              </div>
              <span
                className={cn(
                  "text-xs mt-1",
                  step === stepNumber ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                {
                  {
                    1: "Transaction",
                    2: "Details",
                    3: "Contact",
                    4: "Review",
                  }[stepNumber]
                }
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 w-full bg-muted">
          <div
            className="h-1 bg-primary transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Transaction Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Transaction Information</CardTitle>
                <CardDescription>Enter your transaction details to begin the refund process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter transaction ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleLookupTransaction}
                      disabled={lookupStatus === "loading"}
                    >
                      {lookupStatus === "loading" ? "Looking up..." : "Look up"}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="transactionDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Transaction Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {lookupStatus === "success" && transactionDetails && (
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Transaction Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Transaction ID:</div>
                      <div className="font-medium">{transactionDetails.id}</div>
                      <div>Date:</div>
                      <div className="font-medium">{format(transactionDetails.date, "PPP")}</div>
                      <div>Amount:</div>
                      <div className="font-medium">${transactionDetails.amount}</div>
                      <div>Status:</div>
                      <div className="font-medium">{transactionDetails.status}</div>
                      <div>Description:</div>
                      <div className="font-medium">{transactionDetails.description}</div>
                    </div>
                  </div>
                )}

                {lookupStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertTitle>Transaction not found</AlertTitle>
                    <AlertDescription>
                      We couldn't find a transaction with that ID. Please check and try again.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Refund Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Refund Details</CardTitle>
                <CardDescription>Provide information about the refund you are requesting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="refundAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Refund Amount</FormLabel>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field: currencyField }) => (
                            <FormItem className="w-24 flex-shrink-0">
                              <Select value={currencyField.value} onValueChange={currencyField.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="USD" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                  <SelectItem value="KES">KES</SelectItem>
                                  <SelectItem value="UGX">UGX</SelectItem>
                                  <SelectItem value="TZS">TZS</SelectItem>
                                  <SelectItem value="RWF">RWF</SelectItem>
                                  <SelectItem value="NGN">NGN</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormControl className="flex-1">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                              {form.watch("currency") === "USD"
                                ? "$"
                                : form.watch("currency") === "EUR"
                                  ? "€"
                                  : form.watch("currency") === "GBP"
                                    ? "£"
                                    : ""}
                            </span>
                            <Input
                              className={
                                form.watch("currency") === "USD" ||
                                form.watch("currency") === "EUR" ||
                                form.watch("currency") === "GBP"
                                  ? "pl-7"
                                  : "pl-3"
                              }
                              placeholder="0.00"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormDescription>
                        Enter the amount in the original transaction currency. Currency conversions will be handled
                        automatically.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="refundReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Refund</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="duplicate">Duplicate payment</SelectItem>
                          <SelectItem value="service_not_provided">Service not provided</SelectItem>
                          <SelectItem value="incorrect_amount">Incorrect amount charged</SelectItem>
                          <SelectItem value="quality_issue">Quality issue with product/service</SelectItem>
                          <SelectItem value="unauthorized">Unauthorized transaction</SelectItem>
                          <SelectItem value="other">Other reason</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide any additional details about your refund request"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label htmlFor="document-upload">Supporting Documentation</Label>
                  <div className="mt-1">
                    <Label
                      htmlFor="document-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-1 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, JPG, PNG (MAX. 10MB)</p>
                      </div>
                      <Input
                        id="document-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </Label>
                  </div>
                  {selectedFile && (
                    <div className="mt-2 flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>{selectedFile.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Refund Method & Contact Information</CardTitle>
                <CardDescription>
                  Specify how you would like to receive your refund and provide contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="refundMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Refund Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="original" />
                            </FormControl>
                            <FormLabel className="font-normal">Refund to original payment method</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="alternative" />
                            </FormControl>
                            <FormLabel className="font-normal">Refund to alternative payment method</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("refundMethod") === "alternative" && (
                  <div className="space-y-4 border rounded-md p-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter bank name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account holder name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormDescription>We'll send refund status updates to this email address</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 4: Review and Submit */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Review and Submit</CardTitle>
                <CardDescription>Please review your refund request details before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Transaction Information</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-muted-foreground">Transaction ID:</div>
                      <div>{form.getValues("transactionId")}</div>
                      <div className="text-muted-foreground">Transaction Date:</div>
                      <div>
                        {form.getValues("transactionDate")
                          ? format(form.getValues("transactionDate"), "PPP")
                          : "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Refund Details</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-muted-foreground">Refund Amount:</div>
                      <div>
                        {form.getValues("currency") === "USD"
                          ? "$"
                          : form.getValues("currency") === "EUR"
                            ? "€"
                            : form.getValues("currency") === "GBP"
                              ? "£"
                              : ""}
                        {form.getValues("refundAmount")} {form.getValues("currency")}
                      </div>
                      <div className="text-muted-foreground">Reason:</div>
                      <div>{form.getValues("refundReason")}</div>
                      <div className="text-muted-foreground">Additional Comments:</div>
                      <div>{form.getValues("additionalComments") || "None provided"}</div>
                      <div className="text-muted-foreground">Supporting Documentation:</div>
                      <div>{selectedFile ? selectedFile.name : "None uploaded"}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Refund Method & Contact</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="text-muted-foreground">Refund Method:</div>
                      <div>
                        {form.getValues("refundMethod") === "original"
                          ? "Original payment method"
                          : "Alternative payment method"}
                      </div>
                      {form.getValues("refundMethod") === "alternative" && (
                        <>
                          <div className="text-muted-foreground">Bank Name:</div>
                          <div>{form.getValues("bankName")}</div>
                          <div className="text-muted-foreground">Account Number:</div>
                          <div>{form.getValues("accountNumber")}</div>
                          <div className="text-muted-foreground">Account Holder:</div>
                          <div>{form.getValues("accountName")}</div>
                        </>
                      )}
                      <div className="text-muted-foreground">Contact Email:</div>
                      <div>{form.getValues("contactEmail")}</div>
                      <div className="text-muted-foreground">Contact Phone:</div>
                      <div>{form.getValues("contactPhone")}</div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    <p className="mt-1">By submitting this form, you confirm that:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>All information provided is accurate and complete</li>
                      <li>You understand that refund requests are subject to review by your company and SautiPay</li>
                      <li>Processing may take 5-7 business days after approval</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "successful"}
                  className={submitStatus === "successful" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {submitStatus === "submitting"
                    ? "Processing..."
                    : submitStatus === "successful"
                      ? "Refund request Successful"
                      : "Submit for Company & Insurance Provider Approval"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </Form>
      {/* Note at the bottom of the page */}
      <div className="mt-8">
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <AlertTitle className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Important Information About Refunds
          </AlertTitle>
          <AlertDescription className="mt-2">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                <strong>Refund Fee:</strong> Please note that a processing fee will be applied to all refund
                transactions.
              </li>
              <li>
                <strong>Payment Method:</strong> The payment method entered cannot be changed after submission.
              </li>
              <li>
                <strong>One Request Only:</strong> Only one refund request can be submitted per transaction. Multiple
                requests for the same transaction will be automatically rejected.
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
