import { Response } from '@/modules/shared/domain/response'

export interface CreditTitle {
  code: string
  secondary: string
  year: number
  month: number
  issuanceDate: string // Date in YYYY-MM-DD format
  detail: string
  reference: string
  concept: string
  amount: number
  sequence: number
  installments: number
  paid: number
  verified: number
  interest: number
  collectionDate: string // Date in YYYY-MM-DD format
  collector: string
  endorser: string
  responsible: string
  specific: string
  amountInWords: string
  cashInflow: number
  taxpayer: string
  titleNumber: number
  entryDate: string // Date in YYYY-MM-DD format
  verificationDate: string | null // Nullable date
  additionalAmount: number
  localLocation: string
  geographicLocation: string
  status: string
  notification: number
  nationalId: string | null // Nullable string
  enforcementDate: string | null // Nullable date
  enforcement: number
  resolutionDocument: string
  originEntryDate: string // Date in YYYY-MM-DD format
  judicialProcess: number
  requestId: number
  processUrl: string
}

export type CreditTitlesResponse = Response<CreditTitle>
