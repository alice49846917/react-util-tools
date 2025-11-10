# Decimal Utils - 高精度计算工具函数

基于 Decimal.js 封装的常用计算函数，返回 number 类型，自动处理异常。

## 特点

✅ **安全可靠** - 自动处理异常，无效输入返回 0  
✅ **简单易用** - 直接返回 number 类型，无需手动转换  
✅ **高精度** - 基于 Decimal.js，解决浮点数精度问题  
✅ **类型友好** - 支持 number、string、Decimal 类型输入

## 使用方法

### 导入

```typescript
import {
  add,
  subtract,
  multiply,
  divide,
  equals,
  greaterThan,
  lessThan,
  greaterThanOrEqual,
  lessThanOrEqual,
  round,
  ceil,
  floor,
  abs,
  negate
} from 'your-package-name'
```

## API

### add - 加法

两个数相加。

**参数：**
- `a`: 第一个数（number | string | Decimal）
- `b`: 第二个数（number | string | Decimal）

**返回：** number

**示例：**

```typescript
add(0.1, 0.2) // 0.3
add('10.5', '20.3') // 30.8
add(100, 50) // 150

// 异常处理
add('invalid', 10) // 0
add(NaN, 10) // 0
```

### subtract - 减法

两个数相减。

**参数：**
- `a`: 被减数（number | string | Decimal）
- `b`: 减数（number | string | Decimal）

**返回：** number

**示例：**

```typescript
subtract(0.3, 0.1) // 0.2
subtract('100', '30') // 70
subtract(50, 20) // 30

// 异常处理
subtract('invalid', 10) // 0
```

### multiply - 乘法

两个数相乘。

**参数：**
- `a`: 第一个数（number | string | Decimal）
- `b`: 第二个数（number | string | Decimal）

**返回：** number

**示例：**

```typescript
multiply(0.1, 0.2) // 0.02
multiply('10.5', '2') // 21
multiply(5, 3) // 15

// 异常处理
multiply('invalid', 10) // 0
```

### divide - 除法

两个数相除。

**参数：**
- `a`: 被除数（number | string | Decimal）
- `b`: 除数（number | string | Decimal）

**返回：** number（除数为 0 时返回 0）

**示例：**

```typescript
divide(0.3, 0.1) // 3
divide('100', '4') // 25
divide(10, 2) // 5

// 除数为 0
divide(10, 0) // 0

// 异常处理
divide('invalid', 10) // 0
```

### equals - 判断相等

判断两个数是否相等。

**参数：**
- `a`: 第一个数（number | string | Decimal）
- `b`: 第二个数（number | string | Decimal）

**返回：** boolean

**示例：**

```typescript
equals(0.1 + 0.2, 0.3) // true（解决了浮点数精度问题）
equals('10.5', 10.5) // true
equals(100, 100) // true
equals(100, 200) // false

// 异常处理
equals('invalid', 10) // false
```

### greaterThan - 大于

判断 a 是否大于 b。

**示例：**

```typescript
greaterThan(10, 5) // true
greaterThan(5, 10) // false
greaterThan('10.5', '10.4') // true
```

### lessThan - 小于

判断 a 是否小于 b。

**示例：**

```typescript
lessThan(5, 10) // true
lessThan(10, 5) // false
lessThan('10.4', '10.5') // true
```

### greaterThanOrEqual - 大于等于

判断 a 是否大于等于 b。

**示例：**

```typescript
greaterThanOrEqual(10, 10) // true
greaterThanOrEqual(10, 5) // true
greaterThanOrEqual(5, 10) // false
```

### lessThanOrEqual - 小于等于

判断 a 是否小于等于 b。

**示例：**

```typescript
lessThanOrEqual(10, 10) // true
lessThanOrEqual(5, 10) // true
lessThanOrEqual(10, 5) // false
```

### round - 四舍五入

四舍五入到指定小数位。

**参数：**
- `value`: 数值（number | string | Decimal）
- `decimalPlaces`: 小数位数，默认 2

**返回：** number

**示例：**

```typescript
round(1.2345) // 1.23
round(1.2345, 3) // 1.235
round(1.235, 2) // 1.24
round('10.567', 1) // 10.6

// 异常处理
round('invalid') // 0
```

### ceil - 向上取整

向上取整到指定小数位。

**参数：**
- `value`: 数值（number | string | Decimal）
- `decimalPlaces`: 小数位数，默认 2

**返回：** number

**示例：**

```typescript
ceil(1.231) // 1.24
ceil(1.231, 1) // 1.3
ceil('10.001', 0) // 11
```

### floor - 向下取整

向下取整到指定小数位。

**参数：**
- `value`: 数值（number | string | Decimal）
- `decimalPlaces`: 小数位数，默认 2

**返回：** number

**示例：**

```typescript
floor(1.239) // 1.23
floor(1.239, 1) // 1.2
floor('10.999', 0) // 10
```

### abs - 绝对值

取绝对值。

**参数：**
- `value`: 数值（number | string | Decimal）

**返回：** number

**示例：**

```typescript
abs(-10) // 10
abs(10) // 10
abs('-5.5') // 5.5
```

### negate - 取反

取反（正数变负数，负数变正数）。

**参数：**
- `value`: 数值（number | string | Decimal）

**返回：** number

**示例：**

```typescript
negate(10) // -10
negate(-10) // 10
negate('5.5') // -5.5
```

## 实际应用场景

### 商品价格计算

```typescript
import { add, multiply, subtract } from 'your-package-name'

const price = 19.99
const quantity = 3
const discount = 5

// 小计
const subtotal = multiply(price, quantity) // 59.97

// 折扣后价格
const total = subtract(subtotal, discount) // 54.97

console.log(`总价: ${total}`)
```

### 购物车总价

```typescript
import { add, multiply } from 'your-package-name'

const items = [
  { price: 19.99, quantity: 2 },
  { price: 29.99, quantity: 1 },
  { price: 9.99, quantity: 3 }
]

let total = 0
items.forEach(item => {
  const itemTotal = multiply(item.price, item.quantity)
  total = add(total, itemTotal)
})

console.log(`购物车总价: ${total}`) // 99.94
```

### 税费计算

```typescript
import { multiply, add } from 'your-package-name'

const amount = 100
const taxRate = 0.13 // 13% 税率

// 计算税额
const tax = multiply(amount, taxRate) // 13

// 含税总额
const totalWithTax = add(amount, tax) // 113

console.log(`含税总额: ${totalWithTax}`)
```

### 折扣计算

```typescript
import { multiply, subtract } from 'your-package-name'

const originalPrice = 199.99
const discountRate = 0.2 // 20% 折扣

// 折扣金额
const discountAmount = multiply(originalPrice, discountRate) // 40

// 折后价
const finalPrice = subtract(originalPrice, discountAmount) // 159.99

console.log(`折后价: ${finalPrice}`)
```

### 平均值计算

```typescript
import { add, divide } from 'your-package-name'

const scores = [85.5, 92.3, 78.9, 88.7, 95.2]

// 求和
let sum = 0
scores.forEach(score => {
  sum = add(sum, score)
})

// 平均值
const average = divide(sum, scores.length) // 88.12

console.log(`平均分: ${average}`)
```

### 价格比较

```typescript
import { greaterThan, lessThan, equals } from 'your-package-name'

const price1 = 19.99
const price2 = 20.00

if (lessThan(price1, price2)) {
  console.log('价格1更便宜')
}

if (equals(price1, price2)) {
  console.log('价格相同')
}

if (greaterThan(price1, price2)) {
  console.log('价格1更贵')
}
```

### 金额四舍五入

```typescript
import { round, ceil, floor } from 'your-package-name'

const amount = 123.456

// 四舍五入到 2 位小数
const rounded = round(amount) // 123.46

// 向上取整
const ceiledAmount = ceil(amount) // 123.46

// 向下取整
const flooredAmount = floor(amount) // 123.45

console.log(`四舍五入: ${rounded}`)
console.log(`向上取整: ${ceiledAmount}`)
console.log(`向下取整: ${flooredAmount}`)
```

### 百分比计算

```typescript
import { divide, multiply } from 'your-package-name'

const total = 500
const part = 125

// 计算百分比
const percentage = multiply(divide(part, total), 100) // 25

console.log(`占比: ${percentage}%`)

// 从百分比计算数值
const percent = 25
const value = divide(multiply(total, percent), 100) // 125

console.log(`25% 的值: ${value}`)
```

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
import { add, multiply, equals } from 'your-package-name'

const sum: number = add(10, 20)
const product: number = multiply(5, 3)
const isEqual: boolean = equals(10, 10)
```

## 注意事项

- 所有函数都会自动处理异常，无效输入返回 0（比较函数返回 false）
- 除法运算中，除数为 0 时返回 0
- 推荐使用字符串传入数值，避免浮点数精度问题
- 所有函数返回 number 类型，方便直接使用
- 如需更复杂的操作，请使用 Decimal 类

## 与 Decimal 类的区别

| 特性 | Decimal Utils | Decimal 类 |
|------|--------------|-----------|
| 返回类型 | number | Decimal |
| 异常处理 | 自动处理，返回 0 | 需要手动处理 |
| 使用场景 | 简单计算 | 复杂计算、链式调用 |
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 功能丰富度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**建议：**
- 简单的加减乘除、比较操作 → 使用 Decimal Utils
- 复杂的链式计算、需要保持精度 → 使用 Decimal 类
