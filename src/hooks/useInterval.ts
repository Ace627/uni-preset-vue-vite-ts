/**
 * 基于 VueUse useIntervalFn 思路实现的定时器 Hook
 * 支持响应式间隔、暂停/恢复、立即执行一次回调，并在作用域销毁时自动清理
 */

export interface Pausable {
  /** 定时器是否处于运行状态 */
  isActive: Ref<boolean>
  /** 暂停定时器 */
  pause: () => void
  /** 恢复（或启动）定时器 */
  resume: () => void
}

export interface UseIntervalOptions {
  /** 组件挂载时是否立即启动定时器，默认 true */
  immediate?: boolean
  /** 启动/恢复时是否立即执行一次回调，默认 false */
  immediateCallback?: boolean
}

export function useInterval(callback: () => void, interval: MaybeRef<number> = 1000, options: UseIntervalOptions = {}): Pausable {
  const { immediate = true, immediateCallback = false } = options

  let timer: ReturnType<typeof setInterval> | null = null
  const isActive = ref(false)

  function clean() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    const _interval = unref(interval)
    if (_interval <= 0) return
    isActive.value = true
    if (immediateCallback) callback()
    clean()
    timer = setInterval(callback, _interval)
  }

  if (immediate) resume()

  // 间隔为响应式值时，变化后按新间隔重启
  if (isRef(interval)) {
    watch(interval, () => {
      if (immediate) resume()
    })
  }

  // 组件作用域销毁时自动暂停，防止内存泄漏
  if (getCurrentScope()) onScopeDispose(pause)

  return { isActive, pause, resume }
}
