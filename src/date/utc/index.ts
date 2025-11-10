import {
  parseISO,
  isValid,
  addDays,
  addMonths,
  subDays,
  subMonths,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  getISOWeek,
  getISOWeeksInYear,
  setISOWeek
} from 'date-fns'
import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz'

const UTC_TIMEZONE = 'UTC'

/**
 * 将本地时间转换为 UTC 时间
 * @param date 本地日期对象、时间戳或日期字符串
 * @returns UTC Date 对象
 */
export function toUTC(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return fromZonedTime(dateObj, Intl.DateTimeFormat().resolvedOptions().timeZone)
}

/**
 * 将 UTC 时间转换为本地时间
 * @param utcDate UTC 日期对象、时间戳或日期字符串
 * @returns 本地 Date 对象
 */
export function fromUTC(utcDate: Date | number | string): Date {
  const dateObj = typeof utcDate === 'string' ? parseISO(utcDate) : new Date(utcDate)
  return toZonedTime(dateObj, Intl.DateTimeFormat().resolvedOptions().timeZone)
}

/**
 * 格式化为 UTC 时间字符串
 * @param date 日期对象、时间戳或日期字符串
 * @param formatStr 格式化字符串，默认 'yyyy-MM-dd HH:mm:ss'
 * @returns UTC 时间字符串
 */
export function formatUTC(
  date: Date | number | string,
  formatStr = 'yyyy-MM-dd HH:mm:ss'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  if (!isValid(dateObj)) return ''
  
  return formatInTimeZone(dateObj, UTC_TIMEZONE, formatStr)
}

/**
 * 格式化为 UTC 日期（不含时间）
 * @param date 日期对象、时间戳或日期字符串
 * @returns UTC 日期字符串 'yyyy-MM-dd'
 */
export function formatUTCDateOnly(date: Date | number | string): string {
  return formatUTC(date, 'yyyy-MM-dd')
}

/**
 * 格式化为 UTC 时间（不含日期）
 * @param date 日期对象、时间戳或日期字符串
 * @returns UTC 时间字符串 'HH:mm:ss'
 */
export function formatUTCTimeOnly(date: Date | number | string): string {
  return formatUTC(date, 'HH:mm:ss')
}

/**
 * 格式化为 ISO 8601 UTC 字符串
 * @param date 日期对象、时间戳或日期字符串
 * @returns ISO 8601 格式的 UTC 字符串
 */
export function toISOString(date: Date | number | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return dateObj.toISOString()
}

/**
 * 获取 UTC 当前时间
 * @returns UTC Date 对象
 */
export function getUTCNow(): Date {
  return new Date()
}

/**
 * 获取 UTC 当前时间戳（毫秒）
 * @returns UTC 时间戳
 */
export function getUTCTimestamp(): number {
  return Date.now()
}

/**
 * 获取 UTC 当前时间戳（秒）
 * @returns UTC 时间戳
 */
export function getUTCTimestampInSeconds(): number {
  return Math.floor(Date.now() / 1000)
}

/**
 * 获取 UTC 一天的开始时间（00:00:00）
 * @param date 日期对象、时间戳或日期字符串
 * @returns UTC Date 对象
 */
export function getUTCStartOfDay(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  const utcDate = toZonedTime(dateObj, UTC_TIMEZONE)
  return startOfDay(utcDate)
}

/**
 * 获取 UTC 一天的结束时间（23:59:59）
 * @param date 日期对象、时间戳或日期字符串
 * @returns UTC Date 对象
 */
export function getUTCEndOfDay(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  const utcDate = toZonedTime(dateObj, UTC_TIMEZONE)
  return endOfDay(utcDate)
}

/**
 * 获取 UTC 一个月的开始时间
 * @param date 日期对象、时间戳或日期字符串
 * @returns UTC Date 对象
 */
export function getUTCStartOfMonth(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  const utcDate = toZonedTime(dateObj, UTC_TIMEZONE)
  return startOfMonth(utcDate)
}

/**
 * 获取 UTC 一个月的结束时间
 * @param date 日期对象、时间戳或日期字符串
 * @returns UTC Date 对象
 */
export function getUTCEndOfMonth(date: Date | number | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  const utcDate = toZonedTime(dateObj, UTC_TIMEZONE)
  return endOfMonth(utcDate)
}

/**
 * UTC 时间增加天数
 * @param date 日期对象、时间戳或日期字符串
 * @param amount 天数
 * @returns UTC Date 对象
 */
export function addDaysUTC(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return addDays(dateObj, amount)
}

/**
 * UTC 时间减少天数
 * @param date 日期对象、时间戳或日期字符串
 * @param amount 天数
 * @returns UTC Date 对象
 */
export function subDaysUTC(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return subDays(dateObj, amount)
}

/**
 * UTC 时间增加月数
 * @param date 日期对象、时间戳或日期字符串
 * @param amount 月数
 * @returns UTC Date 对象
 */
export function addMonthsUTC(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return addMonths(dateObj, amount)
}

/**
 * UTC 时间减少月数
 * @param date 日期对象、时间戳或日期字符串
 * @param amount 月数
 * @returns UTC Date 对象
 */
export function subMonthsUTC(date: Date | number | string, amount: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return subMonths(dateObj, amount)
}

/**
 * 计算两个 UTC 时间之间的天数差
 * @param dateLeft 较晚的日期
 * @param dateRight 较早的日期
 * @returns 天数差
 */
export function getUTCDaysDiff(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): number {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInDays(left, right)
}

/**
 * 计算两个 UTC 时间之间的小时差
 * @param dateLeft 较晚的日期
 * @param dateRight 较早的日期
 * @returns 小时差
 */
export function getUTCHoursDiff(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): number {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInHours(left, right)
}

/**
 * 计算两个 UTC 时间之间的分钟差
 * @param dateLeft 较晚的日期
 * @param dateRight 较早的日期
 * @returns 分钟差
 */
export function getUTCMinutesDiff(
  dateLeft: Date | number | string,
  dateRight: Date | number | string
): number {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : new Date(dateLeft)
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : new Date(dateRight)
  return differenceInMinutes(left, right)
}

/**
 * 获取时区偏移量（分钟）
 * @returns 时区偏移量，例如：中国为 -480（UTC+8）
 */
export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset()
}

/**
 * 获取时区偏移量（小时）
 * @returns 时区偏移量，例如：中国为 8（UTC+8）
 */
export function getTimezoneOffsetHours(): number {
  return -new Date().getTimezoneOffset() / 60
}

/**
 * 获取指定年份 UTC 第一天 00:00:00 的时间戳（毫秒）
 * @param year 年份，默认当前年份
 * @returns 时间戳（毫秒）
 */
export function getUTCYearStartTimestamp(year?: number): number {
  const targetYear = year ?? new Date().getUTCFullYear()
  const date = new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0, 0))
  return date.getTime()
}

/**
 * 获取指定年份 UTC 最后一天 23:59:59 的时间戳（毫秒）
 * @param year 年份，默认当前年份
 * @returns 时间戳（毫秒）
 */
export function getUTCYearEndTimestamp(year?: number): number {
  const targetYear = year ?? new Date().getUTCFullYear()
  const date = new Date(Date.UTC(targetYear, 11, 31, 23, 59, 59, 999))
  return date.getTime()
}

/**
 * 获取指定年份 UTC 第一天 00:00:00 的 Date 对象
 * @param year 年份，默认当前年份
 * @returns UTC Date 对象
 */
export function getUTCYearStart(year?: number): Date {
  const targetYear = year ?? new Date().getUTCFullYear()
  return new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0, 0))
}

/**
 * 获取指定年份 UTC 最后一天 23:59:59 的 Date 对象
 * @param year 年份，默认当前年份
 * @returns UTC Date 对象
 */
export function getUTCYearEnd(year?: number): Date {
  const targetYear = year ?? new Date().getUTCFullYear()
  return new Date(Date.UTC(targetYear, 11, 31, 23, 59, 59, 999))
}

/**
 * 获取指定年份有多少周（ISO 周）
 * @param year 年份，默认当前年份
 * @returns 周数（52 或 53）
 */
export function getUTCWeeksInYear(year?: number): number {
  const targetYear = year ?? new Date().getUTCFullYear()
  const date = new Date(Date.UTC(targetYear, 0, 1))
  return getISOWeeksInYear(date)
}

/**
 * 获取指定年份指定周的开始时间（周一 00:00:00 UTC）
 * @param year 年份
 * @param week 周数（1-53）
 * @returns UTC Date 对象
 */
export function getUTCWeekStart(year: number, week: number): Date {
  const date = new Date(Date.UTC(year, 0, 4)) // ISO 周从第一个周四所在的周开始
  const weekDate = setISOWeek(date, week)
  return startOfWeek(weekDate, { weekStartsOn: 1 })
}

/**
 * 获取指定年份指定周的结束时间（周日 23:59:59 UTC）
 * @param year 年份
 * @param week 周数（1-53）
 * @returns UTC Date 对象
 */
export function getUTCWeekEnd(year: number, week: number): Date {
  const date = new Date(Date.UTC(year, 0, 4))
  const weekDate = setISOWeek(date, week)
  return endOfWeek(weekDate, { weekStartsOn: 1 })
}

/**
 * 获取指定年份所有周的时间范围
 * @param year 年份，默认当前年份
 * @returns 包含所有周的开始和结束时间的数组
 */
export function getUTCAllWeeksInYear(
  year?: number
): Array<{ week: number; start: Date; end: Date; startTimestamp: number; endTimestamp: number }> {
  const targetYear = year ?? new Date().getUTCFullYear()
  const weeksCount = getUTCWeeksInYear(targetYear)
  const weeks: Array<{ week: number; start: Date; end: Date; startTimestamp: number; endTimestamp: number }> = []

  for (let week = 1; week <= weeksCount; week++) {
    const start = getUTCWeekStart(targetYear, week)
    const end = getUTCWeekEnd(targetYear, week)
    weeks.push({
      week,
      start,
      end,
      startTimestamp: start.getTime(),
      endTimestamp: end.getTime()
    })
  }

  return weeks
}

/**
 * 获取指定日期是 UTC 时区的第几周
 * @param date 日期对象、时间戳或日期字符串
 * @returns 周数
 */
export function getUTCWeekNumber(date: Date | number | string): number {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
  return getISOWeek(dateObj)
}
