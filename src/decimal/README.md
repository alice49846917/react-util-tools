# Decimal 工具

高精度十进制运算库，基于 [decimal.js](https://github.com/MikeMcl/decimal.js/)。

## 安装

```bash
npm install your-package-name decimal.js
```

## 使用方法

### 导入

```typescript
import { Decimal } from 'your-package-name'
```

## 为什么需要 Decimal.js

JavaScript 的 Number 类型使用 IEEE 754 双精度浮点数，会导致精度问题：

```javascript
0.1 + 0.2 // 0.30000000000000004
0.3 - 0.1 // 0.19999999999999998
```

Decimal.js 提供任意精度的十进制运算，解决浮点数精度问题。

## 基础用法

### 创建 Decimal 实例

```typescript
import { Decimal } from 'your-package-name'

// 从数字创建
const x = new Decimal(123.456)

// 从字符串创建（推荐）
const y = new Decimal('123.456')

// 从另一个 Decimal 创建
const z = new Decimal(x)

// 科学计数法
const a = new Decimal('1.23e+5') // 123000
```

### 基本运算

```typescript
import { Decimal } from 'your-package-name'

const x = new Decimal('0.1')
const y = new Decimal('0.2')

// 加法
x.plus(y) // Decimal(0.3)
x.add(y)  // 同 plus

// 减法
y.minus(x) // Decimal(0.1)
y.sub(x)   // 同 minus

// 乘法
x.times(y) // Decimal(0.02)
x.mul(y)   // 同 times

// 除法
y.dividedBy(x) // Decimal(2)
y.div(x)       // 同 dividedBy

// 取模
new Decimal(10).modulo(3) // Decimal(1)
new Decimal(10).mod(3)    // 同 modulo

// 幂运算
new Decimal(2).pow(3) // Decimal(8)

// 平方根
new Decimal(9).sqrt() // Decimal(3)

// 绝对值
new Decimal(-5).abs() // Decimal(5)

// 取反
new Decimal(5).negated() // Decimal(-5)
new Decimal(5).neg()     // 同 negated
```

### 比较运算

```typescript
import { Decimal } from 'your-package-name'

const x = new Decimal('0.1')
const y = new Decimal('0.2')

// 等于
x.equals(y) // false
x.eq(y)     // 同 equals

// 大于
y.greaterThan(x) // true
y.gt(x)          // 同 greaterThan

// 大于等于
y.greaterThanOrEqualTo(x) // true
y.gte(x)                  // 同 greaterThanOrEqualTo

// 小于
x.lessThan(y) // true
x.lt(y)       // 同 lessThan

// 小于等于
x.lessThanOrEqualTo(y) // true
x.lte(y)               // 同 lessThanOrEqualTo

// 比较（返回 -1, 0, 1）
x.comparedTo(y) // -1
x.cmp(y)        // 同 comparedTo
```

### 格式化输出

```typescript
import { Decimal } from 'your-package-name'

const x = new Decimal('1234.5678')

// 转为字符串
x.toString() // "1234.5678"

// 转为数字
x.toNumber() // 1234.5678

// 固定小数位数
x.toFixed(2) // "1234.57"
x.toFixed(0) // "1235"

// 指定有效数字
x.toPrecision(4) // "1235"

// 科学计数法
x.toExponential() // "1.2345678e+3"
x.toExponential(2) // "1.23e+3"
```

### 舍入模式

```typescript
import { Decimal } from 'your-package-name'

const x = new Decimal('1.5')

// 设置全局舍入模式
Decimal.set({ rounding: Decimal.ROUND_HALF_UP })

// 舍入模式常量
Decimal.ROUND_UP        // 0 - 向上舍入（远离零）
Decimal.ROUND_DOWN      // 1 - 向下舍入（趋向零）
Decimal.ROUND_CEIL      // 2 - 向正无穷舍入
Decimal.ROUND_FLOOR     // 3 - 向负无穷舍入
Decimal.ROUND_HALF_UP   // 4 - 四舍五入（默认）
Decimal.ROUND_HALF_DOWN // 5 - 五舍六入
Decimal.ROUND_HALF_EVEN // 6 - 银行家舍入
Decimal.ROUND_HALF_CEIL // 7 - 向正无穷四舍五入
Decimal.ROUND_HALF_FLOOR // 8 - 向负无穷四舍五入

// 使用舍入
x.toDecimalPlaces(0) // Decimal(2) - 使用当前舍入模式
x.toDP(0)            // 同 toDecimalPlaces
```

### 精度设置

```typescript
import { Decimal } from 'your-package-name'

// 设置全局精度（有效数字位数）
Decimal.set({ precision: 20 })

// 设置全局配置
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -7,
  toExpPos: 21
})

// 获取当前配置
const config = Decimal.config()
```

## 实际应用场景

### 金额计算

```typescript
import { Decimal } from 'your-package-name'

// 商品价格计算
const price = new Decimal('19.99')
const quantity = new Decimal('3')
const total = price.times(quantity)

console.log(total.toFixed(2)) // "59.97"

// 折扣计算
const discount = new Decimal('0.15') // 15% 折扣
const discountAmount = total.times(discount)
const finalPrice = total.minus(discountAmount)

console.log(finalPrice.toFixed(2)) // "50.97"
```

### 税费计算

```typescript
import { Decimal } from 'your-package-name'

const amount = new Decimal('100')
const taxRate = new Decimal('0.13') // 13% 税率

// 计算税额
const tax = amount.times(taxRate)
console.log(tax.toFixed(2)) // "13.00"

// 含税总额
const totalWithTax = amount.plus(tax)
console.log(totalWithTax.toFixed(2)) // "113.00"

// 从含税价反推原价
const priceWithTax = new Decimal('113')
const originalPrice = priceWithTax.dividedBy(new Decimal('1').plus(taxRate))
console.log(originalPrice.toFixed(2)) // "100.00"
```

### 利息计算

```typescript
import { Decimal } from 'your-package-name'

// 本金
const principal = new Decimal('10000')
// 年利率 3.5%
const annualRate = new Decimal('0.035')
// 期数（月）
const months = 12

// 月利率
const monthlyRate = annualRate.dividedBy(12)

// 简单利息
const simpleInterest = principal.times(annualRate)
console.log(`年利息: ${simpleInterest.toFixed(2)}`) // "350.00"

// 复利计算
const compoundInterest = principal.times(
  new Decimal(1).plus(monthlyRate).pow(months)
).minus(principal)
console.log(`复利: ${compoundInterest.toFixed(2)}`) // "355.82"
```

### 汇率转换

```typescript
import { Decimal } from 'your-package-name'

const cnyAmount = new Decimal('1000') // 人民币
const exchangeRate = new Decimal('7.2345') // 汇率

// 人民币转美元
const usdAmount = cnyAmount.dividedBy(exchangeRate)
console.log(`$${usdAmount.toFixed(2)}`) // "$138.23"

// 美元转人民币
const cnyBack = usdAmount.times(exchangeRate)
console.log(`¥${cnyBack.toFixed(2)}`) // "¥1000.00"
```

### 百分比计算

```typescript
import { Decimal } from 'your-package-name'

const total = new Decimal('500')
const part = new Decimal('125')

// 计算百分比
const percentage = part.dividedBy(total).times(100)
console.log(`${percentage.toFixed(2)}%`) // "25.00%"

// 从百分比计算数值
const percent = new Decimal('25')
const value = total.times(percent.dividedBy(100))
console.log(value.toFixed(2)) // "125.00"
```

### 分账计算

```typescript
import { Decimal } from 'your-package-name'

const totalAmount = new Decimal('100')
const people = 3

// 平均分配
const perPerson = totalAmount.dividedBy(people)
console.log(perPerson.toFixed(2)) // "33.33"

// 处理余数
const allocated = perPerson.times(people)
const remainder = totalAmount.minus(allocated)
console.log(`余额: ${remainder.toFixed(2)}`) // "0.01"

// 按比例分配
const ratios = [
  new Decimal('0.5'),  // 50%
  new Decimal('0.3'),  // 30%
  new Decimal('0.2')   // 20%
]

ratios.forEach((ratio, index) => {
  const share = totalAmount.times(ratio)
  console.log(`第${index + 1}人: ${share.toFixed(2)}`)
})
// 第1人: 50.00
// 第2人: 30.00
// 第3人: 20.00
```

### 统计计算

```typescript
import { Decimal } from 'your-package-name'

const values = [
  new Decimal('10.5'),
  new Decimal('20.3'),
  new Decimal('15.7'),
  new Decimal('30.2')
]

// 求和
const sum = values.reduce((acc, val) => acc.plus(val), new Decimal(0))
console.log(`总和: ${sum.toFixed(2)}`) // "76.70"

// 平均值
const average = sum.dividedBy(values.length)
console.log(`平均值: ${average.toFixed(2)}`) // "19.18"

// 最大值
const max = values.reduce((max, val) => val.greaterThan(max) ? val : max)
console.log(`最大值: ${max.toFixed(2)}`) // "30.20"

// 最小值
const min = values.reduce((min, val) => val.lessThan(min) ? val : min)
console.log(`最小值: ${min.toFixed(2)}`) // "10.50"
```

## 常用方法速查

### 运算方法
- `plus(n)` / `add(n)` - 加法
- `minus(n)` / `sub(n)` - 减法
- `times(n)` / `mul(n)` - 乘法
- `dividedBy(n)` / `div(n)` - 除法
- `modulo(n)` / `mod(n)` - 取模
- `pow(n)` - 幂运算
- `sqrt()` - 平方根
- `abs()` - 绝对值
- `negated()` / `neg()` - 取反

### 比较方法
- `equals(n)` / `eq(n)` - 等于
- `greaterThan(n)` / `gt(n)` - 大于
- `greaterThanOrEqualTo(n)` / `gte(n)` - 大于等于
- `lessThan(n)` / `lt(n)` - 小于
- `lessThanOrEqualTo(n)` / `lte(n)` - 小于等于
- `comparedTo(n)` / `cmp(n)` - 比较

### 格式化方法
- `toString()` - 转字符串
- `toNumber()` - 转数字
- `toFixed(dp)` - 固定小数位
- `toPrecision(sd)` - 指定有效数字
- `toExponential(dp)` - 科学计数法
- `toDecimalPlaces(dp)` / `toDP(dp)` - 舍入到指定小数位

### 判断方法
- `isZero()` - 是否为 0
- `isNaN()` - 是否为 NaN
- `isFinite()` - 是否有限
- `isInteger()` - 是否为整数
- `isNegative()` - 是否为负数
- `isPositive()` - 是否为正数

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
import { Decimal } from 'your-package-name'

const x: Decimal = new Decimal('123.456')
const result: Decimal = x.plus('10')
const str: string = result.toString()
const num: number = result.toNumber()
```

## 注意事项

- 推荐使用字符串创建 Decimal 实例，避免浮点数精度问题
- 所有运算方法返回新的 Decimal 实例，不会修改原实例
- 大数运算会消耗更多内存和计算时间
- 金融计算建议设置合适的精度和舍入模式
- 详细文档请参考：https://mikemcl.github.io/decimal.js/

## 相关链接

- [Decimal.js 官方文档](https://mikemcl.github.io/decimal.js/)
- [Decimal.js GitHub](https://github.com/MikeMcl/decimal.js/)
- [API 参考](https://mikemcl.github.io/decimal.js/#methods)
