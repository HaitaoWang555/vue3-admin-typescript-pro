<script setup lang="ts">
import { getList } from '@/api/table'
import { columnList } from './columns/inline'
import { ref } from 'vue'
import Important from './components/editable-cell/Important.vue'
import EditStatus from './components/editable-cell/Status.vue'

const columns = ref(columnList)

// loadData
function loadData() {
  return getList().then((res) => {
    // format data
    return res
  })
}
</script>
<template>
  <ProTable :border="true" :columns="columns" :data="loadData" sticky>
    <template #importance="slotProps">
      <Important :record="slotProps.row" />
    </template>
    <template #status="slotProps">
      <EditStatus :record="slotProps.row" />
    </template>
  </ProTable>
</template>
