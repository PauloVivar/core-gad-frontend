export interface CreditTitle {
  code: number;
  date: string;
  concept: string;
  reference: string;
  amountCollected: number;
  amountCollectedInWords: string;
  value: number;
  valueInWords: string;
  interest: number;
  interestInWords: string;
  surcharges: number;
  surchargesInWords: string;
  change: number;
  changeInWords: string;
  totalToPay: number;
  totalInWords: string;
  paymentMethod: string;
  account: string;
  bank: string;
  check: string;
  notes: string;
  collector: string;
  invoiceNumber: number;
}
