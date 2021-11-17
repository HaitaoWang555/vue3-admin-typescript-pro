<script setup lang="ts">
import { reactive, ref, toRaw, Ref } from 'vue'
import { fetchList, createArticle, updateArticle } from '@/api/article'
import { columnList, initDict } from './columns/list'
import { parseTime, copyValue } from '@/utils'
import { ElMessage } from 'element-plus'
import { ArticleItem, PageParams } from '@/types/api'

// Table
const proTable = ref()
const columns = ref(columnList)
const queryParam = reactive({
  sort: '+id',
  importance: undefined,
  title: '',
  type: '',
})

const multipleSelection: Ref<ArticleItem[]> = ref([])
// Form
const dialogTitle = ref('')
const dialogVisible = ref(false)
const ProFormRef = ref()
const confirmLoading = ref(false)
const defaultFormParams = {
  id: undefined,
  importance: 1,
  remark: '',
  timestamp: new Date(),
  title: '',
  type: '',
  status: 'published',
}
const form: ArticleItem = reactive(Object.assign({}, defaultFormParams))
const isEdit = ref(false)
let formData: ArticleItem | Record<string, never> = {}
// Filter
const dict = initDict
// loadData
function loadData(parameter: PageParams) {
  const requestParameters = Object.assign({}, parameter, queryParam)
  return fetchList(requestParameters).then((res) => {
    // format data
    return res
  })
}
// Delete
function handleDelete(row: ArticleItem, index: number) {
  console.log(toRaw(row))
  ElMessage({ message: 'Success', type: 'success' })
  proTable.value.list.splice(index, 1)
}
// Sort
function sortChange(data: { prop: string; order: string }) {
  console.log(data)
  const { prop, order } = data
  if (prop === 'id') {
    sortByID(order)
  }
}
function sortByID(order: string) {
  if (order === 'ascending') {
    queryParam.sort = '+id'
  } else {
    queryParam.sort = '-id'
  }
  proTable.value.refresh(true)
}

// Modify Status
function handleSelectionChange(data: ArticleItem[]) {
  multipleSelection.value = data
}
function handleBatchModifyStatus(status: 'published' | 'draft') {
  multipleSelection.value.forEach((i) => {
    i.status = status
  })
  ElMessage({
    message: 'Success',
    type: 'success',
  })
}
function handleModifyStatus(row: ArticleItem, status: 'published' | 'draft') {
  ElMessage({
    message: 'Success',
    type: 'success',
  })
  row.status = status
}
// Create
function handleCreate() {
  // reset FormParams
  Object.assign(form, defaultFormParams)
  dialogTitle.value = 'Create'
  isEdit.value = false
  dialogVisible.value = true
}
function create() {
  form.id = parseInt(String(Math.random() * 100)) + 1024 // mock a id
  form.timestamp = parseTime(form.timestamp) as string
  formData = JSON.parse(JSON.stringify(toRaw(form)))
  return createArticle(form)
}
function createSuccess() {
  formData.author = 'vue3'
  formData.reviewer = 'element-plus'
  formData.pageviews = 0
  proTable.value.list.unshift(formData)
  dialogVisible.value = false
}
// Update
function handleUpdate(row: ArticleItem) {
  dialogTitle.value = 'Update'
  copyValue(form, row)
  formData = JSON.parse(JSON.stringify(toRaw(row)))
  form.timestamp = parseTime(form.timestamp) as string
  isEdit.value = true
  dialogVisible.value = true
}
function update() {
  return updateArticle(form)
}
function updateSuccess() {
  Object.assign(formData, form)
  const index = proTable.value.list.findIndex(
    (v: ArticleItem) => v.id === formData.id
  )
  proTable.value.list.splice(index, 1, formData)
  dialogVisible.value = false
}
function handleDialogOk() {
  ProFormRef.value.handleSubmit()
}
function proSubmit() {
  confirmLoading.value = true
  const method = isEdit.value ? update : create
  method()
    .then((res) => {
      ElMessage({ message: res.data.message, type: 'success' })
      formCB()
    })
    .finally(() => {
      confirmLoading.value = false
    })
}
function formCB() {
  return isEdit.value ? updateSuccess() : createSuccess()
}
</script>

<template>
  <ProTable
    ref="proTable"
    :border="true"
    show-selection
    :columns="columns"
    :data="loadData"
    :query-param="queryParam"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    @sort-change="sortChange"
    @selection-change="handleSelectionChange"
  >
    <template #btn>
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
        Add
      </el-button>
      <el-button
        type="success"
        :disabled="multipleSelection.length === 0"
        @click="handleBatchModifyStatus('published')"
      >
        Publish
      </el-button>
      <el-button
        :disabled="multipleSelection.length === 0"
        @click="handleBatchModifyStatus('draft')"
      >
        Draft
      </el-button>
    </template>

    <template #title="slotProps">
      <span style="padding-right: 15px" class="link-type">
        {{ slotProps.row.title }}
      </span>
      <el-tag>{{ dict('typeFilter', slotProps.row.type) }}</el-tag>
    </template>
    <template #importance="slotProps">
      <el-rate :model-value="slotProps.row.importance" disabled></el-rate>
    </template>
    <template #status="slotProps">
      <el-tag :type="(dict('statusMap', slotProps.row.status) as any)">
        {{ slotProps.row.status }}
      </el-tag>
    </template>
    <template #actions="slotProps">
      <span class="fixed-width">
        <el-button type="primary" @click="handleUpdate(slotProps.row)">
          Edit
        </el-button>
        <el-button
          v-if="slotProps.row.status != 'published'"
          size="mini"
          type="success"
          @click="handleModifyStatus(slotProps.row, 'published')"
        >
          Publish
        </el-button>
        <el-button
          v-if="slotProps.row.status != 'draft'"
          size="mini"
          @click="handleModifyStatus(slotProps.row, 'draft')"
        >
          Draft
        </el-button>
        <el-button
          v-if="slotProps.row.status != 'deleted'"
          size="mini"
          type="danger"
          @click="handleDelete(slotProps.row, slotProps.index)"
        >
          Delete
        </el-button>
      </span>
    </template>
  </ProTable>
  <ProDialog
    v-model:value="dialogVisible"
    :title="dialogTitle"
    width="50%"
    :confirm-loading="confirmLoading"
    @ok="handleDialogOk"
  >
    <ProForm
      ref="ProFormRef"
      :form-param="form"
      :form-list="columns"
      :layout="{ formWidth: '560px', labelWidth: '100px' }"
      @proSubmit="proSubmit"
    >
      <template #importance>
        <el-form-item label="Imp : ">
          <el-rate
            v-model="form.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top: 8px"
          />
        </el-form-item>
      </template>
    </ProForm>
  </ProDialog>
</template>
