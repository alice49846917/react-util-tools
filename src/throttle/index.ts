/**
 * 节流函数：在 wait 时间内只执行一次
 * @param fn 要节流的函数
 * @param wait 间隔时间（默认 3000ms）
 * @param options {leading, trailing} 是否在开始或结束时触发
 */
function throttleFn<T extends (...args: any[]) => any>(
  fn: T,
  wait = 3000,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastCallTime: number | null = null
  let lastArgs: Parameters<T> | null = null
  const { leading = true, trailing = true } = options

  const invoke = (time: number) => {
    fn(...(lastArgs as Parameters<T>))
    lastCallTime = time
    lastArgs = null
  }

  return function (...args: Parameters<T>) {
    const now = Date.now()
    if (lastCallTime === null && !leading) {
      lastCallTime = now
    }

    const remaining = wait - (now - (lastCallTime ?? 0))
    lastArgs = args

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      invoke(now)
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        timeout = null
        if (trailing && lastArgs) {
          invoke(Date.now())
        }
      }, remaining)
    }
  }
}

/**
 * 防抖函数：触发后 wait 毫秒内不再触发则执行
 * @param fn 要防抖的函数
 * @param wait 延迟时间（默认 500ms）
 * @param immediate 是否在第一次触发时立即执行
 */
function debounceFn<T extends (...args: any[]) => any>(
  fn: T,
  wait = 500,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    const callNow = immediate && !timeout

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) {
        fn(...args)
      }
    }, wait)

    if (callNow) {
      fn(...args)
    }
  }
}

// 按需导出：支持 Tree Shaking
export { throttleFn as throttle, debounceFn as debounce }
