/** When your routing table is too long, you can split it into small modules **/
import { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/base-layout.vue'

const exampleRouter: RouteRecordRaw = {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'el-icon-s-help' },
  children: [],
}

export default exampleRouter
