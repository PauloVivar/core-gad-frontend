import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDispatch } from 'react-redux'
import { setRequestType, setCadastralCode } from '@/redux/states/requests'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { RequestType } from '@/modules/requests/domain/RequestEntity'

const formSchema = z.object({
  requestType: z.nativeEnum(RequestType),
  cadastralCode: z
    .string()
    .min(1, 'El código catastral es requerido')
    .optional()
})

type FormValues = z.infer<typeof formSchema>

export function SelectRequestTypePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showCadastralCode, setShowCadastralCode] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestType: undefined,
      cadastralCode: ''
    }
  })

  const onSubmit = (values: FormValues) => {
    dispatch(setRequestType(values.requestType))
    if (values.cadastralCode) {
      dispatch(setCadastralCode(values.cadastralCode))
    }
    navigate('/attach-documents')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Selección de Tipo de Trámite</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de solicitud</FormLabel>
                <Select
                  onValueChange={(value: RequestType) => {
                    field.onChange(value)
                    setShowCadastralCode(true)
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de solicitud" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICHA_CATASTRAL">
                      Ficha Catastral
                    </SelectItem>
                    <SelectItem value="CERTIFICADO_NO_PERTENENCIA">
                      Certificado de No Pertenencia
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seleccione el tipo de trámite que desea realizar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {showCadastralCode && (
            <FormField
              control={form.control}
              name="cadastralCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Catastral</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el código catastral"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ingrese el código catastral asociado a su solicitud.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button type="submit">Siguiente</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
