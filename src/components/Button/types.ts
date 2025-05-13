export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'medium' | 'large'
export type NativeType = 'button' | 'submit' | 'reset'
export interface ButtonInstance {
  focus: () => void
  blur: () => void
  ref: HTMLButtonElement | null
}
export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  round?: boolean
  circle?: boolean
  plain?: boolean
  nativeType?: NativeType
  autofocus?: boolean
  icon?: string
  loading?: boolean
}
