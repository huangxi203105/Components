<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import type { ButtonInstance } from './components/Button/types'
import { ref, onMounted } from 'vue'
const btnRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['item1'])
onMounted(() => {
  const btn = btnRef.value?.ref
  console.log(btn)
})
</script>

<template>
  <main class="app">
    <Button size="large">loading</Button>
    <Button size="large" icon="arrow-up">loading</Button>
  </main>
  <Collapse v-model="openedValue">
    <CollapseItem name="item1" title="item1" :disabled="true">
      <div>item1</div>
    </CollapseItem>
    <CollapseItem name="item2" title="item2">
      <div>item2</div>
    </CollapseItem>
    <CollapseItem name="item3" title="item3">
      <div>item3</div>
    </CollapseItem>
  </Collapse>
</template>

<style scoped>
.app {
  display: flex;
  gap: 20px;
}
</style>
