import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import './styles/index.scss'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  /** 配置 Store 状态管理 https://pinia.web3doc.top */
  setupStore(app)

  return { app }
}
