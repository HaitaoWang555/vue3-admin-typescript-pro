<script setup lang="ts">
import clipboard from '@/utils/clipboard'
import svgIcon from './svg-icons'
import elementIcon from './element-icons'
import { ref } from 'vue'

const svgIcons = ref(svgIcon)
const elementIcons = ref(elementIcon)

function generateIconCode(symbol: string) {
  return `<SvgIcon icon-class="${symbol}" />`
}
function generateElementIconCode(symbol: string) {
  return `<i class="el-icon-${symbol}" />`
}
function handleClipboard(text: string, event: Event) {
  clipboard(text, event)
}
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Icons">
      <div class="grid">
        <div
          v-for="item of svgIcons"
          :key="item"
          @click="handleClipboard(generateIconCode(item), $event)"
        >
          <el-tooltip placement="top">
            <template #content>
              {{ generateIconCode(item) }}
            </template>
            <div class="icon-item">
              <SvgIcon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Element-UI Icons">
      <div class="grid">
        <div
          v-for="item of elementIcons"
          :key="item"
          @click="handleClipboard(generateElementIconCode(item), $event)"
        >
          <el-tooltip placement="top">
            <template #content>
              {{ generateElementIconCode(item) }}
            </template>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}

.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}

span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}

.disabled {
  pointer-events: none;
}
</style>
