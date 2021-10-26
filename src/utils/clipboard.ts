import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  ElMessage({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500,
  })
}

function clipboardError() {
  ElMessage({
    message: 'Copy failed',
    type: 'error',
  })
}

export default function handleClipboard(text: string, event: Event): void {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text,
  })

  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(clipboard as any).onClick(event)
}
