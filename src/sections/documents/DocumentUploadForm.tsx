import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  DocumentType,
  CreateDocumentDto
} from '@/modules/documents/domain/Document'
import { useDocuments } from '@/sections/shared/hooks/useDocuments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, X } from 'lucide-react'

const documentTypes = [
  { type: DocumentType.CEDULA, label: 'Cédula' },
  { type: DocumentType.PAPELETA_VOTACION, label: 'Papeleta de Votación' },
  { type: DocumentType.FORMULARIO, label: 'Formulario' },
  { type: DocumentType.ESCRITURA, label: 'Escritura' },
  { type: DocumentType.COMPROBANTE_PAGO, label: 'Comprobante de Pago' },
  {
    type: DocumentType.CERTIFICADO_NO_ADEUDAR,
    label: 'Certificado de No Adeudar'
  }
]

const schema = z.object({
  files: z.record(z.instanceof(File).nullable())
})

type FormValues = z.infer<typeof schema>

interface DocumentUploadFormProps {
  requestId: number
}

export function DocumentUploadForm({ requestId }: DocumentUploadFormProps) {
  const { createDocument, deleteDocument, documents } = useDocuments(requestId)
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<DocumentType, boolean>
  >({} as Record<DocumentType, boolean>)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      files: documentTypes.reduce(
        (acc, { type }) => ({ ...acc, [type]: null }),
        {}
      )
    }
  })

  const onSubmit = async (data: FormValues) => {
    for (const [type, file] of Object.entries(data.files)) {
      if (file) {
        // En un escenario real, aquí subirías el archivo a tu servidor o a un servicio de almacenamiento
        // y obtendrías una URL. Por ahora, simularemos esto con una URL falsa.
        const fakeFileUrl = `http://example.com/${file.name}`

        const documentData: CreateDocumentDto = {
          type: type as DocumentType,
          fileUrl: fakeFileUrl
        }
        try {
          await createDocument(documentData)
          setUploadedDocuments((prev) => ({ ...prev, [type]: true }))
        } catch (error) {
          console.error(`Error uploading ${type}:`, error)
        }
      }
    }
  }

  const removeDocument = async (documentId: number, type: DocumentType) => {
    try {
      await deleteDocument(documentId)
      form.setValue(`files.${type}`, null)
      setUploadedDocuments((prev) => ({ ...prev, [type]: false }))
    } catch (error) {
      console.error(`Error deleting document ${type}:`, error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {documentTypes.map(({ type, label }) => (
            <FormField
              key={type}
              control={form.control}
              name={`files.${type}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || null)
                      }
                      disabled={uploadedDocuments[type]}
                    />
                    {documents?.find((d) => d.type === type) && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          removeDocument(
                            documents.find((d) => d.type === type)!.id!,
                            type
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Cargar Documentos</Button>
      </form>
      {documents && documents.length > 0 && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Documentos Cargados</AlertTitle>
          <AlertDescription>
            Se han cargado los siguientes documentos:
            <ul>
              {documents.map((doc) => (
                <li key={doc.id}>
                  {documentTypes.find((d) => d.type === doc.type)?.label}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
