// Exchange rates for currency conversion
// In a real application, these would be fetched from an API
export const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  UGX: 3700,
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency = "USD"): number {
  if (fromCurrency === toCurrency) return amount

  const fromRate = exchangeRates[fromCurrency as keyof typeof exchangeRates] || 1
  const toRate = exchangeRates[toCurrency as keyof typeof exchangeRates] || 1

  return (amount / fromRate) * toRate
}

