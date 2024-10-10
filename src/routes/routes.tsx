import { Route, Routes } from 'react-router-dom'
import { useAuth } from '@/sections/shared/hooks'

import { Skeleton } from '@/components/ui/skeleton'

import {
  CreditTitlesPage,
  Home,
  MyRequestsPage,
  NotFound,
  RequestsPage
} from '@/sections'
import { AccountRecovery, Login } from '@/sections/auth/pages'
import { Layout } from '@/components/Layout'
import { PaymentsProvider } from '@/sections/payments/payments-context'
import { DocumentUploadPage } from '@/sections/documents'
import { PaymentPage } from '@/sections/payments/page'
import { TransactionsPage } from '@/sections/transactions/page'

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
      <PaymentsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {login.isAuth ? (
              <>
                <Route index element={<Home />} />
                <Route path="requests" element={<RequestsPage />} />
                <Route
                  path="upload-documents"
                  element={<DocumentUploadPage />}
                />
                <Route path="my-requests" element={<MyRequestsPage />} />
                <Route
                  path="my-requests/page/:page"
                  element={<MyRequestsPage />}
                />
                <Route
                  path="titulos-de-credito"
                  element={<CreditTitlesPage />}
                />
                <Route path="pagos" element={<PaymentPage />} />
                <Route
                  path="mis-transacciones"
                  element={<TransactionsPage />}
                />
                <Route path="*" element={<NotFound />} />
                {/* <Route path='/' element={<Navigate to='/users' />} /> */}
              </>
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
      </PaymentsProvider>
    </>
  )
}

export { AppRoutes }
