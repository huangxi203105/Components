<template>
  <div class="h-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="h-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="h-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { inject, computed } from 'vue'
import { collapseContextKey } from './types'
defineOptions({
  name: 'h-collapseItem',
})
const collapseContext = inject(collapseContextKey)
const props = defineProps<CollapseItemProps>()
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}
</script>
