import type { Placement,Options } from "@popperjs/core"
export interface TooltipProps {
  content?: string
  placement?: Placement
  trigger?: 'hover' | 'click'
  disabled?: boolean
  manual?: boolean
  popperOptions?: Partial<Options>
  transition?: string
  delay?: number
}

export interface TooltipEmits{
  (e:'visible-change',value:boolean):void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}