import type { DeductibleFee } from "@/types/settings"

const exchangeRateCache = new Map<string, { rate: number; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function calculateNetPremium(
  grossPremium: number,
  deductibleFees: DeductibleFee[],
  baseCurrency: string,
): number {
  // Early return for zero premium
  if (grossPremium <= 0) return 0

  // Filter enabled fees once to avoid repeated checks
  const enabledFees = deductibleFees.filter((fee) => fee.enabled)

  // Early return if no enabled fees
  if (enabledFees.length === 0) return grossPremium

  let totalDeductions = 0

  for (const fee of enabledFees) {
    let feeAmount = fee.type === "percentage" ? grossPremium * (fee.value / 100) : fee.value

    // Convert fee amount to base currency if needed
    if (fee.currency !== baseCurrency) {
      const exchangeRate = getExchangeRate(fee.currency, baseCurrency)
      feeAmount *= exchangeRate
    }

    totalDeductions += feeAmount
  }

  return Math.max(0, grossPremium - totalDeductions)
}

function getExchangeRate(from: string, to: string): number {
  if (from === to) return 1

  const cacheKey = `${from}-${to}`
  const cached = exchangeRateCache.get(cacheKey)

  // Return cached rate if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rate
  }

  // Static rates for demo - in production, this would fetch from API
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    UGX: 3700,
  }

  const rate = (rates[to] || 1) / (rates[from] || 1)

  // Cache the calculated rate
  exchangeRateCache.set(cacheKey, { rate, timestamp: Date.now() })

  return rate
}

export function clearExchangeRateCache(): void {
  exchangeRateCache.clear()
}
