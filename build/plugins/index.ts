import { PluginOption } from 'vite'
import UnoCSS from 'uni-unocss'
import UniKuRoot from '@uni-ku/root'
import Uni from '@uni-helper/plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { registerAutoImport } from './auto-import-plugin'

/** 汇总并注册所有 Vite 插件 */
export async function setupVitePlugins(): Promise<PluginOption[]> {
  const plugins: PluginOption[] = []

  // UnoCSS 原子化 CSS 引擎（提供 class 原子样式与 uni-app 适配）
  plugins.push(UnoCSS())

  // UniKuRoot 根组件插件（为各端提供统一的根节点包裹能力）
  plugins.push(UniKuRoot())

  // manifest.json 条件编译插件（支持在 manifest 中按平台读写配置）
  plugins.push(UniManifest())

  // uni-app 跨端编译插件（核心，负责按平台编译 vue/页面/manifest 等）
  plugins.push(Uni())

  // 自动导入插件（按需导入 vue/pinia/uni-app API 及本地组合式函数，并生成类型声明）
  plugins.push(registerAutoImport())

  return plugins
}
