import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { setDocuments } from '@/redux/states/requests'
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
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { DocumentType } from '@/modules/documents/domain/Document'

const documentTypes = [
  'FORMULARIO',
  'CEDULA',
  'PAPELETA_VOTACION',
  'COMPROBANTE_PAGO',
  'ESCRITURA',
  'CERTIFICADO_NO_ADEUDAR'
]

const formSchema = z.object({
  documents: z.array(
    z.object({
      type: z.nativeEnum(DocumentType),
      file: z
        .instanceof(File)
        .refine((file) => file.type === 'application/pdf', {
          message: 'El archivo debe ser un PDF'
        })
    })
  )
})

type FormValues = z.infer<typeof formSchema>

export function AttachDocumentsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //const { requestType } = useSelector((state) => state.requests);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: documentTypes.map((type) => ({ type, file: null }))
    }
  })

  const onSubmit = (values) => {
    dispatch(setDocuments(values.documents))
    navigate('/request-list')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Adjuntar Requisitos del Trámite
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Documento</TableHead>
                <TableHead>Archivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentTypes.map((docType, index) => (
                <TableRow key={docType}>
                  <TableCell>{docType}</TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`documents.${index}.file`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf"
                              onChange={(e) =>
                                field.onChange(e.target.files[0])
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button type="submit">Seguir</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
