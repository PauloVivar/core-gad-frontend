import { CadastralRecordRepository } from '../domain/CadastralRecordRepository'

export const getCadastralRecords = (repository: CadastralRecordRepository) => {
  return async (page: number) => {
    return await repository.findAll(page)
  }
}

export const getCadastralRecordById = (
  repository: CadastralRecordRepository
) => {
  return async (cadastralCode: string) => {
    return await repository.findById(cadastralCode)
  }
}

export const getCadastralRecordsByCitizenId = (
  repository: CadastralRecordRepository
) => {
  return async (citizenId: number) => {
    return await repository.findByCitizenId(citizenId)
  }
}
