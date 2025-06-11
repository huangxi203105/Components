<template>
  <div class="h-dropdown">
    <Tooltip :placement="props.placement" :trigger="props.trigger" :disabled="props.disabled" :manual="props.manual"
      :popperOptions="props.popperOptions" :delay="props.delay" ref="tooltipRef" @visible-change="visibleChange">
      <slot></slot>
      <template #content>
        <ul class="h-dropdown__menu">
          <template v-for="(item, index) in props.menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li @click="itemClick(item)" class="h-dropdown__item"
              :class="{ 'is-disabled': item.disabled, isdivided: item.divided }" :id="`item-${index}`">
              <RenderVnode v-if="item.label" :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useClickOutSide } from '../../hooks/useClickOutSide'
import type { MenuOption, DropdownProps, DropdownInstance, DropdownEmits } from './types'
import RenderVnode from '../Common/RenderVnode'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance, TooltipProps, TooltipEmits } from '../Tooltip/types'
const props = withDefaults(defineProps<DropdownProps>(),{
  menuOptions: () => [],
  isHideAfterClick: true
}) 
const emit = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance>()
const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emit('select', e)
  if (props.isHideAfterClick) {
    tooltipRef.value?.hide()
  }
}
defineExpose<DropdownInstance>({
  show: () => {
    tooltipRef.value?.show()
  },
  hide: () => {
    tooltipRef.value?.hide()
  }
})
</script>