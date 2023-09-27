import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const VITE_ENV = loadEnv(mode, process.cwd(), 'VITE_') as unknown as ImportMetaEnv

  return {
    plugins: [
      uni(),
      AutoImport({
        imports: ['vue', 'pinia'], // 自动导入 vue、vue-router、Pinia 相关函数
        dts: 'types/auto-import.d.ts',
        dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
      }),
    ],

    // 发布时删除 console debugger
    esbuild: {
      drop: VITE_ENV.VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
  }
})
