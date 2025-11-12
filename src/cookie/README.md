# Cookie 工具

提供常用的 Cookie 操作方法。

## 方法列表

### setCookie

设置 Cookie。

```typescript
setCookie(name: string, value: string, options?: CookieOptions): void
```

**参数：**
- `name`: Cookie 名称
- `value`: Cookie 值
- `options`: 可选配置
  - `expires`: 过期时间（秒数或 Date 对象）
  - `path`: Cookie 路径
  - `domain`: Cookie 域名
  - `secure`: 是否仅通过 HTTPS 传输
  - `sameSite`: SameSite 属性（'Strict' | 'Lax' | 'None'）

**示例：**
```typescript
import { setCookie } from './cookie';

// 设置简单 Cookie
setCookie('username', 'john');

// 设置带过期时间的 Cookie（7天）
setCookie('token', 'abc123', { expires: 7 * 24 * 60 * 60 });

// 设置完整配置的 Cookie
setCookie('session', 'xyz789', {
  expires: new Date('2025-12-31'),
  path: '/',
  domain: '.example.com',
  secure: true,
  sameSite: 'Strict'
});
```

### getCookie

获取指定名称的 Cookie 值。

```typescript
getCookie(name: string): string | null
```

**示例：**
```typescript
import { getCookie } from './cookie';

const username = getCookie('username');
console.log(username); // 'john' 或 null
```

### removeCookie

删除指定名称的 Cookie。

```typescript
removeCookie(name: string, options?: Pick<CookieOptions, 'path' | 'domain'>): void
```

**注意：** path 和 domain 需要与设置时保持一致才能正确删除。

**示例：**
```typescript
import { removeCookie } from './cookie';

removeCookie('username');

// 删除指定 path 和 domain 的 Cookie
removeCookie('session', { path: '/', domain: '.example.com' });
```

### hasCookie

检查指定名称的 Cookie 是否存在。

```typescript
hasCookie(name: string): boolean
```

**示例：**
```typescript
import { hasCookie } from './cookie';

if (hasCookie('token')) {
  console.log('用户已登录');
}
```

### getAllCookies

获取所有 Cookie 的键值对。

```typescript
getAllCookies(): Record<string, string>
```

**示例：**
```typescript
import { getAllCookies } from './cookie';

const cookies = getAllCookies();
console.log(cookies); // { username: 'john', token: 'abc123', ... }
```

### clearAllCookies

清除所有 Cookie。

```typescript
clearAllCookies(options?: Pick<CookieOptions, 'path' | 'domain'>): void
```

**示例：**
```typescript
import { clearAllCookies } from './cookie';

clearAllCookies();

// 清除指定 path 的所有 Cookie
clearAllCookies({ path: '/' });
```

## 类型定义

```typescript
interface CookieOptions {
  expires?: number | Date;  // 过期时间（秒数或 Date 对象）
  path?: string;            // Cookie 路径
  domain?: string;          // Cookie 域名
  secure?: boolean;         // 是否仅 HTTPS
  sameSite?: 'Strict' | 'Lax' | 'None';  // SameSite 属性
}
```
