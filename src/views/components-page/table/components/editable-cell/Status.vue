<!-- eslint-disable vue/no-mutating-props -->

<script setup lang="ts">
import { ElMessage as Message } from 'element-plus'
import { ref, Ref } from 'vue'
import { submit } from '@/api/public'

type TStatus = 'published' | 'draft' | 'deleted'
type TTagsType = 'success' | '' | 'danger'

const statusFilter = (status: TStatus): TTagsType => {
  const statusMap = {
    published: 'success',
    draft: '',
    deleted: 'danger',
  }
  return statusMap[status] as TTagsType
}

type ImportanceType = {
  id: number | string
  status: TStatus
  editstatus: boolean
}

const prop = defineProps({
  record: {
    type: Object as () => ImportanceType,
    default: () => {
      return {}
    },
  },
})

const status: Ref<TStatus> = ref('draft')
const select = ref([
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
])
// Filter
function edit(params: Record<string, unknown>) {
  submit(params).then((res) => {
    Message({ message: res.data.message, type: 'success' })
    prop.record.status = status.value
    prop.record.editstatus = false
  })
}

function save() {
  const params: Record<string, unknown> = {}
  params.id = prop.record.id
  params.status = status.value
  edit(params)
}
function change(val: TStatus) {
  if (!val) return
  status.value = val
}
function close() {
  prop.record.editstatus = false
}
function editView() {
  prop.record.editstatus = true
  status.value = prop.record.status
}
</script>

<template>
  <div class="editable-cell">
    <div v-if="record.editstatus" class="editable-cell-input-wrapper">
      <el-select
        v-model="status"
        clearable
        style="width: 110px"
        size="mini"
        @change="change"
      >
        <el-option v-for="item in select" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
      <i
        class="editable-cell-icon-check el-icon-circle-check"
        @click="save()"
      />
      <i
        class="editable-cell-icon-close el-icon-circle-close"
        @click="close()"
      />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      <el-tag :type="statusFilter(record.status)">
        {{ record.status }}
      </el-tag>
      <i class="editable-cell-icon el-icon-edit" @click="editView()" />
    </div>
  </div>
</template>
