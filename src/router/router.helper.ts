import { pages } from './router.database'

/** 获取当前页面栈顶的完整路由（补前导 / 对齐配置格式，与 pages 表的 path 同构） */
export function getCurrentPage() {
  return '/' + (getCurrentPages().at(-1)?.route ?? '')
}

/** 获取底栏 tabbar 页配置，按 sort 升序排列，数组顺序即底栏展示顺序 */
export function getTabbarPages() {
  return pages.filter((page) => page.tabbar).sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
}

/** 判断当前页面是否为底栏 tabbar 页 */
export function isTabbarPage() {
  return pages.some((page) => page.tabbar && page.path === getCurrentPage())
}

/** 判断当前页面是否使用全局默认 Navbar（未配置或配置为 true 均使用） */
export function isDefaultNavbarPage() {
  const page = pages.find((item) => item.path === getCurrentPage())
  return page?.navbar !== false
}
