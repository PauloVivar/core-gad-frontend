import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers, useAuth } from '@/sections/shared/hooks'

import { Layout } from '../../components/Layout'
import { UserForm, UsersList } from '.'
import { Paginator } from '@/components/Paginator'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

function Page() {
  //paginación
  const { page } = useParams()
  const {
    users,
    userSelected, //ojo
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    handlerCloseForm, //ojo
    getUsers
  } = useUsers()

  const { login } = useAuth()

  useEffect(() => {
    getUsers(page)
  }, [, page])

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

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Usuarios</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            {!visibleForm || (
              <UserForm
                userSelected={userSelected}
                handlerCloseForm={handlerCloseForm}
              />
            )}

            <div className="text-left">
              {visibleForm || !login.isAdmin || (
                <Button className="mb-2" onClick={handlerOpenForm}>
                  Agregar Usuario
                </Button>
              )}
              {users.length === 0 ? (
                <Alert variant="destructive">
                  <ExclamationCircleIcon className="size-5 text-red-500" />
                  <AlertTitle>Atención!</AlertTitle>
                  <AlertDescription>
                    No hay usuarios en el sistema, por favor crear un nuevo
                    registro.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <UsersList />
                  <Paginator url="/users/page" paginator={paginator} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { Page }
