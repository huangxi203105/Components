<template>
  <div class="h-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      class="h-collapse-item__header"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="h-collapse-item__wrap" v-show="isActive">
        <div class="h-collapse-item__content" :id="`item-content-${name}`">
          <slot> </slot>
        </div>
      </div>
    </Transition>
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
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  aferEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>
