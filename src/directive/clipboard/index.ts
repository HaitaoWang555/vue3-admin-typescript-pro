import { App } from 'vue'
import Clipboard from './clipboard'

const install = function (Vue: App) {
  Vue.directive('Clipboard', Clipboard)
}
// @ts-ignore
if (window.Vue) {
  // @ts-ignore
  window.clipboard = Clipboard
  // @ts-ignore
  Vue.use(install); // eslint-disable-line
}

;(Clipboard as typeof Clipboard & { install: (Vue: App) => void }).install =
  install
export default Clipboard
