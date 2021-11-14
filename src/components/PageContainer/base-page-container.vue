<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <div class="page-container">
    <div class="page-header">
      <div class="page-header-heading">
        <span>{{ props.title || route.meta.title }}</span>
      </div>
      <div v-if="props.content" class="page-header-content">
        {{ props.content }}
      </div>
    </div>
    <div class="page-content">
      <el-card>
        <slot></slot>
      </el-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  margin: -20px -20px 0;

  .page-header {
    margin: 0;
    color: rgba(0, 0, 0, 0.85);
    list-style: none;
    position: relative;
    padding: 16px 24px;
    background-color: #fff;

    .page-header-heading {
      display: flex;
      align-items: center;
      margin: 4px 0;
      overflow: hidden;

      span {
        margin-right: 12px;
        margin-bottom: 0;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .page-header-content {
      padding-top: 12px;
      font-size: 14px;
    }
  }

  .page-content {
    margin: 20px 20px 0;
    position: relative;
  }
}
</style>
