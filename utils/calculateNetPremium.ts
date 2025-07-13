import type { DeductibleFee } from "@/types/settings"

export function calculateNetPremium(
  grossPremium: number,
  deductibleFees: DeductibleFee[],
  baseCurrency: string,
): number {
  let totalDeductions = 0

  deductibleFees.forEach((fee) => {
    if (fee.enabled) {
      let feeAmount = 0
      if (fee.type === "percentage") {
        feeAmount = grossPremium * (fee.value / 100)
      } else {
        feeAmount = fee.value
      }

      // Convert fee amount to base currency if needed
      if (fee.currency !== baseCurrency) {
        // In a real application, you would use an exchange rate API here
        // For this example, we'll use a simple conversion
        const exchangeRate = getExchangeRate(fee.currency, baseCurrency)
        feeAmount *= exchangeRate
      }

      totalDeductions += feeAmount
    }
  })

  return Math.max(0, grossPremium - totalDeductions)
}

function getExchangeRate(from: string, to: string): number {
  // This is a placeholder function. In a real application, you would
  // fetch real-time exchange rates from an API.
  const rates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    UGX: 3700, // Example exchange rate for Ugandan Shilling
  }

  return rates[to] / rates[from]
}

