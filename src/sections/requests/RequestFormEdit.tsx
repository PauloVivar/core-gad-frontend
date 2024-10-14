import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  RequestEntity,
  RequestType,
  RequestStatus
} from '../../modules/requests/domain/RequestEntity'

const formSchema = z.object({
  status: z.nativeEnum(RequestStatus),
  type: z.nativeEnum(RequestType),
  cadastralCode: z.string()
})

export type FormValues = z.infer<typeof formSchema>

interface RequestFormEditProps {
  selectedRequest: RequestEntity
  onSubmit: (data: FormValues) => void
}

export function RequestFormEdit({
  selectedRequest,
  onSubmit
}: RequestFormEditProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: selectedRequest.status,
      type: selectedRequest.type,
      cadastralCode: selectedRequest.cadastralCode
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RequestStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                El estado actual de la solicitud.
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
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormDescription>
                El tipo de solicitud no puede ser modificado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cadastralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Catastral</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormDescription>
                El código catastral no puede ser modificado.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Actualizar Solicitud</Button>
      </form>
    </Form>
  )
}
