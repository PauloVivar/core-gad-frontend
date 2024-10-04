// "use client"

import React from 'react'
import { RequestList } from './RequestList'
import { RequestForm } from './RequestForm'
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/Layout'
import Swal from 'sweetalert2'

import { useRequests } from '@/sections/shared/hooks/useRequests'
import {
  CreateRequestDto,
  RequestEntity
} from '@/modules/requests/domain/RequestEntity'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../shared/hooks'

export function RequestsPage() {
  const [showForm, setShowForm] = React.useState(false)

  const [lastCreatedRequestId, setLastCreatedRequestId] = useState<
    number | null
  >(null)
  const navigate = useNavigate()
  const { createRequest } = useRequests()
  const { login } = useAuth()

  const handleCreateRequest = async (
    formData: Omit<CreateRequestDto, 'citizenId'>
  ) => {
    if (!login.user?.id) {
      Swal.fire('Error', 'Usuario no autenticado', 'error')
      return
    }

    const requestData: CreateRequestDto = {
      ...formData,
      citizenId: login.user.id
    }

    try {
      const newRequest: RequestEntity = await createRequest(requestData)
      setLastCreatedRequestId(newRequest.id)
      setShowForm(false)
      Swal.fire({
        title: '¡Éxito!',
        text: 'La solicitud ha sido creada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      console.error('Error al crear la solicitud:', error)
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al crear la solicitud. Por favor, intente nuevamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  const handleNextClick = () => {
    if (lastCreatedRequestId) {
      navigate('/upload-documents', {
        state: { requestId: lastCreatedRequestId }
      })
    }
  }

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Trámites en Linea</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">
                Gestión de Solicitudes
              </h1>

              <Button onClick={() => setShowForm(!showForm)} className="mb-4">
                {showForm ? 'Cerrar Formulario' : 'Nueva Solicitud'}
              </Button>
              <Button
                onClick={handleNextClick}
                disabled={!lastCreatedRequestId}
                className="mb-4"
              >
                Siguiente
              </Button>

              {showForm && <RequestForm onSubmit={handleCreateRequest} />}
              <RequestList />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
