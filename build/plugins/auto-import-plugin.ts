import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

/** Vue / Pinia / uni-app API 按需自动导入 */
export function registerAutoImport(): PluginOption {
  return AutoImport({
    imports: ['vue', 'pinia', 'uni-app'],
    dts: 'src/types/auto-generate/auto-import.d.ts',
    dirs: ['src/store/modules', 'src/hooks'],
  })
}
