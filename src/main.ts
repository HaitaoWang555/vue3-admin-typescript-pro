import { createApp, App } from 'vue'
import ELApp from './App.vue'
import { loadComponents, loadPlugins } from '@/core/use'
import 'windi.css'
import './styles/index.scss' // global css

// icon
import '@/icons'
// vue router
import router from '@/router'
// vue vuex
import store from '@/store'

import '@/permission'

const app: App = createApp(ELApp)

loadComponents(app)
loadPlugins(app)

// element-plus config
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
app.use(router).use(store).mount('#app')
