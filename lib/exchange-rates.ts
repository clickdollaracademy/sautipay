// Exchange rates for currency conversion
export const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  UGX: 3700, // This should be fetched from admin settings in production
}

export function getCurrentUGXRate(): number {
  // In production, this would fetch from admin settings or external API
  return exchangeRates.UGX
}

export function convertUSDToUGX(usdAmount: number): number {
  return usdAmount * getCurrentUGXRate()
}

export function convertUGXToUSD(ugxAmount: number): number {
  return ugxAmount / getCurrentUGXRate()
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency = "USD"): number {
  if (fromCurrency === toCurrency) return amount

  const fromRate = exchangeRates[fromCurrency as keyof typeof exchangeRates] || 1
  const toRate = exchangeRates[toCurrency as keyof typeof exchangeRates] || 1

  return (amount / fromRate) * toRate
}

export function formatCurrencyWithUGX(usdAmount: number): string {
  const ugxAmount = convertUSDToUGX(usdAmount)
  return `$${usdAmount.toFixed(2)} USD (UGX ${ugxAmount.toLocaleString()})`
}
