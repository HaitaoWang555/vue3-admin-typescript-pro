/* eslint-disable @typescript-eslint/no-explicit-any */
import { withInstall } from 'element-plus/lib/utils/with-install'

import Hamburger from './Hamburger/base-hamburger.vue'
import PageContainer from './PageContainer/base-page-container.vue'
import SvgIcon from './SvgIcon/base-svg-icon.vue'
import ProDialog from './ProDialog/base-pro-dialog.vue'
import ProSearchForm from './ProSearchForm/base-pro-search-form.vue'
import ProForm from './ProForm/base-pro-form.vue'
import ProTable from './ProTable/base-pro-table.vue'
import { IDatePickerType } from 'element-plus/lib/components/date-picker/src/date-picker.type'
import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'
import type { ResponseBodyType } from '@/types/api'
import { AxiosPromise } from 'axios'

export type optionType = {
  label: string | number | undefined
  value: string | number | boolean | Record<string, any>
}
type scopedSlotsType = {
  customRender: string
  dict?: string
}

export type ProItem = {
  dataIndex: string
  valueType?: string
  optionMth?: () => AxiosPromise<ResponseBodyType<Array<Record<string, any>>>>
  optionskey?: { label: string; value: string }
  option?: Array<optionType>
  defaultOption?: Array<optionType>
  defaultValue?: any
  row?: number
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  slot?: string
  formSpan?: number
  formLabelHtml?: string
  formLabelTooltip?: string
  formItemHelp?: string
  formXs?: number
  formSm?: number
  formMd?: number
  formLg?: number
  formXl?: number
  formSlot?: string
  prop?: FormItemRule[]
  attrs?: Record<string, any>
  title?: string
  placeholder?: string
  inpuType?: string
  step?: number
  multiple?: boolean
  pickerType?: IDatePickerType
  pickerFormat?: string
  isSearch?: boolean
  isForm?: boolean
  noTable?: boolean
  fieldVisible?: boolean
  fixed?: boolean | string
  minWidth?: number | string
  width?: number | string | undefined
  align?: string
  sortable?: string | boolean
  scopedSlots?: scopedSlotsType
  isShowFormItem?: (params: Record<string, any>) => boolean
}

export const TPageHeader = withInstall(PageContainer)
export const THamburger = withInstall(Hamburger)
export const TSvgIcon = withInstall(SvgIcon)
export const TProDialog = withInstall(ProDialog)
export const TProSearchForm = withInstall(ProSearchForm)
export const TProForm = withInstall(ProForm)
export const TProTable = withInstall(ProTable)
