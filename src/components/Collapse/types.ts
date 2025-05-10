import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number
export interface CollapseItemProps {
  title?: string
  name: NameType
  disabled?: boolean
}
export interface CollapseProps {
  accordion?: boolean
  modelValue: NameType[]
}
export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}
export interface CollapseEmits {
  (e: 'update:modelValue', name: NameType[]): void
  (e: 'change', name: NameType[]): void
}
//InjectionKey 函数来对传参进行类型约束，确保父子间传递的数据类型是可见、透明的。
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
