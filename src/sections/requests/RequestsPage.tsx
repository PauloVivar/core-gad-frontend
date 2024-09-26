// "use client"

import React from 'react'
import { RequestList } from './RequestList'
import { RequestForm } from './RequestForm'
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/Layout'

export function RequestsPage() {
  const [showForm, setShowForm] = React.useState(false)

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Trámite Ficha Catastral
        </h1>
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
              {showForm && <RequestForm />}
              <RequestList />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
