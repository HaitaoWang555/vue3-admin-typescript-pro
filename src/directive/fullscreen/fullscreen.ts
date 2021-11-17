/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addClass,
  hasClass,
  removeClass,
  getScrollBarWidth,
} from '@/utils/index'
import { DirectiveBinding } from 'vue'

const scrollBarWidth = getScrollBarWidth()
let elFull: HTMLElement, scrollY: number

interface HTMLElementFullscreen extends HTMLElement {
  _v_fullscreen_normal: any
  _v_fullscreen_big: any
}

function handleClick(el: HTMLElementFullscreen) {
  if (hasClass(el, 'content-screenfull')) {
    removeClass(el, 'content-screenfull')
    document.documentElement.style.overflow = ''
    document.body.style.borderRight = ''
    window.scrollTo(0, scrollY)
    const callback = el._v_fullscreen_normal
    callback && callback() // eslint-disable-line
  } else {
    scrollY = window.scrollY
    addClass(el, 'content-screenfull')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.borderRight = scrollBarWidth + 'px solid transparent'
    const callback = el._v_fullscreen_big
    callback && callback() // eslint-disable-line
  }
}

export default {
  mounted(el: HTMLElementFullscreen, binding: DirectiveBinding): void {
    switch (binding.arg) {
      case 'top':
        elFull = document.createElement('i')
        elFull.className = 'el-icon-full-screen absolute-wrap'
        elFull.style.top = binding.value + 'px'
        addClass(el, 'relative-wrap')
        el.appendChild(elFull)
        elFull.addEventListener(
          'click',
          () => {
            handleClick(el)
          },
          false
        )
        break
      case 'big':
        el._v_fullscreen_big = binding.value
        break
      case 'normal':
        el._v_fullscreen_normal = binding.value
        break

      default:
        break
    }
  },
  unmounted(el: HTMLElementFullscreen): void {
    if (!elFull) return
    elFull.removeEventListener(
      'click',
      () => {
        handleClick(el)
      },
      false
    )
    ;(elFull as any) = null
  },
}
