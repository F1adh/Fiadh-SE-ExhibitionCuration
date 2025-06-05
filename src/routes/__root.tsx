import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'


import Header from '../components/Header'



import type { QueryClient } from '@tanstack/react-query'
import Footer from '@/components/Footer.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Outlet />
      
      <Footer />
    </div>
  ),
})
