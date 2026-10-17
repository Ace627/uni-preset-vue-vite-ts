import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { setupVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: await setupVitePlugins(),

    css: {
      preprocessorOptions: {
        scss: {
          // https://wot-ui.cn/guide/quick-use.html#sass
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },

    resolve: {
      alias: {
        /** 设置 `@` 指向 `src` 目录 */
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      // 允许外部访问（团队协作时，其他设备可通过 IP 访问本地项目）
      host: true,
    },
  }
})
