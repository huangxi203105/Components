import type { offset } from "@popperjs/core";
import type { ComponentInternalInstance, VNode } from "vue";
export interface MessageProps {
  content?: string | VNode;
  type?: "success" | "info" | "warning" | "danger";
  duration?: number;
  closable?: boolean;
  offset?:number
  id: string;
  zIndex?: number;
  transition?: string;
  onDestroy: () => void;
}

export interface MessageContext{
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm:ComponentInternalInstance
  destroy: () => void;
}
 
export type CreateMessageProps = Omit<MessageProps, "onDestroy" | "id" | "zIndex">