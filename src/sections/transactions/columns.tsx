import { ColumnDef } from '@tanstack/react-table'

import { Payment } from '@/modules/payment/domain/Payment'
import { format } from 'date-fns'

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
    accessorKey: 'createdAt',
    header: 'Fecha de transacción',
    cell: ({ row }) => {
      const formatedDate = format(
        new Date(row.original.createdAt),
        'dd/MM/yyyy HH:mm'
      )
      return formatedDate
    }
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
