import { Document } from '../../documents/domain/Document'

export interface RequestEntity {
  id: number
  entryDate: Date
  endDate: Date
  type: RequestType
  status: RequestStatus
  citizenId: number
  cadastralCode: string
  assignedToUserId: number | null
  documents: Document[] | null
}

export enum RequestStatus {
  INGRESADO = 'INGRESADO',
  EN_REVISION = 'EN_REVISION',
  PENDIENTE_SUBSANACION = 'PENDIENTE_SUBSANACION',
  RECHAZADO = 'RECHAZADO',
  APROBADO = 'APROBADO'
}

export enum RequestType {
  FICHA_CATASTRAL = 'FICHA_CATASTRAL',
  CERTIFICADO_FRACCIONAMIENTO = 'CERTIFICADO_FRACCIONAMIENTO'
}

// Nuevo tipo para la creación de solicitudes
export type CreateRequestDto = {
  type: RequestType
  citizenId: number
  cadastralCode: string
}
