import App from './App.vue'
import { createSSRApp } from 'vue'
import { setupStore } from './store'
import './styles/index.scss'
import 'virtual:uno.css' // 引入 UnoCSS 生成的样式

export function createApp() {
  // 创建 Vue 应用实例
  const app = createSSRApp(App)

  // 配置 Store 状态管理 https://pinia.web3doc.top
  setupStore(app)

  return { app }
}
