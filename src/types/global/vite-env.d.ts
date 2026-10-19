// 扩展 ImportMetaEnv 接口，添加自定义环境变量类型
interface ImportMetaEnv {
  /** 本地缓存统一键前缀 */
  VITE_STORAGE_PREFIX: string

  /** AppID(小程序ID) */
  VITE_MP_WEIXIN_APPID: string
}

// 扩展 ImportMeta 接口，确保类型提示生效
interface ImportMeta {
  readonly env: ImportMetaEnv
}
