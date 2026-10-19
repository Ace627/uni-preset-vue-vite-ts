import { defineConfig, presetUni } from 'uni-unocss'

export default defineConfig({
  presets: [
    presetUni(), // uni-app 预设，必需，自动处理 rpx/px 单位转换等
  ],

  /** 规则定义工具类和生成的 CSS。UnoCSS 有许多内置规则，但也允许轻松添加自定义规则 https://unocss.nodejs.cn/config/rules */
  rules: [[/wh-(.+)$/, ([, d]) => ({ width: `${d}`, height: `${d}` })]],

  /** 受 Windi CSS 的 启发，快捷方式可让你将多个规则组合成一个简写 https://unocss.nodejs.cn/config/shortcuts */
  shortcuts: {
    'flex-center': 'flex justify-center items-center', // 利用 flex 使子元素垂直水平居中
    clearFix: 'before:content-empty before:table before:clear-both after:content-empty after:table after:clear-both', // 同时解决高度塌陷和外边距折叠的问题
  },
})
