import { App } from 'vue'
import waves from './waves'

const install = function (Vue: App) {
  Vue.directive('waves', waves)
}

// @ts-ignore
if (window.Vue) {
  // @ts-ignore
  window.waves = waves
  // @ts-ignore
  Vue.use(install); // eslint-disable-line
}

;(waves as typeof waves & { install: (Vue: App) => void }).install = install
export default waves
