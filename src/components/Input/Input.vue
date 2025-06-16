<template>
  <div 
  class="h-input" 
  :class="{
    [`h-input--${type}`]:type,
    [`h-input--${size}`]:size,
    'is-disabled':disabled,
    'is-prepend':$slots.prepend,
    'is-append':$slots.append,
    'is-prefix':$slots.prefix,
    'is-suffix':$slots.suffix,
    'is-focus':isFocus,
  }"
  >
    <template v-if="type!=='textarea'">
      <div v-if="$slots.prepend" class="h-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="h-input__wrapper">
        <span v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          ref="inputRef"
          v-bind="attrs"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
          :placeholder="placeholder"
          :readonly="readonly"
          :autofocus="autofocus"
          :autocomplete="autocomplete"
          :form="form"
          v-model="innerValue"
          :type="showPassword?(passwordVisible?'text':'password'):type"
          :disabled="disabled"
        >
        <span v-if="$slots.suffix || showClear || showPasswordArea">
          <slot name="suffix"></slot>
          <Icon v-if="showClear" class="h-input__clear" @click="clear" icon="circle-xmark" />
          <Icon v-if="showPasswordArea && passwordVisible" class="h-input__password" @click="()=>passwordVisible=false" icon="eye" />
          <Icon v-if="showPasswordArea && !passwordVisible" class="h-input__password" @click="()=>passwordVisible=true" icon="eye-slash" />
        </span>
      </div>
      <div v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        ref="inputRef"
        v-bind="attrs"
        :placeholder="placeholder"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :form="form"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        v-model="innerValue"
        class="h-input__wrapper"
        :disabled="disabled" 
      />      
    </template>

  </div>
</template>

<script lang="ts" setup>
import {computed, ref,useAttrs,watch} from 'vue'
import type { Ref } from 'vue'
import type {InputProps,InputEmits} from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'h-Input',
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const inputRef = ref() as Ref<HTMLInputElement>
const attrs = useAttrs()
const isFocus = ref(false)
const passwordVisible = ref(false)
const emit = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const showClear = computed(()=>{
  return props.clearable && innerValue.value && !props.disabled && isFocus.value
})
const showPasswordArea = computed(()=>{
  return props.showPassword && innerValue.value && !props.disabled
})
const handleFocus = (e:FocusEvent) =>{
  isFocus.value = true
  emit('focus',e)
}
const handleBlur = (e:FocusEvent) =>{
  isFocus.value = false
  emit('blur',e)
}
const handleInput = () =>{
  emit('update:modelValue',innerValue.value)
  emit('change',innerValue.value)
}
const handleChange = () =>{
  emit('change',innerValue.value)
}
watch(()=>props.modelValue,(newValue)=>{
  innerValue.value = newValue
})
const clear = () =>{
  console.log('clear')
  innerValue.value = ''
  emit('update:modelValue',innerValue.value)
  emit('clear')
  emit('change','')
  emit('input','')
}
defineExpose({
  ref:inputRef,
})
</script>
