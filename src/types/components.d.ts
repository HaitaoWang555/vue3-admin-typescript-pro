// components.d.ts
import type {
  THamburger,
  TSvgIcon,
  TPageHeader,
  TProDialog,
  TProSearchForm,
  TProForm,
  TProTable,
} from '@/components/type'
import type { FiltersType } from '@/core/use'
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    component: (props: { is: Comment }) => void // https://github.com/johnsoncodehk/volar/issues/482
    SvgIcon: typeof TSvgIcon
    PageContainer: typeof TPageHeader
    Hamburger: typeof THamburger
    ProDialog: typeof TProDialog
    ProSearchForm: typeof TProSearchForm
    ProForm: typeof TProForm
    ProTable: typeof TProTable
  }
  export interface ComponentCustomProperties {
    $filters: FiltersType
  }
}
export {}
