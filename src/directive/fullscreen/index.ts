import { App } from 'vue'
import fullscreen from './fullscreen'

const install = function (Vue: App) {
  Vue.directive('fullscreen', fullscreen)
}
// @ts-ignore
if (window.Vue) {
  // @ts-ignore
  window.fullscreen = fullscreen
  // @ts-ignore
  Vue.use(install); // eslint-disable-line
}

;(fullscreen as typeof fullscreen & { install: (Vue: App) => void }).install =
  install
export default fullscreen
