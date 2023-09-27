import { createSSRApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)

  return { app }
}
