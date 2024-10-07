import { useAuth } from '@/sections/shared/hooks'
import { useGetPaymentsByDni } from './use-get-by-dni'
import { useEffect } from 'react'
import { useLastPaymentState } from '../state'
import { Payment } from '@/modules/payment/domain/Payment'

export const useLastPayment = () => {
  const { login } = useAuth()
  const { data } = useGetPaymentsByDni(login?.user?.contribuyente?.ci as string)
  const lastPaymentPending = useLastPaymentState(
    (state) => state.lastPaymentPending
  )
  const setLastPayment = useLastPaymentState((state) => state.setLastPayment)

  useEffect(() => {
    const lastPayment =
      (data?.content?.find(
        (item) => item?.status === 'PENDIENTE'
      ) as Payment) ?? null
    setLastPayment(lastPayment)
  }, [data?.content, setLastPayment])

  return {
    lastPaymentPending
  }
}
