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

//test
import { ChevronDownIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface SubmenuItemProps {
  label: string
  to?: string
  onClick: () => void
  showSubmenu: boolean
  children: ReactNode
}
//test

export const MenuList = () => {
  const { login } = useAuth()

  const commonClasses = 'flex items-center gap-3 rounded-lg px-3 py-2'

  //test
  const [showTramitesSubmenu, setShowTramitesSubmenu] = useState(false)
  const [showAvaluosSubmenu, setShowAvaluosSubmenu] = useState(false)

  //test
  //const SubmenuItem = ({ label, onClick, showSubmenu, children }) => (
  const SubmenuItem: React.FC<SubmenuItemProps> = ({
    label,
    to,
    onClick,
    showSubmenu,
    children
  }) => (
    <div className="relative">
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${commonClasses} w-full flex justify-between items-center text-left ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`
          }
        >
          {label}
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          className={`${commonClasses} w-full flex justify-between items-center text-left`}
        >
          {label}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${showSubmenu ? 'rotate-180' : ''}`}
          />
        </button>
      )}
      {showSubmenu && <div className="ml-4 mt-2 space-y-2">{children}</div>}
    </div>
  )

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

          <div className="flex items-center cursor-pointer">
            {/* <InboxIcon className="h-4 w-4 mr-2" /> */}
            <SubmenuItem
              label="Trámites"
              onClick={() => setShowTramitesSubmenu(!showTramitesSubmenu)}
              showSubmenu={showTramitesSubmenu}
            >
              <SubmenuItem
                label="Avalúos y Catastros"
                onClick={() => setShowAvaluosSubmenu(!showAvaluosSubmenu)}
                showSubmenu={showAvaluosSubmenu}
              >
                <NavLink
                  to="/my-requests"
                  className={({ isActive }) =>
                    `${commonClasses} flex items-center ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`
                  }
                >
                  <InboxIcon className="h-4 w-4 mr-2" />
                  Mis Trámites
                </NavLink>
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    `${commonClasses} flex items-center ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`
                  }
                >
                  <InboxIcon className="h-4 w-4 mr-2" />
                  Nuevo Trámite
                </NavLink>
                <NavLink
                  to="/upload-documents"
                  className={({ isActive }) =>
                    `${commonClasses} flex items-center ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`
                  }
                >
                  <InboxIcon className="h-4 w-4 mr-2" />
                  Adjuntar Requisitos
                </NavLink>
              </SubmenuItem>
            </SubmenuItem>
          </div>

          {/* <NavLink
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
          </NavLink> */}

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
