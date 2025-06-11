<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { ButtonInstance } from './components/Button/types'
import { ref, onMounted,h} from 'vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'
const btnRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  const btn = btnRef.value?.ref
  console.log(btn)
})
const options: MenuOption[] = [
  {
    label: 'action1',
    key: 'item1'
  },
  {
    label: 'item2',
    key: 'item2',
    divided: true
  },
  {
    label: 'item3',
    disabled: true,
    key: 'item3'
  }

]
</script>

<template>
  <main class="app">
    <Dropdown @select="(value) => console.log(value)" ref="tooltipRef" :menuOptions="options">
      <Button size="large">loadi213123ng</Button>
    </Dropdown>

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
