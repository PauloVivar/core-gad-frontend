import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCadastralRecordsByCitizen } from '@/sections/shared/hooks/useCadastralRecords'
import { useAuth } from '@/sections/shared/hooks/useAuth'
import {
  RequestType,
  CreateRequestDto
} from '@/modules/requests/domain/RequestEntity'
import { useRequests } from '@/sections/shared/hooks/useRequests'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const formSchema = z.object({
  type: z.nativeEnum(RequestType),
  cadastralCode: z.string().min(1, 'Debe seleccionar una ficha catastral')
})

// type FormValues = z.infer<typeof formSchema>;

// interface RequestFormProps {
//   onSubmit: (data: FormValues) => Promise<void>;
// }

export function RequestForm() {
  const { login } = useAuth()
  const { cadastralRecords, isLoading, error } = useCadastralRecordsByCitizen()
  const { createRequest } = useRequests()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: RequestType.FICHA_CATASTRAL,
      cadastralCode: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (login.user?.id) {
      const newRequest: CreateRequestDto = {
        type: data.type,
        cadastralCode: data.cadastralCode,
        citizenId: login.user.id
      }
      try {
        await createRequest(newRequest)
        // Manejar éxito (por ejemplo, mostrar un mensaje, redirigir, etc.)
      } catch (error) {
        // Manejar error
        console.error('Error al crear la solicitud:', error)
      }
    }
  }

  if (isLoading) return <div>Cargando fichas catastrales...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  if (!cadastralRecords || cadastralRecords.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atención</AlertTitle>
        <AlertDescription>
          No se encontraron predios asociados a su nombre. Por favor, contacte
          con el departamento de catastro para más información.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de solicitud</FormLabel>
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
                  <SelectItem value={RequestType.CERTIFICADO_FRACCIONAMIENTO}>
                    Certificado de Fraccionamiento
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cadastralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ficha Catastral</FormLabel>
              <Controller
                name="cadastralCode"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    //defaultValue={field.value}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Seleccionar</TableHead>
                          <TableHead>Código Catastral</TableHead>
                          <TableHead>Ciudad</TableHead>
                          <TableHead>Provincia</TableHead>
                          <TableHead>País</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cadastralRecords?.map((record) => (
                          <TableRow key={record.cadastralCode}>
                            <TableCell>
                              <RadioGroupItem
                                value={record.cadastralCode}
                                id={record.cadastralCode}
                                checked={field.value === record.cadastralCode}
                                //onCheckedChange={() => field.onChange(record.cadastralCode)}
                              />
                            </TableCell>
                            <TableCell>{record.cadastralCode}</TableCell>
                            <TableCell>{record.city}</TableCell>
                            <TableCell>{record.province}</TableCell>
                            <TableCell>{record.country}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </RadioGroup>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Enviar solicitud</Button>
      </form>
    </Form>
  )
}
