import App from './App.vue'
import { createSSRApp } from 'vue'
import { setupStore } from './store'
import './styles/index.scss'

export function createApp() {
  // 创建 Vue 应用实例
  const app = createSSRApp(App)

  // 配置 Store 状态管理 https://pinia.web3doc.top
  setupStore(app)

  return { app }
}
