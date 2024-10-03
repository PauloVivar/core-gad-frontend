import { createPayment } from '@/modules/payment/application/createPayment'
import { getPayment } from '@/modules/payment/application/getPayment'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

const repository = createApiPaymentRepository()

export const useCreatePayment = () => {
  const queryClient = useQueryClient()
  // const dispatch = useDispatch()

  return useMutation({
    mutationFn: async ({
      concept,
      value,
      status,
      reference,
      creditTitles
    }: {
      concept: string
      value: number
      status: string
      reference: string
      creditTitles: string[]
    }) => {
      const id = (uuidv4 as () => string)()
      await createPayment(repository)({
        id,
        concept,
        value,
        status,
        reference,
        creditTitles
      })
      return await getPayment(repository)(id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      console.log(data)
      if (data?.processUrl) {
        P.init(data.processUrl)
      } else {
        console.error('No processUrl found in the response')
      }
    }
  })
}
