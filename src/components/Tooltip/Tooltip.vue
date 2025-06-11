<template>
  <div ref="popperContainerNode" class="h-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="h-tooltip__trigger" v-on="events">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="h-tooltip__popper" ref="popperNode">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow=""></div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click',
  disabled: false,
  transition: 'fade',
  delay: 0
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLDivElement>()
const triggerNode = ref<HTMLDivElement>()
const popperContainerNode = ref<HTMLDivElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

// popperOptions里placement的优先级应该比placement高
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ]
  }
})

const togglePopper = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

const open = () => {
  isOpen.value = true
  emits('visible-change', isOpen.value)
}
const close = () => {
  console.log('close')
  isOpen.value = false
  emits('visible-change', isOpen.value)
}
const openDebounce = debounce(open, props.delay)
const closeDebounce = debounce(close, props.delay)


useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeDebounce()
  }
})
const attachEvents = () => {
  if (props.trigger === 'click') {
    events['click'] = togglePopper
  } else if (props.trigger === 'hover') {
    events['mouseenter'] = openDebounce
    outerEvents['mouseleave'] = closeDebounce
  }
}

if (!props.manual) {
  attachEvents()
}
watch(() => props.manual, (ismanual) => {
  if (ismanual) {
    events = {}
    outerEvents = {}
  } else {
    attachEvents()
  }
})
watch(() => props.trigger, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    events = {}
    attachEvents()
  }
})

watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      console.log('popperInstance', popperOptions.value)
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post' })

defineExpose<TooltipInstance>({
  show: openDebounce,
  hide: closeDebounce
})
onUnmounted(() => {
  popperInstance?.destroy()
})
</script>