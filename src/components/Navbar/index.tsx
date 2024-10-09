import { useAuth } from '@/sections/shared/hooks'

//Icons
import {
  HomeIcon,
  PresentationChartBarIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UsersIcon
} from '@heroicons/react/24/solid'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import log_azo_1 from '../../assets/log_azo_1.png'

//components
import { NewCard } from '../NewCard'
import { SearchInput } from './SearchInput'
import { UserMenu } from './UserMenu'
import {
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'

const Navbar = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Navbar Horizontal */}
    </div>
  )
}

export { Navbar }
