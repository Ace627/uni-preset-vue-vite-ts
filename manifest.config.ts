import { loadEnv } from 'vite'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

const VITE_ENV: Record<string, string> = loadEnv('', process.cwd())

export default defineManifestConfig({
  // 属性参考 manifest.json，理论上一比一对齐
  // https://uniapp.dcloud.net.cn/collocation/manifest.html
  name: '',
  appid: '',
  description: '',
  versionName: '1.0.0',
  versionCode: '100',

  /* 小程序特有相关 */
  'mp-weixin': {
    // 微信小程序的 AppID，登录 https://mp.weixin.qq.com 申请
    appid: VITE_ENV.VITE_MP_WEIXIN_APPID,
    // 合并由 Vue 组件编译而成的小程序组件虚拟节点外层属性，目前仅支持 id（v4.42+）、style（v3.5.1+）、class（v3.5.1+）以及 v-show 指令生成的 hidden（v4.41+） 属性
    mergeVirtualHostAttributes: true,
    // 编译到微信小程序平台下的项目设置
    setting: {
      // 是否检查安全域名和 TLS 版本
      urlCheck: false,
    },
  },
})
