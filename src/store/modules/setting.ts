import { type SystemSetting, defaultSettings } from '@/defaultSettings'
import { getSystemSetting, merge, removeSystemSetting, setSystemSetting, TipModal } from '@/utils'

export const useSettingStore = defineStore('setting', () => {
  const state = reactive<SystemSetting>(merge({}, defaultSettings, getSystemSetting()))

  /** 保存设置到本地 */
  function saveSetting(config: Partial<{ showTip: boolean }> = {}) {
    const showTip = config.showTip ?? true
    if (showTip) TipModal.showLoading('正在保存到本地，请稍候...')
    setSystemSetting(toRaw(state))
    if (showTip) setTimeout(() => TipModal.hideLoading(), 1500)
  }

  /** 重置设置并刷新页面 */
  function resetSetting() {
    TipModal.showLoading('正在清除设置缓存并刷新，请稍候...')
    removeSystemSetting()
    setTimeout(() => window.location.reload(), 1500)
  }

  return { ...toRefs(state), saveSetting, resetSetting }
})
