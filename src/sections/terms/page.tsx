import { useEffect } from 'react'

import { Layout } from '@/components/Layout'
import { TermsList, TermForm } from '.'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTerms, useAuth } from '../shared/hooks'

function Page() {
  const {
    terms,
    termSelected, //ojo
    visibleForm,
    isLoading,
    latestTerm,
    latestTermError,

    showLatestTerm,

    handlerOpenForm,
    handlerCloseForm, //ojo
    getTerms,
    getLatestTerms
  } = useTerms()

  const { login } = useAuth()

  useEffect(() => {
    getTerms()
  }, [])

  if (isLoading) {
    return (
      <div
        className="w-[95%] absolute mt-40 top-14 flex flex-col space-y-3 justify-center items-center text-center text-slate-500 
        lg:w-[75%] lg:left-72"
      >
        <Skeleton className="h-[100px] w-[400px] rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <p className="mt-4">Cargando datos...</p>
        </div>
      </div>
    )
  }

  const renderTerms = () => {
    if (terms.length === 0) {
      return (
        <Alert variant="destructive">
          <ExclamationCircleIcon className="size-5 text-red-500" />
          <AlertTitle>Atención!</AlertTitle>
          <AlertDescription>
            No hay Términos y Condiciones en el sistema, por favor crear un
            nuevo registro.
          </AlertDescription>
        </Alert>
      )
    }

    if (showLatestTerm && latestTerm) {
      return (
        <Card>
          <CardHeader>Último Término</CardHeader>
          <CardContent>
            <p>
              <strong>ID:</strong> {latestTerm.id}
            </p>
            <p>
              <strong>Versión:</strong> {latestTerm.version}
            </p>
            <p>
              <strong>Contenido:</strong> {latestTerm.content}
            </p>
            <p>
              <strong>Fecha efectiva:</strong> {latestTerm.effectiveDate}
            </p>
          </CardContent>
        </Card>
      )
    }

    return <TermsList />
  }

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Términos y Condiciones
        </h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            {!visibleForm || (
              <TermForm
                termSelected={termSelected}
                handlerCloseForm={handlerCloseForm}
              />
            )}

            <div className="text-left">
              {visibleForm || !login.isAdmin || (
                <>
                  <Button className="mb-2" onClick={handlerOpenForm}>
                    Agregar Términos
                  </Button>
                  <Button className="mb-2 ml-2" onClick={getLatestTerms}>
                    {showLatestTerm ? 'Mostrar Todos' : 'Último Término'}
                  </Button>
                </>
              )}

              {latestTermError && (
                <Alert variant="destructive">
                  <ExclamationCircleIcon className="size-5 text-red-500" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{latestTermError}</AlertDescription>
                </Alert>
              )}

              {renderTerms()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { Page }
