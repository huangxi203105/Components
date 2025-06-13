import type { CreateMessageProps,MessageContext } from "./types";
import { render,h,shallowReactive } from "vue";
import MessageConstructor from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";

let seed = 1;
const instances: MessageContext[] = shallowReactive([]) ;

export const createMessage = (props: CreateMessageProps) => {
  const {nextZIndex} = useZIndex();
  const container = document.createElement("div");
  const id = `message-${seed++}`;
  const destroy = () => {
    const index = instances.findIndex(instance => instance.id === id);
    if (index === -1) return;
    instances.splice(index, 1);
    render(null, container);
    //document.body.removeChild(container.firstElementChild!);
  }
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex:nextZIndex(),
    onDestroy: destroy
  }
  const vNode = h(MessageConstructor, newProps);
  render(vNode, container);
  document.body.appendChild(container.firstElementChild!);
  const vm = vNode.component!;
  const instance = {
    id,
    vnode: vNode,
    vm,
    props: newProps,
    destroy: manualDestroy
  }
  instances.push(instance);
  return instance
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}
export const getLastBottomoffset = (id: string) => {
  const index = instances.findIndex(instance => instance.id === id);
  if (index <= 0) return 0;
  const lastInstance = instances[index - 1];
  return lastInstance.vm.exposed!.bottomOffset.value;   
}