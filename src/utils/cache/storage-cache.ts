/**
 * 本地存储封装（uni storage 包装器，多端兼容 H5 / 小程序 / App）
 * 特性：
 * - 支持任意 JSON 可序列化值（对象、数组、字符串、数字等）
 * - 支持过期时间（ttl，单位：秒；-1 表示永不过期）
 * - 所有 key 统一加前缀，clear() 不会误删同端其它存储数据
 */

const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX

export class StorageCache {
  /**
   * 写入存储
   * @param key 键（无需带前缀，内部自动拼接）
   * @param value 值（需可 JSON 序列化）
   * @param ttl 过期时间（秒），-1 表示永不过期
   * @returns 是否写入成功（序列化失败时返回 false）
   */
  static set<T = any>(key: string, value: T, ttl: number = -1): boolean {
    try {
      const data = { value, ttl: ttl === -1 ? ttl : Date.now() + ttl * 1000 }
      uni.setStorageSync(STORAGE_PREFIX + key, JSON.stringify(data))
      return true
    } catch {
      return false
    }
  }

  /**
   * 读取存储
   * @param key 键
   * @returns 存储值；不存在或已过期时返回 null
   */
  static get<T = any>(key: string): T | null {
    try {
      const jsonStr = uni.getStorageSync(STORAGE_PREFIX + key)
      if (!jsonStr) return null
      const data = JSON.parse(jsonStr as string)
      if (Date.now() <= data.ttl || data.ttl === -1) return data.value as T
      uni.removeStorageSync(STORAGE_PREFIX + key)
      return null
    } catch {
      uni.removeStorageSync(STORAGE_PREFIX + key)
      return null
    }
  }

  /**
   * 读取存储（带默认值）
   * @param key 键
   * @param defaultValue 不存在或已过期时的默认值
   * @returns 存储值或默认值
   */
  static getWithDefault<T = any>(key: string, defaultValue: T): T {
    return StorageCache.get<T>(key) ?? defaultValue
  }

  /** 删除指定键 */
  static remove(key: string): void {
    uni.removeStorageSync(STORAGE_PREFIX + key)
  }

  /** 清空本工具写入的所有存储（不影响其它存储数据） */
  static clear(): void {
    const { keys } = uni.getStorageInfoSync()
    keys
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => uni.removeStorageSync(key))
  }
}
