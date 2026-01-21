# String - 字符串工具

强大的字符串处理工具集合，包含命名转换、格式化、验证、脱敏等常用功能。

## 特性

- 🔤 命名转换（驼峰、蛇形、短横线等）
- ✂️ 字符串操作（截断、填充、反转等）
- 🔒 数据脱敏（手机号、身份证、银行卡等）
- ✅ 格式验证（手机号、邮箱、URL 等）
- 🎲 随机字符串生成
- 🔐 Base64 编解码
- 🧹 HTML 转义/反转义

## 安装

```bash
npm install react-util-tools
```

## 使用示例

### 命名转换

```typescript
import {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase
} from 'react-util-tools'

// 驼峰命名（首字母小写）
camelCase('hello-world') // 'helloWorld'
camelCase('hello_world') // 'helloWorld'
camelCase('Hello World') // 'helloWorld'

// 帕斯卡命名（首字母大写）
pascalCase('hello-world') // 'HelloWorld'
pascalCase('hello_world') // 'HelloWorld'

// 蛇形命名（下划线）
snakeCase('helloWorld') // 'hello_world'
snakeCase('HelloWorld') // 'hello_world'

// 短横线命名（kebab-case）
kebabCase('helloWorld') // 'hello-world'
kebabCase('HelloWorld') // 'hello-world'
```

### 字符串操作

```typescript
import {
  capitalize,
  titleCase,
  truncate,
  reverse,
  repeat,
  padStart,
  padEnd
} from 'react-util-tools'

// 首字母大写
capitalize('hello') // 'Hello'

// 单词首字母大写
titleCase('hello world') // 'Hello World'

// 截断字符串
truncate('Hello World', 5) // 'Hello...'
truncate('Hello World', 5, '~') // 'Hello~'

// 反转字符串
reverse('hello') // 'olleh'

// 重复字符串
repeat('ab', 3) // 'ababab'

// 填充字符串
padStart('5', 3, '0') // '005'
padEnd('5', 3, '0') // '500'
```

### 数据脱敏

```typescript
import {
  maskPhone,
  maskIdCard,
  maskBankCard,
  maskName,
  maskString,
  maskEmail
} from 'react-util-tools'

// 手机号脱敏
maskPhone('13812345678') // '138****5678'

// 身份证号脱敏
maskIdCard('110101199001011234') // '110101********1234'

// 银行卡号脱敏
maskBankCard('6222021234567890') // '6222 **** **** 7890'

// 姓名脱敏
maskName('张三') // '张*'
maskName('李四光') // '李*光'

// 通用字符串脱敏
maskString('123wedwdwddwed567', 3) // '123...567'
maskString('abcdefghijk', 2) // 'ab...jk'
maskString('hello', 2, '***') // 'he***lo'

// 邮箱脱敏（在 format 模块）
maskEmail('test@example.com') // 'tes***@example.com'
```

// 银行卡号脱敏
maskBankCard('6222021234567890') // '6222 **** **** 7890'

// 姓名脱敏
maskName('张三') // '张*'
maskName('李四光') // '李*光'

// 邮箱脱敏（在 format 模块）
maskEmail('test@example.com') // 'tes***@example.com'
```

### 格式验证

```typescript
import {
  isValidPhone,
  isValidEmail,
  isValidUrl,
  isValidIdCard
} from 'react-util-tools'

// 验证手机号（中国大陆）
isValidPhone('13812345678') // true
isValidPhone('12345678901') // false

// 验证邮箱
isValidEmail('test@example.com') // true
isValidEmail('invalid-email') // false

// 验证 URL
isValidUrl('https://example.com') // true
isValidUrl('not-a-url') // false

// 验证身份证号（中国大陆）
isValidIdCard('110101199001011234') // true
isValidIdCard('123456') // false
```

### 字符串查询

```typescript
import {
  startsWith,
  endsWith,
  includes,
  countOccurrences,
  isEmpty,
  isNotEmpty
} from 'react-util-tools'

// 判断开头
startsWith('hello world', 'hello') // true

// 判断结尾
endsWith('hello world', 'world') // true

// 判断包含
includes('hello world', 'lo wo') // true

// 计算出现次数
countOccurrences('hello hello', 'hello') // 2

// 判断是否为空
isEmpty('') // true
isEmpty('  ') // true
isEmpty('hello') // false

// 判断是否不为空
isNotEmpty('hello') // true
```

### HTML 处理

```typescript
import {
  stripHtml,
  escapeHtml,
  unescapeHtml
} from 'react-util-tools'

// 移除 HTML 标签
stripHtml('<p>Hello <strong>World</strong></p>') // 'Hello World'

// 转义 HTML
escapeHtml('<div>Hello & "World"</div>')
// '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'

// 反转义 HTML
unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
```

### 随机字符串

```typescript
import { randomString, uuid } from 'react-util-tools'

// 生成随机字符串
randomString(8) // 'aB3xY9Zk'
randomString(6, '0123456789') // '482916'

// 生成 UUID
uuid() // '550e8400-e29b-41d4-a716-446655440000'
```

### Base64 编解码

```typescript
import { toBase64, fromBase64 } from 'react-util-tools'

// 编码
const encoded = toBase64('Hello World') // 'SGVsbG8gV29ybGQ='

// 解码
const decoded = fromBase64(encoded) // 'Hello World'
```

### 空格处理

```typescript
import {
  trim,
  trimStart,
  trimEnd,
  removeSpaces,
  normalizeSpaces
} from 'react-util-tools'

// 移除两端空格
trim('  hello  ') // 'hello'

// 移除左侧空格
trimStart('  hello') // 'hello'

// 移除右侧空格
trimEnd('hello  ') // 'hello'

// 移除所有空格
removeSpaces('h e l l o') // 'hello'

// 规范化空格（多个空格变为一个）
normalizeSpaces('hello    world') // 'hello world'
```

### 字符串替换

```typescript
import { replaceAll } from 'react-util-tools'

// 替换所有匹配项
replaceAll('hello hello', 'hello', 'hi') // 'hi hi'

// 使用正则表达式
replaceAll('hello123world456', /\d+/g, 'X') // 'helloXworldX'
```

### 提取数字

```typescript
import { extractNumbers } from 'react-util-tools'

// 提取所有数字
extractNumbers('价格: 99.99元, 数量: 5个') // [99.99, 5]
extractNumbers('abc123def456') // [123, 456]
```

## API 参考

### 命名转换

- `capitalize(str)` - 首字母大写
- `camelCase(str)` - 驼峰命名（首字母小写）
- `pascalCase(str)` - 帕斯卡命名（首字母大写）
- `snakeCase(str)` - 蛇形命名（下划线）
- `kebabCase(str)` - 短横线命名
- `titleCase(str)` - 单词首字母大写

### 字符串操作

- `truncate(str, length, suffix?)` - 截断字符串
- `trim(str)` - 移除两端空格
- `trimStart(str)` - 移除左侧空格
- `trimEnd(str)` - 移除右侧空格
- `reverse(str)` - 反转字符串
- `repeat(str, count)` - 重复字符串
- `padStart(str, length, padStr?)` - 左侧填充
- `padEnd(str, length, padStr?)` - 右侧填充
- `toLowerCase(str)` - 转小写
- `toUpperCase(str)` - 转大写

### 字符串查询

- `startsWith(str, searchString)` - 判断开头
- `endsWith(str, searchString)` - 判断结尾
- `includes(str, searchString)` - 判断包含
- `isEmpty(str)` - 判断是否为空
- `isNotEmpty(str)` - 判断是否不为空
- `length(str)` - 获取长度（支持 Unicode）
- `countOccurrences(str, searchString)` - 计算出现次数

### 字符串处理

- `split(str, separator)` - 分割字符串
- `replaceAll(str, search, replacement)` - 替换所有匹配项
- `removeSpaces(str)` - 移除所有空格
- `normalizeSpaces(str)` - 规范化空格
- `extractNumbers(str)` - 提取数字

### HTML 处理

- `stripHtml(str)` - 移除 HTML 标签
- `escapeHtml(str)` - 转义 HTML
- `unescapeHtml(str)` - 反转义 HTML

### 数据脱敏

- `maskPhone(phone)` - 手机号脱敏
- `maskIdCard(idCard)` - 身份证号脱敏
- `maskBankCard(cardNumber)` - 银行卡号脱敏
- `maskName(name)` - 姓名脱敏
- `maskString(str, visibleChars?, mask?)` - 通用字符串脱敏

### 格式验证

- `isValidPhone(phone)` - 验证手机号
- `isValidEmail(email)` - 验证邮箱
- `isValidUrl(url)` - 验证 URL
- `isValidIdCard(idCard)` - 验证身份证号

### 随机生成

- `randomString(length, chars?)` - 生成随机字符串
- `uuid()` - 生成 UUID v4

### Base64

- `toBase64(str)` - 字符串转 Base64
- `fromBase64(base64)` - Base64 转字符串

## TypeScript 支持

完整的 TypeScript 类型定义：

```typescript
import {
  camelCase,
  maskPhone,
  isValidEmail,
  randomString
} from 'react-util-tools'

const name: string = camelCase('hello-world')
const phone: string = maskPhone('13812345678')
const valid: boolean = isValidEmail('test@example.com')
const random: string = randomString(10)
```

## 注意事项

1. **手机号验证**：仅支持中国大陆手机号格式
2. **身份证验证**：仅支持中国大陆身份证号格式
3. **Base64 编解码**：支持浏览器和 Node.js 环境
4. **Unicode 支持**：`length()` 函数正确处理 Unicode 字符
5. **HTML 转义**：仅转义常见的特殊字符

## 实际应用场景

### 表单验证

```typescript
import { isValidPhone, isValidEmail } from 'react-util-tools'

function validateForm(data: any) {
  const errors: any = {}
  
  if (!isValidPhone(data.phone)) {
    errors.phone = '请输入有效的手机号'
  }
  
  if (!isValidEmail(data.email)) {
    errors.email = '请输入有效的邮箱'
  }
  
  return errors
}
```

### 数据展示脱敏

```typescript
import { maskPhone, maskIdCard } from 'react-util-tools'

function UserInfo({ user }: any) {
  return (
    <div>
      <p>手机号: {maskPhone(user.phone)}</p>
      <p>身份证: {maskIdCard(user.idCard)}</p>
    </div>
  )
}
```

### API 字段转换

```typescript
import { camelCase, snakeCase } from 'react-util-tools'

// 后端返回的蛇形命名转驼峰
function transformResponse(data: any) {
  const result: any = {}
  for (const key in data) {
    result[camelCase(key)] = data[key]
  }
  return result
}

// 前端驼峰命名转蛇形发送给后端
function transformRequest(data: any) {
  const result: any = {}
  for (const key in data) {
    result[snakeCase(key)] = data[key]
  }
  return result
}
```

### 生成唯一标识

```typescript
import { uuid, randomString } from 'react-util-tools'

// 生成订单号
function generateOrderId() {
  return `ORDER-${Date.now()}-${randomString(6, '0123456789')}`
}

// 生成文件名
function generateFileName(originalName: string) {
  const ext = originalName.split('.').pop()
  return `${uuid()}.${ext}`
}
```
