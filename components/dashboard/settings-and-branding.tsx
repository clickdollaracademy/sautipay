"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SettingsAndBranding() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 w-full max-w-md">
        <TabsTrigger value="general" className={activeTab === "general" ? "bg-background" : ""}>
          General
        </TabsTrigger>
        <TabsTrigger value="branding" className={activeTab === "branding" ? "bg-background" : ""}>
          Branding
        </TabsTrigger>
        <TabsTrigger value="receipts" className={activeTab === "receipts" ? "bg-background" : ""}>
          Receipts
        </TabsTrigger>
        <TabsTrigger value="fees" className={activeTab === "fees" ? "bg-background" : ""}>
          Deductibles & Fees
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">General Settings</h3>
                <p className="text-muted-foreground mb-6">Manage your account settings</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Enter your company name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" placeholder="Enter your contact email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                        <SelectItem value="jpy">JPY</SelectItem>
                        <SelectItem value="ugx">UGX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="mt-4 bg-black text-white hover:bg-black/90">Save Settings</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="branding" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Branding</h3>
                <p className="text-muted-foreground mb-6">Customize your branding settings</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Company Logo URL</Label>
                    <Input id="logoUrl" placeholder="Enter logo URL" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headerText">Header Text</Label>
                    <Input id="headerText" placeholder="Enter header text" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="footerText">Footer Text</Label>
                    <Input id="footerText" placeholder="Enter footer text" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea id="additionalNotes" placeholder="Enter any additional notes or terms" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-black rounded"></div>
                      <Input id="primaryColor" defaultValue="#000000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white border rounded"></div>
                      <Input id="secondaryColor" defaultValue="#ffffff" />
                    </div>
                  </div>

                  <Button className="mt-4 bg-black text-white hover:bg-black/90">Save Branding</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="receipts" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Receipt Settings</h3>
                <p className="text-muted-foreground mb-6">Customize your receipt templates</p>

                <div className="space-y-4">
                  {/* Receipt settings would go here */}
                  <p>Receipt customization options coming soon...</p>

                  <Button className="mt-4 bg-black text-white hover:bg-black/90">Save Receipt Settings</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="fees" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Deductibles & Fees</h3>
                <p className="text-muted-foreground mb-6">Manage your deductibles and fee structure</p>

                <div className="space-y-4">
                  {/* Deductibles and fees settings would go here */}
                  <p>Deductibles and fees configuration coming soon...</p>

                  <Button className="mt-4 bg-black text-white hover:bg-black/90">Save Fee Settings</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
