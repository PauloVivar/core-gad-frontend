import { useQuery } from '@tanstack/react-query'
import { createApiCadastralRecordRepository } from '../../../modules/cadastral-records/infrastructure/ApiCadastralRecordRepository'
import {
  getCadastralRecords,
  getCadastralRecordsByCitizenId
} from '../../../modules/cadastral-records/application'
import { useAuth } from '@/sections/shared/hooks/useAuth'

const repository = createApiCadastralRecordRepository()

export function useCadastralRecords(page: number = 0) {
  const fetchCadastralRecords = useQuery({
    queryKey: ['cadastralRecords', page],
    queryFn: () => getCadastralRecords(repository)(page)
  })

  return {
    cadastralRecords: fetchCadastralRecords.data?.content,
    totalPages: fetchCadastralRecords.data?.totalPages,
    totalElements: fetchCadastralRecords.data?.totalElements,
    isLoading: fetchCadastralRecords.isLoading,
    error: fetchCadastralRecords.error
  }
}

export function useCadastralRecordsByCitizen() {
  const { login } = useAuth()
  const citizenId = login.user?.id

  const fetchCadastralRecords = useQuery({
    queryKey: ['cadastralRecordsByCitizen', citizenId],
    queryFn: () => getCadastralRecordsByCitizenId(repository)(citizenId!),
    enabled: !!citizenId
  })

  return {
    cadastralRecords: fetchCadastralRecords.data,
    isLoading: fetchCadastralRecords.isLoading,
    error: fetchCadastralRecords.error
  }
}
