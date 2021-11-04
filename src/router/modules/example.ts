/** When your routing table is too long, you can split it into small modules **/
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const exampleRouter: RouteRecordRaw = {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/table/index.vue'
        ),
      meta: { title: 'Table', icon: 'table' },
    },
    {
      path: 'complex-table',
      name: 'ComplexTable',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/table/complex-table.vue'
        ),
      meta: { title: 'ComplexTable', icon: 'table' },
    },
    {
      path: 'form',
      name: 'Form',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/form/index.vue'
        ),
      meta: { title: 'Form', icon: 'form' },
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/tree/index.vue'
        ),
      meta: { title: 'Tree', icon: 'tree' },
    },
  ],
}

export default exampleRouter
