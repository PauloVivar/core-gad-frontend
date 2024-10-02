import { columns } from './columns'
import { DataTable } from './data-table'
import { Layout } from '@/components/Layout'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Paginatior } from './paginator'
import { useAuth } from '../shared/hooks'
import { useGetCreditTitles } from './hooks'
import { usePaymentsContext } from '../payments/hooks/use-payments-context'
import { useEffect } from 'react'
import { PaymentStatus } from '@/modules/payment/domain/Payment'

export function CreditTitlesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const pageSize = Number(searchParams.get('pageSize')) || 5
  const pageNumber = Number(searchParams.get('pageNumber')) || 1
  const { login } = useAuth()
  const { lastPaymentPending } = usePaymentsContext()

  useEffect(() => {
    if (lastPaymentPending?.status === PaymentStatus.PENDING) {
      navigate(`/pagos`)
    } else {
      console.log('No pending payment')
    }
  }, [lastPaymentPending])

  const query = `filters=crdcontribuyente%20EQUAL%20${login?.user?.contribuyente?.ci}%20AND%20ingcodigo%20GREATER_THAN%20-1&pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=&order=NONE`

  const { data, isPending, error } = useGetCreditTitles(query)

  const paginator = { pageSize, pageNumber, totalPages: data?.totalPages }

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Layout>
      <DataTable columns={columns} data={data?.content} />
      <Paginatior url="/titulos-de-credito" paginator={paginator} />
    </Layout>
  )
}
