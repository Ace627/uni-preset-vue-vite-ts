export abstract class TipModal {
  static msg(title: string, config: UniNamespace.ShowToastOptions = {}) {
    this.hideLoading()
    uni.showToast({ title, icon: 'none', ...config })
  }

  static msgSuccess(title: string, config: UniNamespace.ShowToastOptions = {}) {
    this.hideLoading()
    uni.showToast({ title, icon: 'success', ...config })
  }

  static msgError(title: string, config: UniNamespace.ShowToastOptions = {}) {
    this.hideLoading()
    uni.showToast({ title, icon: 'error', ...config })
  }

  /** 弹出提示 */
  static alert(content: string, config: UniNamespace.ShowModalOptions = {}) {
    this.hideLoading()
    uni.showModal({ title: '系统提示', content, showCancel: false, confirmText: '知道了', ...config })
  }

  static confirm(content: string, config: UniNamespace.ShowModalOptions = {}) {
    this.hideLoading()
    return uni.showModal({ title: '系统提示', content, ...config })
  }

  /** 打开遮罩层 */
  static showLoading(title: string = '正在加载...', config: UniNamespace.ShowLoadingOptions = {}) {
    this.hideLoading()
    uni.showLoading({ title, ...config })
  }

  /** 关闭遮罩层 */
  static hideLoading() {
    uni.hideLoading()
  }
}
