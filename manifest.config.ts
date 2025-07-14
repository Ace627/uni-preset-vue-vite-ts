import path from 'path'
import { loadEnv } from 'vite'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

const wrapperEnv = loadEnv(import.meta.env.NODE_ENV, path.resolve(process.cwd(), 'env')) as unknown as ImportMetaEnv

export default defineManifestConfig({
  name: wrapperEnv.VITE_APP_TITLE,
  appid: '',
  description: '',
  versionName: '1.0.0',
  versionCode: '100',
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
    },
    /* 模块配置 */
    modules: {},
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
        ],
      },
      /* ios打包配置 */
      ios: {},
      /* SDK配置 */
      sdkConfigs: {},
    },
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  'mp-weixin': {
    // 微信小程序的 AppID，登录 https://mp.weixin.qq.com 申请
    appid: wrapperEnv.VITE_MP_WEIXIN_APP_ID,
    // 编译到微信小程序平台下的项目设置
    setting: {
      urlCheck: false, // 是否检查安全域名和 TLS 版本
      es6: false, // 是否开启 ES6 转 ES5（使用微信小程序手势组件会强制开启 ES6 转 ES5）
      minified: true, // 上传代码时是否自动压缩
    },
    usingComponents: true,
    __usePrivacyCheck__: true,
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: '3',
})
