"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload, FileText, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ReceiptGenerator() {
  const [template, setTemplate] = useState<File | null>(null)
  const [generatedReceipt, setGeneratedReceipt] = useState<string | null>(null)

  const handleTemplateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setTemplate(file)
    }
  }

  const generateReceipt = async () => {
    if (!template) {
      alert("Please upload a template first")
      return
    }

    // Here you would typically send the template to your backend
    // and receive a generated PDF in return.
    // For this example, we'll simulate the process with a timeout.

    setGeneratedReceipt(null) // Reset any previous receipt

    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate processing

    // In a real scenario, you'd receive a URL or blob for the generated PDF
    setGeneratedReceipt("generated_receipt.pdf")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Receipt</CardTitle>
        <CardDescription>Upload a template and generate a downloadable receipt</CardDescription>
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

        <Button onClick={generateReceipt} disabled={!template}>
          <Upload className="mr-2 h-4 w-4" /> Generate Receipt
        </Button>

        {generatedReceipt && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Receipt Generated</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              Your receipt is ready for download.
              <Button variant="outline" size="sm" asChild>
                <a href={generatedReceipt} download>
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
