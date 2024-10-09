import { NavLink } from 'react-router-dom'
import { BellAlertIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components/ui/button'
import { MenuList } from '../Navbar/Menu'

import log_azo from '../../assets/log_azo.png'

export const TopNavigation = () => {
  return (
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

          <MenuList />

          {/* Card */}
          {/* <div className="mt-auto p-4"> */}
          {/*   <NewCard /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
