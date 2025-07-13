export interface DeductibleFee {
  name: string
  type: "percentage" | "flat"
  value: number
  enabled: boolean
  currency: string
}

