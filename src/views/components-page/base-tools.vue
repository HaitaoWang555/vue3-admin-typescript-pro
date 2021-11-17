<script setup lang="ts">
import { ElMessage } from 'element-plus'

const inputData = 'https://github.com/HaitaoWang555/vue3-admin-typescript-pro'

function clipboardSuccess() {
  ElMessage({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500,
  })
}
</script>
<template>
  <el-card v-fullscreen:top="18" header="水波纹">
    <el-button v-waves type="primary">水波纹</el-button>
  </el-card>
  <el-card v-fullscreen:top="18" header="粘贴板" class="mt-5">
    <el-input
      v-model="inputData"
      placeholder="Please input"
      style="width: 500px; max-width: 100%"
    >
      <template #append>
        <el-button
          v-clipboard:copy="inputData"
          v-clipboard:success="clipboardSuccess"
          icon="el-icon-document"
        >
          copy
        </el-button>
      </template>
    </el-input>
  </el-card>
</template>
