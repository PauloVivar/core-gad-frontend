import { useTerms, useAuth } from '../shared/hooks'
import { TermRow } from './term-row'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Card } from '@/components/ui/card'

const TermsList = () => {
  const { terms } = useTerms()
  const { login } = useAuth()

  return (
    <>
      <Card className="w-full">
        <Table>
          <TableCaption>Lista de Términos y Condiciones</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>EffectiveDate</TableHead>
              {!login.isAdmin || <TableHead>Acciones</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {terms.map(({ id, version, content, effectiveDate }) => (
              <TermRow
                key={id}
                id={id}
                version={version}
                content={content}
                effectiveDate={effectiveDate}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export { TermsList }
