import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import uniModule from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// @ts-expect-error missing types
const Uni = uniModule.default || uniModule

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Uni(),
    // 即时按需的原子化 CSS 引擎 UnoCSS
    UnoCSS({ inspector: false }),
    /** 自带 api 的自动化导入 */
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      dts: 'types/auto-generate/auto-import.d.ts',
      dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
    }),
  ],

  css: {
    preprocessorOptions: {},
  },
})
