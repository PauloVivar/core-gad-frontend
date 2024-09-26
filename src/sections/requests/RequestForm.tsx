import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRequest } from '../../modules/requests/application/createRequest'
import { createApiRequestRepository } from '../../modules/requests/infrastructure/ApiRequestRepository'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RequestEntity } from '../../modules/requests/domain/RequestEntity'
import {
  RequestStatus,
  RequestType
} from '../../modules/requests/domain/RequestEntity'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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

const repository = createApiRequestRepository()

const formSchema = z.object({
  cadastralCode: z
    .string()
    .min(1, { message: 'Código catastral es requerido.' }),
  type: z.nativeEnum(RequestType)
})

type FormValues = z.infer<typeof formSchema>

export function RequestForm() {
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cadastralCode: '',
      type: RequestType.FICHA_CATASTRAL
    }
  })

  const mutation = useMutation({
    mutationFn: (newRequest: Omit<RequestEntity, 'id'>) =>
      createRequest(repository)(newRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      form.reset()
    }
  })

  const onSubmit = (data: FormValues) => {
    const newRequest: Omit<RequestEntity, 'id'> = {
      entryDate: new Date(),
      status: RequestStatus.INGRESADO,
      type: data.type,
      cadastralCode: data.cadastralCode,
      citizenId: 1, // Esto debería venir del usuario autenticado
      assignedToUserId: 5,
      documents: []
      // assignedToUserId: null,
      // Añade aquí otros campos necesarios según tu RequestEntity
    }
    mutation.mutate(newRequest)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cadastralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Catastral</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el código catastral" {...field} />
              </FormControl>
              <FormDescription>
                Este es el código catastral de la propiedad.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Solicitud</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de solicitud" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={RequestType.FICHA_CATASTRAL}>
                    Ficha Catastral
                  </SelectItem>
                  <SelectItem value={RequestType.CERTIFICADO_NO_PERTENENCIA}>
                    Certificado de No Pertenencia
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione el tipo de solicitud que desea realizar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creando...' : 'Crear solicitud'}
        </Button>
      </form>
      {mutation.isError && (
        <div className="text-red-500">
          Error al crear la solicitud: {mutation.error.message}
        </div>
      )}
    </Form>
  )
}
