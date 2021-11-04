/* eslint-disable @typescript-eslint/no-explicit-any */
import { withInstall } from 'element-plus/lib/utils/with-install'

import Hamburger from './Hamburger/index.vue'
import SvgIcon from './SvgIcon/index.vue'
import ProDialog from './ProDialog/index.vue'
import ProSearchForm from './ProSearchForm/index.vue'
import ProForm from './ProForm/index.vue'
import ProTable from './ProTable/index.vue'
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
  row?: number
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  slot?: string
  formSpan?: number
  formXs?: number
  formSm?: number
  formMd?: number
  formLg?: number
  formXl?: number
  formSlot?: string
  prop?: FormItemRule[]
  attrs?: Record<string, any>
  title: string
  placeholder?: string
  inpuType?: string
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

export const THamburger = withInstall(Hamburger)
export const TSvgIcon = withInstall(SvgIcon)
export const TProDialog = withInstall(ProDialog)
export const TProSearchForm = withInstall(ProSearchForm)
export const TProForm = withInstall(ProForm)
export const TProTable = withInstall(ProTable)
