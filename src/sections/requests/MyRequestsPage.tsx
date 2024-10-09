import { Paginatior } from '@/components/paginator'
import { RequestList } from './RequestList'
import { Layout } from '@/components/Layout'
import { useSearchParams } from 'react-router-dom'
import { useRequests } from '../shared/hooks/useRequests'

export function MyRequestsPage() {
  const [searchParams] = useSearchParams()
  const pageSize = Number(searchParams.get('pageSize')) || 5
  const pageNumber = Number(searchParams.get('pageNumber')) || 1

  const { getRequestsQuery } = useRequests()
  const { data, isLoading, error } = getRequestsQuery(pageNumber)

  if (isLoading)
    return (
      <Layout>
        <div>Cargando...</div>
      </Layout>
    )
  if (error)
    return (
      <Layout>
        <div>Error al cargar las solicitudes: {(error as Error).message}</div>
      </Layout>
    )
  if (!data)
    return (
      <Layout>
        <div>No hay datos disponibles</div>
      </Layout>
    )

  // const { content: requests, number, size: pageSize, totalPages } = data;
  const { content: requests, totalPages } = data

  const paginator = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: totalPages
  }

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Trámites en Linea</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Mis Trámites</h1>
              <RequestList requests={requests} />
              <Paginatior url="/my-requests" paginator={paginator} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
