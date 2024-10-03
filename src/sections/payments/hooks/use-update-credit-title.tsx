import { updatePayment } from '@/modules/payment/application/updatePayment'
import { UpdateStatusPaymentParams } from '@/modules/payment/domain/Payment'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const repository = createApiPaymentRepository()

export const useUpdatePayment = () => {
  const queryClient = useQueryClient()
  // const dispatch = useDispatch()

  return useMutation({
    mutationFn: async ({ id, status }: UpdateStatusPaymentParams) => {
      await updatePayment(repository)({ id, status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    }
  })
}
