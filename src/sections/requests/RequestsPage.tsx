// "use client"

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { RequestForm } from './RequestForm'
import { Button } from '@/components/ui/button'
import Swal from 'sweetalert2'

import {
  CreateRequestDto,
  RequestType
} from '@/modules/requests/domain/RequestEntity'
import { useRequests } from '@/sections/shared/hooks/useRequests'
import { useAuth } from '../shared/hooks'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

type FormValues = {
  type: RequestType
  cadastralCode: string
}

export function RequestsPage() {
  const [showForm, setShowForm] = useState(false)
  const [lastCreatedRequestId, setLastCreatedRequestId] = useState<
    number | null
  >(null)

  const navigate = useNavigate()

  const { createRequest } = useRequests()
  const { login } = useAuth()

  // const handleCreateRequest: FormSubmitHandler = async (formData) => {
  const handleCreateRequest = useCallback(
    async (formData: FormValues) => {
      if (!login.user?.id) {
        Swal.fire('Error', 'Usuario no autenticado', 'error')
        return
      }

      const requestData: CreateRequestDto = {
        ...formData,
        citizenId: login.user.id
      }

      try {
        const newRequest = await createRequest(requestData)
        console.log('Nueva solicitud creada:', newRequest) // depuración
        if (newRequest && typeof newRequest.id === 'number') {
          setLastCreatedRequestId(newRequest.id)
          setShowForm(false)
          Swal.fire({
            title: '¡Éxito!',
            text: `La solicitud ha sido creada exitosamente. ID: ${newRequest.id}`,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        } else {
          throw new Error('La respuesta del servidor no incluye un ID válido')
        }
      } catch (error) {
        console.error('Error al crear la solicitud:', error)
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear la solicitud. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    },
    [login.user, createRequest]
  )

  const handleNextClick = useCallback(() => {
    if (lastCreatedRequestId) {
      navigate('/upload-documents', {
        state: { requestId: lastCreatedRequestId }
      })
    }
  }, [lastCreatedRequestId, navigate])

  const handleCancel = () => {
    navigate('/requests')
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Trámites en Linea</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            <div className="container mx-auto p-4">
              <Card className="w-full mb-4">
                <CardHeader>
                  <CardTitle>Gestión de Solicitudes</CardTitle>
                  <CardDescription>
                    Ingrese un nuevo trámite en linea, haga click en "Nueva
                    Solicitud".
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 mr-4"
                  >
                    {showForm ? 'Cerrar Formulario' : 'Nueva Solicitud'}
                  </Button>
                  <Button
                    onClick={handleNextClick}
                    disabled={!lastCreatedRequestId}
                    className="mb-4"
                  >
                    Siguiente
                  </Button>
                </CardContent>
              </Card>

              {showForm && (
                <RequestForm
                  onSubmit={handleCreateRequest}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
