import { StorageCache } from './storage-cache'
import type { SystemSetting } from '@/defaultSettings'

export function setSystemSetting(config: SystemSetting) {
  StorageCache.set('systemSetting', config)
}

export function getSystemSetting(): SystemSetting | null {
  return StorageCache.get<SystemSetting>('systemSetting')
}

export function removeSystemSetting() {
  StorageCache.remove('systemSetting')
}
