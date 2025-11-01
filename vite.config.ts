import path from 'path'
import UniKuRoot from '@uni-ku/root'
import { defineConfig, loadEnv } from 'vite'
import uniModule from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

// @ts-expect-error missing types
const Uni = uniModule.default || uniModule
/** 当前执行 node 命令时文件夹的地址（工作目录） 即项目根目录（也就是 index.html 文件所在的位置） */
const root: string = process.cwd()

// https://vitejs.dev/config/
export default async ({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const env = loadEnv(mode, path.resolve(root, 'env')) as unknown as ImportMetaEnv // 对原生环境变量进行二次处理
  const { VITE_CLEAR_COMMENT, VITE_DROP_CONSOLE } = env
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    envDir: './env',

    plugins: [
      UniKuRoot(), // 若存在改变 pages.json 的插件，需要将 UniKuRoot 放置其后
      Uni(),
      // 创建 manifest.config.(ts|mts|cts|js|cjs|mjs|json), 然后用 TypeScript 编写你的 manifest.json
      UniManifest(),
      // 即时按需的原子化 CSS 引擎 UnoCSS
      UnoCSS({ inspector: false }),
      /** 自带 api 的自动化导入 */
      AutoImport({
        imports: ['vue', 'pinia', 'uni-app'],
        dts: 'types/auto-generate/auto-import.d.ts',
        dirs: ['src/store/modules', 'src/hooks'], // 配置其它需要导入的文件目录
      }),
    ],

    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },

    css: {
      preprocessorOptions: {},
    },

    esbuild: {
      /**
       * 打包后是否移除所有的 console、debugger
       * http://cosarty.cn/doc/essay/handbook/esbuild.html#drop
       */
      drop: VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : [],
      /**
       * 打包后是否移除所有的注释
       * http://esbuild.docschina.org/api/#legal-comments
       */
      legalComments: VITE_CLEAR_COMMENT === 'true' ? 'none' : 'inline',
    },
  })
}
