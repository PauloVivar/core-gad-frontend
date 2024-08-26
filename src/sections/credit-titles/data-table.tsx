import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  const totalValue = useMemo(() => {
    return table
      .getSelectedRowModel()
      .rows.reduce(
        (sum, row) => sum + row.original.valor + row.original.interes,
        0
      )
  }, [table.getSelectedRowModel().rows])

  const handlePayment = () => {
    alert(`Processing payment for $${totalValue.toFixed(2)}`)
  }

  return (
    <>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="bg-muted p-4 rounded-md flex justify-between items-center">
        <div className="text-lg font-semibold">
          Total: ${totalValue.toFixed(2)}
        </div>
        <Button onClick={handlePayment} disabled={totalValue === 0}>
          Realizar pago
        </Button>
        <div>
          <div className="flex gap-4 justify-center items-center">
            <img
              width={56}
              height={40}
              className="object-cover w-14 h-10"
              src="/corporate-images/placetopay.svg"
              alt="placetoPay"
            />
            <img
              width={50}
              height={40}
              src="/corporate-images/visa.svg"
              alt="placetoPay"
            />
            <img
              width={80}
              height={40}
              className="object-cover w-20 h-10"
              src="/corporate-images/diners-club.svg"
              alt="placetoPay"
            />
            <img
              width={96}
              height={40}
              className="object-cover w-24 h-10"
              src="/corporate-images/discover.svg"
              alt="placetoPay"
            />
            <img
              width={36}
              height={36}
              src="/corporate-images/mastercard.svg"
              alt="placetoPay"
            />
          </div>
        </div>
      </div>
    </div>
<div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}
