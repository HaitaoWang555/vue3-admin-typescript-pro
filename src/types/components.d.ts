// components.d.ts
import { THamburger, TSvgIcon, TProDialog } from '@/components/type'
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    component: (props: { is: Comment }) => void // https://github.com/johnsoncodehk/volar/issues/482
    SvgIcon: typeof TSvgIcon
    Hamburger: typeof THamburger
    ProDialog: typeof TProDialog
  }
}
export {}
