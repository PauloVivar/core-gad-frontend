// import React from 'react';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { TechnicalReview } from '@/modules/technical-review/domain/TechnicalReview'
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react'

import { useState } from 'react'
import { useTechnicalReviews } from '../shared/hooks/useTechnicalReviews'
import { TechnicalReviewForm } from './TechnicalReviewForm'
import Swal from 'sweetalert2'

interface TechnicalReviewListProps {
  technicalReviews: TechnicalReview[]
  requestId: number
}

export function TechnicalReviewList({
  technicalReviews,
  requestId
}: TechnicalReviewListProps) {
  const [editingReview, setEditingReview] = useState<TechnicalReview | null>(
    null
  )
  const [isCreating, setIsCreating] = useState(false)
  const {
    createTechnicalReview,
    updateTechnicalReview,
    deleteTechnicalReview
  } = useTechnicalReviews(requestId)

  const handleEdit = (review: TechnicalReview) => {
    setEditingReview(review)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setEditingReview(null)
    setIsCreating(true)
  }

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    })

    if (result.isConfirmed) {
      try {
        await deleteTechnicalReview(id)
        Swal.fire(
          'Eliminado!',
          'La revisión técnica ha sido eliminada.',
          'success'
        )
      } catch (error) {
        Swal.fire(
          'Error!',
          `Hubo un problema al eliminar la revisión técnica: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          'error'
        )
      }
    }
  }

  const handleSubmit = async (
    reviewData: Omit<
      TechnicalReview,
      'id' | 'requestId' | 'reviewerId' | 'reviewerName' | 'reviewerEmail'
    >
  ) => {
    try {
      if (isCreating) {
        await createTechnicalReview({
          ...reviewData,
          requestId
        } as TechnicalReview)
        Swal.fire('Creado!', 'La revisión técnica ha sido creada.', 'success')
      } else if (editingReview) {
        await updateTechnicalReview({
          id: editingReview.id,
          review: reviewData
        })
        Swal.fire(
          'Actualizado!',
          'La revisión técnica ha sido actualizada.',
          'success'
        )
      }
      setEditingReview(null)
      setIsCreating(false)
    } catch (error) {
      Swal.fire(
        'Error!',
        `Hubo un problema al guardar la revisión técnica: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        'error'
      )
    }
  }

  return (
    <Card className="w-full p-2">
      <Table>
        <TableCaption>Lista de revisiones técnicas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Comentarios</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {technicalReviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell>
                {new Date(review.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{review.comments}</TableCell>
              <TableCell>{review.result}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(review)}
                  variant="ghost"
                  size="icon"
                >
                  <PencilIcon className="h-4 w-4 text-zinc-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(review.id)}
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleCreate} className="mt-4">
        <PlusIcon className="h-4 w-4 mr-2" />
        Agregar Revisión Técnica
      </Button>
      <div className="w-full md:w-1/3">
        {(editingReview || isCreating) && (
          <TechnicalReviewForm
            review={editingReview || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingReview(null)
              setIsCreating(false)
            }}
          />
        )}
      </div>
    </Card>
  )
}
