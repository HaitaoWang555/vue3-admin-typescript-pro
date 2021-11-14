import { RouteRecordRaw, RouterView } from 'vue-router'

const tableRouter: RouteRecordRaw = {
  path: 'table',
  component: RouterView,
  name: 'Table',
  meta: { title: 'Table' },
  redirect: '/components/table/inline-edit-table',
  children: [
    {
      path: 'inline-edit-table',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/table/inline-edit-table.vue'
        ),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' },
    },
    {
      path: 'complex-table',
      name: 'ComplexTable',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/table/complex-table.vue'
        ),
      meta: { title: 'ComplexTable' },
    },
  ],
}

export default tableRouter
