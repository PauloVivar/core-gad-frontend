import { useTerms, useAuth } from '../shared/hooks'

import { TableCell, TableRow } from '@/components/ui/table'

import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid'

export interface TermRowProps {
  id: number
  version: string
  content: string
  effectiveDate: any
}

export const TermRow = ({
  id,
  version,
  content,
  effectiveDate
}): React.FC<TermRowProps> => {
  const { handlerDeleteTerm, handlerSelectedTermForm } = useTerms()
  const { login } = useAuth()

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{version}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>{effectiveDate}</TableCell>

      {!login.isAdmin || (
        <TableCell className="flex flex-row gap-2">
          <button
            onClick={() =>
              handlerSelectedTermForm({
                id,
                version,
                content,
                effectiveDate
              })
            }
          >
            <ArrowPathIcon className="size-5 text-zinc-500 hover:cursor-pointer" />
          </button>
          <button onClick={() => handlerDeleteTerm(id)}>
            <TrashIcon className="size-5 text-red-500 hover:cursor-pointer" />
          </button>
        </TableCell>
      )}
    </TableRow>
  )
}
