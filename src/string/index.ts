/**
 * 字符串工具函数
 */

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 驼峰命名转换（首字母小写）
 * @param str 字符串
 * @returns 驼峰命名字符串
 */
export function camelCase(str: string): string {
  if (!str) return ''
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, char => char.toLowerCase())
}

/**
 * 帕斯卡命名转换（首字母大写）
 * @param str 字符串
 * @returns 帕斯卡命名字符串
 */
export function pascalCase(str: string): string {
  if (!str) return ''
  const camel = camelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

/**
 * 蛇形命名转换（下划线分隔）
 * @param str 字符串
 * @returns 蛇形命名字符串
 */
export function snakeCase(str: string): string {
  if (!str) return ''
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/[-\s]+/g, '_')
    .replace(/^_/, '')
    .toLowerCase()
}

/**
 * 短横线命名转换（kebab-case）
 * @param str 字符串
 * @returns 短横线命名字符串
 */
export function kebabCase(str: string): string {
  if (!str) return ''
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[_\s]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase()
}

/**
 * 截断字符串
 * @param str 字符串
 * @param length 最大长度
 * @param suffix 后缀，默认 '...'
 * @returns 截断后的字符串
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (!str || str.length <= length) return str
  return str.slice(0, length) + suffix
}

/**
 * 移除字符串两端空格
 * @param str 字符串
 * @returns 移除空格后的字符串
 */
export function trim(str: string): string {
  return str ? str.trim() : ''
}

/**
 * 移除字符串左侧空格
 * @param str 字符串
 * @returns 移除空格后的字符串
 */
export function trimStart(str: string): string {
  return str ? str.trimStart() : ''
}

/**
 * 移除字符串右侧空格
 * @param str 字符串
 * @returns 移除空格后的字符串
 */
export function trimEnd(str: string): string {
  return str ? str.trimEnd() : ''
}

/**
 * 反转字符串
 * @param str 字符串
 * @returns 反转后的字符串
 */
export function reverse(str: string): string {
  if (!str) return ''
  return str.split('').reverse().join('')
}

/**
 * 重复字符串
 * @param str 字符串
 * @param count 重复次数
 * @returns 重复后的字符串
 */
export function repeat(str: string, count: number): string {
  if (!str || count <= 0) return ''
  return str.repeat(count)
}

/**
 * 填充字符串（左侧）
 * @param str 字符串
 * @param length 目标长度
 * @param padStr 填充字符，默认空格
 * @returns 填充后的字符串
 */
export function padStart(str: string, length: number, padStr = ' '): string {
  if (!str) return padStr.repeat(length)
  return str.padStart(length, padStr)
}

/**
 * 填充字符串（右侧）
 * @param str 字符串
 * @param length 目标长度
 * @param padStr 填充字符，默认空格
 * @returns 填充后的字符串
 */
export function padEnd(str: string, length: number, padStr = ' '): string {
  if (!str) return padStr.repeat(length)
  return str.padEnd(length, padStr)
}

/**
 * 判断字符串是否以指定字符串开头
 * @param str 字符串
 * @param searchString 搜索字符串
 * @returns 是否以指定字符串开头
 */
export function startsWith(str: string, searchString: string): boolean {
  if (!str) return false
  return str.startsWith(searchString)
}

/**
 * 判断字符串是否以指定字符串结尾
 * @param str 字符串
 * @param searchString 搜索字符串
 * @returns 是否以指定字符串结尾
 */
export function endsWith(str: string, searchString: string): boolean {
  if (!str) return false
  return str.endsWith(searchString)
}

/**
 * 判断字符串是否包含指定字符串
 * @param str 字符串
 * @param searchString 搜索字符串
 * @returns 是否包含指定字符串
 */
export function includes(str: string, searchString: string): boolean {
  if (!str) return false
  return str.includes(searchString)
}

/**
 * 替换字符串中的所有匹配项
 * @param str 字符串
 * @param search 搜索字符串或正则表达式
 * @param replacement 替换字符串
 * @returns 替换后的字符串
 */
export function replaceAll(
  str: string,
  search: string | RegExp,
  replacement: string
): string {
  if (!str) return ''
  if (typeof search === 'string') {
    return str.split(search).join(replacement)
  }
  return str.replace(search, replacement)
}

/**
 * 移除字符串中的 HTML 标签
 * @param str 字符串
 * @returns 移除 HTML 标签后的字符串
 */
export function stripHtml(str: string): string {
  if (!str) return ''
  return str.replace(/<[^>]*>/g, '')
}

/**
 * 转义 HTML 特殊字符
 * @param str 字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string {
  if (!str) return ''
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return str.replace(/[&<>"']/g, char => map[char])
}

/**
 * 反转义 HTML 特殊字符
 * @param str 字符串
 * @returns 反转义后的字符串
 */
export function unescapeHtml(str: string): string {
  if (!str) return ''
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }
  return str.replace(/&(amp|lt|gt|quot|#39);/g, entity => map[entity])
}

/**
 * 转换为小写
 * @param str 字符串
 * @returns 小写字符串
 */
export function toLowerCase(str: string): string {
  return str ? str.toLowerCase() : ''
}

/**
 * 转换为大写
 * @param str 字符串
 * @returns 大写字符串
 */
export function toUpperCase(str: string): string {
  return str ? str.toUpperCase() : ''
}

/**
 * 单词首字母大写
 * @param str 字符串
 * @returns 单词首字母大写的字符串
 */
export function titleCase(str: string): string {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * 判断是否为空字符串（包括只有空格的字符串）
 * @param str 字符串
 * @returns 是否为空
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0
}

/**
 * 判断是否不为空字符串
 * @param str 字符串
 * @returns 是否不为空
 */
export function isNotEmpty(str: string): boolean {
  return !isEmpty(str)
}

/**
 * 获取字符串长度（支持 Unicode）
 * @param str 字符串
 * @returns 字符串长度
 */
export function length(str: string): number {
  if (!str) return 0
  return Array.from(str).length
}

/**
 * 分割字符串为数组
 * @param str 字符串
 * @param separator 分隔符
 * @returns 字符串数组
 */
export function split(str: string, separator: string | RegExp): string[] {
  if (!str) return []
  return str.split(separator)
}

/**
 * 提取数字
 * @param str 字符串
 * @returns 数字数组
 */
export function extractNumbers(str: string): number[] {
  if (!str) return []
  const matches = str.match(/\d+(\.\d+)?/g)
  return matches ? matches.map(Number) : []
}

/**
 * 移除所有空格
 * @param str 字符串
 * @returns 移除空格后的字符串
 */
export function removeSpaces(str: string): string {
  if (!str) return ''
  return str.replace(/\s+/g, '')
}

/**
 * 移除多余空格（保留单个空格）
 * @param str 字符串
 * @returns 移除多余空格后的字符串
 */
export function normalizeSpaces(str: string): string {
  if (!str) return ''
  return str.replace(/\s+/g, ' ').trim()
}

/**
 * 计算字符串中某个子串出现的次数
 * @param str 字符串
 * @param searchString 搜索字符串
 * @returns 出现次数
 */
export function countOccurrences(str: string, searchString: string): number {
  if (!str || !searchString) return 0
  return str.split(searchString).length - 1
}

/**
 * 随机字符串生成
 * @param length 长度
 * @param chars 字符集，默认包含字母和数字
 * @returns 随机字符串
 */
export function randomString(
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成 UUID v4
 * @returns UUID 字符串
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 手机号脱敏
 * @param phone 手机号
 * @returns 脱敏后的手机号
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 11) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 身份证号脱敏
 * @param idCard 身份证号
 * @returns 脱敏后的身份证号
 */
export function maskIdCard(idCard: string): string {
  if (!idCard || idCard.length < 18) return idCard
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
}

/**
 * 银行卡号脱敏
 * @param cardNumber 银行卡号
 * @returns 脱敏后的银行卡号
 */
export function maskBankCard(cardNumber: string): string {
  if (!cardNumber || cardNumber.length < 16) return cardNumber
  return cardNumber.replace(/(\d{4})\d+(\d{4})/, '$1 **** **** $2')
}

/**
 * 姓名脱敏
 * @param name 姓名
 * @returns 脱敏后的姓名
 */
export function maskName(name: string): string {
  if (!name) return ''
  if (name.length === 2) {
    return name.charAt(0) + '*'
  }
  return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1)
}

/**
 * 判断是否为有效的手机号（中国大陆）
 * @param phone 手机号
 * @returns 是否有效
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 判断是否为有效的邮箱
 * @param email 邮箱
 * @returns 是否有效
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * 判断是否为有效的 URL
 * @param url URL
 * @returns 是否有效
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 判断是否为有效的身份证号（中国大陆）
 * @param idCard 身份证号
 * @returns 是否有效
 */
export function isValidIdCard(idCard: string): boolean {
  if (!idCard) return false
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

/**
 * 字符串转 Base64
 * @param str 字符串
 * @returns Base64 字符串
 */
export function toBase64(str: string): string {
  if (!str) return ''
  if (typeof window !== 'undefined' && window.btoa) {
    try {
      return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16))
      }))
    } catch {
      return ''
    }
  }
  // Node.js 环境
  try {
    const BufferClass = (globalThis as any).Buffer
    return BufferClass ? BufferClass.from(str, 'utf-8').toString('base64') : ''
  } catch {
    return ''
  }
}

/**
 * Base64 转字符串
 * @param base64 Base64 字符串
 * @returns 原始字符串
 */
export function fromBase64(base64: string): string {
  if (!base64) return ''
  if (typeof window !== 'undefined' && window.atob) {
    try {
      const binary = window.atob(base64)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }
      return new TextDecoder().decode(bytes)
    } catch {
      return ''
    }
  }
  // Node.js 环境
  try {
    const BufferClass = (globalThis as any).Buffer
    return BufferClass ? BufferClass.from(base64, 'base64').toString('utf-8') : ''
  } catch {
    return ''
  }
}
