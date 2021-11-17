/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProItem } from '@/components/type'

const list: ProItem[] = [
  {
    dataIndex: 'title',
    title: '标题',
    isForm: true,
    valueType: 'input',
    placeholder: '给目标起个名字',
    prop: [
      {
        required: true,
        trigger: 'blur',
      },
    ],
  },
  {
    dataIndex: 'date',
    title: '起止日期',
    valueType: 'date-picker',
    attrs: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期',
    },
    prop: [
      {
        required: true,
        trigger: 'change',
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'goal',
    title: '目标描述',
    valueType: 'input',
    inpuType: 'textarea',
    placeholder: '请输入你的阶段性工作目标',
    prop: [
      {
        required: true,
        trigger: 'blur',
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'standard',
    title: '衡量标准',
    valueType: 'input',
    inpuType: 'textarea',
    prop: [
      {
        required: true,
        trigger: 'blur',
      },
    ],
    isForm: true,
  },
  {
    dataIndex: 'client',
    title: '客户',
    isForm: true,
    formLabelHtml: '<span>客户<em class="optional">（选填）</em></span>',
    valueType: 'input',
    formLabelTooltip: '目标的服务对象',
    placeholder: '请描述你服务的客户，内部客户直接 @姓名／工号',
  },
  {
    dataIndex: 'invites',
    title: '邀评人',
    isForm: true,
    formLabelHtml: '<span>邀评人<em class="optional">（选填）</em></span>',
    valueType: 'input',
    placeholder: '请直接 @姓名／工号，最多可邀请 5 人',
  },
  {
    dataIndex: 'weight',
    title: '权重',
    formLabelHtml: '权重<em class="optional">（%）</em>',
    isForm: true,
    valueType: 'input-number',
    attrs: {
      min: 0,
      step: 1,
      max: 100,
      controlsPosition: 'right',
    },
  },
  {
    dataIndex: 'publicType',
    title: '目标公开',
    valueType: 'radio',
    option: [
      {
        value: '1',
        label: '公开',
      },
      {
        value: '2',
        label: '部分公开',
      },
      {
        value: '3',
        label: '不公开',
      },
    ],
    formItemHelp: '客户、邀评人默认被分享',
    isForm: true,
  },
  {
    dataIndex: 'publicUsers',
    isForm: true,
    valueType: 'select',
    option: [
      {
        value: '1',
        label: '同事甲',
      },
      {
        value: '2',
        label: '同事乙',
      },
      {
        value: '3',
        label: '同事丙',
      },
    ],
    isShowFormItem: (formParam: any): boolean => {
      return formParam && formParam.publicType === '2'
    },
  },
]

export { list }
