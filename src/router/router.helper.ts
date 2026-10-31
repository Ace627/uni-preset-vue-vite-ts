import { TabbarPages } from './router.database'

/** 判断是否为底栏 tabbar 页；不传 route 时默认取当前页面栈顶路由 */
export function isTabbarPage() {
  const currentPage = '/' + (getCurrentPages().at(-1)?.route ?? '')
  return TabbarPages.some((item) => item.path === currentPage)
}
