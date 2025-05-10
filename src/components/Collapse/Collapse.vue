<template>
  <div class="h-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'h-collapse',
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue || [])
watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = val
  },
)
const handleItemClick = (name: NameType) => {
  const index = activeNames.value.indexOf(name)
  if (props.accordion) {
    activeNames.value = [activeNames.value[index] === name ? '' : name]
  } else {
    if (index === -1) {
      activeNames.value.push(name)
    } else {
      activeNames.value.splice(index, 1)
    }
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>
