export interface CadastralRecord {
  cadastralCode?: string
  city: string
  province: string
  country: string
  deedDate: string
  registrationDate: string
  companyDate: string
  updateDate: string
  heritageZone: string
  status: string
  documentId: string
}

// export enum DocumentType {
//   CEDULA = 'CEDULA',
//   PAPELETA_VOTACION = 'PAPELETA_VOTACION',
//   FORMULARIO = 'FORMULARIO',
//   ESCRITURA = 'ESCRITURA',
//   COMPROBANTE_PAGO = 'COMPROBANTE_PAGO',
//   CERTIFICADO_NO_ADEUDAR = 'CERTIFICADO_NO_ADEUDAR'
// }

// export interface CreateDocumentDto {
//   type: DocumentType
//   fileUrl: string
// }
