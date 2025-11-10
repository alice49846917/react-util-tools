/**
 * 获取 URL 中指定的查询参数
 * @param key 参数名
 * @param url 可选的 URL，默认使用当前页面 URL
 * @returns 参数值，不存在则返回 null
 */
export function getQueryParam(key: string, url?: string): string | null {
  const searchParams = new URLSearchParams(
    url ? new URL(url).search : window.location.search
  )
  return searchParams.get(key)
}

/**
 * 获取 URL 中所有的查询参数
 * @param url 可选的 URL，默认使用当前页面 URL
 * @returns 包含所有参数的对象
 */
export function getAllQueryParams(url?: string): Record<string, string> {
  const searchParams = new URLSearchParams(
    url ? new URL(url).search : window.location.search
  )
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

/**
 * 获取 URL 中指定参数的所有值（支持同名参数）
 * @param key 参数名
 * @param url 可选的 URL，默认使用当前页面 URL
 * @returns 参数值数组
 */
export function getQueryParamAll(key: string, url?: string): string[] {
  const searchParams = new URLSearchParams(
    url ? new URL(url).search : window.location.search
  )
  return searchParams.getAll(key)
}
