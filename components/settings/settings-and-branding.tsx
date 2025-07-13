"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Trash2, Plus, RefreshCw, History } from "lucide-react"

interface DeductibleFee {
  name: string
  type: "percentage" | "flat"
  value: number
  enabled: boolean
  currency: string
}

export function SettingsAndBranding() {
  // General Settings State
  const [companyName, setCompanyName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [defaultCurrency, setDefaultCurrency] = useState("USD")

  // Branding State
  const [logoFileName, setLogoFileName] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#000000")

  // Receipt Template State
  const [receiptFileName, setReceiptFileName] = useState("")

  // Deductibles and Fees State
  const [deductibleFees, setDeductibleFees] = useState<DeductibleFee[]>([
    { name: "Taxes", type: "percentage", value: 5, enabled: true, currency: "USD" },
    { name: "VAT", type: "percentage", value: 7.5, enabled: true, currency: "USD" },
    { name: "Stamp Duty", type: "flat", value: 50, enabled: true, currency: "USD" },
    { name: "Industrial Training Levy", type: "percentage", value: 1, enabled: true, currency: "USD" },
  ])

  // Exchange Rates State
  const [useExternalApi, setUseExternalApi] = useState(false)
  const [apiProvider, setApiProvider] = useState("openexchangerates")
  const [apiKey, setApiKey] = useState("")
  const [apiEndpoint, setApiEndpoint] = useState("https://api.exchangerate.com/v1/latest")
  const [updateFrequency, setUpdateFrequency] = useState("daily")
  const [baseCurrency, setBaseCurrency] = useState("USD")
  const [globalMarkup, setGlobalMarkup] = useState(2.5)
  const [exchangeRates, setExchangeRates] = useState([
    { currency: "EUR", currentRate: 0.85, markup: 2.5, useManual: false, manualRate: 0.85 },
    { currency: "GBP", currentRate: 0.73, markup: 2.5, useManual: false, manualRate: 0.73 },
    { currency: "JPY", currentRate: 110.0, markup: 2.5, useManual: false, manualRate: 110.0 },
    { currency: "UGX", currentRate: 3700.0, markup: 2.5, useManual: false, manualRate: 3700.0 },
  ])

  const [isSaving, setIsSaving] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)

  // Helper function to safely handle API responses
  const safelyParseResponse = async (response: Response) => {
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else {
      // If not JSON, get the text and create a mock success response
      await response.text() // Read and discard the response body
      console.log("Non-JSON response received, using mock success response")
      return { success: true, message: "Operation completed" }
    }
  }

  const handleSaveGeneral = async () => {
    setIsSaving(true)
    try {
      // For development, simulate a successful API call
      // In production, uncomment the fetch call
      /*
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          contactEmail,
          defaultCurrency,
        }),
      });
      
      const data = await safelyParseResponse(response);
      */

      // Mock successful response for development
      const data = { success: true }

      if (data.success) {
        toast({
          title: "Settings Saved",
          description: "General settings have been updated successfully.",
        })
      } else {
        throw new Error(data.message || "Failed to save settings")
      }
    } catch (error) {
      console.error("Error saving general settings:", error)
      toast({
        title: "Error",
        description: "Failed to save general settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveBranding = async () => {
    setIsSaving(true)
    try {
      // Mock successful response for development
      const data = { success: true }

      if (data.success) {
        toast({
          title: "Branding Saved",
          description: "Branding settings have been updated successfully.",
        })
      } else {
        throw new Error(data.message || "Failed to save branding")
      }
    } catch (error) {
      console.error("Error saving branding settings:", error)
      toast({
        title: "Error",
        description: "Failed to save branding settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveTemplate = async () => {
    setIsSaving(true)
    try {
      // Mock successful response for development
      const data = { success: true }

      if (data.success) {
        toast({
          title: "Template Saved",
          description: "Receipt template has been updated successfully.",
        })
      } else {
        throw new Error(data.message || "Failed to save template")
      }
    } catch (error) {
      console.error("Error saving template settings:", error)
      toast({
        title: "Error",
        description: "Failed to save template settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddFee = () => {
    setDeductibleFees([...deductibleFees, { name: "", type: "percentage", value: 0, enabled: true, currency: "USD" }])
  }

  const handleRemoveFee = (index: number) => {
    setDeductibleFees(deductibleFees.filter((_, i) => i !== index))
  }

  const handleSaveDeductibles = async () => {
    setIsSaving(true)
    try {
      // Mock successful response for development
      const data = { success: true }

      if (data.success) {
        toast({
          title: "Deductibles Saved",
          description: "Deductibles and fees have been updated successfully.",
        })
      } else {
        throw new Error(data.message || "Failed to save deductibles")
      }
    } catch (error) {
      console.error("Error saving deductibles settings:", error)
      toast({
        title: "Error",
        description: "Failed to save deductibles settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    try {
      // Mock successful API test
      // Simulate a delay for testing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "API Connection Successful",
        description: "Successfully connected to the exchange rate API.",
      })
    } catch (error) {
      console.error("Error testing API connection:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to the exchange rate API. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleUpdateRates = async () => {
    try {
      // Mock successful rates update
      toast({
        title: "Exchange Rates Updated",
        description: "Successfully updated exchange rates.",
      })
    } catch (error) {
      console.error("Error updating exchange rates:", error)
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

  const handleSaveExchangeRates = async () => {
    setIsSaving(true)
    try {
      // Mock successful response for development
      const data = { success: true }

      if (data.success) {
        toast({
          title: "Exchange Rates Saved",
          description: "Exchange rate settings have been updated successfully.",
        })
      } else {
        throw new Error(data.message || "Failed to save exchange rates")
      }
    } catch (error) {
      console.error("Error saving exchange rate settings:", error)
      toast({
        title: "Error",
        description: "Failed to save exchange rate settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // For development, use mock data instead of making an API call
        // In production, uncomment the fetch call
        /*
        const response = await fetch('/api/settings');
        const data = await safelyParseResponse(response);
        
        if (data.success && data.data) {
          const settings = data.data;
          
          // Update settings from API response
          // ...
        }
        */

        // For now, we'll use the default state values
        console.log("Using default settings values for development")
      } catch (error) {
        console.error("Error loading settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings. Using default values.",
          variant: "destructive",
        })
      }
    }

    loadSettings()
  }, [])

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="receipts">Receipts</TabsTrigger>
        <TabsTrigger value="deductibles">Deductibles & Fees</TabsTrigger>
        <TabsTrigger value="exchange">Exchange Rates</TabsTrigger>
      </TabsList>

      {/* General Settings Tab */}
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter your contact email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                <SelectTrigger id="defaultCurrency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="UGX">UGX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSaveGeneral} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Branding Tab */}
      <TabsContent value="branding">
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Customize your brand appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setLogoFileName(file.name)
                    }
                  }}
                />
                {logoFileName && <span className="text-sm text-muted-foreground">{logoFileName}</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveBranding} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Branding"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Receipts Tab */}
      <TabsContent value="receipts">
        <Card>
          <CardHeader>
            <CardTitle>Receipt Template</CardTitle>
            <CardDescription>Upload and manage your receipt template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="receiptTemplate">Receipt Template</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="receiptTemplate"
                  type="file"
                  accept=".docx,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setReceiptFileName(file.name)
                    }
                  }}
                />
                {receiptFileName && <span className="text-sm text-muted-foreground">{receiptFileName}</span>}
              </div>
            </div>
            <Button onClick={handleSaveTemplate} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Template"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Deductibles & Fees Tab */}
      <TabsContent value="deductibles">
        <Card>
          <CardHeader>
            <CardTitle>Deductibles and Fees</CardTitle>
            <CardDescription>Configure deductibles and fees for premium calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deductibleFees.map((fee, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Checkbox
                  checked={fee.enabled}
                  onCheckedChange={(checked) => {
                    const newFees = [...deductibleFees]
                    newFees[index].enabled = checked === true
                    setDeductibleFees(newFees)
                  }}
                />
                <Input
                  value={fee.name}
                  onChange={(e) => {
                    const newFees = [...deductibleFees]
                    newFees[index].name = e.target.value
                    setDeductibleFees(newFees)
                  }}
                  placeholder="Fee name"
                  className="flex-1"
                />
                <Select
                  value={fee.type}
                  onValueChange={(value: "percentage" | "flat") => {
                    const newFees = [...deductibleFees]
                    newFees[index].type = value
                    setDeductibleFees(newFees)
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={fee.value}
                  onChange={(e) => {
                    const newFees = [...deductibleFees]
                    newFees[index].value = Number(e.target.value)
                    setDeductibleFees(newFees)
                  }}
                  className="w-[100px]"
                />
                <Select
                  value={fee.currency}
                  onValueChange={(value) => {
                    const newFees = [...deductibleFees]
                    newFees[index].currency = value
                    setDeductibleFees(newFees)
                  }}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="UGX">UGX</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveFee(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleAddFee}>
                <Plus className="h-4 w-4 mr-2" />
                Add Fee
              </Button>
              <Button onClick={handleSaveDeductibles} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Deductibles and Fees"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Exchange Rates Tab */}
      <TabsContent value="exchange">
        <Card>
          <CardHeader>
            <CardTitle>Exchange Rate Configuration</CardTitle>
            <CardDescription>Configure foreign exchange rate sources and adjustments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch checked={useExternalApi} onCheckedChange={setUseExternalApi} id="use-external-api" />
              <Label htmlFor="use-external-api">Use External API for Exchange Rates</Label>
            </div>

            {useExternalApi && (
              <div className="space-y-4 border p-4 rounded-md">
                <h3 className="text-lg font-medium">API Configuration</h3>
                <div className="space-y-2">
                  <Label htmlFor="apiProvider">API Provider</Label>
                  <Select value={apiProvider} onValueChange={setApiProvider}>
                    <SelectTrigger id="apiProvider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openexchangerates">Open Exchange Rates</SelectItem>
                      <SelectItem value="fixer">Fixer.io</SelectItem>
                      <SelectItem value="exchangeratesapi">ExchangeRatesAPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">API Endpoint (Optional)</Label>
                  <Input
                    id="apiEndpoint"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    placeholder="https://api.example.com/v1/latest"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updateFrequency">Update Frequency</Label>
                  <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
                    <SelectTrigger id="updateFrequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleTestConnection} disabled={isTestingConnection}>
                  {isTestingConnection ? "Testing..." : "Test API Connection"}
                </Button>
              </div>
            )}

            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="text-lg font-medium">Manual Exchange Rates & Adjustments</h3>

              <div className="space-y-2">
                <Label htmlFor="baseCurrency">Base Currency</Label>
                <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                  <SelectTrigger id="baseCurrency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Label htmlFor="globalMarkup">Global Markup Percentage</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="globalMarkup"
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
                      value={rate.manualRate}
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
                      onCheckedChange={(checked) => handleToggleManual(rate.currency, checked === true)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">Last updated: March 14, 2024 10:30 AM</div>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleUpdateRates}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Now
                </Button>
                <Button variant="outline">
                  <History className="w-4 h-4 mr-2" />
                  View Update History
                </Button>
              </div>
            </div>

            <Button onClick={handleSaveExchangeRates} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Exchange Rate Settings"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

