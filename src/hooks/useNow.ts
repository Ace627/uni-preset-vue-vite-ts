/**
 * 基于 VueUse useNow 思路实现的当前时间 Hook
 * 返回一个只读的响应式 Date，创建时即取当前时间并自动刷新，可配合 useDateFormat 等格式化使用
 */
export interface UseNowOptions<DateValue extends Date = Date> {
  /**
   * 刷新方式：'requestAnimationFrame' 表示逐帧刷新（默认），或指定毫秒间隔（支持响应式值）
   */
  interval?: 'requestAnimationFrame' | MaybeRef<number>
  /**
   * 自定义取时函数，默认 () => new Date()
   */
  now?: () => DateValue
}

export function useNow<DateValue extends Date = Date>(options: UseNowOptions<DateValue> = {}): Readonly<Ref<DateValue>> {
  const { interval = 'requestAnimationFrame', now: nowFactory = () => new Date() as DateValue } = options

  const now = ref(nowFactory()) as Ref<DateValue>

  function update() {
    now.value = nowFactory()
  }

  if (interval === 'requestAnimationFrame' && typeof requestAnimationFrame === 'function') {
    // 逐帧刷新，对齐 VueUse useRafFn 行为
    let frameId: number = requestAnimationFrame(function loop() {
      update()
      frameId = requestAnimationFrame(loop)
    })
    if (getCurrentScope()) onScopeDispose(() => cancelAnimationFrame(frameId))
  } else {
    // 小程序等无 requestAnimationFrame 的环境，或指定毫秒间隔时，退化为定时器刷新
    useInterval(update, interval === 'requestAnimationFrame' ? 1000 : interval)
  }

  return readonly(now) as Readonly<Ref<DateValue>>
}
