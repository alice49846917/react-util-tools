# React Tools

一个实用的 JavaScript/TypeScript 工具库集合，包含节流防抖、日期处理、设备检测、金额格式化、高精度计算等常用功能。

## 特性

✨ **功能丰富** - 涵盖日常开发中的常用工具函数  
🌳 **Tree Shaking** - 支持按需导入，只打包使用的代码  
📘 **TypeScript** - 完整的类型支持  
📦 **零配置** - 开箱即用  
🎯 **高质量** - 基于成熟的第三方库封装

## 安装

```bash
npm install @dj49846917/react-tools
```

## 快速开始

```typescript
import {
  throttle,
  formatMoney,
  formatDate,
  getOS,
  Decimal
} from '@dj49846917/react-tools'

// 节流函数
const handleScroll = throttle(() => {
  console.log('scrolling...')
}, 1000)

// 金额格式化
const price = formatMoney(1234.56) // "¥1,234.56"

// 日期格式化
const date = formatDate(new Date(), 'yyyy-MM-dd') // "2024-11-10"

// 设备检测
const os = getOS() // "MacOS" | "Windows" | "iOS" | "Android" ...

// 高精度计算
const total = new Decimal('0.1').plus('0.2') // Decimal(0.3)
```

## 模块列表

### 🎯 Throttle - 节流防抖
- `throttle()` - 节流函数
- `debounce()` - 防抖函数

[查看文档](./src/throttle/README.md)

### 🌐 Address - URL 参数处理
- `getQueryParam()` - 获取单个参数
- `getAllQueryParams()` - 获取所有参数
- `getQueryParamAll()` - 获取同名参数数组

[查看文档](./src/address/README.md)

### 📱 Device - 设备检测
- `getOS()` - 获取操作系统
- `getBrowser()` - 获取浏览器类型
- `getBrowserEngine()` - 获取浏览器内核
- `isMobile()` / `isTablet()` / `isDesktop()` - 设备类型判断
- `isIOS()` / `isAndroid()` / `isWeChat()` - 平台判断
- 更多...

[查看文档](./src/device/README.md)

### 💰 Format - 格式化工具
- `formatMoney()` - 金额格式化
- `parseMoney()` - 金额反格式化
- `formatNumber()` - 数字格式化
- `formatMoneyToChinese()` - 金额转中文大写
- `formatPercent()` - 百分比格式化

[查看文档](./src/format/README.md)

### 📅 Date - 日期处理
基于 date-fns 封装的日期工具：
- `formatDate()` - 格式化日期
- `formatRelativeTime()` - 相对时间（如"3分钟前"）
- `getDaysDiff()` - 计算天数差
- `addDaysToDate()` - 增加天数
- `getStartOfDay()` / `getEndOfDay()` - 一天的开始/结束
- 更多...

[查看文档](./src/date/README.md)

#### UTC 时区工具
- `formatUTC()` - UTC 时间格式化
- `toUTC()` / `fromUTC()` - 时区转换
- `getUTCYearStartTimestamp()` - 年份第一天时间戳
- `getUTCWeeksInYear()` - 获取一年有多少周
- `getUTCWeekStart()` / `getUTCWeekEnd()` - 获取周的开始/结束时间
- 更多...

[查看文档](./src/date/utc/README.md)

### 🔢 Decimal - 高精度计算
基于 decimal.js 的高精度十进制运算：
- 解决 JavaScript 浮点数精度问题
- 支持任意精度的加减乘除
- 适用于金融计算、科学计算等场景

[查看文档](./src/decimal/README.md)

## 使用示例

### 节流防抖

```typescript
import { throttle, debounce } from '@dj49846917/react-tools'

// 滚动事件节流
const handleScroll = throttle(() => {
  console.log('scrolling...')
}, 1000)

// 搜索输入防抖
const handleSearch = debounce((keyword: string) => {
  console.log('searching:', keyword)
}, 500)
```

### URL 参数处理

```typescript
import { getQueryParam, getAllQueryParams } from '@dj49846917/react-tools'

// URL: ?id=123&name=test
const id = getQueryParam('id') // "123"
const params = getAllQueryParams() // { id: "123", name: "test" }
```

### 设备检测

```typescript
import { getOS, getBrowser, isMobile } from 'react-tools'

const os = getOS() // "MacOS"
const browser = getBrowser() // "Chrome"

if (isMobile()) {
  // 移动端处理
}
```

### 金额格式化

```typescript
import { formatMoney, parseMoney, formatMoneyToChinese } from 'react-tools'

formatMoney(1234.56) // "¥1,234.56"
formatMoney(1234.56, { symbol: '$' }) // "$1,234.56"

parseMoney('¥1,234.56') // 1234.56

formatMoneyToChinese(1234.56) // "壹仟贰佰叁拾肆元伍角陆分"
```

### 日期处理

```typescript
import { formatDate, formatRelativeTime, getDaysDiff } from 'react-tools'

formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
// "2024-11-10 15:30:45"

formatRelativeTime(new Date(Date.now() - 5 * 60 * 1000))
// "5 分钟前"

getDaysDiff(new Date('2024-11-15'), new Date('2024-11-10'))
// 5
```

### UTC 时区处理

```typescript
import {
  formatUTC,
  getUTCYearStartTimestamp,
  getUTCWeeksInYear,
  getUTCWeekStart
} from 'react-tools'

// 格式化为 UTC 时间
formatUTC(new Date()) // "2024-11-10 07:30:00"

// 获取 2024 年第一天的时间戳
getUTCYearStartTimestamp(2024) // 1704067200000

// 获取 2024 年有多少周
getUTCWeeksInYear(2024) // 52

// 获取第 10 周的开始时间
getUTCWeekStart(2024, 10) // Date 对象
```

### 高精度计算

```typescript
import { Decimal } from 'react-tools'

// 解决浮点数精度问题
const result = new Decimal('0.1').plus('0.2')
console.log(result.toString()) // "0.3"

// 金额计算
const price = new Decimal('19.99')
const quantity = new Decimal('3')
const total = price.times(quantity)
console.log(total.toFixed(2)) // "59.97"
```

## TypeScript 支持

完整的 TypeScript 类型支持，开箱即用。

```typescript
import { Decimal, formatMoney, getOS } from 'react-tools'

const amount: Decimal = new Decimal('100')
const formatted: string = formatMoney(1234.56)
const os: string = getOS()
```

## Tree Shaking

支持按需导入，只打包使用的代码：

```typescript
// 只导入需要的函数
import { formatMoney, Decimal } from 'react-tools'

// 打包时只会包含 formatMoney 和 Decimal 相关代码
```

## 依赖

- `date-fns` - 日期处理
- `date-fns-tz` - 时区处理
- `decimal.js` - 高精度计算

## 许可证

MIT

## 作者

alice & bobby
