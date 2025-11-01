import { useMessage, useToast } from 'wot-design-uni'
import type { ToastOptions } from 'wot-design-uni/components/wd-toast/types'
import type { MessageOptions } from 'wot-design-uni/components/wd-message-box/types'

export function useTipModal() {
  const toast = useToast()
  const message = useMessage()

  function msg(msg: string, options: ToastOptions = {}) {
    toast.info({ msg, position: 'middle', ...options })
  }

  function msgSuccess(msg: string, options: ToastOptions = {}) {
    toast.success({ msg, position: 'middle', ...options })
  }

  function msgError(msg: string, options: ToastOptions = {}) {
    toast.error({ msg, position: 'middle', ...options })
  }

  function msgWarning(msg: string, options: ToastOptions = {}) {
    toast.warning({ msg, position: 'middle', ...options })
  }

  function alert(msg: string, options: MessageOptions = {}) {
    message.alert({ title: '系统提示', msg, type: 'alert', confirmButtonText: '知道了', ...options })
  }

  function confirm(msg: string, options: MessageOptions = {}): Promise<{ confirm: boolean; cancel: boolean }> {
    return new Promise((resolve) =>
      message
        .confirm({ msg, title: '系统提示', ...options })
        .then(() => resolve({ confirm: true, cancel: false }))
        .catch(() => resolve({ confirm: false, cancel: true })),
    )
  }

  function hideLoading() {
    toast.close()
  }

  function showLoading(msg: string = '正在加载...', options: ToastOptions = {}) {
    toast.loading({ loadingType: 'ring', msg, position: 'middle', ...options })
  }

  return { msg, msgSuccess, msgWarning, msgError, alert, confirm, showLoading, hideLoading }
}
