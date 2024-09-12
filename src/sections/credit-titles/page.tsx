import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useCreditTitles } from './useCreditTitles'
import { Layout } from '@/components/Layout'
import { useSearchParams } from 'react-router-dom'
import { Paginatior } from './paginator'
import { useAuth } from '../shared/hooks'

export function CreditTitlesPage() {
  const [searchParams] = useSearchParams()
  const pageSize = Number(searchParams.get('pageSize')) || 5
  const pageNumber = Number(searchParams.get('pageNumber')) || 1
  const { creditTitles, getCreditTitles, getPaginator } = useCreditTitles()
  const { login } = useAuth()

  useEffect(() => {
    getCreditTitles(
      `filters=crdcontribuyente%20EQUAL%20${login?.user?.contribuyente?.ci}%20AND%20ingcodigo%20GREATER_THAN%20-1&pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=&order=NONE`
    )
  }, [pageSize, pageNumber])

  return (
    <Layout>
      <DataTable columns={columns} data={creditTitles} />
      <Paginatior
        url="/users/titulos-de-credito"
        paginator={getPaginator(pageSize, pageNumber)}
      />
    </Layout>
  )
}
