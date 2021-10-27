/** When your routing table is too long, you can split it into small modules **/
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const componentsRouter: RouteRecordRaw = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'componentsPages',
  meta: {
    title: 'Components',
    icon: 'el-icon-files',
  },
  children: [
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
      component: () => import('@/views/tailwind/index.vue'),
      meta: { title: 'tailwind' },
    },
  ],
}

export default componentsRouter
