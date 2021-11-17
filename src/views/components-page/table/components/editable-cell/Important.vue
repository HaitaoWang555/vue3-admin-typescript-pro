<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { ElMessage as Message } from 'element-plus'
import { ref } from 'vue'
import { submit } from '@/api/public'

const importance = ref(0)

type ImportanceType = {
  id: number | string
  importance: number
  editimportance: boolean
}

const prop = defineProps({
  record: {
    type: Object as () => ImportanceType,
    default: () => {
      return {}
    },
  },
})

function edit(params: Record<string, unknown>) {
  submit(params).then((res) => {
    Message({ message: res.data.message, type: 'success' })
    prop.record.importance = importance.value
    prop.record.editimportance = false
  })
}

function save() {
  const params: Record<string, unknown> = {}
  params.id = prop.record.id
  params.importance = importance.value
  edit(params)
}
function change(val: number) {
  if (!val) return
  importance.value = val
}
function close() {
  prop.record.editimportance = false
}
function editView() {
  prop.record.editimportance = true
  importance.value = prop.record.importance
}
</script>
<template>
  <div class="editable-cell">
    <div v-if="record.editimportance" class="editable-cell-input-wrapper">
      <el-rate
        key="edit"
        :model-value="importance"
        :allow-clear="false"
        @change="change"
      />
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
      <el-rate key="default" :model-value="record.importance" disabled />
      <i class="editable-cell-icon el-icon-edit" @click="editView()" />
    </div>
  </div>
</template>
