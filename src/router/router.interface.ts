export interface PageItem {
  /** 页面标题，Navbar 读取 */
  title: string
  /** 页面路由，含前导 / */
  path: string
  /** 底栏图标（wot icon 名），仅 tabbar 页需要 */
  icon?: string
  /** 是否为底栏 tabbar 页 */
  tabbar?: boolean
  /** tabbar 展示顺序，仅 tabbar 页需要 */
  sort?: number
  /** 是否使用全局默认 Navbar，默认 true；设为 false 后页面自行实现导航栏 */
  navbar?: boolean
}
