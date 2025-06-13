import { onMounted, onBeforeUnmount, isRef, watch, unref } from "vue";
import type { Ref } from "vue";

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e:Event) => void,
) {
  if(isRef(target)) {
    watch(target,(value,oldValue) => {
      if (oldValue) {
        oldValue.removeEventListener(event, handler);
      }
      if (value) {
        value.addEventListener(event, handler);
      }
    });
  }else{
    onMounted(() => {
      if (target) {
        target.addEventListener(event, handler);
      }
    });
  }

  onBeforeUnmount(() => {
    if (target) {
      unref(target)?.removeEventListener(event, handler);
    }
  });

  return {
    addEventListener,
    removeEventListener
  };
}