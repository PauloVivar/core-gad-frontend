import { Document } from '../../documents/domain/Document'

export interface RequestEntity {
  id: number
  entryDate: Date
  status: RequestStatus
  type: RequestType
  citizenId: number
  cadastralCode: string
  assignedToUserId: number
  documents: Document[]
}

export enum RequestStatus {
  INGRESADO = 'INGRESADO',
  EN_REVISION = 'EN_REVISION',
  PENDIENTE_SUBSANACION = 'PENDIENTE_SUBSANACION',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO'
}

export enum RequestType {
  FICHA_CATASTRAL = 'FICHA_CATASTRAL',
  CERTIFICADO_NO_PERTENENCIA = 'CERTIFICADO_NO_PERTENENCIA'
}
