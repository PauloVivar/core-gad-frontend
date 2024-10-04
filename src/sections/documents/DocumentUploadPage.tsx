import { useLocation } from 'react-router-dom'
import { DocumentUploadForm } from './DocumentUploadForm'

export function DocumentUploadPage() {
  const location = useLocation()
  const requestId = location.state?.requestId

  if (!requestId) {
    return <div>Error: No se proporcionó un ID de solicitud.</div>
  }

  return (
    <div>
      <h1>Cargar Documentos para la Solicitud #{requestId}</h1>
      <DocumentUploadForm requestId={requestId} />
    </div>
  )
}
