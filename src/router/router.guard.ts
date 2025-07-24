import type { Plugin } from 'vue'

const routerGuardHandler: UniNamespace.InterceptorOptions = {
  invoke(options) {
    const pageUrl: string = options.url
    return true
  },
}

export const RouterGuard: Plugin = {
  install() {
    uni.addInterceptor('reLaunch', routerGuardHandler)
    uni.addInterceptor('navigateTo', routerGuardHandler)
    uni.addInterceptor('redirectTo', routerGuardHandler)
    uni.addInterceptor('switchTab', routerGuardHandler)
  },
}
