<script setup lang="ts">
import { submit } from '@/api/public'
import { ref, reactive } from 'vue'
import { list } from './columns/advance'
import { ElMessage as Message } from 'element-plus'

const loading = ref(false)
const ProFormRef = ref()
const form = reactive({})
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
      Message({ message: res.data.message, type: 'success' })
      const cbStatus = 'fulfilled'
      callback(cbStatus) // reset form
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<template>
  <ProForm
    ref="ProFormRef"
    :form-param="form"
    :form-list="formList"
    label-position="top"
    :layout="{ formWidth: '100%', labelWidth: '150px' }"
    class="pro-form-has-footer-bar"
    @proSubmit="onSubmit"
  >
    <template #title0>仓库管理</template>
    <template #roterText>
      <router-link
        to="/dashboard"
        style="
          height: 92.5px;
          line-height: 92.5px;
          display: block;
          color: #1890ff;
        "
      >
        去首页
      </router-link>
    </template>
    <template #title1>任务管理</template>
    <template #footerBtn>
      <div class="pro-form-footer-bar">
        <el-button @click="handleReset">重置</el-button>
        <el-button :loading="loading" type="primary" @click="handleOk">
          提交
        </el-button>
      </div>
    </template>
  </ProForm>
</template>
