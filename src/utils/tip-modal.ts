/**
 * 全局提示工具类（uni 原生 API 实现，多端兼容 H5 / 小程序 / App）
 * 参考原 Element Plus 版本的方法签名，按 uni API 能力做了裁剪：
 * - msg/notify 系列统一走 uni.showToast（小程序无独立通知，warning 无原生图标，降级为 icon: 'none'）
 * - alert/confirm/prompt 统一走 uni.showModal（prompt 暂不支持，用到时再扩展）
 * - showLoading/hideLoading 走 uni.showLoading/uni.hideLoading（全局单例）
 */

type ToastOptions = Partial<Omit<UniNamespace.ShowToastOptions, 'title' | 'icon'>>
type ModalOptions = Partial<Omit<UniNamespace.ShowModalOptions, 'title' | 'content'>>

export abstract class TipModal {
  /** 消息提示 */
  static msg(message: string, config: ToastOptions = {}) {
    uni.showToast({ icon: 'none', ...config, title: message })
  }

  /** 错误消息 */
  static msgError(message: string, config: ToastOptions = {}) {
    uni.showToast({ icon: 'error', ...config, title: message })
  }

  /** 成功消息 */
  static msgSuccess(message: string, config: ToastOptions = {}) {
    uni.showToast({ icon: 'success', ...config, title: message })
  }

  /** 警告消息（无原生 warning 图标，降级为无图标） */
  static msgWarning(message: string, config: ToastOptions = {}) {
    uni.showToast({ icon: 'none', ...config, title: message })
  }

  /** 弹出提示（无关闭按钮，仅“知道了”） */
  static alert(content: string, config: ModalOptions = {}) {
    uni.showModal({ title: '系统提示', showCancel: false, confirmText: '知道了', ...config, content })
  }

  /** 错误提示 */
  static alertError(content: string, config: ModalOptions = {}) {
    uni.showModal({ title: '系统提示', showCancel: false, confirmText: '知道了', ...config, content })
  }

  /** 成功提示 */
  static alertSuccess(content: string, config: ModalOptions = {}) {
    uni.showModal({ title: '系统提示', showCancel: false, confirmText: '知道了', ...config, content })
  }

  /** 警告提示 */
  static alertWarning(content: string, config: ModalOptions = {}) {
    uni.showModal({ title: '系统提示', showCancel: false, confirmText: '知道了', ...config, content })
  }

  /** 确认窗体：将取消也作为正常结果返回，调用方无需 try/catch */
  static async confirm(content: string, config: ModalOptions = {}): Promise<{ confirm: boolean; cancel: boolean }> {
    const res = await uni.showModal({ title: '系统提示', confirmText: '确定', cancelText: '取消', showCancel: true, ...config, content })
    return { confirm: !!res.confirm, cancel: !res.confirm }
  }

  /** 打开遮罩层（全局单例） */
  static showLoading(content: string = '正在加载...', config: Partial<Omit<UniNamespace.ShowLoadingOptions, 'title'>> = {}) {
    uni.showLoading({ mask: true, ...config, title: content })
  }

  /** 关闭遮罩层 */
  static hideLoading() {
    uni.hideLoading()
  }
}
