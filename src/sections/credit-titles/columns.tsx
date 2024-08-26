import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox"

import { CreditTitle } from "@/modules/credit-titles/domain/CreditTitle";

export const columns: ColumnDef<CreditTitle>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={
          (value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "anio",
    header: "Año",
  },
  {
    accessorKey: "mes",
    header: "Mes",
  },
  {
    accessorKey: "secundario",
    header: "Secundario",
  },
  {
    accessorKey: "concepto",
    header: "Concepto",
  },
  {
    accessorKey: "valor",
    header: "Valor",
  },
  {
    accessorKey: "interes",
    header: "Interes",
  },
  {
    accessorKey: "detalle",
    header: "Detalle",
  }
]
