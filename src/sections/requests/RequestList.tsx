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
import { PencilIcon } from 'lucide-react'
import { RequestEntity } from '../../modules/requests/domain/RequestEntity'
import { Card } from '@/components/ui/card'

interface RequestListProps {
  requests: RequestEntity[]
  onEdit: (request: RequestEntity) => void
}

export function RequestList({ requests, onEdit }: RequestListProps) {
  return (
    <Card className="w-full p-2">
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
                <Button
                  onClick={() => onEdit(request)}
                  variant="ghost"
                  size="icon"
                >
                  <PencilIcon className="h-4 w-4 text-zinc-500" />
                </Button>
                {/* <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
