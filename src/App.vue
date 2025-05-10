<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'

import type { ButtonInstance } from './components/Button/types'
import { ref, onMounted } from 'vue'
const btnRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['item1'])
onMounted(() => {
  const btn = btnRef.value?.ref
  console.log(btn)
})
setTimeout(() => {
  openedValue.value = ['item1', 'item2']
}, 2000)
</script>

<template>
  <main class="app">
    <Collapse v-model="openedValue">
      <CollapseItem name="item1">
        <template #title>
          <h1>nice</h1>
        </template>
        <h1>sdasdsad</h1>
        <div>content</div>
      </CollapseItem>
      <CollapseItem name="item2">
        <template #title>
          <h1>niceaaa</h1>
        </template>
        <h1>sdasdsad</h1>
        <div>content</div>
      </CollapseItem>
    </Collapse>
    {{ openedValue }}
  </main>
</template>

<style scoped>
.app {
  display: flex;
  gap: 20px;
}
</style>
