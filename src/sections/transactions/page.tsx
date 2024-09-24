import { Layout } from '@/components/Layout'
import { DataTable } from './data-table'
import { useAuth } from '../shared/hooks'
import { useEffect } from 'react'
import { columns } from './columns'
import { usePayments } from '../payments/usePayments'

export const TransactionsPage = () => {
  const { getPaymementByDni, transactions } = usePayments()
  const { login } = useAuth()

  useEffect(() => {
    getPaymementByDni(login?.user?.contribuyente?.ci as string)
  }, [])

  return (
    <Layout>
      <DataTable columns={columns} data={transactions} />
    </Layout>
  )
}
