import type { PluginOption } from 'vite'

/** Vue / Pinia / uni-app API 按需自动导入 */
export async function registerAutoImport(): Promise<PluginOption> {
  const AutoImport = (await import('unplugin-auto-import/vite')).default
  return AutoImport({
    imports: ['vue', 'pinia', 'uni-app'],
    dts: 'src/types/auto-generate/auto-import.d.ts',
    dirs: ['src/store/modules', 'src/hooks'],
  })
}
