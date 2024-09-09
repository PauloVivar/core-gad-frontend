export interface CashInflow {
  code: number
  concept: string
  reference: string
  amountCollected: number
  amountCollectedInWords: string
  amount: number
  amountInWords: string
  interest: number
  interestInWords: string
  surcharges: number
  surchargesInWords: string
  change: number
  changeInWords: string
  totalToPay: number
  totalInWords: string
  paymentMethod: string
  account: string
  bank: string
  check: string
  notes: string
  collector: string
  invoice: number
}
