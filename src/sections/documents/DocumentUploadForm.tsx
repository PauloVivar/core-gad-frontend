import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  DocumentType,
  CreateDocumentDto
} from '@/modules/documents/domain/Document'
import { useDocuments } from '@/sections/shared/hooks/useDocuments'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Paperclip, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { useRequests } from '../shared/hooks/useRequests'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB

const documentTypes = [
  {
    type: DocumentType.CEDULA,
    label: 'Cédula',
    description: 'Documento de identidad'
  },
  {
    type: DocumentType.PAPELETA_VOTACION,
    label: 'Papeleta de Votación',
    description: 'Comprobante de sufragio'
  },
  {
    type: DocumentType.FORMULARIO,
    label: 'Formulario',
    description: 'Formulario de solicitud'
  },
  {
    type: DocumentType.ESCRITURA,
    label: 'Escritura',
    description: 'Documento legal de propiedad'
  },
  {
    type: DocumentType.COMPROBANTE_PAGO,
    label: 'Comprobante de Pago',
    description: 'Recibo de pago de trámite'
  },
  {
    type: DocumentType.CERTIFICADO_NO_ADEUDAR,
    label: 'Certificado de No Adeudar',
    description: 'Comprobante de no tener deudas pendientes'
  }
]

const schema = z.object({
  files: z.record(
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        `El archivo no debe superar los 20MB`
      )
      .nullable()
  )
})

type FormValues = z.infer<typeof schema>

interface DocumentUploadFormProps {
  requestId: number
}

export function DocumentUploadForm({ requestId }: DocumentUploadFormProps) {
  const navigate = useNavigate()
  const { createDocument, deleteDocument, documents } = useDocuments(requestId)
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<DocumentType, boolean>
  >({} as Record<DocumentType, boolean>)
  const fileInputRefs = useRef<Record<DocumentType, HTMLInputElement | null>>(
    {} as Record<DocumentType, HTMLInputElement | null>
  )

  //test
  const { deleteRequest } = useRequests()

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
        const documentData: CreateDocumentDto = {
          type: type as DocumentType,
          fileUrl: URL.createObjectURL(file)
        }
        try {
          await createDocument(documentData)
          setUploadedDocuments((prev) => ({ ...prev, [type]: true }))
          toast({
            title: 'Documento cargado',
            description: `El documento ${documentTypes.find((d) => d.type === type)?.label} ha sido cargado exitosamente.`
          })
        } catch (error) {
          console.error(`Error uploading ${type}:`, error)
          toast({
            title: 'Error',
            description: `Hubo un problema al cargar el documento ${documentTypes.find((d) => d.type === type)?.label}.`,
            variant: 'destructive'
          })
        }
      }
    }
  }

  const removeDocument = async (documentId: number, type: DocumentType) => {
    try {
      await deleteDocument(documentId)
      form.setValue(`files.${type}`, null)
      setUploadedDocuments((prev) => ({ ...prev, [type]: false }))
      toast({
        title: 'Documento eliminado',
        description: `El documento ${documentTypes.find((d) => d.type === type)?.label} ha sido eliminado.`
      })
    } catch (error) {
      console.error(`Error deleting document ${type}:`, error)
      toast({
        title: 'Error',
        description: `Hubo un problema al eliminar el documento ${documentTypes.find((d) => d.type === type)?.label}.`,
        variant: 'destructive'
      })
    }
  }

  const handleFileChange = (type: DocumentType, file: File | null) => {
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        form.setValue(`files.${type}`, file)
        toast({
          title: 'Archivo seleccionado',
          description: `${file.name} ha sido seleccionado para ${documentTypes.find((d) => d.type === type)?.label}.`
        })
      } else {
        toast({
          title: 'Error',
          description: 'El archivo no debe superar los 20MB',
          variant: 'destructive'
        })
      }
    }
  }

  const getFileFormat = (file: File | null) => {
    if (!file) return '-'
    return file.name.split('.').pop()?.toUpperCase() || 'Desconocido'
  }

  const getFileSize = (file: File | null) => {
    if (!file) return '-'
    const sizeInMB = file.size / (1024 * 1024)
    return sizeInMB.toFixed(2) + ' MB'
  }

  const handleBack = () => {
    navigate('/requests')
  }

  const handleCancel = async () => {
    try {
      await deleteRequest(requestId)
      toast({
        title: 'Solicitud cancelada',
        description: 'La solicitud ha sido cancelada y eliminada.'
      })
      navigate('/requests')
    } catch (error) {
      console.error('Error al cancelar la solicitud:', error)
      toast({
        title: 'Error',
        description:
          'No se pudo cancelar la solicitud. Por favor, inténtelo de nuevo.',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Table>
          <TableCaption>Documentos Requeridos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentTypes.map(({ type, label, description }) => (
              <TableRow key={type}>
                <TableCell>{label}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>
                  {getFileFormat(form.watch(`files.${type}`))}
                </TableCell>
                <TableCell>
                  {getFileSize(form.watch(`files.${type}`))}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileChange(type, e.target.files?.[0] || null)
                      }
                      ref={(el) => (fileInputRefs.current[type] = el)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRefs.current[type]?.click()}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    {form.watch(`files.${type}`) && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          removeDocument(
                            documents?.find((d) => d.type === type)?.id!,
                            type
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <Button type="submit">Guardar Documentos</Button>
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="mr-2"
            >
              Atrás
            </Button>
            <Button type="button" variant="destructive" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </div>
      </form>

      {documents && documents.length > 0 && (
        <Alert className="text-yellow-700 mt-4">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="font-semibold">Documentos Cargados</AlertTitle>
          <AlertDescription className="m-2">
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
