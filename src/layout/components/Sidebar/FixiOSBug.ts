/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export function useFixBug(): any {
  const store = useStore()
  const device = computed(() => store.state.app.device)

  const subMenu = ref()

  function fixBugIniOS() {
    if (subMenu.value) {
      const handleMouseleave = subMenu.value.handleMouseleave
      subMenu.value.handleMouseleave = (e: any) => {
        if (device.value === 'mobile') {
          return
        }
        handleMouseleave(e)
      }
    }
  }

  onMounted(() => {
    fixBugIniOS()
  })

  return {
    subMenu,
  }
}
