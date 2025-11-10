# Address 工具

提供 URL 地址栏参数获取的工具函数。

## 安装

```bash
npm install your-package-name
```

## 使用方法

### 导入

```typescript
import { getQueryParam, getAllQueryParams, getQueryParamAll } from 'your-package-name'
```

## API

### getQueryParam - 获取单个查询参数

获取 URL 中指定的查询参数值。

**参数：**
- `key`: 参数名
- `url`: 可选，指定 URL，默认使用当前页面 URL

**返回：** 参数值（string）或 null

**示例：**

```typescript
// URL: https://example.com?name=张三&age=25

const name = getQueryParam('name')
console.log(name) // "张三"

const city = getQueryParam('city')
console.log(city) // null

// 解析指定 URL
const value = getQueryParam('id', 'https://example.com?id=123')
console.log(value) // "123"
```

### getAllQueryParams - 获取所有查询参数

获取 URL 中所有的查询参数，返回对象。

**参数：**
- `url`: 可选，指定 URL，默认使用当前页面 URL

**返回：** 包含所有参数的对象

**示例：**

```typescript
// URL: https://example.com?name=张三&age=25&city=北京

const params = getAllQueryParams()
console.log(params)
// { name: "张三", age: "25", city: "北京" }

// 解析指定 URL
const params2 = getAllQueryParams('https://example.com?id=1&type=user')
console.log(params2)
// { id: "1", type: "user" }
```

### getQueryParamAll - 获取同名参数的所有值

获取 URL 中同名参数的所有值（数组形式）。

**参数：**
- `key`: 参数名
- `url`: 可选，指定 URL，默认使用当前页面 URL

**返回：** 参数值数组

**示例：**

```typescript
// URL: https://example.com?tag=前端&tag=React&tag=TypeScript

const tags = getQueryParamAll('tag')
console.log(tags)
// ["前端", "React", "TypeScript"]

const ids = getQueryParamAll('id')
console.log(ids)
// [] (不存在返回空数组)
```

## 实际应用场景

### 获取分页参数

```typescript
import { getQueryParam } from 'your-package-name'

// 获取当前页码
const currentPage = Number(getQueryParam('page')) || 1
const pageSize = Number(getQueryParam('size')) || 20

console.log(`当前第 ${currentPage} 页，每页 ${pageSize} 条`)
```

### 获取搜索和过滤条件

```typescript
import { getAllQueryParams } from 'your-package-name'

// URL: ?keyword=React&category=前端&sort=latest

const filters = getAllQueryParams()
console.log(filters)
// { keyword: "React", category: "前端", sort: "latest" }

// 使用过滤条件
function fetchData() {
  const { keyword, category, sort } = filters
  // 调用 API...
}
```

### 获取多选标签

```typescript
import { getQueryParamAll } from 'your-package-name'

// URL: ?tag=React&tag=TypeScript&tag=Hooks

const selectedTags = getQueryParamAll('tag')
console.log(selectedTags) // ["React", "TypeScript", "Hooks"]

// 渲染标签列表
selectedTags.forEach(tag => {
  console.log(`已选择: ${tag}`)
})
```

### 用户认证

```typescript
import { getQueryParam } from 'your-package-name'

// URL: ?token=abc123&redirect=/dashboard

const token = getQueryParam('token')
const redirect = getQueryParam('redirect') || '/'

if (token) {
  // 保存 token
  localStorage.setItem('token', token)
  // 跳转到指定页面
  window.location.href = redirect
}
```

### 表单回显

```typescript
import { getAllQueryParams } from 'your-package-name'

// URL: ?name=张三&email=test@example.com&age=25

const formData = getAllQueryParams()

// 回显到表单
document.querySelector('#name').value = formData.name || ''
document.querySelector('#email').value = formData.email || ''
document.querySelector('#age').value = formData.age || ''
```

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
// 类型安全
const params: Record<string, string> = getAllQueryParams()
const value: string | null = getQueryParam('id')
const values: string[] = getQueryParamAll('tag')

// 类型转换示例
const page = Number(getQueryParam('page')) || 1
const isActive = getQueryParam('active') === 'true'
```

## 注意事项

- 所有参数值都是字符串类型，使用时需要自行转换（如 `Number()`, `Boolean()` 等）
- 不存在的参数：`getQueryParam` 返回 `null`，`getQueryParamAll` 返回空数组 `[]`
- 支持解析当前页面 URL 或指定的 URL 字符串
- 同名参数使用 `getQueryParamAll` 获取所有值，使用 `getQueryParam` 只获取第一个值
