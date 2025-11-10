# UTC 时区工具

专门处理 UTC+0 时区的日期时间工具函数集合。

## 安装

```bash
npm install your-package-name date-fns date-fns-tz
```

## 使用方法

### 导入

```typescript
import {
  toUTC,
  fromUTC,
  formatUTC,
  formatUTCDateOnly,
  formatUTCTimeOnly,
  toISOString,
  getUTCNow,
  getUTCTimestamp,
  getUTCTimestampInSeconds,
  getUTCStartOfDay,
  getUTCEndOfDay,
  getUTCStartOfMonth,
  getUTCEndOfMonth,
  addDaysUTC,
  subDaysUTC,
  addMonthsUTC,
  subMonthsUTC,
  getUTCDaysDiff,
  getUTCHoursDiff,
  getUTCMinutesDiff,
  getTimezoneOffset,
  getTimezoneOffsetHours
} from 'your-package-name/date/utc'
```

## API

### toUTC - 本地时间转 UTC

将本地时间转换为 UTC 时间。

**参数：**
- `date`: 本地日期对象、时间戳或日期字符串

**返回：** UTC Date 对象

**示例：**

```typescript
// 假设当前在 UTC+8 时区（中国）
const localDate = new Date('2024-11-10 15:30:00') // 本地时间

const utcDate = toUTC(localDate)
console.log(utcDate)
// 2024-11-10 07:30:00 UTC（减去8小时）
```

### fromUTC - UTC 转本地时间

将 UTC 时间转换为本地时间。

**参数：**
- `utcDate`: UTC 日期对象、时间戳或日期字符串

**返回：** 本地 Date 对象

**示例：**

```typescript
// 假设当前在 UTC+8 时区（中国）
const utcDate = new Date('2024-11-10T07:30:00.000Z') // UTC 时间

const localDate = fromUTC(utcDate)
console.log(localDate)
// 2024-11-10 15:30:00（加上8小时）
```

### formatUTC - 格式化为 UTC 时间

将日期格式化为 UTC 时区的字符串。

**参数：**
- `date`: 日期对象、时间戳或日期字符串
- `formatStr`: 格式化字符串，默认 `'yyyy-MM-dd HH:mm:ss'`

**返回：** UTC 时间字符串

**示例：**

```typescript
const date = new Date('2024-11-10T15:30:00+08:00') // 中国时间

formatUTC(date)
// "2024-11-10 07:30:00" (UTC 时间)

formatUTC(date, 'yyyy-MM-dd HH:mm')
// "2024-11-10 07:30"

formatUTC(date, 'yyyy年MM月dd日 HH:mm:ss')
// "2024年11月10日 07:30:00"
```

### formatUTCDateOnly - 格式化为 UTC 日期

只格式化 UTC 日期部分，不含时间。

**示例：**

```typescript
const date = new Date('2024-11-10T15:30:00+08:00')

formatUTCDateOnly(date)
// "2024-11-10"
```

### formatUTCTimeOnly - 格式化为 UTC 时间

只格式化 UTC 时间部分，不含日期。

**示例：**

```typescript
const date = new Date('2024-11-10T15:30:00+08:00')

formatUTCTimeOnly(date)
// "07:30:00"
```

### toISOString - 格式化为 ISO 8601 UTC 字符串

将日期格式化为标准的 ISO 8601 格式（UTC 时间）。

**示例：**

```typescript
const date = new Date('2024-11-10 15:30:00')

toISOString(date)
// "2024-11-10T07:30:00.000Z"
```

### getUTCNow - 获取 UTC 当前时间

**示例：**

```typescript
const now = getUTCNow()
console.log(now)
// Date 对象（UTC 时间）
```

### getUTCTimestamp - 获取 UTC 当前时间戳（毫秒）

**示例：**

```typescript
getUTCTimestamp()
// 1699612800000
```

### getUTCTimestampInSeconds - 获取 UTC 当前时间戳（秒）

**示例：**

```typescript
getUTCTimestampInSeconds()
// 1699612800
```

### getUTCStartOfDay - 获取 UTC 一天的开始时间

获取指定日期在 UTC 时区的当天 00:00:00。

**示例：**

```typescript
const date = new Date('2024-11-10T15:30:00+08:00')

getUTCStartOfDay(date)
// 2024-11-10 00:00:00 UTC
```

### getUTCEndOfDay - 获取 UTC 一天的结束时间

获取指定日期在 UTC 时区的当天 23:59:59。

**示例：**

```typescript
const date = new Date('2024-11-10T15:30:00+08:00')

getUTCEndOfDay(date)
// 2024-11-10 23:59:59 UTC
```

### getUTCStartOfMonth - 获取 UTC 一个月的开始时间

**示例：**

```typescript
const date = new Date('2024-11-10')

getUTCStartOfMonth(date)
// 2024-11-01 00:00:00 UTC
```

### getUTCEndOfMonth - 获取 UTC 一个月的结束时间

**示例：**

```typescript
const date = new Date('2024-11-10')

getUTCEndOfMonth(date)
// 2024-11-30 23:59:59 UTC
```

### addDaysUTC - UTC 时间增加天数

**示例：**

```typescript
const date = new Date('2024-11-10T00:00:00Z')

addDaysUTC(date, 7)
// 2024-11-17 00:00:00 UTC
```

### subDaysUTC - UTC 时间减少天数

**示例：**

```typescript
const date = new Date('2024-11-10T00:00:00Z')

subDaysUTC(date, 7)
// 2024-11-03 00:00:00 UTC
```

### addMonthsUTC - UTC 时间增加月数

**示例：**

```typescript
const date = new Date('2024-11-10T00:00:00Z')

addMonthsUTC(date, 2)
// 2025-01-10 00:00:00 UTC
```

### subMonthsUTC - UTC 时间减少月数

**示例：**

```typescript
const date = new Date('2024-11-10T00:00:00Z')

subMonthsUTC(date, 2)
// 2024-09-10 00:00:00 UTC
```

### getUTCDaysDiff - 计算 UTC 时间天数差

**示例：**

```typescript
const date1 = new Date('2024-11-10T00:00:00Z')
const date2 = new Date('2024-11-15T00:00:00Z')

getUTCDaysDiff(date2, date1)
// 5
```

### getUTCHoursDiff - 计算 UTC 时间小时差

**示例：**

```typescript
const date1 = new Date('2024-11-10T10:00:00Z')
const date2 = new Date('2024-11-10T15:30:00Z')

getUTCHoursDiff(date2, date1)
// 5
```

### getUTCMinutesDiff - 计算 UTC 时间分钟差

**示例：**

```typescript
const date1 = new Date('2024-11-10T10:00:00Z')
const date2 = new Date('2024-11-10T10:30:00Z')

getUTCMinutesDiff(date2, date1)
// 30
```

### getTimezoneOffset - 获取时区偏移量（分钟）

获取当前时区相对于 UTC 的偏移量（分钟）。

**返回：** 时区偏移量，例如：中国为 -480（UTC+8）

**示例：**

```typescript
// 在中国（UTC+8）
getTimezoneOffset()
// -480

// 在英国（UTC+0）
getTimezoneOffset()
// 0

// 在美国东部（UTC-5）
getTimezoneOffset()
// 300
```

### getTimezoneOffsetHours - 获取时区偏移量（小时）

获取当前时区相对于 UTC 的偏移量（小时）。

**返回：** 时区偏移量，例如：中国为 8（UTC+8）

**示例：**

```typescript
// 在中国（UTC+8）
getTimezoneOffsetHours()
// 8

// 在英国（UTC+0）
getTimezoneOffsetHours()
// 0

// 在美国东部（UTC-5）
getTimezoneOffsetHours()
// -5
```

## 实际应用场景

### 后端 API 交互

```typescript
import { toISOString, fromUTC } from 'your-package-name/date/utc'

// 发送给后端（转为 UTC ISO 字符串）
const localDate = new Date('2024-11-10 15:30:00')
const apiData = {
  startDate: toISOString(localDate)
  // "2024-11-10T07:30:00.000Z"
}

// 从后端接收（UTC 转本地时间）
const response = {
  createdAt: '2024-11-10T07:30:00.000Z'
}
const localCreatedAt = fromUTC(response.createdAt)
// 2024-11-10 15:30:00（本地时间）
```

### 跨时区数据展示

```typescript
import { formatUTC, getTimezoneOffsetHours } from 'your-package-name/date/utc'

const serverTime = '2024-11-10T10:00:00.000Z' // 服务器 UTC 时间

// 显示 UTC 时间
console.log(`UTC 时间: ${formatUTC(serverTime)}`)
// "UTC 时间: 2024-11-10 10:00:00"

// 显示当前时区
const offset = getTimezoneOffsetHours()
console.log(`当前时区: UTC${offset >= 0 ? '+' : ''}${offset}`)
// "当前时区: UTC+8"
```

### 日志记录

```typescript
import { formatUTC, getUTCTimestamp } from 'your-package-name/date/utc'

// 记录日志时使用 UTC 时间
const log = {
  message: '用户登录',
  timestamp: getUTCTimestamp(),
  time: formatUTC(new Date())
}

console.log(log)
// {
//   message: '用户登录',
//   timestamp: 1699612800000,
//   time: '2024-11-10 07:30:00'
// }
```

### 定时任务

```typescript
import { getUTCStartOfDay, formatUTC } from 'your-package-name/date/utc'

// 计算下一个 UTC 0点的时间
const now = new Date()
const nextUTCMidnight = getUTCStartOfDay(addDaysUTC(now, 1))

console.log(`下次执行时间（UTC）: ${formatUTC(nextUTCMidnight)}`)
// "下次执行时间（UTC）: 2024-11-11 00:00:00"
```

### 数据统计（UTC 时间范围）

```typescript
import { getUTCStartOfMonth, getUTCEndOfMonth, formatUTC } from 'your-package-name/date/utc'

const today = new Date()

// 获取本月的 UTC 时间范围
const monthStart = getUTCStartOfMonth(today)
const monthEnd = getUTCEndOfMonth(today)

fetchData({
  startDate: formatUTC(monthStart, 'yyyy-MM-dd'),
  endDate: formatUTC(monthEnd, 'yyyy-MM-dd')
})
// {
//   startDate: "2024-11-01",
//   endDate: "2024-11-30"
// }
```

### 时区转换显示

```typescript
import { formatUTC, fromUTC, getTimezoneOffsetHours } from 'your-package-name/date/utc'

const utcTime = '2024-11-10T10:00:00.000Z'

// 显示多个时区的时间
console.log(`UTC 时间: ${formatUTC(utcTime)}`)
// "UTC 时间: 2024-11-10 10:00:00"

console.log(`本地时间: ${formatDate(fromUTC(utcTime))}`)
// "本地时间: 2024-11-10 18:00:00" (假设在 UTC+8)

const offset = getTimezoneOffsetHours()
console.log(`时区偏移: UTC${offset >= 0 ? '+' : ''}${offset}`)
// "时区偏移: UTC+8"
```

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
const utcDate: Date = toUTC(new Date())
const localDate: Date = fromUTC(new Date())
const formatted: string = formatUTC(new Date())
const timestamp: number = getUTCTimestamp()
const offset: number = getTimezoneOffset()
```

## 注意事项

- 所有 UTC 函数都基于 UTC+0 时区进行计算
- `toUTC` 和 `fromUTC` 用于本地时间和 UTC 时间的相互转换
- 时间戳（`getUTCTimestamp`）本身就是 UTC 时间，与时区无关
- 使用 `toISOString` 可以获得标准的 ISO 8601 格式（后端 API 常用）
- 时区偏移量：正数表示东时区（如 UTC+8），负数表示西时区（如 UTC-5）
- 建议在与后端交互时统一使用 UTC 时间，避免时区混淆


### getUTCYearStartTimestamp - 获取年份第一天时间戳

获取指定年份 UTC 第一天 00:00:00 的时间戳（毫秒）。

**参数：**
- `year`: 年份，默认当前年份

**返回：** 时间戳（毫秒）

**示例：**

```typescript
// 获取 2024 年第一天的时间戳
getUTCYearStartTimestamp(2024)
// 1704067200000 (2024-01-01 00:00:00 UTC)

// 获取当前年份第一天的时间戳
getUTCYearStartTimestamp()
// 当前年份 1 月 1 日 00:00:00 UTC 的时间戳
```

### getUTCYearEndTimestamp - 获取年份最后一天时间戳

获取指定年份 UTC 最后一天 23:59:59 的时间戳（毫秒）。

**参数：**
- `year`: 年份，默认当前年份

**返回：** 时间戳（毫秒）

**示例：**

```typescript
// 获取 2024 年最后一天的时间戳
getUTCYearEndTimestamp(2024)
// 1735689599999 (2024-12-31 23:59:59.999 UTC)

// 获取当前年份最后一天的时间戳
getUTCYearEndTimestamp()
// 当前年份 12 月 31 日 23:59:59 UTC 的时间戳
```

### getUTCYearStart - 获取年份第一天 Date 对象

获取指定年份 UTC 第一天 00:00:00 的 Date 对象。

**示例：**

```typescript
getUTCYearStart(2024)
// Date 对象: 2024-01-01 00:00:00 UTC

getUTCYearStart()
// 当前年份第一天
```

### getUTCYearEnd - 获取年份最后一天 Date 对象

获取指定年份 UTC 最后一天 23:59:59 的 Date 对象。

**示例：**

```typescript
getUTCYearEnd(2024)
// Date 对象: 2024-12-31 23:59:59 UTC

getUTCYearEnd()
// 当前年份最后一天
```

### getUTCWeeksInYear - 获取一年有多少周

获取指定年份有多少周（ISO 8601 标准，一年有 52 或 53 周）。

**参数：**
- `year`: 年份，默认当前年份

**返回：** 周数（52 或 53）

**示例：**

```typescript
getUTCWeeksInYear(2024)
// 52

getUTCWeeksInYear(2020)
// 53

getUTCWeeksInYear()
// 当前年份的周数
```

### getUTCWeekStart - 获取指定周的开始时间

获取指定年份指定周的开始时间（周一 00:00:00 UTC）。

**参数：**
- `year`: 年份
- `week`: 周数（1-53）

**返回：** UTC Date 对象

**示例：**

```typescript
// 获取 2024 年第 1 周的开始时间
getUTCWeekStart(2024, 1)
// 2024-01-01 00:00:00 UTC (周一)

// 获取 2024 年第 10 周的开始时间
getUTCWeekStart(2024, 10)
// 2024-03-04 00:00:00 UTC (周一)
```

### getUTCWeekEnd - 获取指定周的结束时间

获取指定年份指定周的结束时间（周日 23:59:59 UTC）。

**参数：**
- `year`: 年份
- `week`: 周数（1-53）

**返回：** UTC Date 对象

**示例：**

```typescript
// 获取 2024 年第 1 周的结束时间
getUTCWeekEnd(2024, 1)
// 2024-01-07 23:59:59 UTC (周日)

// 获取 2024 年第 10 周的结束时间
getUTCWeekEnd(2024, 10)
// 2024-03-10 23:59:59 UTC (周日)
```

### getUTCAllWeeksInYear - 获取一年所有周的时间范围

获取指定年份所有周的开始和结束时间。

**参数：**
- `year`: 年份，默认当前年份

**返回：** 包含所有周信息的数组

**示例：**

```typescript
const weeks = getUTCAllWeeksInYear(2024)
console.log(weeks)
/*
[
  {
    week: 1,
    start: Date (2024-01-01 00:00:00 UTC),
    end: Date (2024-01-07 23:59:59 UTC),
    startTimestamp: 1704067200000,
    endTimestamp: 1704671999999
  },
  {
    week: 2,
    start: Date (2024-01-08 00:00:00 UTC),
    end: Date (2024-01-14 23:59:59 UTC),
    startTimestamp: 1704672000000,
    endTimestamp: 1705276799999
  },
  // ... 共 52 或 53 周
]
*/

// 遍历所有周
weeks.forEach(({ week, start, end }) => {
  console.log(`第 ${week} 周: ${formatUTC(start)} 至 ${formatUTC(end)}`)
})
```

### getUTCWeekNumber - 获取日期是第几周

获取指定日期是 UTC 时区的第几周（ISO 8601 标准）。

**参数：**
- `date`: 日期对象、时间戳或日期字符串

**返回：** 周数

**示例：**

```typescript
getUTCWeekNumber(new Date('2024-01-01'))
// 1

getUTCWeekNumber(new Date('2024-03-15'))
// 11

getUTCWeekNumber(new Date())
// 当前是第几周
```

## 更多应用场景

### 年度数据统计

```typescript
import { getUTCYearStartTimestamp, getUTCYearEndTimestamp } from 'your-package-name/date/utc'

// 获取 2024 年全年数据
const yearStart = getUTCYearStartTimestamp(2024)
const yearEnd = getUTCYearEndTimestamp(2024)

fetchYearlyData({
  startTimestamp: yearStart,
  endTimestamp: yearEnd
})
```

### 周报表生成

```typescript
import { getUTCWeekStart, getUTCWeekEnd, formatUTC } from 'your-package-name/date/utc'

// 生成第 10 周的报表
const weekStart = getUTCWeekStart(2024, 10)
const weekEnd = getUTCWeekEnd(2024, 10)

console.log(`第 10 周报表`)
console.log(`时间范围: ${formatUTC(weekStart)} 至 ${formatUTC(weekEnd)}`)

fetchWeeklyReport({
  startDate: weekStart,
  endDate: weekEnd
})
```

### 获取当前周数

```typescript
import { getUTCWeekNumber } from 'your-package-name/date/utc'

const currentWeek = getUTCWeekNumber(new Date())
console.log(`当前是 2024 年第 ${currentWeek} 周`)
```

### 生成全年周历

```typescript
import { getUTCAllWeeksInYear, formatUTC } from 'your-package-name/date/utc'

const weeks = getUTCAllWeeksInYear(2024)

// 生成周历表格
weeks.forEach(({ week, start, end }) => {
  console.log(`第 ${week} 周: ${formatUTC(start, 'MM-dd')} ~ ${formatUTC(end, 'MM-dd')}`)
})

/*
第 1 周: 01-01 ~ 01-07
第 2 周: 01-08 ~ 01-14
第 3 周: 01-15 ~ 01-21
...
第 52 周: 12-23 ~ 12-29
*/
```

### 按周统计数据

```typescript
import { getUTCWeeksInYear, getUTCWeekStart, getUTCWeekEnd } from 'your-package-name/date/utc'

const year = 2024
const weeksCount = getUTCWeeksInYear(year)

// 获取每周的数据
for (let week = 1; week <= weeksCount; week++) {
  const weekStart = getUTCWeekStart(year, week)
  const weekEnd = getUTCWeekEnd(year, week)
  
  const data = await fetchWeeklyData({
    startTimestamp: weekStart.getTime(),
    endTimestamp: weekEnd.getTime()
  })
  
  console.log(`第 ${week} 周数据:`, data)
}
```

### 判断日期所在周

```typescript
import { getUTCWeekNumber, getUTCWeekStart, getUTCWeekEnd, formatUTC } from 'your-package-name/date/utc'

const date = new Date('2024-03-15')
const weekNumber = getUTCWeekNumber(date)
const weekStart = getUTCWeekStart(2024, weekNumber)
const weekEnd = getUTCWeekEnd(2024, weekNumber)

console.log(`${formatUTC(date, 'yyyy-MM-dd')} 是第 ${weekNumber} 周`)
console.log(`该周范围: ${formatUTC(weekStart, 'yyyy-MM-dd')} 至 ${formatUTC(weekEnd, 'yyyy-MM-dd')}`)
```
