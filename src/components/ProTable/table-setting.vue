<script setup lang="ts">
import draggable from 'vuedraggable'

import { getScrollBarWidth, toggleClass, hasClass } from '@/utils/index'
import { computed, ref } from 'vue'
import type { ProItem } from '@/components/type'

const scrollBarWidth = getScrollBarWidth()

const prop = defineProps({
  columns: {
    type: Array as () => Array<ProItem>,
    default: () => {
      return []
    },
  },
})

const emit = defineEmits<{
  (e: 'update:columns', val: ProItem[]): void
  (e: 'reRender'): void
  (e: 'refresh'): void
}>()

const dialogVisible = ref(false)

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  }
})

const draggableList = computed({
  get: () => prop.columns,
  set: (val) => {
    emit('update:columns', val)
    emit('reRender')
  },
})

function fullscreen() {
  const el = document.querySelector('#app .app-container') as HTMLElement
  toggleClass(el, 'content-screenfull')
  if (hasClass(el, 'content-screenfull')) {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.borderRight = scrollBarWidth + 'px solid transparent'
  } else {
    document.documentElement.style.overflow = ''
    document.body.style.borderRight = ''
  }
}
</script>
<template>
  <div class="table-setting">
    <i class="el-icon-refresh" @click="$emit('refresh')" />
    <i class="el-icon-setting" @click="dialogVisible = true" />
    <i class="el-icon-full-screen" @click="fullscreen" />
    <ProDialog
      v-model:value="dialogVisible"
      title="表格列展示"
      :no-footer="true"
      @close="dialogVisible = false"
    >
      <draggable
        v-model="draggableList"
        class="list-group"
        item-key="dataIndex"
        tag="transition-group"
        :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
        v-bind="dragOptions"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <div class="btnWrap">
              <el-checkbox
                v-model="element.fieldVisible"
                @change="$emit('reRender')"
              >
                <span>{{ element.title }}</span>
              </el-checkbox>
              <el-input
                v-model.number="element.width"
                type="number"
                style="width: 150px; margin-left: 20px"
              >
                <template #append>px</template>
              </el-input>
            </div>
          </div>
        </template>
      </draggable>
    </ProDialog>
  </div>
</template>

<style lang="scss" scoped>
.list-group-item {
  max-width: 80%;
  min-width: 40%;
  margin: 5px auto;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;

  span {
    vertical-align: middle;
  }

  .btnWrap {
    display: flex;
    align-items: center;
  }
}
</style>
