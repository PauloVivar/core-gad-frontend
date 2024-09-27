import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { getRequests } from '@/modules/requests/application/getRequests'
import { createApiRequestRepository } from '@/modules/requests/infrastructure/ApiRequestRepository'

const repository = createApiRequestRepository()

const columns = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'type',
    header: 'Tipo'
  },
  {
    accessorKey: 'status',
    header: 'Estado'
  },
  {
    accessorKey: 'entryDate',
    header: 'Fecha de Ingreso',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString()
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const status = row.original.status
      if (status === 'APROBADO') {
        return <span>Trámite concluido</span>
      }
      return (
        <Button variant="outline" size="sm">
          {status === 'PENDIENTE_SUBSANACION' ? 'Subsanar' : 'Ver detalles'}
        </Button>
      )
    }
  }
]

export function RequestListPage() {
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState([])
  const [filtering, setFiltering] = React.useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['requests'],
    queryFn: () => getRequests(repository)(0, 100) // Ajusta según tus necesidades de paginación
  })

  const table = useReactTable({
    data: data?.content || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  })

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar las solicitudes: {error.message}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Solicitudes</h1>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Buscar solicitudes..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => navigate('/select-request-type')}>
          Iniciar nuevo trámite
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
