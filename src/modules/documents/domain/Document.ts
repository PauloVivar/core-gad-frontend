export interface Document {
  id: number
  type: DocumentType
  uploadDate: Date
  fileUrl: string
  requestId: number
}

export enum DocumentType {
  FORMULARIO = 'FORMULARIO',
  CEDULA = 'CEDULA',
  PAPELETA_VOTACION = 'PAPELETA_VOTACION',
  COMPROBANTE_PAGO = 'COMPROBANTE_PAGO',
  ESCRITURA = 'ESCRITURA',
  CERTIFICADO_NO_ADEUDAR = 'CERTIFICADO_NO_ADEUDAR'
}
