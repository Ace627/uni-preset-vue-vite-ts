import { createSSRApp } from 'vue'
import App from './App.vue'
import { RouterGuard } from '@/router/router.guard'
import { setupStore } from './store'
import './styles/index.scss'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  /** 路由权限守卫 */
  app.use(RouterGuard)

  /** 配置 Store 状态管理 https://pinia.web3doc.top */
  setupStore(app)

  return { app }
}
