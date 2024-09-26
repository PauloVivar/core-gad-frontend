import { NavLink } from 'react-router-dom'
import { useAuth } from '@/sections/shared/hooks'

//Icons
import {
  BellAlertIcon,
  HomeIcon,
  PresentationChartBarIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UsersIcon,
  InboxIcon
} from '@heroicons/react/24/solid'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import log_azo from '../../assets/log_azo.png'
import log_azo_1 from '../../assets/log_azo_1.png'

//components
import { NewCard } from '../NewCard'
import { SearchInput } from './SearchInput'
import { UserMenu } from './UserMenu'
import {
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface SubmenuItemProps {
  label: string
  to?: string
  onClick: () => void
  showSubmenu: boolean
  children: ReactNode
}

const Navbar = () => {
  const { login, handlerLogout } = useAuth()

  //test
  const [showTramitesSubmenu, setShowTramitesSubmenu] = useState(false)
  const [showAvaluosSubmenu, setShowAvaluosSubmenu] = useState(false)

  const commonClasses = 'flex items-center gap-3 rounded-lg px-3 py-2'
  const commonClassesMobile =
    'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2'

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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="sticky top-0 z-20">
            {/* Logo Azogues */}
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-muted ">
              <NavLink to="" className="flex items-center gap-2 font-semibold">
                {/* <InboxStackIcon className='h-6 w-6' /> */}
                <img src={log_azo} className="h-10 w-10"></img>
                <span className="">Azogues Alcaldía</span>
              </NavLink>

              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <BellAlertIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>

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

                {/* <NavLink
                  to="/procedures"
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive
                        ? 'bg-muted text-primary transition-all hover:text-primary'
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                > */}

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
                        to="/requests"
                        className={({ isActive }) =>
                          `${commonClasses} flex items-center ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`
                        }
                      >
                        <InboxIcon className="h-4 w-4 mr-2" />
                        Ficha Catastral
                      </NavLink>
                    </SubmenuItem>
                  </SubmenuItem>
                </div>

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

            {/* Card */}
            <div className="mt-auto p-4">
              <NewCard />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Horizontal */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Bars3Icon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col">
              {/* Navbar movile */}
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src={log_azo_1} className="h-8" />
                  <span className="sr-only">Azogues Alcald&iacute;a</span>
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <HomeIcon className="h-5 w-5" />
                  Inicio
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    4
                  </Badge>
                </NavLink>
                <NavLink
                  to="/payments"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Consulta y Pago de Obligaciones
                </NavLink>
                <NavLink
                  to="/procedures"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <InboxIcon className="h-5 w-5" />
                  Tr&aacute;mites
                </NavLink>
                <NavLink
                  to="/taxServices"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <UsersIcon className="h-5 w-5" />
                  Servicios Tributarios
                </NavLink>
                <NavLink
                  to="/citizenAttention"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <PresentationChartBarIcon className="h-5 w-5" />
                  Atenci&oacute;n Ciudadana
                </NavLink>

                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <PresentationChartBarIcon className="h-4 w-4" />
                  Usuarios{' '}
                </NavLink>

                {!login.isAdmin || (
                  <NavLink
                    to="/users/selectRegister"
                    className={({ isActive }) =>
                      `${commonClassesMobile} ${
                        isActive
                          ? 'bg-muted text-foreground hover:text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`
                    }
                  >
                    <PresentationChartBarIcon className="h-4 w-4" />
                    Registar Usuarios{' '}
                  </NavLink>
                )}
              </nav>

              {/* Card */}
              <div className="mt-auto">
                <NewCard />
              </div>
            </SheetContent>
          </Sheet>

          {/* Input Buscar */}
          <SearchInput />

          {/* Menu Usuario */}
          {/* <UserMenu login={login} handlerLogout={handlerLogout} /> */}

          {!login.isAuth ? (
            <div className="flex gap-3 text-zinc-700 text-sm">
              <NavLink to="/login" className="flex gap-1">
                <ArrowRightEndOnRectangleIcon className="size-5" />
                Iniciar Sesi&oacute;n
              </NavLink>
              <NavLink to="/register" className="flex gap-1">
                <UserPlusIcon className="size-5" />
                Registrarse
              </NavLink>
            </div>
          ) : (
            <UserMenu login={login} handlerLogout={handlerLogout} />
          )}
        </header>
      </div>
    </div>
  )
}

export { Navbar }
