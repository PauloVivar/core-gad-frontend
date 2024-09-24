import { ColumnDef } from '@tanstack/react-table'

import { Payment } from '@/modules/payment/domain/Payment'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'concept',
    header: 'Concepto'
  },
  {
    accessorKey: 'value',
    header: 'Valor de pago'
  },
  {
    accessorKey: 'reference',
    header: 'Referencia'
  },
  {
    accessorKey: 'status',
    header: 'Estado del pago'
  }
]
