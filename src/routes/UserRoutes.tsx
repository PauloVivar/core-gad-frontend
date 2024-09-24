import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/sections/shared/hooks'
//import { Navbar } from '../components/Navbar';
import {
  TermsPage,
  Home,
  UsersPage,
  SelectRegisterPage,
  CreditTitlesPage
} from '@/sections'
import { TransactionsPage } from '@/sections/transactions/page'

function UserRoutes() {
  const { login } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/page/:page" element={<UsersPage />} />

        {!login.isAdmin || (
          <>
            <Route
              path="users/selectRegister"
              element={<SelectRegisterPage />}
            />
            <Route path="users/edit/:id" element={<SelectRegisterPage />} />
            <Route path="terms" element={<TermsPage />} />
          </>
        )}
        <Route path="titulos-de-credito" element={<CreditTitlesPage />} />
        <Route path="mis-transacciones" element={<TransactionsPage />} />
        {/* <Route path='/' element={<Navigate to='/users' />} /> */}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export { UserRoutes }
