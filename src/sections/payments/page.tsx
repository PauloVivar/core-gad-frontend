import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useUpdatePayment } from '../payments/hooks/use-update-credit-title'
import { useNavigate } from 'react-router-dom'
import { Timer } from './timer'
import { usePaymentsContext } from './hooks/use-payments-context'
import { useEffect } from 'react'
import { useLastPaymentState } from './state'
import { PaymentStatus } from '@/modules/payment/domain/Payment'

export function PaymentPage() {
  const { mutate: updatePayment } = useUpdatePayment()
  const navigation = useNavigate()

  const { lastPaymentPending: data } = usePaymentsContext()
  const setLastPayment = useLastPaymentState((state) => state.setLastPayment)

  useEffect(() => {
    navigation('/titulos-de-credito')
  }, [navigation])

  const openLightbox = () => {
    if (data?.processUrl && typeof P !== 'undefined') {
      P.init(data.processUrl)
    } else {
      console.error('El SDK de Place to Pay no está disponible.')
    }
  }

  const cancelPayment = () => {
    if (!data?.id) {
      console.error('No se puede cancelar el pago, falta el ID del pago.')
      return
    }
    updatePayment({
      id: data.id,
      status: PaymentStatus.REJECTED
    })
    setLastPayment({
      status: PaymentStatus.REJECTED
    } as Partial<PaymentResponse>)
    navigation('/titulos-de-credito')
  }

  return (
    data && (
      <>
        <div className="flex justify-center items-center">
          {data.createdAt && (
            <Timer createdAt={data.createdAt} onTimeUp={cancelPayment} />
          )}
        </div>
        {data &&
          data.creditTitles &&
          data.creditTitles.length > 0 &&
          data.value && (
            <Card className={cn('w-[380px] mx-auto')}>
              <CardHeader>
                <CardTitle>Pago pendiente</CardTitle>
                <CardDescription>
                  {data.creditTitles.length} Titulos de credito por pagar
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  {data.creditTitles.map((creditTitle, index) => {
                    const { codigo, valor, detalle } = creditTitle

                    return (
                      <div
                        key={index}
                        className="mb-4 grid grid-cols-2 items-start pb-4 last:mb-0 last:pb-0"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {codigo ?? 'N/A'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${valor}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-normal line-clamp-4">
                            {detalle}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <span className="font-semibold">Total:</span> $
                  {data.value.toFixed(2)}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex justify-start items-start space-x-2 mb-4">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">
                    Acepto los términos y condiciones
                  </Label>
                </div>
                <Button className="w-full" onClick={openLightbox}>
                  Pagar
                </Button>
                <br />
                <Separator />
                <Button variant="link" onClick={cancelPayment}>
                  Cancelar intento de pago
                </Button>
              </CardFooter>
            </Card>
          )}
      </>
    )
  )
}
