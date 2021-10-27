import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

/* Router Modules */
import componentsPage from './modules/components-page'
import errorRouter from './modules/error-page'
import nestedRouter from './modules/nested'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index.vue'),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },
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

export default router

export function resetRouter(): void {
  const newRouter = createRouter({
    history,
    routes: constantRoutes,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
