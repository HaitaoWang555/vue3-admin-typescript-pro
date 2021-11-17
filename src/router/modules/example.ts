/** When your routing table is too long, you can split it into small modules **/
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/base-layout.vue'
import formRouter from './example-modules/form'

const exampleRouter: RouteRecordRaw = {
  path: '/example',
  component: Layout,
  redirect: '/example/form',
  name: 'ExamplePages',
  meta: { title: 'Example', icon: 'el-icon-s-help' },
  children: [formRouter],
}

export default exampleRouter
