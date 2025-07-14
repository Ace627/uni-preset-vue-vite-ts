/** 原生读取出的环境变量类型 */
interface ImportMetaEnv {
  /** 应用默认标题 */
  VITE_APP_TITLE: string

  /** 接口代理地址 */
  VITE_BASE_URL: string

  /** 小程序 AppID */
  VITE_MP_WEIXIN_APP_ID: string

  /** 打包后移除所有的 console、debugger */
  VITE_DROP_CONSOLE: string

  /** 打包后是否移除所有的注释 */
  VITE_CLEAR_COMMENT: string
}

interface ImportMeta {
  /** 利用 Readonly 泛型工具类全部修改为只读属性 */
  readonly env: Readonly<ImportMetaEnv>
}
