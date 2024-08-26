import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useCreditTitles } from './useCreditTitles'
import { useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'

export function CreditTitlesPage() {
  const { page } = useParams()
  const { creditTitles, getCreditTitles } = useCreditTitles()

  useEffect(() => {
    getCreditTitles(page)
  }, [page])

  return (
    <Layout>
      <DataTable columns={columns} data={creditTitles} />
    </Layout>
  )
}
