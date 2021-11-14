import { getStatus } from '@/api/article'
import type { ProItem } from '@/components/type'
const columnList: ProItem[] = [
  {
    dataIndex: 'id',
    width: 80,
    title: 'ID',
    sortable: 'custom',
  },
  {
    dataIndex: 'timestamp',
    width: 180,
    title: 'Date',
    scopedSlots: { customRender: 'date' },
    valueType: 'date-picker',
    attrs: {
      type: 'date',
      format: 'YYYY-MM-DD HH-mm-ss',
      placeholder: '请选择时间',
    },
    isSearch: true,
    isForm: true,
    xl: 6,
    prop: [
      {
        type: 'date',
        required: true,
        message: 'timestamp is required',
        trigger: 'change',
      },
    ],
  },
  {
    dataIndex: 'title',
    width: undefined,
    minWidth: 450,
    align: 'left',
    title: 'Title',
    scopedSlots: { customRender: 'title' },
    valueType: 'input',
    isSearch: true,
    xl: 6,
    isForm: true,
    prop: [{ required: true, message: 'title is required', trigger: 'blur' }],
  },
  {
    dataIndex: 'author',
    width: 120,
    title: 'Author',
  },
  {
    dataIndex: 'reviewer',
    width: 120,
    title: 'Reviewer',
  },
  {
    dataIndex: 'importance',
    width: 100,
    title: 'Imp',
    scopedSlots: { customRender: 'importance' },
    valueType: 'select',
    option: [
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
    ],
    isSearch: true,
    xl: 6,
    isForm: true,
    formSlot: 'importance',
  },
  {
    dataIndex: 'status',
    width: 110,
    title: 'Status',
    scopedSlots: { customRender: 'status' },
    valueType: 'select',
    option: [
      {
        label: 'published',
        value: 'published',
      },
      {
        label: 'draft',
        value: 'draft',
      },
      {
        label: 'deleted',
        value: 'deleted',
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'pageviews',
    width: 100,
    title: 'Readings',
  },
  {
    dataIndex: 'type',
    width: 110,
    title: 'Type',
    valueType: 'select',
    option: [],
    optionMth: getStatus,
    optionskey: {
      label: 'displayName',
      value: 'key',
    },
    isSearch: true,
    xl: 6,
    noTable: true,
    isForm: true,
    prop: [{ required: true, message: 'type is required', trigger: 'change' }],
  },
  {
    dataIndex: 'remark',
    title: 'Remark',
    valueType: 'input',
    inpuType: 'textarea',
    noTable: true,
    isForm: true,
  },
  {
    dataIndex: 'actions',
    fixed: 'right',
    width: 230,
    title: 'Actions',
    scopedSlots: { customRender: 'actions' },
  },
]

const typeFilter = {
  CN: 'China',
  EU: 'Eurozone',
  JP: 'Japan',
  US: 'USA',
}
const statusMap = {
  published: 'success',
  draft: 'info',
  deleted: 'danger',
}
const dict = {
  typeFilter,
  statusMap,
}

export function initDict(type: string, key: string): string {
  if (type && key) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((dict as any)[type]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (dict as any)[type][key]
    } else {
      console.error('没有设置此字典 - ' + type)
      return ''
    }
  } else {
    return ''
  }
}

export { columnList }
