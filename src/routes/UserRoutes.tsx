import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/sections/shared/hooks'
//import { Navbar } from '../components/Navbar';
import {
  Home,
  SelectRegisterPage,
  CreditTitlesPage,
  RequestsPage,
  MyRequestsPage
} from '@/sections'
import { PaymentsProvider } from '@/sections/payments/payments-context'
import { TransactionsPage } from '@/sections/transactions/page'
import { PaymentPage } from '@/sections/payments/page'
import { DocumentUploadPage } from '@/sections/documents'

function UserRoutes() {
  const { login } = useAuth()

  return (
    <>
      <PaymentsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/upload-documents" element={<DocumentUploadPage />} />
          <Route path="my-requests" element={<MyRequestsPage />} />

          {!login.isAdmin || (
            <>
              <Route
                path="users/selectRegister"
                element={<SelectRegisterPage />}
              />
              <Route path="users/edit/:id" element={<SelectRegisterPage />} />
            </>
          )}
          <Route path="titulos-de-credito" element={<CreditTitlesPage />} />
          <Route path="pagos" element={<PaymentPage />} />
          <Route path="mis-transacciones" element={<TransactionsPage />} />
          {/* <Route path='/' element={<Navigate to='/users' />} /> */}
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </PaymentsProvider>
    </>
  )
}

export { UserRoutes }
