"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentProcessorProps {
  amount: number
  currency: string
  onPaymentComplete: (transactionId: string) => void
}

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  UGX: 3700,
}

export function PaymentProcessor({ amount, currency, onPaymentComplete }: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [convertedCurrency, setConvertedCurrency] = useState(currency)
  const [convertedAmount, setConvertedAmount] = useState(amount)
  const { toast } = useToast()

  const handleCurrencyChange = (newCurrency: string) => {
    const rate =
      exchangeRates[newCurrency as keyof typeof exchangeRates] / exchangeRates[currency as keyof typeof exchangeRates]
    const newAmount = amount * rate
    setConvertedCurrency(newCurrency)
    setConvertedAmount(newAmount)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      // Simulating API call to process payment
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) {
            reject(new Error("Payment failed. Please try again."))
          } else {
            resolve(true)
          }
        }, 2000)
      })

      const transactionId = `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      toast({
        title: "Payment Successful",
        description: `Your payment of ${convertedCurrency} ${convertedAmount.toFixed(2)} has been processed successfully.`,
      })

      onPaymentComplete(transactionId)
    } catch (err) {
      setError((err as Error).message)
      toast({
        title: "Payment Failed",
        description: (err as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setIsConfirmationOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Payment</CardTitle>
        <CardDescription>Select a payment method to complete your transaction.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label>Amount to Pay</Label>
            <Input value={`${currency} ${amount.toFixed(2)}`} disabled className="w-40" />
          </div>
          <div className="flex items-center space-x-4">
            <Label>Convert to</Label>
            <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(exchangeRates).map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <Label>Converted Amount</Label>
            <Input value={`${convertedCurrency} ${convertedAmount.toFixed(2)}`} disabled className="w-40" />
          </div>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe" className="flex items-center space-x-2">
                <Icons.stripe className="h-4 w-4" />
                <span>Stripe</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visa" id="visa" />
              <Label htmlFor="visa" className="flex items-center space-x-2">
                <Icons.visa className="h-4 w-4" />
                <span>Visa</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mtn" id="mtn" />
              <Label htmlFor="mtn" className="flex items-center space-x-2">
                <Icons.mtn className="h-4 w-4" />
                <span>MTN Mobile Money</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="airtel" id="airtel" />
              <Label htmlFor="airtel" className="flex items-center space-x-2">
                <Icons.airtel className="h-4 w-4" />
                <span>Airtel Money</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogTrigger asChild>
            <Button disabled={!paymentMethod || isProcessing}>
              {isProcessing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
              <DialogDescription>Are you sure you want to process this payment?</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>
                Amount: {convertedCurrency} {convertedAmount.toFixed(2)}
              </p>
              <p>Payment Method: {paymentMethod}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePayment}>Confirm Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
