import type { ProItem } from '@/components/type'

const columnList: ProItem[] = [
  {
    dataIndex: 'id',
    title: 'ID',
    width: undefined,
    minWidth: 160,
  },
  {
    dataIndex: 'displayTime',
    width: 180,
    title: 'Date',
    scopedSlots: { customRender: 'date' },
    valueType: 'date-picker',
    attrs: {
      type: 'date',
      format: 'YYYY-MM-DD HH-mm-ss',
      'start-placeholder': 'Please select Date',
    },
  },
  {
    dataIndex: 'author',
    width: 120,
    title: 'Author',
  },
  {
    dataIndex: 'importance',
    width: 200,
    title: 'Imp',
    scopedSlots: { customRender: 'importance' },
  },
  {
    dataIndex: 'status',
    width: 180,
    title: 'Status',
    scopedSlots: { customRender: 'status' },
  },
  {
    dataIndex: 'title',
    width: undefined,
    minWidth: 450,
    align: 'left',
    title: 'Title',
  },
]

export { columnList }
