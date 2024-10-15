import { Paginatior } from '@/components/paginator'
import { RequestList } from './RequestList'
import { useSearchParams } from 'react-router-dom'
import { useRequests } from '../shared/hooks/useRequests'

import { useState } from 'react'
import { useTechnicalReviews } from '../shared/hooks/useTechnicalReviews'
import { useDocuments } from '../shared/hooks/useDocuments'
import { TechnicalReviewList } from '../technical-review/TechnicalReviewList'
import { DocumentUploadForm } from '../documents/DocumentUploadForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { RequestEntity } from '../../modules/requests/domain/RequestEntity'
import { FormValues, RequestFormEdit } from './RequestFormEdit'

export function MyRequestsPage() {
  const [searchParams] = useSearchParams()
  const pageSize = Number(searchParams.get('pageSize')) || 5
  const pageNumber = Number(searchParams.get('pageNumber')) || 1

  const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
    null
  )
  const [openAccordion, setOpenAccordion] = useState<string>('requests')

  const { getRequestsQuery, updateRequest } = useRequests()
  const { data, isLoading, error } = getRequestsQuery(pageNumber)

  const { technicalReviews, isLoading: isLoadingReviews } = useTechnicalReviews(
    selectedRequest?.id ?? 0
  )

  // const { documents, isLoading: isLoadingDocuments } = useDocuments(
  //   selectedRequest?.id ?? 0
  // )
  const { isLoading: isLoadingDocuments } = useDocuments(
    selectedRequest?.id ?? 0
  )

  if (isLoading) return <div>Cargando...</div>
  if (error)
    return (
      <div>Error al cargar las solicitudes: {(error as Error).message}</div>
    )
  if (!data) return <div>No hay datos disponibles</div>

  const { content: requests, totalPages } = data

  const paginator = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: totalPages
  }

  //test
  const handleEdit = (request: RequestEntity) => {
    setSelectedRequest(request)
    setOpenAccordion('editRequest')
  }

  const handleUpdateRequest = async (formData: FormValues) => {
    if (!selectedRequest) return

    const updatedRequestData = {
      id: selectedRequest.id,
      request: {
        status: formData.status,
        type: formData.type,
        cadastralCode: formData.cadastralCode
      }
    }
    await updateRequest(updatedRequestData)
  }
  //test

  return (
    <div>
      <div className="flex items-center">
        <h1 className="font-bold m-4 text-lg md:text-2xl">Trámites en Linea</h1>
      </div>
      <div className="w-full h-full flex flex-1 justify-center items-center rounded-lg border border-dashed shadow-sm">
        <div className="w-full flex flex-col items-center gap-1 px-6">
          <h2 className="font-semibold text-2xl">Mis Trámites</h2>

          <Accordion
            type="single"
            value={openAccordion}
            onValueChange={setOpenAccordion}
            className="w-full"
          >
            <AccordionItem value="requests">
              <AccordionTrigger className="text-amber-700">
                Lista de Solicitudes
              </AccordionTrigger>
              <AccordionContent>
                <RequestList requests={requests} onEdit={handleEdit} />
                <Paginatior url="/my-requests" paginator={paginator} />
              </AccordionContent>
            </AccordionItem>

            {selectedRequest && (
              <>
                <AccordionItem value="editRequest">
                  <AccordionTrigger className="text-amber-700">
                    Editar Solicitud
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    {selectedRequest && (
                      <RequestFormEdit
                        selectedRequest={selectedRequest}
                        onSubmit={handleUpdateRequest}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technicalReviews">
                  <AccordionTrigger className="text-amber-700">
                    Revisiones Técnicas
                  </AccordionTrigger>
                  <AccordionContent>
                    {isLoadingReviews ? (
                      <div>Cargando revisiones técnicas...</div>
                    ) : (
                      <TechnicalReviewList
                        technicalReviews={technicalReviews?.content ?? []}
                        requestId={selectedRequest?.id ?? 0}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents">
                  <AccordionTrigger className="text-amber-700">
                    Documentos
                  </AccordionTrigger>
                  <AccordionContent>
                    {isLoadingDocuments ? (
                      <div>Cargando documentos...</div>
                    ) : (
                      <DocumentUploadForm requestId={selectedRequest.id} />
                    )}
                  </AccordionContent>
                </AccordionItem>
              </>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
