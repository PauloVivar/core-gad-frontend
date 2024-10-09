import { DataTable } from './data-table'
import { useAuth } from '../shared/hooks'
import { columns } from './columns'
import { useGetPaymentsByDni } from '../payments/hooks'

export const TransactionsPage = () => {
  const { login } = useAuth()
  const { data, isPending, error } = useGetPaymentsByDni(
    login?.user?.contribuyente?.ci as string
  )

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return data ? (
    <DataTable columns={columns} data={data?.content} />
  ) : (
    <div>No se a encontrado ninguna transacción</div>
  )
}
