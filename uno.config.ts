import { defineConfig, presetAttributify, presetWind4 } from 'unocss'
import type { Preset } from 'unocss'
import { presetApplet, presetRemRpx } from 'unocss-applet'

/**
 * UnoCSS中文网 https://unocss.nodejs.cn
 * UnoCSS 样式速查表 https://unocss.dev/interactive
 */
const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false
const presets: Preset[] = []

// 使用小程序预设
if (isApplet) {
  presets.push(presetApplet(), presetRemRpx())
}
// 非小程序用官方预设
else {
  presets.push(presetAttributify(), presetWind4())
}

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.vscode', 'public', 'build', 'config', '.github', 'types'],
    },
  },

  presets: [...presets],

  /** 规则定义工具类和生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则 https://unocss.nodejs.cn/config/rules */
  rules: [
    [/wh-(.+)$/, ([, d]) => ({ width: `${d}`, height: `${d}` })],
    [/mtb-(.+)$/, ([, d]) => ({ margin: `${d} 0` })],
    [/mlr-(.+)$/, ([, d]) => ({ margin: `0 ${d}` })],
    [/ptb-(.+)$/, ([, d]) => ({ padding: `${d} 0` })],
    [/plr-(.+)$/, ([, d]) => ({ padding: `0 ${d}` })],
    ['bg-repeat-none', { 'background-repeat': 'no-repeat' }],
  ],

  /** 受 Windi CSS 的 启发，快捷方式可让你将多个规则组合成一个简写 https://unocss.nodejs.cn/config/shortcuts */
  shortcuts: {
    'wh-full': 'w-full h-full', // 宽高百分比铺满
    'wh-screen': 'w-screen h-screen', // 宽高视口铺满
    'flex-center': 'flex justify-center items-center', // 利用 flex 使子元素垂直水平居中
    clearFix: 'before:content-empty before:table before:clear-both after:content-empty after:table after:clear-both', // 同时解决高度塌陷和外边距折叠的问题
  },
})
