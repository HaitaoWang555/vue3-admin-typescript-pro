export type ResponseBodyType<T> = {
  message?: string
  timestamp?: number
  data: T
  code: number
  success: boolean
}

export type CurrentUser = {
  id: number
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

export type LoginResult = {
  token: string
}

export type PageParams = {
  page?: number
  pageSize?: number
}

export type RuleListItem = {
  key?: number
  disabled?: boolean
  href?: string
  avatar?: string
  name?: string
  owner?: string
  desc?: string
  callNo?: number
  status?: number
  updatedAt?: string
  createdAt?: string
  progress?: number
}

export type RuleList = {
  data?: RuleListItem[]
  /** 列表的内容总数 */
  total?: number
  success?: boolean
}

export type FakeCaptcha = {
  code?: number
  status?: string
}

export type LoginParams = {
  username: string
  password: string
}

export type ErrorResponse = {
  /** 业务约定的错误码 */
  errorCode: string
  /** 业务上的错误信息 */
  errorMessage?: string
  /** 业务上的请求是否成功 */
  success?: boolean
}
export type NoticeIconItemType = 'notification' | 'message' | 'event'

export type NoticeIconItem = {
  id?: string
  extra?: string
  key?: string
  read?: boolean
  clickClose?: boolean
  avatar?: string
  title?: string
  status?: string
  datetime?: string
  description?: string
  type?: NoticeIconItemType
}

export type NoticeIconList = {
  data?: NoticeIconItem[]
  /** 列表的内容总数 */
  total?: number
  success?: boolean
}
export type TableItemType = 'published' | 'draft' | 'deleted'

export type TableItem = {
  id?: string
  title?: string
  status?: TableItemType
  author?: string
  displayTime?: string
  pageviews?: number
}

export type TableList = {
  items?: TableItem[]
  total?: number
  success?: boolean
}

export type ProTableList<T> = {
  items: T[]
  total: number
  success: boolean
}

export type ArticleQueryParams = {
  importance: number | undefined
  type: string
  title: string
  sort: string
}
export type ArticleStatus = {
  key: string
  displayName: string
}

export type ArticleItem = {
  id?: number
  timestamp: Date | string | number
  author?: string
  reviewer?: string
  title: string
  contentShort?: string
  content?: string
  forecast?: number
  importance: number | undefined
  type: string
  status: string
  displayTime?: Date
  commentDisabled?: boolean
  pageviews?: number
  imageUri?: string
}
