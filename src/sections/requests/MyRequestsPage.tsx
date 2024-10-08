import { Paginator } from '@/components/paginator'
import { RequestList } from './RequestList'
import { Layout } from '@/components/Layout'
import { useParams } from 'react-router-dom'
import { useRequests } from '../shared/hooks/useRequests'

export function MyRequestsPage() {
  const { page: pageParam } = useParams()
  const page = pageParam ? parseInt(pageParam, 10) : 0
  const { getRequestsQuery } = useRequests()
  const { data, isLoading, error } = getRequestsQuery(page)

  if (isLoading) return <div>Cargando...</div>
  if (error)
    return (
      <div>Error al cargar las solicitudes: {(error as Error).message}</div>
    )

  const { content: requests = [], ...paginationInfo } = data || { content: [] }

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
              <Paginator url="requests/page" paginator={paginationInfo} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
