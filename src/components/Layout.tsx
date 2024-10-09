import { Outlet } from 'react-router-dom'
import { TopNavigation } from './Navigation/Header'
import { TopNavigator } from './Navigation/TopNavigator'

export const Layout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <TopNavigation />

      <div className="flex flex-col">
        <TopNavigator />
        <main className="flex flex-1 flex-col gap-4 m-2 p-2 lg:gap-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
