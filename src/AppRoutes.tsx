import { Route, Routes } from 'react-router-dom'
import { useAuth } from './sections/shared/hooks'

import { UserRoutes } from './routes/UserRoutes'
import { Skeleton } from './components/ui/skeleton'

import { Home, NotFound } from './sections'
import { AccountRecovery, Login } from './sections/auth/pages'
import { Layout } from './components/Layout'

const AppRoutes = () => {
  const { login } = useAuth()

  if (login.isLoginLoading) {
    return (
      <div className="w-full h-screen flex flex-col space-y-3 justify-center items-center">
        <Skeleton className="h-[125px] w-[400px] rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <Skeleton className="h-4 w-[350px] bg-slate-200" />
          <Skeleton className="h-4 w-[100px] bg-slate-200" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {login.isAuth ? (
            <Route path="*" element={<UserRoutes />} />
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Login />} />
              <Route path="recover-account" element={<AccountRecovery />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path='/*' element={<Navigate to='/login' />} /> */}
            </>
          )}
        </Route>
      </Routes>
    </>
  )
}

export { AppRoutes }
