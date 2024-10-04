//import { CadastralRecord } from '../domain/CadastralRecord';
import { CadastralRecordRepository } from '../domain/CadastralRecordRepository'
import { cadastralRecordsApi } from '@/interceptors/cadastral-records'

export function createApiCadastralRecordRepository(): CadastralRecordRepository {
  return {
    findAll: async (page: number) => {
      const response = await cadastralRecordsApi.get(`/page/${page}`)
      return response.data
    },
    findById: async (cadastralCode: string) => {
      const response = await cadastralRecordsApi.get(`/${cadastralCode}`)
      return response.data
    },
    findByCitizenId: async (citizenId: number) => {
      const response = await cadastralRecordsApi.get(`/citizen/${citizenId}`)
      return response.data
    }
  }
}
