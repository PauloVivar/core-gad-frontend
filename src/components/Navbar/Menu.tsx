import { Badge } from '@/components/ui/badge'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  PresentationChartBarIcon,
  ShoppingCartIcon,
  UsersIcon,
  InboxIcon
} from '@heroicons/react/24/solid'
import { useAuth } from '@/sections/shared/hooks'

export const MenuList = () => {
  const { login } = useAuth()

  const commonClasses = 'flex items-center gap-3 rounded-lg px-3 py-2'

  return (
    <>
      {/* Navbar Vertical */}
      <div className="flex-1 bg-muted overflow-y-scroll">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <HomeIcon className="h-4 w-4" />
            Inicio
            <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
              4
            </Badge>
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Consulta y Pago de Obligaciones
          </NavLink>

          <NavLink
            to="/procedures"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <InboxIcon className="h-4 w-4" />
            Tr&aacute;mites
          </NavLink>

          <NavLink
            to="/taxServices"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <UsersIcon className="h-4 w-4" />
            Servicios Tributarios
          </NavLink>
          <NavLink
            to="/citizenAttention"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <PresentationChartBarIcon className="h-4 w-4" />
            Atenci&oacute;n Ciudadana
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <PresentationChartBarIcon className="h-4 w-4" />
            Usuarios{' '}
          </NavLink>
          <NavLink
            to="/titulos-de-credito"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <PresentationChartBarIcon className="h-4 w-4" />
            Deudas pendientes
          </NavLink>
          <NavLink
            to="/mis-transacciones"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <PresentationChartBarIcon className="h-4 w-4" />
            Mis transacciones
          </NavLink>
          <NavLink
            to="/preguntas-frecuentes.pdf"
            target="_blank"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <PresentationChartBarIcon className="h-4 w-4" />
            Preguntas frecuentes
          </NavLink>

          {!login.isAdmin || (
            <>
              <NavLink
                to="/users/selectRegister"
                className={({ isActive }) =>
                  `${commonClasses} ${
                    isActive
                      ? 'bg-muted text-primary transition-all hover:text-primary'
                      : 'text-muted-foreground transition-all hover:text-primary'
                  }`
                }
              >
                <PresentationChartBarIcon className="h-4 w-4" />
                Registar Usuarios{' '}
              </NavLink>

              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  `${commonClasses} ${
                    isActive
                      ? 'bg-muted text-primary transition-all hover:text-primary'
                      : 'text-muted-foreground transition-all hover:text-primary'
                  }`
                }
              >
                <PresentationChartBarIcon className="h-4 w-4" />
                T&eacute;rminos y Codiciones{' '}
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
