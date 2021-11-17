import { RouteRecordRaw, RouterView } from 'vue-router'

const formRouter: RouteRecordRaw = {
  path: 'form',
  component: RouterView,
  name: 'Form',
  meta: { title: 'Form' },
  redirect: '/components/form/base-form',
  children: [
    {
      path: 'base-form',
      name: 'Form',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/form/base-form.vue'
        ),
      meta: { title: 'Base Form' },
    },
    {
      path: 'advanced-form',
      name: 'AdvancedForm',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/form/advanced-form.vue'
        ),
      meta: { title: 'Advanced Form' },
    },
    {
      path: 'modal-form',
      name: 'ModalForm',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/form/modal-form.vue'
        ),
      meta: { title: 'Modal Form' },
    },
    {
      path: 'linkage-form',
      name: 'LinkageForm',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/form/linkage-form.vue'
        ),
      meta: { title: 'Linkage Form' },
    },
    {
      path: 'step-form',
      name: 'StepForm',
      component: () =>
        import(
          /* webpackChunkName: "components" */ '@/views/components-page/form/step-form.vue'
        ),
      meta: { title: 'Step Form' },
    },
  ],
}

export default formRouter
