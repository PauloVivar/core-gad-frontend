export interface Document {
  id?: number
  type: DocumentType
  uploadDate?: Date
  fileUrl: string
  requestId: number
}

export enum DocumentType {
  CEDULA = 'CEDULA',
  PAPELETA_VOTACION = 'PAPELETA_VOTACION',
  FORMULARIO = 'FORMULARIO',
  ESCRITURA = 'ESCRITURA',
  COMPROBANTE_PAGO = 'COMPROBANTE_PAGO',
  CERTIFICADO_NO_ADEUDAR = 'CERTIFICADO_NO_ADEUDAR'
}

export interface CreateDocumentDto {
  type: DocumentType
  fileUrl: string
}
