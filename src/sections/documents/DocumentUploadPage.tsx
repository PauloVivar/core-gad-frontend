import { useLocation } from 'react-router-dom'
import { DocumentUploadForm } from './DocumentUploadForm'
import {
  RequestEntity,
  RequestType
} from '@/modules/requests/domain/RequestEntity'
import { useEffect, useState } from 'react'
import { useRequests } from '../shared/hooks/useRequests'
import { Skeleton } from '@/components/ui/skeleton'
import { Response } from '@/modules/shared/domain/response'

export function DocumentUploadPage() {
  const location = useLocation()
  const requestId = location.state?.requestId

  //test
  const [requestType, setRequestType] = useState<RequestType | null>(null)
  const { getRequestsQuery } = useRequests()

  console.log('tipo', requestType)

  const { data, isLoading, error } = getRequestsQuery(0)

  //test
  useEffect(() => {
    if (data && !isLoading && !error && requestId) {
      const requestData = data as Response<RequestEntity>
      const request = requestData.content.find((req) => req.id === requestId)
      if (request) {
        setRequestType(request.type)
      }
    }
  }, [data, isLoading, error, requestId])

  if (!requestId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
          <p>Error: No se proporcionó un ID de solicitud.</p>
        </div>
      </div>
    )
  }

  //test
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  //test
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
          <p>Error: No se pudo cargar la información de la solicitud.</p>
        </div>
      </div>
    )
  }

  if (!requestType) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4 bg-yellow-100 text-yellow-700 rounded-lg">
          <p>No se encontró la solicitud especificada (ID: {requestId}).</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Trámites en Linea</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Mis Trámites</h1>
              <div>
                <h2>Cargar Documentos para la Solicitud #{requestId}</h2>
                <DocumentUploadForm
                  requestId={requestId}
                  requestType={requestType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
