import {
  format as dateFnsFormat,
  parse,
  parseISO,
  isValid,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addDays,
  addMonths,
  subDays,
  subMonths,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isBefore,
  isAfter,
  isSameDay,
  formatDistanceToNow
} from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 格式化日期
 * @param date 日期对象、时间戳或日期字符串
 * @param formatStr 格式化字符串，默认 'yyyy-MM-dd HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | number | string,
  formatStr = 'yyyy-MM-dd HH:mm:ss'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return isValid(dateObj) ? dateFnsFormat(dateObj, formatStr) : ''
}

/**
 * 格式化为日期（不含时间）
 * @param date 日期对象、时间戳或日期字符串
 * @returns 格式化后的日期字符串 'yyyy-MM-dd'
 */
export function formatDateOnly(date: Date | number | string): string {
  return formatDate(date, 'yyyy-MM-dd')
}

/**
 * 格式化为时间（不含日期）
 * @param date 日期对象、时间戳或日期字符串
 * @returns 格式化后的时间字符串 'HH:mm:ss'
 */
export function formatTimeOnly(date: Date | number | string): string {
  return formatDate(date, 'HH:mm:ss')
}

/**
 * 格式化为相对时间（如：3分钟前、2小时前）
 * @param date 日期对象、时间戳或日期字符串
 * @param locale 语言，默认中文
 * @returns 相对时间字符串
 */
export function formatRelativeTime(
  date: Date | number | string,
  locale: 'zh' | 'en' = 'zh'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  if (!isValid(dateObj)) return ''

  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: locale === 'zh' ? zhCN : undefined
  })
}

/**
 * 解析日期字符串
 * @param dateStr 日期字符串
 * @param formatStr 格式化字符串，默认 'yyyy-MM-dd HH:mm:ss'
 * @returns Date 对象
 */
export function parseDate(
  dateStr: string,
  formatStr = 'yyyy-MM-dd HH:mm:ss'
): Date {
  return parse(dateStr, formatStr, new Date())
}

/**
 * 验证日期是否有效
 * @param date 日期对象、时间戳或日期字符串
 * @returns 是否有效
 */
export function isValidDate(date: Date | number | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return isValid(dateObj)
}

/**
 * 计算两个日期之间的天数差
 * @param dateLeft 较晚的日期
 * @param dateRight 较早的日期
 * @returns 天数差
 */
export function getDaysDiff(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): number {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInDays(left, right)
}

/**
 * 计算两个日期之间的小时差
 * @param dateLeft 较晚的日期
 * @param dateRight 较早的日期
 * @returns 小时差
 */
export function getHoursDiff(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): number {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInHours(left, right)
}

/**
 * 计算两个日期之间的分钟差
 * @param dateLeft 较晚的日期
 * @param dateRight 较早的日期
 * @returns 分钟差
 */
export function getMinutesDiff(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): number {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInMinutes(left, right)
}

/**
 * 增加天数
 * @param date 日期
 * @param amount 天数
 * @returns 新的日期对象
 */
export function addDaysToDate(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return addDays(dateObj, amount)
}

/**
 * 减少天数
 * @param date 日期
 * @param amount 天数
 * @returns 新的日期对象
 */
export function subDaysFromDate(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return subDays(dateObj, amount)
}

/**
 * 增加月数
 * @param date 日期
 * @param amount 月数
 * @returns 新的日期对象
 */
export function addMonthsToDate(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return addMonths(dateObj, amount)
}

/**
 * 减少月数
 * @param date 日期
 * @param amount 月数
 * @returns 新的日期对象
 */
export function subMonthsFromDate(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return subMonths(dateObj, amount)
}

/**
 * 获取一天的开始时间（00:00:00）
 * @param date 日期
 * @returns 新的日期对象
 */
export function getStartOfDay(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfDay(dateObj)
}

/**
 * 获取一天的结束时间（23:59:59）
 * @param date 日期
 * @returns 新的日期对象
 */
export function getEndOfDay(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfDay(dateObj)
}

/**
 * 获取一周的开始时间
 * @param date 日期
 * @returns 新的日期对象
 */
export function getStartOfWeek(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfWeek(dateObj, { weekStartsOn: 1 }) // 周一为一周开始
}

/**
 * 获取一周的结束时间
 * @param date 日期
 * @returns 新的日期对象
 */
export function getEndOfWeek(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfWeek(dateObj, { weekStartsOn: 1 })
}

/**
 * 获取一个月的开始时间
 * @param date 日期
 * @returns 新的日期对象
 */
export function getStartOfMonth(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfMonth(dateObj)
}

/**
 * 获取一个月的结束时间
 * @param date 日期
 * @returns 新的日期对象
 */
export function getEndOfMonth(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfMonth(dateObj)
}

/**
 * 获取一年的开始时间
 * @param date 日期
 * @returns 新的日期对象
 */
export function getStartOfYear(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return startOfYear(dateObj)
}

/**
 * 获取一年的结束时间
 * @param date 日期
 * @returns 新的日期对象
 */
export function getEndOfYear(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return endOfYear(dateObj)
}

/**
 * 判断日期是否在另一个日期之前
 * @param date 要比较的日期
 * @param dateToCompare 比较的目标日期
 * @returns 是否在之前
 */
export function isBeforeDate(
  date: Date | number | string,
  dateToCompare: Date | number | string
): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  const compareObj = typeof dateToCompare === 'string' ? parseISO(dateToCompare) : new Date(dateToCompare)
  return isBefore(dateObj, compareObj)
}

/**
 * 判断日期是否在另一个日期之后
 * @param date 要比较的日期
 * @param dateToCompare 比较的目标日期
 * @returns 是否在之后
 */
export function isAfterDate(
  date: Date | number | string,
  dateToCompare: Date | number | string
): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  const compareObj = typeof dateToCompare === 'string' ? parseISO(dateToCompare) : new Date(dateToCompare)
  return isAfter(dateObj, compareObj)
}

/**
 * 判断两个日期是否是同一天
 * @param dateLeft 第一个日期
 * @param dateRight 第二个日期
 * @returns 是否是同一天
 */
export function isSameDayDate(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): boolean {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return isSameDay(left, right)
}

/**
 * 获取当前时间戳（毫秒）
 * @returns 时间戳
 */
export function getTimestamp(): number {
  return Date.now()
}

/**
 * 获取当前时间戳（秒）
 * @returns 时间戳
 */
export function getTimestampInSeconds(): number {
  return Math.floor(Date.now() / 1000)
}
