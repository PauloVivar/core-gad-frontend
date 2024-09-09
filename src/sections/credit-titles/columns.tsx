import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import { CreditTitle } from '@/modules/credit-titles/domain/CreditTitle'

export const columns: ColumnDef<CreditTitle>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'year',
    header: 'Año'
  },
  {
    accessorKey: 'month',
    header: 'Mes'
  },
  {
    accessorKey: 'secondary',
    header: 'Secundario'
  },
  {
    accessorKey: 'concept',
    header: 'Concepto'
  },
  {
    accessorKey: 'amount',
    header: 'Valor'
  },
  {
    accessorKey: 'interest',
    header: 'Interes'
  },
  {
    accessorKey: 'detail',
    header: 'Detalle'
  }
]
