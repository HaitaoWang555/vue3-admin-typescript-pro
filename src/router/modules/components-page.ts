/** When your routing table is too long, you can split it into small modules **/
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/base-layout.vue'
import formRouter from './components-modules/form'
import tableRouter from './components-modules/table'

const componentsRouter: RouteRecordRaw = {
  path: '/components',
  component: Layout,
  redirect: '/components/table',
  name: 'componentsPages',
  meta: {
    title: 'Components',
    icon: 'el-icon-files',
  },
  children: [
    tableRouter,
    formRouter,
    {
      path: 'tree',
      name: 'Tree',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/tree/base-tree.vue'
        ),
      meta: { title: 'Tree' },
    },
    {
      path: 'pro-dialog',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/pro-dialog-view.vue'
        ),
      name: 'pro-dialog',
      meta: { title: 'pro-dialog', noCache: true },
    },
    {
      path: 'tailwind',
      name: 'Tailwind',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/tailwind/base-tailwind.vue'
        ),
      meta: { title: 'tailwind' },
    },
    {
      path: 'tools',
      name: 'Tools',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/base-tools.vue'
        ),
      meta: { title: 'tools' },
    },
  ],
}

export default componentsRouter
