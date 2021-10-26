// use components
import {
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'

// use components
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
import Hamburger from '@/components/Hamburger/index.vue' // Hamburger component
import { App } from 'vue'

const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]

export const loadPlugins = (app: App): void => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export const loadComponents = (app: App): void => {
  app.component('SvgIcon', SvgIcon)
  app.component('Hamburger', Hamburger)
}
