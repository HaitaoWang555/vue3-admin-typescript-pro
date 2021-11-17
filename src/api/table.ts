import { AxiosPromise } from 'axios'
import request from '@/utils/request'
import type { ResponseBodyType, TableList } from '@/types/api'

export function getList(): AxiosPromise<ResponseBodyType<TableList>> {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
  })
}
