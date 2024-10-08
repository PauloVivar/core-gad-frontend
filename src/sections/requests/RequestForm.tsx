import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCadastralRecordsByCitizen } from '@/sections/shared/hooks/useCadastralRecords'
import { RequestType } from '@/modules/requests/domain/RequestEntity'

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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const formSchema = z.object({
  type: z.nativeEnum(RequestType),
  cadastralCode: z.string().min(1, 'Debe seleccionar una clave catastral')
})

type FormValues = z.infer<typeof formSchema>

interface RequestFormProps {
  onSubmit: (data: FormValues) => Promise<void>
  onCancel: () => void
}

export function RequestForm({ onSubmit, onCancel }: RequestFormProps) {
  const { cadastralRecords, isLoading, error } = useCadastralRecordsByCitizen()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: RequestType.FICHA_CATASTRAL,
      cadastralCode: ''
    }
  })

  const handleSubmit = async (data: FormValues) => {
    await onSubmit(data)
    form.reset()
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Solicitudes en Linea</CardTitle>
        <CardDescription>Seleccione el tipo de solicitud.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de solicitud</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo de solicitud" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={RequestType.FICHA_CATASTRAL}>
                        Ficha Catastral
                      </SelectItem>
                      <SelectItem
                        value={RequestType.CERTIFICADO_FRACCIONAMIENTO}
                      >
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
              render={() => (
                <FormItem>
                  <FormLabel>Clave Catastral</FormLabel>
                  <Controller
                    name="cadastralCode"
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
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
                                    checked={
                                      field.value === record.cadastralCode
                                    }
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Enviar solicitud</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
