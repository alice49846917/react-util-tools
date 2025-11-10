# Date 工具

基于 date-fns 封装的日期时间处理工具函数集合。

## 安装

```bash
npm install your-package-name date-fns
```

## 使用方法

### 导入

```typescript
import {
  formatDate,
  formatDateOnly,
  formatTimeOnly,
  formatRelativeTime,
  parseDate,
  isValidDate,
  getDaysDiff,
  getHoursDiff,
  getMinutesDiff,
  addDaysToDate,
  subDaysFromDate,
  addMonthsToDate,
  subMonthsFromDate,
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  isBeforeDate,
  isAfterDate,
  isSameDayDate,
  getTimestamp,
  getTimestampInSeconds
} from 'your-package-name'
```

## API

### formatDate - 格式化日期

将日期格式化为指定格式的字符串。

**参数：**
- `date`: Date 对象、时间戳或日期字符串
- `formatStr`: 格式化字符串，默认 `'yyyy-MM-dd HH:mm:ss'`

**返回：** 格式化后的日期字符串

**示例：**

```typescript
const now = new Date()

formatDate(now)
// "2024-11-10 15:30:45"

formatDate(now, 'yyyy年MM月dd日')
// "2024年11月10日"

formatDate(now, 'yyyy/MM/dd HH:mm')
// "2024/11/10 15:30"

// 使用时间戳
formatDate(1699612800000)
// "2023-11-10 16:00:00"

// 使用 ISO 字符串
formatDate('2024-11-10T15:30:45.000Z')
// "2024-11-10 23:30:45"
```

### formatDateOnly - 格式化为日期

只格式化日期部分，不含时间。

**示例：**

```typescript
formatDateOnly(new Date())
// "2024-11-10"

formatDateOnly(1699612800000)
// "2023-11-10"
```

### formatTimeOnly - 格式化为时间

只格式化时间部分，不含日期。

**示例：**

```typescript
formatTimeOnly(new Date())
// "15:30:45"

formatTimeOnly(1699612800000)
// "16:00:00"
```

### formatRelativeTime - 格式化为相对时间

将日期格式化为相对于现在的时间描述。

**参数：**
- `date`: Date 对象、时间戳或日期字符串
- `locale`: 语言，`'zh'` 或 `'en'`，默认 `'zh'`

**示例：**

```typescript
const now = new Date()
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

formatRelativeTime(fiveMinutesAgo)
// "5 分钟前"

formatRelativeTime(twoHoursAgo)
// "大约 2 小时前"

formatRelativeTime(yesterday)
// "1 天前"

// 英文
formatRelativeTime(fiveMinutesAgo, 'en')
// "5 minutes ago"
```

### parseDate - 解析日期字符串

将日期字符串解析为 Date 对象。

**参数：**
- `dateStr`: 日期字符串
- `formatStr`: 格式化字符串，默认 `'yyyy-MM-dd HH:mm:ss'`

**示例：**

```typescript
parseDate('2024-11-10 15:30:45')
// Date 对象

parseDate('2024/11/10', 'yyyy/MM/dd')
// Date 对象

parseDate('2024年11月10日', 'yyyy年MM月dd日')
// Date 对象
```

### isValidDate - 验证日期是否有效

**示例：**

```typescript
isValidDate(new Date())
// true

isValidDate('2024-11-10')
// true

isValidDate('invalid date')
// false

isValidDate(NaN)
// false
```

### getDaysDiff - 计算天数差

计算两个日期之间相差的天数。

**示例：**

```typescript
const date1 = new Date('2024-11-10')
const date2 = new Date('2024-11-15')

getDaysDiff(date2, date1)
// 5

getDaysDiff(date1, date2)
// -5
```

### getHoursDiff - 计算小时差

**示例：**

```typescript
const date1 = new Date('2024-11-10 10:00:00')
const date2 = new Date('2024-11-10 15:30:00')

getHoursDiff(date2, date1)
// 5
```

### getMinutesDiff - 计算分钟差

**示例：**

```typescript
const date1 = new Date('2024-11-10 10:00:00')
const date2 = new Date('2024-11-10 10:30:00')

getMinutesDiff(date2, date1)
// 30
```

### addDaysToDate - 增加天数

**示例：**

```typescript
const today = new Date('2024-11-10')

addDaysToDate(today, 7)
// 2024-11-17

addDaysToDate(today, -7)
// 2024-11-03
```

### subDaysFromDate - 减少天数

**示例：**

```typescript
const today = new Date('2024-11-10')

subDaysFromDate(today, 7)
// 2024-11-03
```

### addMonthsToDate - 增加月数

**示例：**

```typescript
const date = new Date('2024-11-10')

addMonthsToDate(date, 2)
// 2025-01-10
```

### subMonthsFromDate - 减少月数

**示例：**

```typescript
const date = new Date('2024-11-10')

subMonthsFromDate(date, 2)
// 2024-09-10
```

### getStartOfDay - 获取一天的开始时间

获取指定日期当天的 00:00:00。

**示例：**

```typescript
const date = new Date('2024-11-10 15:30:45')

getStartOfDay(date)
// 2024-11-10 00:00:00
```

### getEndOfDay - 获取一天的结束时间

获取指定日期当天的 23:59:59。

**示例：**

```typescript
const date = new Date('2024-11-10 15:30:45')

getEndOfDay(date)
// 2024-11-10 23:59:59
```

### getStartOfWeek - 获取一周的开始时间

获取指定日期所在周的周一 00:00:00。

**示例：**

```typescript
const date = new Date('2024-11-10') // 周日

getStartOfWeek(date)
// 2024-11-04 00:00:00 (周一)
```

### getEndOfWeek - 获取一周的结束时间

获取指定日期所在周的周日 23:59:59。

**示例：**

```typescript
const date = new Date('2024-11-10')

getEndOfWeek(date)
// 2024-11-10 23:59:59 (周日)
```

### getStartOfMonth - 获取一个月的开始时间

**示例：**

```typescript
const date = new Date('2024-11-10')

getStartOfMonth(date)
// 2024-11-01 00:00:00
```

### getEndOfMonth - 获取一个月的结束时间

**示例：**

```typescript
const date = new Date('2024-11-10')

getEndOfMonth(date)
// 2024-11-30 23:59:59
```

### getStartOfYear - 获取一年的开始时间

**示例：**

```typescript
const date = new Date('2024-11-10')

getStartOfYear(date)
// 2024-01-01 00:00:00
```

### getEndOfYear - 获取一年的结束时间

**示例：**

```typescript
const date = new Date('2024-11-10')

getEndOfYear(date)
// 2024-12-31 23:59:59
```

### isBeforeDate - 判断日期是否在之前

**示例：**

```typescript
const date1 = new Date('2024-11-10')
const date2 = new Date('2024-11-15')

isBeforeDate(date1, date2)
// true

isBeforeDate(date2, date1)
// false
```

### isAfterDate - 判断日期是否在之后

**示例：**

```typescript
const date1 = new Date('2024-11-10')
const date2 = new Date('2024-11-15')

isAfterDate(date2, date1)
// true

isAfterDate(date1, date2)
// false
```

### isSameDayDate - 判断是否是同一天

**示例：**

```typescript
const date1 = new Date('2024-11-10 10:00:00')
const date2 = new Date('2024-11-10 15:30:00')
const date3 = new Date('2024-11-11 10:00:00')

isSameDayDate(date1, date2)
// true

isSameDayDate(date1, date3)
// false
```

### getTimestamp - 获取当前时间戳（毫秒）

**示例：**

```typescript
getTimestamp()
// 1699612800000
```

### getTimestampInSeconds - 获取当前时间戳（秒）

**示例：**

```typescript
getTimestampInSeconds()
// 1699612800
```

## 实际应用场景

### 显示文章发布时间

```typescript
import { formatRelativeTime, formatDate } from 'your-package-name'

const article = {
  publishedAt: '2024-11-10T10:00:00.000Z'
}

// 最近的显示相对时间
const now = new Date()
const publishDate = new Date(article.publishedAt)
const hoursDiff = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60)

if (hoursDiff < 24) {
  console.log(formatRelativeTime(article.publishedAt))
  // "2 小时前"
} else {
  console.log(formatDate(article.publishedAt, 'yyyy-MM-dd'))
  // "2024-11-10"
}
```

### 日期范围选择器

```typescript
import { getStartOfMonth, getEndOfMonth, formatDate } from 'your-package-name'

const today = new Date()

// 本月范围
const monthStart = getStartOfMonth(today)
const monthEnd = getEndOfMonth(today)

console.log(`本月：${formatDate(monthStart, 'yyyy-MM-dd')} 至 ${formatDate(monthEnd, 'yyyy-MM-dd')}`)
// "本月：2024-11-01 至 2024-11-30"
```

### 倒计时功能

```typescript
import { getDaysDiff, getHoursDiff, getMinutesDiff } from 'your-package-name'

const targetDate = new Date('2024-12-31 23:59:59')
const now = new Date()

const days = getDaysDiff(targetDate, now)
const hours = getHoursDiff(targetDate, now) % 24
const minutes = getMinutesDiff(targetDate, now) % 60

console.log(`距离新年还有 ${days} 天 ${hours} 小时 ${minutes} 分钟`)
```

### 日程提醒

```typescript
import { isBeforeDate, isSameDayDate, formatDate } from 'your-package-name'

const events = [
  { title: '会议', date: '2024-11-10 14:00:00' },
  { title: '培训', date: '2024-11-11 09:00:00' }
]

const today = new Date()

events.forEach(event => {
  const eventDate = new Date(event.date)
  
  if (isSameDayDate(eventDate, today)) {
    console.log(`今天有活动：${event.title}`)
  } else if (isBeforeDate(today, eventDate)) {
    console.log(`即将到来：${event.title} - ${formatDate(eventDate)}`)
  }
})
```

### 数据统计时间范围

```typescript
import { getStartOfWeek, getEndOfWeek, formatDate } from 'your-package-name'

const today = new Date()

// 本周数据
const weekStart = getStartOfWeek(today)
const weekEnd = getEndOfWeek(today)

fetchData({
  startDate: formatDate(weekStart, 'yyyy-MM-dd'),
  endDate: formatDate(weekEnd, 'yyyy-MM-dd')
})
```

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
const formatted: string = formatDate(new Date())
const parsed: Date = parseDate('2024-11-10')
const isValid: boolean = isValidDate(new Date())
const diff: number = getDaysDiff(new Date(), new Date())
const timestamp: number = getTimestamp()
```

## 注意事项

- 所有函数都支持 Date 对象、时间戳（毫秒）和 ISO 日期字符串作为输入
- 使用 date-fns 作为底层库，确保安装了 `date-fns` 依赖
- 周的开始默认为周一（符合中国习惯）
- 相对时间默认使用中文，可通过参数切换为英文
- 所有返回 Date 对象的函数都返回新对象，不会修改原始日期
