# Throttle 工具

提供节流（throttle）和防抖（debounce）功能的工具集。

## 安装

```bash
npm install your-package-name
```

## 使用方法

### 导入

```typescript
// 按需导入，只打包用到的代码
import { throttle, debounce } from 'your-package-name'

// 或者只导入需要的
import { throttle } from 'your-package-name'
```

### throttle - 节流函数

节流函数会在指定时间内只执行一次，适用于需要限制函数执行频率的场景。

**参数：**
- `fn`: 要节流的函数
- `wait`: 间隔时间（毫秒），默认 3000ms
- `options`: 配置选项
  - `leading`: 是否在开始时触发，默认 `true`
  - `trailing`: 是否在结束时触发，默认 `true`

**示例：**

```typescript
import { throttle } from 'your-package-name'

// 基础用法 - 滚动事件节流
const handleScroll = throttle(() => {
  console.log('页面滚动中...')
}, 1000)

window.addEventListener('scroll', handleScroll)

// 带参数的函数
const handleResize = throttle((width: number, height: number) => {
  console.log(`窗口大小: ${width}x${height}`)
}, 500)

window.addEventListener('resize', () => {
  handleResize(window.innerWidth, window.innerHeight)
})

// 配置选项 - 只在结束时触发
const handleInput = throttle(
  (value: string) => {
    console.log('输入值:', value)
  },
  1000,
  { leading: false, trailing: true }
)
```

**适用场景：**
- 滚动事件处理
- 窗口 resize 事件
- 鼠标移动事件
- 频繁的 API 调用限制

### debounce - 防抖函数

防抖函数会在触发后等待指定时间，如果在等待期间再次触发则重新计时，适用于需要等待用户停止操作后再执行的场景。

**参数：**
- `fn`: 要防抖的函数
- `wait`: 延迟时间（毫秒），默认 500ms
- `immediate`: 是否在第一次触发时立即执行，默认 `false`

**示例：**

```typescript
import { debounce } from 'your-package-name'

// 基础用法 - 搜索输入防抖
const handleSearch = debounce((keyword: string) => {
  console.log('搜索关键词:', keyword)
  // 执行搜索 API 调用
}, 500)

searchInput.addEventListener('input', (e) => {
  handleSearch(e.target.value)
})

// 立即执行模式
const handleSave = debounce(
  () => {
    console.log('保存数据')
  },
  1000,
  true // 第一次点击立即执行
)

saveButton.addEventListener('click', handleSave)

// 表单验证
const validateEmail = debounce((email: string) => {
  if (email.includes('@')) {
    console.log('邮箱格式正确')
  } else {
    console.log('邮箱格式错误')
  }
}, 300)

emailInput.addEventListener('input', (e) => {
  validateEmail(e.target.value)
})
```

**适用场景：**
- 搜索框输入
- 表单验证
- 按钮防重复点击
- 自动保存功能

## 区别说明

### Throttle（节流）
- 按照固定时间间隔执行
- 保证在一定时间内至少执行一次
- 像水龙头限流，控制流量

### Debounce（防抖）
- 等待操作停止后才执行
- 如果持续触发则不会执行
- 像电梯关门，有人进来就重新计时

## TypeScript 支持

完整的 TypeScript 类型支持，自动推断函数参数和返回值类型。

```typescript
import { throttle } from 'your-package-name'

// 类型会被正确推断
const handler = throttle((x: number, y: string) => {
  console.log(x, y)
}, 1000)

handler(123, 'test') // ✓ 正确
handler('test', 123) // ✗ 类型错误
```
