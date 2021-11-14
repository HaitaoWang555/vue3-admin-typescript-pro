<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { submit } from '@/api/public'
import { reactive, ref } from 'vue'
import { list } from './columns/list'

const loading = ref(false)
const ProFormRef = ref()
const form = reactive({
  weight: 70,
})
const formList = list
function handleOk() {
  ProFormRef.value.handleSubmit()
}
function handleReset() {
  ProFormRef.value.resetFormParam()
}
function onSubmit(callback: (params: string) => void) {
  loading.value = true
  submit(form)
    .then((res) => {
      ElMessage({ message: res.data.message, type: 'success' })
      const cbStatus = 'fulfilled'
      callback(cbStatus) // reset form
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <PageContainer
    content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
  >
    <ProForm
      ref="ProFormRef"
      :form-param="form"
      :form-list="formList"
      label-position="top"
      :layout="{ formWidth: '560px', labelWidth: '150px' }"
      @proSubmit="onSubmit"
    >
      <template #footerBtn>
        <el-button :loading="loading" type="primary" @click="handleOk">
          提交
        </el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </ProForm>
  </PageContainer>
</template>
