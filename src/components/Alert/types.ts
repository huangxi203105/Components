export interface AlertProps {
  content?: string
  type?: 'success' | 'info' | 'warning' | 'danger'
  closable?: boolean
  effect?: 'light' | 'dark'
  center?: boolean
  showIcon?: boolean
  icon?: string
}
export interface AlertInstance {
  close: () => void
  ref: HTMLDivElement | null
}
export interface AlertEvents {
  (e: 'close'): void
}
