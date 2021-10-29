import { createApp, App } from 'vue'
import ELApp from './App.vue'
import { loadComponents, loadPlugins } from '@/core/use'
import 'windi.css'
import './styles/index.scss'
// vue router
import router from '@/router'
// vue vuex
import store from '@/store'

import '@/permission' // global css

// icon
import(/* webpackChunkName: "icon" */ '@/icons/index')

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app: App = createApp(ELApp)

loadComponents(app)
loadPlugins(app)

// element-plus config
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
app.use(router).use(store).mount('#app')
