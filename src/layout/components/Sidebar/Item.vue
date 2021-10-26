<script setup lang="ts">
const props = defineProps<{
  icon?: string
  title?: string
}>()
</script>

<template>
  <template v-if="props.icon">
    <i
      v-if="props.icon.includes('el-icon')"
      :class="[props.icon, 'sub-el-icon']"
    />
    <svg-icon v-else :icon-class="props.icon" />
  </template>

  <span v-if="props.title">
    <slot name="title">{{ props.title }}</slot>
  </span>
</template>
