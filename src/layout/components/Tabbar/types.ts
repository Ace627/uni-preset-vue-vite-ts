/** 底栏标签名 */
export type TabbarName = 'home' | 'mine'

/** 底栏项配置 */
export interface TabbarItem {
  name: TabbarName
  title: string
  path: string
  icon: string
  selectedIcon: string
  /** 沉浸式底栏用的 wot 图标字体名（图标颜色可随主题变化，图片图标不行） */
  wdIcon: string
}
