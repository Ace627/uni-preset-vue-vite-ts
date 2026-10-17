// 模块级单例：保证所有调用 useTheme() 的组件共享同一份主题状态
const theme = ref<'light' | 'dark'>('light')

export function useTheme() {
  const settingStore = useSettingStore()

  function toggle() {
    settingStore.theme = settingStore.theme === 'light' ? 'dark' : 'light'
  }

  return { toggle }
}
