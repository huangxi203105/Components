<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import type { AlertProps, AlertEvents, AlertInstance } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'h-alert',
})
withDefaults(defineProps<AlertProps>(), {
  type: 'success',
  effect: 'light',
  closable: true,
})
const emit = defineEmits<AlertEvents>()
const show = ref(true)
const alertRef = ref<HTMLDivElement | null>(null)
const close = () => {
  show.value = false
  emit('close')
}
defineExpose({
  close,
  ref: alertRef,
})
</script>
<template>
  <Transition name="alert">
    <div
      ref="alertRef"
      v-if="show"
      class="h-alert"
      :class="{
        [`h-alert--${type}`]: type,
        [`h-alert--${effect}`]: effect,
        'is-closable': closable,
      }"
    >
      <div class="h-alert__content">
        <slot name="content">{{ content }}</slot>
      </div>
      <div class="h-alert__close" v-if="closable" @click.stop="close">
        <Icon v-if="closable" icon="times" class="h-alert__close" />
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  margin-bottom: 0 !important; /* 如果是上下排列的多个 alert，需要消除 margin */
}
</style>
