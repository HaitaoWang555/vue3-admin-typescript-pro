import { RouteRecordRaw, RouterView } from 'vue-router'

const formRouter: RouteRecordRaw = {
  path: 'form',
  component: RouterView,
  name: 'ExampleForm',
  meta: { title: 'Form' },
  redirect: '/example/form/base-form',
  children: [
    {
      path: 'base-form',
      name: 'ExampleBaseForm',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/form/base-form.vue'
        ),
      meta: { title: 'Base Form' },
    },
    {
      path: 'step-form',
      name: 'ExampleStepForm',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/form/step-form.vue'
        ),
      meta: { title: 'Step Form' },
    },
    {
      path: 'advanced-form',
      name: 'ExampleAdvancedForm',
      component: () =>
        import(
          /* webpackChunkName: "example" */ '@/views/example/form/advanced-form.vue'
        ),
      meta: { title: 'Advanced Form' },
    },
  ],
}

export default formRouter
