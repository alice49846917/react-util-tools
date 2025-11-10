# Format 工具

提供金额、数字、百分比等格式化和反格式化功能的工具函数集合。

## 安装

```bash
npm install your-package-name
```

## 使用方法

### 导入

```typescript
import {
  formatMoney,
  parseMoney,
  formatNumber,
  formatMoneyToChinese,
  formatPercent
} from 'your-package-name'
```

## API

### formatMoney - 金额格式化

将数字格式化为带货币符号和千分位的金额字符串。

**参数：**
- `amount`: 金额数字或字符串
- `options`: 格式化选项
  - `decimals`: 小数位数，默认 2
  - `symbol`: 货币符号，默认 '¥'
  - `separator`: 千分位分隔符，默认 ','
  - `decimalPoint`: 小数点符号，默认 '.'

**返回：** 格式化后的金额字符串

**示例：**

```typescript
// 基础用法
formatMoney(1234.56)
// "¥1,234.56"

formatMoney(1234567.89)
// "¥1,234,567.89"

// 自定义小数位数
formatMoney(1234.5, { decimals: 0 })
// "¥1,235"

formatMoney(1234.5, { decimals: 3 })
// "¥1,234.500"

// 自定义货币符号
formatMoney(1234.56, { symbol: '$' })
// "$1,234.56"

formatMoney(1234.56, { symbol: '€' })
// "€1,234.56"

formatMoney(1234.56, { symbol: '' })
// "1,234.56"

// 自定义分隔符
formatMoney(1234.56, { separator: ' ', decimalPoint: ',' })
// "¥1 234,56"

// 处理负数
formatMoney(-1234.56)
// "-¥1,234.56"

// 字符串输入
formatMoney('1234.56')
// "¥1,234.56"
```

### parseMoney - 金额反格式化

将格式化的金额字符串转换为数字。

**参数：**
- `formattedAmount`: 格式化的金额字符串

**返回：** 数字

**示例：**

```typescript
parseMoney('¥1,234.56')
// 1234.56

parseMoney('$1,234,567.89')
// 1234567.89

parseMoney('€1 234,56')
// 1234.56

parseMoney('-¥1,234.56')
// -1234.56

parseMoney('1,234.56')
// 1234.56

// 处理无效输入
parseMoney('')
// 0

parseMoney('abc')
// 0
```

### formatNumber - 数字格式化（简化版）

只添加千分位分隔符，不添加货币符号。

**参数：**
- `amount`: 数字或字符串
- `decimals`: 小数位数，默认 2

**返回：** 格式化后的数字字符串

**示例：**

```typescript
formatNumber(1234.56)
// "1,234.56"

formatNumber(1234567.89)
// "1,234,567.89"

formatNumber(1234.5, 0)
// "1,235"

formatNumber(1234.5, 3)
// "1,234.500"
```

### formatMoneyToChinese - 金额转中文大写

将金额数字转换为中文大写金额（常用于财务票据）。

**参数：**
- `amount`: 金额数字或字符串

**返回：** 中文大写金额字符串

**示例：**

```typescript
formatMoneyToChinese(1234.56)
// "壹仟贰佰叁拾肆元伍角陆分"

formatMoneyToChinese(10000)
// "壹万元整"

formatMoneyToChinese(100000000)
// "壹亿元整"

formatMoneyToChinese(1234.50)
// "壹仟贰佰叁拾肆元伍角"

formatMoneyToChinese(1234.00)
// "壹仟贰佰叁拾肆元整"

formatMoneyToChinese(0.56)
// "零元伍角陆分"

formatMoneyToChinese(10086.08)
// "壹万零捌拾陆元零捌分"
```

### formatPercent - 格式化为百分比

将数值格式化为百分比字符串。

**参数：**
- `value`: 数值
- `options`: 格式化选项
  - `decimals`: 小数位数，默认 2
  - `multiply`: 是否需要乘以 100，默认 true

**返回：** 百分比字符串

**示例：**

```typescript
// 输入 0-1 的小数（默认会乘以 100）
formatPercent(0.1234)
// "12.34%"

formatPercent(0.5)
// "50.00%"

formatPercent(1)
// "100.00%"

// 自定义小数位数
formatPercent(0.1234, { decimals: 0 })
// "12%"

formatPercent(0.1234, { decimals: 4 })
// "12.3400%"

// 输入已经是百分比数值（不需要乘以 100）
formatPercent(12.34, { multiply: false })
// "12.34%"

formatPercent(50, { multiply: false, decimals: 0 })
// "50%"
```

## 实际应用场景

### 电商价格显示

```typescript
import { formatMoney } from 'your-package-name'

// 商品价格
const product = {
  price: 1299.99,
  originalPrice: 1599.00
}

console.log(`现价：${formatMoney(product.price)}`)
// "现价：¥1,299.99"

console.log(`原价：${formatMoney(product.originalPrice)}`)
// "原价：¥1,599.00"

// 美元价格
console.log(formatMoney(product.price, { symbol: '$' }))
// "$1,299.99"
```

### 表单输入处理

```typescript
import { formatMoney, parseMoney } from 'your-package-name'

// 输入框失焦时格式化
input.addEventListener('blur', (e) => {
  const value = e.target.value
  const number = parseMoney(value)
  e.target.value = formatMoney(number)
})

// 提交表单时获取原始数值
form.addEventListener('submit', (e) => {
  const formattedValue = input.value // "¥1,234.56"
  const actualValue = parseMoney(formattedValue) // 1234.56
  
  // 提交到后端
  submitData({ amount: actualValue })
})
```

### 财务报表

```typescript
import { formatMoney, formatMoneyToChinese } from 'your-package-name'

const invoice = {
  amount: 12345.67
}

console.log(`金额：${formatMoney(invoice.amount)}`)
// "金额：¥12,345.67"

console.log(`大写：${formatMoneyToChinese(invoice.amount)}`)
// "大写：壹万贰仟叁佰肆拾伍元陆角柒分"
```

### 数据统计展示

```typescript
import { formatNumber, formatPercent } from 'your-package-name'

const stats = {
  totalUsers: 1234567,
  activeRate: 0.8523,
  growthRate: 0.1234
}

console.log(`总用户数：${formatNumber(stats.totalUsers, 0)}`)
// "总用户数：1,234,567"

console.log(`活跃率：${formatPercent(stats.activeRate)}`)
// "活跃率：85.23%"

console.log(`增长率：${formatPercent(stats.growthRate, { decimals: 1 })}`)
// "增长率：12.3%"
```

### 购物车总价计算

```typescript
import { formatMoney, parseMoney } from 'your-package-name'

const cartItems = [
  { name: '商品A', price: '¥1,234.56', quantity: 2 },
  { name: '商品B', price: '¥567.89', quantity: 1 }
]

// 计算总价
const total = cartItems.reduce((sum, item) => {
  return sum + parseMoney(item.price) * item.quantity
}, 0)

console.log(`总计：${formatMoney(total)}`)
// "总计：¥3,037.01"
```

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
const formatted: string = formatMoney(1234.56)
const parsed: number = parseMoney('¥1,234.56')
const chinese: string = formatMoneyToChinese(1234.56)
const percent: string = formatPercent(0.5)
```

## 注意事项

- `formatMoney` 会自动处理四舍五入
- `parseMoney` 会移除所有非数字字符（除了小数点和负号）
- `formatMoneyToChinese` 只支持到兆位，超出范围可能显示不正确
- 所有格式化函数都会处理无效输入，返回合理的默认值
- 金额计算建议使用专门的货币库（如 dinero.js）以避免浮点数精度问题
