interface GeneralSettings {
  companyName: string
  contactEmail: string
  defaultCurrency: string
}

interface BrandingSettings {
  logoUrl: string
  headerText: string
  footerText: string
  additionalNotes: string
  primaryColor: string
  secondaryColor: string
}

interface ReceiptSettings {
  template: string
  showLogo: boolean
  showFooter: boolean
  additionalText: string
}

interface DeductibleFee {
  name: string
  type: "percentage" | "flat"
  value: number
  enabled: boolean
  currency: string
}

interface Settings {
  general: GeneralSettings
  branding: BrandingSettings
  receipts: ReceiptSettings
  deductibleFees: DeductibleFee[]
}

// Mock settings data
const mockSettings: Settings = {
  general: {
    companyName: "Sauti Travels",
    contactEmail: "contact@sautitravels.com",
    defaultCurrency: "USD",
  },
  branding: {
    logoUrl: "/logo.png",
    headerText: "Sauti Travels - Travel Insurance",
    footerText: "© 2023 Sauti Travels. All rights reserved.",
    additionalNotes: "Thank you for your business.",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
  },
  receipts: {
    template: "default",
    showLogo: true,
    showFooter: true,
    additionalText: "This is a receipt for your payment.",
  },
  deductibleFees: [
    {
      name: "Taxes",
      type: "percentage",
      value: 5,
      enabled: true,
      currency: "USD",
    },
    {
      name: "VAT",
      type: "percentage",
      value: 7.5,
      enabled: true,
      currency: "USD",
    },
    {
      name: "Stamp Duty",
      type: "flat",
      value: 50,
      enabled: true,
      currency: "USD",
    },
    {
      name: "Industrial Training Levy",
      type: "percentage",
      value: 1,
      enabled: true,
      currency: "USD",
    },
  ],
}

export async function getSettings(): Promise<Settings> {
  // In a real application, you would fetch settings from a database
  return mockSettings
}

export async function updateSettings(newSettings: Partial<Settings>): Promise<Settings> {
  // In a real application, you would update settings in a database
  // For demo purposes, we'll just merge the new settings with the mock settings

  const updatedSettings = {
    ...mockSettings,
    ...newSettings,
    general: {
      ...mockSettings.general,
      ...(newSettings.general || {}),
    },
    branding: {
      ...mockSettings.branding,
      ...(newSettings.branding || {}),
    },
    receipts: {
      ...mockSettings.receipts,
      ...(newSettings.receipts || {}),
    },
    deductibleFees: newSettings.deductibleFees || mockSettings.deductibleFees,
  }

  return updatedSettings
}
