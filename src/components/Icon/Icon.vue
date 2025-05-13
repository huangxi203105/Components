<script setup lang="ts">
import type { IconProps } from './types'
import { defineOptions, defineProps, computed } from 'vue'
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'h-icon',
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customColor = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
<template>
  <i class="h-icon" :class="{ [`h-icon--${type}`]: type }" :style="customColor" v-bind="$attrs">
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>
