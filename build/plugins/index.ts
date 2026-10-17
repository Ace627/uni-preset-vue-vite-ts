import type { PluginOption } from 'vite'
import UniKuRoot from '@uni-ku/root'
import uni from '@dcloudio/vite-plugin-uni'
import { registerAutoImport } from './auto-import-plugin'

/** 汇总并注册所有 Vite 插件 */
export async function setupVitePlugins(): Promise<PluginOption[]> {
  const plugins: PluginOption[] = []

  // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
  plugins.push(UniKuRoot())

  /** uni-app 跨端编译插件（核心，负责按平台编译 vue/页面/manifest 等） */
  plugins.push(uni())

  plugins.push(await registerAutoImport())

  return plugins
}
