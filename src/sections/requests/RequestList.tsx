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
import { RequestEntity } from '../../modules/requests/domain/RequestEntity'
// import { useRequests } from '../shared/hooks/useRequests'
// import { Paginator } from '@/components/paginator'
// import { useParams } from 'react-router-dom'

interface RequestListProps {
  requests: RequestEntity[]
}

export function RequestList({ requests }: RequestListProps) {
  // const { page } = useParams()
  // const currentPage = page ? parseInt(page) : 0
  // const { requests, paginator, isLoading, error } = useRequests(currentPage)

  // if (isLoading) return <div>Cargando...</div>
  // if (error) return <div>Error al cargar las solicitudes: {error.message}</div>

  return (
    <>
      <Table>
        <TableCaption>Lista de solicitudes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha de entrada</TableHead>
            <TableHead>Código catastral</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request: RequestEntity) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>
                {new Date(request.entryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{request.cadastralCode}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.status}</TableCell>
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
      {/* <Paginator url="/requests/page" paginator={paginator} /> */}
    </>
  )
}
