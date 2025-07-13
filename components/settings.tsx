"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DeductibleFee {
  name: string
  type: "percentage" | "flat"
  value: number
  enabled: boolean
  currency: string
}

export function Settings() {
  const [template, setTemplate] = useState<File | null>(null)
  const [defaultCurrency, setDefaultCurrency] = useState("USD")
  const [deductibleFees, setDeductibleFees] = useState<DeductibleFee[]>([
    { name: "Taxes", type: "percentage", value: 5, enabled: true, currency: "USD" },
    { name: "VAT", type: "percentage", value: 7.5, enabled: true, currency: "USD" },
    { name: "Stamp Duty", type: "flat", value: 50, enabled: true, currency: "USD" },
    { name: "Industrial Training Levy", type: "percentage", value: 1, enabled: true, currency: "USD" },
  ])

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTemplate(file)
    }
  }

  const handleDeductibleFeeChange = (index: number, field: keyof DeductibleFee, value: string | number | boolean) => {
    const updatedFees = [...deductibleFees]
    if (field === "type") {
      updatedFees[index][field] = value as "percentage" | "flat"
    } else if (field === "value") {
      updatedFees[index][field] = Number(value)
    } else if (field === "enabled") {
      updatedFees[index][field] = value as boolean
    } else if (field === "currency") {
      updatedFees[index][field] = value as string
    } else {
      updatedFees[index][field] = value as string
    }
    setDeductibleFees(updatedFees)
  }

  const addDeductibleFee = () => {
    setDeductibleFees([...deductibleFees, { name: "", type: "percentage", value: 0, enabled: true, currency: "USD" }])
  }

  const removeDeductibleFee = (index: number) => {
    const updatedFees = deductibleFees.filter((_, i) => i !== index)
    setDeductibleFees(updatedFees)
  }

  const saveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving settings:", { defaultCurrency, deductibleFees })
    alert("Settings saved!")
  }

  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="receipts">Receipts</TabsTrigger>
        <TabsTrigger value="deductibles">Deductibles & Fees</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Enter your company name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" placeholder="Enter your contact email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select default currency" />
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
            <Button onClick={saveSettings}>Save Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="branding">
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Customize your brand appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" type="file" accept="image/*" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input id="primary-color" type="color" />
            </div>
            <Button onClick={saveSettings}>Save Branding</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="receipts">
        <Card>
          <CardHeader>
            <CardTitle>Receipt Template</CardTitle>
            <CardDescription>Upload and manage your receipt template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="template">Receipt Template</Label>
              <Input id="template" type="file" accept=".docx,.pdf" onChange={handleTemplateUpload} />
            </div>

            {template && (
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertTitle>Template Uploaded</AlertTitle>
                <AlertDescription>{template.name} is ready for use.</AlertDescription>
              </Alert>
            )}

            <Button onClick={saveSettings}>Save Template</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="deductibles">
        <Card>
          <CardHeader>
            <CardTitle>Deductibles and Fees</CardTitle>
            <CardDescription>Configure deductibles and fees for premium calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deductibleFees.map((fee, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`fee-enabled-${index}`}
                  checked={fee.enabled}
                  onCheckedChange={(checked) => handleDeductibleFeeChange(index, "enabled", checked)}
                />
                <Input
                  placeholder="Fee name"
                  value={fee.name}
                  onChange={(e) => handleDeductibleFeeChange(index, "name", e.target.value)}
                  className="flex-grow"
                />
                <Select value={fee.type} onValueChange={(value) => handleDeductibleFeeChange(index, "type", value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Value"
                  value={fee.value}
                  onChange={(e) => handleDeductibleFeeChange(index, "value", e.target.value)}
                  className="w-[100px]"
                />
                <Select
                  value={fee.currency}
                  onValueChange={(value) => handleDeductibleFeeChange(index, "currency", value)}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="UGX">UGX</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => removeDeductibleFee(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addDeductibleFee} variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Add Fee
            </Button>
            <Button onClick={saveSettings}>Save Deductibles and Fees</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

