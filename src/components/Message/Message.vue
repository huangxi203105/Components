<template>
  <Transition 
    @afterLeave="destroyComponent"
    @enter="updateHeight"
    :name="props.transition"
    >
      <div 
      v-show="visiable" 
      class="h-message" 
      role="alert"
      ref="messageRef"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      :style="cssStyle"
      :class="{[`h-message--${type}`]: type,'is-closable': props.closable}">
        <div class="h-message__content">
          <slot>
            <RenderVnode :vNode="content" v-if="content"  />
          </slot>
        </div>
        <div v-if="props.closable" class="h-message__close" @click="$emit('close')">
          <Icon @click.stop="()=>visiable = false" class="h-icon h-icon-close" icon="xmark" />
        </div>
      </div>
</Transition>

</template>

<script setup lang="ts">
import { ref, onMounted,watch,computed, nextTick } from 'vue';
import type {MessageProps} from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { getLastInstance,getLastBottomoffset  } from './Method';
import useEventListener from '@/hooks/useEventListener';
const props = withDefaults(defineProps<MessageProps>(), {
  type:'info',
  duration: 3000,
  offset: 20,
  transition:'fade-up'
});
const messageRef = ref<HTMLElement | null>(null);
const height = ref(0);
const lastOffset = computed(() => getLastBottomoffset(props.id));
const topOffset = computed(()=>props.offset+lastOffset.value)
const bottomOffset = computed(()=>height.value+topOffset.value)
const cssStyle = computed(()=>({
  top: `${topOffset.value}px`,
  zIndex:props.zIndex || 1000,
}))
let timer:any = null;
function startTimer(){
  if(props.duration===0) return;
  timer = setTimeout(() => {
    visiable.value = false;
  }, props.duration);
}
function clearTimer(){
  if(timer){
    clearTimeout(timer);
    timer = null;
  }
}
const visiable = ref(false);
watch(()=>visiable.value, (newVal) => {
  if(!newVal){
    props.onDestroy();
  }
})
onMounted(async()=>{
  visiable.value = true;
  startTimer()
})
function keydown(e:Event){
  const event = e as KeyboardEvent;
  if(event.code==='Escape'){
    visiable.value = false;
  }
}
function destroyComponent(){
  props.onDestroy()
}
function updateHeight(){
  height.value = messageRef.value!.getBoundingClientRect().height;
}
useEventListener(document,'keydown',keydown)
defineExpose({
  bottomOffset,
  visiable
}); 
</script>
