export interface InputProps {
  type: string
  size?: 'large' | 'small' | 'default'
  modelValue: string
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  placeholder?: string
  readonly?: boolean
  autofocus?: boolean
  autocomplete?: string
  form?: string
}
export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
  (e: 'input', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
}