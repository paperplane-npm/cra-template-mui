import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/layout/MainLyout'
import FullpageLoading from '@/components/loading/FullpageLoading'
import HomePage from '@/pages'
import Page404 from '@/pages/fallbacks/page-404'

import lazy from './lazy'

export const routerConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },

      { path: '/check-zustand', element: lazy(() => import('@/pages/check-zustand')) },
      { path: '/check-emotion', element: lazy(() => import('@/pages/check-emotion')) },
      { path: '/check-sass', element: lazy(() => import('@/pages/check-sass')) },
      { path: '/check-toast', element: lazy(() => import('@/pages/check-toast')) },
      { path: '/check-request', element: lazy(() => import('@/pages/check-request')) },

      { path: '*', element: <Page404 /> },
    ],
  },
]

const router = createBrowserRouter(routerConfig, { basename: process.env.PUBLIC_URL })

export default function RouterEntry(): RC {
  // 注意此处的 fallbackElement 仅适用于 loader() 加载过程
  return <RouterProvider router={router} fallbackElement={<FullpageLoading />} />
}
