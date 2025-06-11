<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { ButtonInstance } from './components/Button/types'
import { ref, onMounted } from 'vue'
import type { TooltipInstance } from './components/Tooltip/types'
const btnRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['item1'])
const tooltipRef = ref<TooltipInstance | null>(null)
const popperOptions: Partial<Options> = {
  placement: 'right',
  strategy: 'absolute'
}
onMounted(() => {
  const btn = btnRef.value?.ref
  console.log(btn)
})
const handleClose = () => {
  console.log('close')
}
const open = () => {
  tooltipRef.value?.show()
}
</script>

<template>
  <main class="app">
    <Tooltip ref="tooltipRef" :popper-options="popperOptions">
      <Button size="large">loading</Button>
      <template #content>
        <div>11111</div>
      </template>
    </Tooltip>

  </main>
  <!-- <Button size="large" @click="open">loading</Button> -->

  <!-- <Collapse v-model="openedValue">
    <CollapseItem name="item1" title="item1" :disabled="true">
      <div>item1</div>
    </CollapseItem>
    <CollapseItem name="item2" title="item2">
      <div>item2</div>
    </CollapseItem>
    <CollapseItem name="item3" title="item3">
      <div>item3</div>
    </CollapseItem>
  </Collapse> -->
</template>

<style scoped>
.app {
  display: flex;
  gap: 20px;
}
</style>
