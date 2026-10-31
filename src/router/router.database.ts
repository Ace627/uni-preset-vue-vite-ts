import type { PageItem } from './router.interface'

// icon 来源：https://wot-ui.cn/component/icon.html
export const pages: PageItem[] = [
  { title: '首页', path: '/pages/index/index', icon: 'home', tabbar: true, sort: 1, navbar: true },
  { title: '我的', path: '/pages/mine/index', icon: 'user', tabbar: true, sort: 2 },
  { title: '系统设置', path: '/pages/system/setting' },
]
