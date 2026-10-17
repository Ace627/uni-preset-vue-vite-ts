export interface SystemSetting {
  /** 主题 */
  theme: 'light' | 'dark'
}

export const defaultSettings: SystemSetting = {
  theme: 'light',
}
