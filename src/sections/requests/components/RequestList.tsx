import { useQuery } from '@tanstack/react-query'
import { getRequests } from '../../../modules/requests/application/getRequests'
import { createApiRequestRepository } from '../../../modules/requests/infrastructure/ApiRequestRepository'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { RequestEntity } from '../../../modules/requests/domain/RequestEntity'

const repository = createApiRequestRepository()

interface PaginatedResult<T> {
  content: T[]
  totalElements: number
  totalPages: number
}

export function RequestList() {
  const { data, isLoading, error } = useQuery<
    PaginatedResult<RequestEntity>,
    Error
  >({
    queryKey: ['requests', 0, 10],
    queryFn: () => getRequests(repository)(0, 10)
  })

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar las solicitudes: {error.message}</div>

  return (
    <Table>
      <TableCaption>Lista de solicitudes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Fecha de entrada</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Código catastral</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.content.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.id}</TableCell>
            <TableCell>
              {new Date(request.entryDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{request.status}</TableCell>
            <TableCell>{request.type}</TableCell>
            <TableCell>{request.cadastralCode}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
