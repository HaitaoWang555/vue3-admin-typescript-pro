// use components
import {
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'

// use components
import SvgIcon from '@/components/SvgIcon/base-svg-icon.vue' // svg component
import Hamburger from '@/components/Hamburger/base-hamburger.vue' // Hamburger component
import ProDialog from '@/components/ProDialog/base-pro-dialog.vue' // ProDialog component
import ProSearchForm from '@/components/ProSearchForm/base-pro-search-form.vue'
import ProForm from '@/components/ProForm/base-pro-form.vue'
import ProTable from '@/components/ProTable/base-pro-table.vue'
import { App } from 'vue'
import { parseTime } from '@/utils'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-infinite-scroll.css'
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
  app.component('ProDialog', ProDialog)
  app.component('ProSearchForm', ProSearchForm)
  app.component('ProForm', ProForm)
  app.component('ProTable', ProTable)
}

export type FiltersType = {
  parseTime: (value: string | number | Date, format?: string) => string | null
}

export const loadFilters = (app: App): void => {
  app.config.globalProperties.$filters = {
    parseTime(value: string | number | Date, format: string) {
      return parseTime(value, format || '{y}-{m}-{d} {h}:{i}:{s}')
    },
  }
}
