"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

interface CompanyOnboardingFormData {
  name: string
  industry: string
  email: string
  phone: string
  address: string
  contractNumber: string
  contactName: string
  contactEmail: string
  contactPhone: string
  subscriptionPlan: string
  commissionRate: number
  notes: string
  features: {
    payments: boolean
    refunds: boolean
    settlements: boolean
    commissions: boolean
    receipting: boolean
    brokers: boolean
  }
}

export function CompanyOnboardingForm() {
  const [formData, setFormData] = useState<CompanyOnboardingFormData>({
    name: "",
    industry: "",
    email: "",
    phone: "",
    address: "",
    contractNumber: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    subscriptionPlan: "standard",
    commissionRate: 5,
    notes: "",
    features: {
      payments: true,
      refunds: true,
      settlements: true,
      commissions: true,
      receipting: true,
      brokers: true,
    },
  })
  const [contractFile, setContractFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked,
      },
    }))
  }

  const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setContractFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Company onboarded successfully",
        description: `${formData.name} has been added to the platform.`,
      })

      // Reset form
      setFormData({
        name: "",
        industry: "",
        email: "",
        phone: "",
        address: "",
        contractNumber: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        subscriptionPlan: "standard",
        commissionRate: 5,
        notes: "",
        features: {
          payments: true,
          refunds: true,
          settlements: true,
          commissions: true,
          receipting: true,
          brokers: true,
        },
      })
      setContractFile(null)
    } catch (error) {
      toast({
        title: "Failed to onboard company",
        description: "There was an error while onboarding the company. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="company">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company Details</TabsTrigger>
          <TabsTrigger value="contract">Contract Details</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="features">Features & Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Enter the company details for onboarding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Company Phone *</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Company Address</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract">
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
              <CardDescription>Upload the signed contract and add contract details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contractNumber">Contract Number *</Label>
                <Input
                  id="contractNumber"
                  name="contractNumber"
                  value={formData.contractNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract">Signed Contract *</Label>
                <Input
                  id="contract"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleContractUpload}
                  required={!contractFile}
                />
              </div>

              {contractFile && (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Contract Uploaded</AlertTitle>
                  <AlertDescription>{contractFile.name} is ready for submission.</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Contract Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special terms or conditions..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Primary Contact</CardTitle>
              <CardDescription>Add the primary contact person information for this company.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Additional Contacts</h3>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features & Plans</CardTitle>
              <CardDescription>Configure the subscription plan and enabled features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscriptionPlan">Subscription Plan *</Label>
                <Select
                  value={formData.subscriptionPlan}
                  onValueChange={(value) => handleSelectChange("subscriptionPlan", value)}
                >
                  <SelectTrigger id="subscriptionPlan">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                <Input
                  id="commissionRate"
                  name="commissionRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={handleInputChange}
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Enabled Features</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="payments"
                      checked={formData.features.payments}
                      onCheckedChange={(checked) => handleSwitchChange("payments", checked)}
                    />
                    <Label htmlFor="payments">Payments Processing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="refunds"
                      checked={formData.features.refunds}
                      onCheckedChange={(checked) => handleSwitchChange("refunds", checked)}
                    />
                    <Label htmlFor="refunds">Refunds Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="settlements"
                      checked={formData.features.settlements}
                      onCheckedChange={(checked) => handleSwitchChange("settlements", checked)}
                    />
                    <Label htmlFor="settlements">Settlements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="commissions"
                      checked={formData.features.commissions}
                      onCheckedChange={(checked) => handleSwitchChange("commissions", checked)}
                    />
                    <Label htmlFor="commissions">Commissions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="receipting"
                      checked={formData.features.receipting}
                      onCheckedChange={(checked) => handleSwitchChange("receipting", checked)}
                    />
                    <Label htmlFor="receipting">Receipting</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="brokers"
                      checked={formData.features.brokers}
                      onCheckedChange={(checked) => handleSwitchChange("brokers", checked)}
                    />
                    <Label htmlFor="brokers">Brokers/Agents</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Processing..." : "Complete Onboarding"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}

