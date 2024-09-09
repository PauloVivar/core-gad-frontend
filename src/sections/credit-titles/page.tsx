import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useCreditTitles } from './useCreditTitles'
import { Layout } from '@/components/Layout'
import { useSearchParams } from 'react-router-dom'
import { Paginatior } from './paginator'

export function CreditTitlesPage() {
  const [searchParams] = useSearchParams()
  const pageSize = Number(searchParams.get('pageSize')) || 5
  const pageNumber = Number(searchParams.get('pageNumber')) || 1
  const { creditTitles, getCreditTitles, getPaginator } = useCreditTitles()

  useEffect(() => {
    getCreditTitles(
      `filters=crdcontribuyente%20EQUAL%200301036349%20AND%20ingcodigo%20GREATER_THAN%20-1&pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=&order=NONE`
    )
  }, [pageSize, pageNumber])

  return (
    <Layout>
      <DataTable columns={columns} data={creditTitles} />
      <Paginatior
        url="/titulos-de-credito"
        paginator={getPaginator(pageSize, pageNumber)}
      />
    </Layout>
  )
}
