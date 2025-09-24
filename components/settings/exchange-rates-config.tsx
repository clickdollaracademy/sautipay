"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { RefreshCcw, History } from "lucide-react"

interface ExchangeRate {
  currency: string
  currentRate: number
  manualRate?: number
  markup: number
  useManual: boolean
}

export function ExchangeRatesConfig() {
  const [useExternalApi, setUseExternalApi] = useState(false)
  const [apiProvider, setApiProvider] = useState("openexchangerates")
  const [apiKey, setApiKey] = useState("")
  const [apiEndpoint, setApiEndpoint] = useState("https://api.exchangerate.com/v1/latest")
  const [updateFrequency, setUpdateFrequency] = useState("daily")
  const [baseCurrency, setBaseCurrency] = useState("USD")
  const [globalMarkup, setGlobalMarkup] = useState(2.5)
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { currency: "EUR", currentRate: 0.85, markup: 2.5, useManual: false },
    { currency: "GBP", currentRate: 0.73, markup: 2.5, useManual: false },
    { currency: "JPY", currentRate: 110.0, markup: 2.5, useManual: false },
    { currency: "UGX", currentRate: 3700.0, markup: 2.5, useManual: false },
  ])

  const handleTestConnection = async () => {
    try {
      // In a real app, you would test the API connection here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "API Connection Successful",
        description: "Successfully connected to the exchange rate API.",
      })
    } catch (error) {
      toast({
        title: "API Connection Failed",
        description: "Failed to connect to the exchange rate API. Please check your settings.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRates = async () => {
    try {
      // In a real app, you would fetch new rates here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Exchange Rates Updated",
        description: "Successfully updated exchange rates.",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update exchange rates. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRateChange = (currency: string, field: "manualRate" | "markup", value: number) => {
    setExchangeRates((rates) => rates.map((rate) => (rate.currency === currency ? { ...rate, [field]: value } : rate)))
  }

  const handleToggleManual = (currency: string, useManual: boolean) => {
    setExchangeRates((rates) => rates.map((rate) => (rate.currency === currency ? { ...rate, useManual } : rate)))
  }

  const applyGlobalMarkup = () => {
    setExchangeRates((rates) =>
      rates.map((rate) => ({
        ...rate,
        markup: globalMarkup,
      })),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Rate Configuration</CardTitle>
        <CardDescription>Configure foreign exchange rate sources and adjustments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Configuration */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch checked={useExternalApi} onCheckedChange={setUseExternalApi} id="use-external-api" />
            <Label htmlFor="use-external-api">Use External API for Exchange Rates</Label>
          </div>

          {useExternalApi && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Provider</Label>
                <Select value={apiProvider} onValueChange={setApiProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select API provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openexchangerates">Open Exchange Rates</SelectItem>
                    <SelectItem value="fixer">Fixer.io</SelectItem>
                    <SelectItem value="exchangeratesapi">ExchangeRatesAPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>API Key</Label>
                <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter your API key" />
              </div>

              <div className="space-y-2">
                <Label>API Endpoint (Optional)</Label>
                <Input
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  placeholder="https://api.example.com/v1/latest"
                />
              </div>

              <div className="space-y-2">
                <Label>Update Frequency</Label>
                <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select update frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleTestConnection}>Test API Connection</Button>
            </div>
          )}
        </div>

        {/* Manual Exchange Rates & Adjustments */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Manual Exchange Rates & Adjustments</h3>

          <div className="space-y-2">
            <Label>Base Currency</Label>
            <Select value={baseCurrency} onValueChange={setBaseCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select base currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label>Global Markup Percentage</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={globalMarkup}
                  onChange={(e) => setGlobalMarkup(Number(e.target.value))}
                  className="w-20"
                />
                <span>%</span>
                <Button variant="outline" onClick={applyGlobalMarkup}>
                  Apply to All
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 font-medium">
              <div>Currency</div>
              <div>Current Rate</div>
              <div>Manual Rate</div>
              <div>Markup %</div>
              <div>Use Manual</div>
            </div>
            {exchangeRates.map((rate) => (
              <div key={rate.currency} className="grid grid-cols-5 gap-4 items-center">
                <div>{rate.currency}</div>
                <div>{rate.currentRate}</div>
                <Input
                  type="number"
                  value={rate.manualRate || rate.currentRate}
                  onChange={(e) => handleRateChange(rate.currency, "manualRate", Number(e.target.value))}
                  disabled={!rate.useManual}
                />
                <Input
                  type="number"
                  value={rate.markup}
                  onChange={(e) => handleRateChange(rate.currency, "markup", Number(e.target.value))}
                />
                <Switch
                  checked={rate.useManual}
                  onCheckedChange={(checked) => handleToggleManual(rate.currency, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Last Updated Section */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">Last updated: March 14, 2024 10:30 AM</div>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleUpdateRates}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Update Now
            </Button>
            <Button variant="outline">
              <History className="w-4 h-4 mr-2" />
              View Update History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
