<template>
  <button
    ref="_ref"
    class="h-button"
    :class="{
      [`h-button--${type}`]: type,
      [`h-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span><slot></slot></span>
  </button>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { ButtonProps } from './types'
defineOptions({
  name: 'h-button',
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})
const _ref = ref<HTMLButtonElement | null>()
defineExpose({
  focus: () => {
    _ref.value?.focus()
  },
  blur: () => {
    _ref.value?.blur()
  },
  ref: _ref,
})
</script>
<style>
.h-button {
  background-color: var(--main-bg-color);
}
</style>
