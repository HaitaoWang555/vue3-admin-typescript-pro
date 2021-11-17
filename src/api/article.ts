import { AxiosPromise } from 'axios'
import request from '@/utils/request'
import type {
  ArticleItem,
  ArticleQueryParams,
  ArticleStatus,
  ProTableList,
  ResponseBodyType,
  TableList,
} from '@/types/api'

export function getList(): AxiosPromise<ResponseBodyType<TableList>> {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
  })
}

export function fetchList(
  query: ArticleQueryParams
): AxiosPromise<ResponseBodyType<ProTableList<ArticleItem>>> {
  return request({
    url: '/vue3-admin-pro/article/list',
    method: 'get',
    params: query,
  })
}

export function fetchArticle(
  id: number
): AxiosPromise<ResponseBodyType<ArticleItem>> {
  return request({
    url: '/vue3-admin-pro/article/detail',
    method: 'get',
    params: { id },
  })
}

export function createArticle(
  data: ArticleItem
): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/vue3-admin-pro/article/create',
    method: 'post',
    data,
  })
}

export function updateArticle(
  data: ArticleItem
): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/vue3-admin-pro/article/update',
    method: 'post',
    data,
  })
}

export function getStatus(): AxiosPromise<ResponseBodyType<ArticleStatus[]>> {
  return request({
    url: '/vue3-admin-pro/article/getStatus',
    method: 'get',
  })
}
