import { NextResponse } from "next/server"

export async function GET() {
  // Mock settings data
  const settings = {
    general: {
      companyName: "Sauti Travels", // Updated company name from Sauti Pay to Sauti Travels
      contactEmail: "info@sautitravels.com", // Updated email domain from sautipay.com to sautitravels.com
      defaultCurrency: "USD",
    },
    branding: {
      logoFileName: "logo.png",
      primaryColor: "#4CAF50",
    },
    receipt: {
      receiptFileName: "receipt-template.docx",
    },
    deductibles: {
      fees: [
        { name: "Taxes", type: "percentage", value: 5, enabled: true, currency: "USD" },
        { name: "VAT", type: "percentage", value: 7.5, enabled: true, currency: "USD" },
        { name: "Stamp Duty", type: "flat", value: 50, enabled: true, currency: "USD" },
        { name: "Industrial Training Levy", type: "percentage", value: 1, enabled: true, currency: "USD" },
      ],
    },
    exchangeRates: {
      useExternalApi: false,
      apiProvider: "openexchangerates",
      apiKey: "",
      apiEndpoint: "https://api.exchangerate.com/v1/latest",
      updateFrequency: "daily",
      baseCurrency: "USD",
      globalMarkup: 2.5,
      rates: [
        { currency: "EUR", currentRate: 0.85, markup: 2.5, useManual: false, manualRate: 0.85 },
        { currency: "GBP", currentRate: 0.73, markup: 2.5, useManual: false, manualRate: 0.73 },
        { currency: "JPY", currentRate: 110.0, markup: 2.5, useManual: false, manualRate: 110.0 },
        { currency: "UGX", currentRate: 3700.0, markup: 2.5, useManual: false, manualRate: 3700.0 },
      ],
    },
  }

  return NextResponse.json({ success: true, data: settings })
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json()

    // In a real application, you would save this data to a database
    console.log("Received settings update:", data)

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 })
  }
}
