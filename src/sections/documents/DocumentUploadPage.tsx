import { useLocation } from 'react-router-dom'
import { DocumentUploadForm } from './DocumentUploadForm'
import { Layout } from '@/components/Layout'

export function DocumentUploadPage() {
  const location = useLocation()
  const requestId = location.state?.requestId

  if (!requestId) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
            <p>Error: No se proporcionó un ID de solicitud.</p>
          </div>
        </div>
      </Layout>
    )
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
              <div>
                <h2>Cargar Documentos para la Solicitud #{requestId}</h2>
                <DocumentUploadForm requestId={requestId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
