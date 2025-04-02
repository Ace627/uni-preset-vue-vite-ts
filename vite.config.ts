import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    /** 自带 api 的自动化导入 */
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      dts: 'types/auto-generate/auto-import.d.ts',
      dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
    }),
  ],
})
