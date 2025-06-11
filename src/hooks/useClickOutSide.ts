import type { Ref } from "vue";
import { onMounted, onUnmounted } from "vue"
const useClickOutSide = (
  el: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handleClick = (e: MouseEvent) => {
    //e.target为点击的目标元素
    if (el.value && e.target) {
      if (!el.value.contains(e.target as HTMLElement)) {
        console.log('click outside');
        callback(e);
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handleClick);
  })
  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  })
}
export default useClickOutSide