import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

/* Router Modules */
import componentsPage from './modules/components-page'
import errorRouter from './modules/error-page'
import nestedRouter from './modules/nested'
import exampleRouter from './modules/example'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/components/Redirect/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },

  exampleRouter,
  componentsPage,
  errorRouter,
  nestedRouter,
  {
    path: '/icons',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'IconsViews',
        component: () =>
          import(/* webpackChunkName: "icon" */ '@/views/icons/index.vue'),
        meta: { title: 'icons', icon: 'icon' },
      },
    ],
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/HaitaoWang555/vue3-admin-template',
        component: () => null,
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true },
  },
  { path: '/:pathMatch(.*)*', redirect: '/error/404', meta: { hidden: true } },
]

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: constantRoutes,
})

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

export default router

export function resetRouter(): void {
  const newRouter = createRouter({
    history,
    routes: constantRoutes,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
