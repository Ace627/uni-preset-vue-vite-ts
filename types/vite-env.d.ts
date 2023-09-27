interface ImportMetaEnv {
  /** 小程序 APPID */
  VITE_APP_APPID: string
  /** 打包后移除 console、debugger */
  VITE_DROP_CONSOLE: string
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
