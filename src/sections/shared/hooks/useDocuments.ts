import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createApiDocumentRepository } from '../../../modules/documents/infrastructure/ApiDocumentRepository'
import {
  createDocument,
  getDocumentsByRequestId,
  updateDocument,
  deleteDocument
} from '../../../modules/documents/application'
import {
  CreateDocumentDto,
  Document
} from '../../../modules/documents/domain/Document'

const repository = createApiDocumentRepository()

export function useDocuments(requestId: number) {
  const queryClient = useQueryClient()

  const documentsQuery = useQuery({
    queryKey: ['documents', requestId],
    queryFn: () => getDocumentsByRequestId(repository)(requestId)
  })

  const createDocumentMutation = useMutation<
    Document,
    Error,
    CreateDocumentDto
  >({
    mutationFn: (newDocument: CreateDocumentDto) =>
      createDocument(repository)(requestId, newDocument),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', requestId] })
    }
  })

  const updateDocumentMutation = useMutation<
    Document | null,
    Error,
    { id: number; document: Partial<Document> }
  >({
    mutationFn: ({ id, document }) =>
      updateDocument(repository)(requestId, id, document),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', requestId] })
    }
  })

  const deleteDocumentMutation = useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteDocument(repository)(requestId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', requestId] })
    }
  })

  return {
    documents: documentsQuery.data,
    isLoading: documentsQuery.isLoading,
    error: documentsQuery.error,
    createDocument: createDocumentMutation.mutate,
    updateDocument: updateDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate
  }
}
