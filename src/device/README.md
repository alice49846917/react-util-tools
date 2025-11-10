# Device 工具

提供获取设备信息、操作系统、浏览器类型和内核等功能的工具函数集合。

## 安装

```bash
npm install your-package-name
```

## 使用方法

### 导入

```typescript
import {
  getOS,
  getBrowser,
  getBrowserEngine,
  getBrowserVersion,
  isMobile,
  isTablet,
  isDesktop,
  getDeviceType,
  isIOS,
  isAndroid,
  isWeChat,
  isTouchDevice,
  getDevicePixelRatio,
  getScreenResolution,
  getViewportSize,
  getDeviceInfo
} from 'your-package-name'
```

## API

### getOS - 获取操作系统

获取当前设备的操作系统类型。

**返回：** `'Windows'` | `'MacOS'` | `'Linux'` | `'Android'` | `'iOS'` | `'Unknown'`

**示例：**

```typescript
const os = getOS()
console.log(os) // "MacOS" 或 "Windows" 等
```

### getBrowser - 获取浏览器类型

获取当前使用的浏览器类型。

**返回：** `'Chrome'` | `'Safari'` | `'Firefox'` | `'Edge'` | `'Opera'` | `'IE'` | `'Unknown'`

**示例：**

```typescript
const browser = getBrowser()
console.log(browser) // "Chrome" 或 "Safari" 等
```

### getBrowserEngine - 获取浏览器内核

获取当前浏览器使用的渲染引擎。

**返回：** `'WebKit'` | `'Gecko'` | `'Trident'` | `'Presto'` | `'Unknown'`

**示例：**

```typescript
const engine = getBrowserEngine()
console.log(engine) // "WebKit" 或 "Gecko" 等
```

### getBrowserVersion - 获取浏览器版本

获取当前浏览器的版本号。

**返回：** 版本号字符串

**示例：**

```typescript
const version = getBrowserVersion()
console.log(version) // "120.0.6099.109"
```

### isMobile - 判断是否为移动设备

判断当前设备是否为移动设备（手机）。

**返回：** `boolean`

**示例：**

```typescript
if (isMobile()) {
  console.log('当前是移动设备')
  // 加载移动端样式或组件
}
```

### isTablet - 判断是否为平板设备

判断当前设备是否为平板设备。

**返回：** `boolean`

**示例：**

```typescript
if (isTablet()) {
  console.log('当前是平板设备')
}
```

### isDesktop - 判断是否为桌面设备

判断当前设备是否为桌面设备。

**返回：** `boolean`

**示例：**

```typescript
if (isDesktop()) {
  console.log('当前是桌面设备')
  // 显示桌面端特有功能
}
```

### getDeviceType - 获取设备类型

获取当前设备的类型。

**返回：** `'mobile'` | `'tablet'` | `'desktop'`

**示例：**

```typescript
const deviceType = getDeviceType()

switch (deviceType) {
  case 'mobile':
    console.log('移动端')
    break
  case 'tablet':
    console.log('平板端')
    break
  case 'desktop':
    console.log('桌面端')
    break
}
```

### isIOS - 判断是否为 iOS 设备

判断当前设备是否为 iOS 系统（iPhone、iPad、iPod）。

**返回：** `boolean`

**示例：**

```typescript
if (isIOS()) {
  console.log('当前是 iOS 设备')
  // iOS 特定处理
}
```

### isAndroid - 判断是否为 Android 设备

判断当前设备是否为 Android 系统。

**返回：** `boolean`

**示例：**

```typescript
if (isAndroid()) {
  console.log('当前是 Android 设备')
  // Android 特定处理
}
```

### isWeChat - 判断是否为微信浏览器

判断当前是否在微信内置浏览器中打开。

**返回：** `boolean`

**示例：**

```typescript
if (isWeChat()) {
  console.log('在微信中打开')
  // 调用微信 JS-SDK
}
```

### isTouchDevice - 判断是否支持触摸

判断当前设备是否支持触摸事件。

**返回：** `boolean`

**示例：**

```typescript
if (isTouchDevice()) {
  console.log('支持触摸操作')
  // 启用触摸手势
}
```

### getDevicePixelRatio - 获取设备像素比

获取当前设备的像素比（DPR）。

**返回：** `number`

**示例：**

```typescript
const dpr = getDevicePixelRatio()
console.log(dpr) // 1, 2, 3 等

// 用于高清图片适配
if (dpr >= 2) {
  imageUrl = imageUrl.replace('.jpg', '@2x.jpg')
}
```

### getScreenResolution - 获取屏幕分辨率

获取设备屏幕的物理分辨率。

**返回：** `{ width: number, height: number }`

**示例：**

```typescript
const resolution = getScreenResolution()
console.log(resolution) // { width: 1920, height: 1080 }
```

### getViewportSize - 获取视口尺寸

获取浏览器视口（可视区域）的尺寸。

**返回：** `{ width: number, height: number }`

**示例：**

```typescript
const viewport = getViewportSize()
console.log(viewport) // { width: 1440, height: 900 }

// 响应式布局判断
if (viewport.width < 768) {
  console.log('小屏幕设备')
}
```

### getDeviceInfo - 获取完整设备信息

一次性获取所有设备相关信息。

**返回：** 包含所有设备信息的对象

**示例：**

```typescript
const deviceInfo = getDeviceInfo()
console.log(deviceInfo)
/*
{
  os: "MacOS",
  browser: "Chrome",
  browserVersion: "120.0.6099.109",
  browserEngine: "WebKit",
  deviceType: "desktop",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isIOS: false,
  isAndroid: false,
  isWeChat: false,
  isTouchDevice: false,
  devicePixelRatio: 2,
  screenResolution: { width: 1920, height: 1080 },
  viewportSize: { width: 1440, height: 900 },
  userAgent: "Mozilla/5.0..."
}
*/
```

## 实际应用场景

### 响应式布局适配

```typescript
import { getDeviceType, getViewportSize } from 'your-package-name'

const deviceType = getDeviceType()
const viewport = getViewportSize()

// 根据设备类型加载不同组件
if (deviceType === 'mobile') {
  // 加载移动端组件
} else if (deviceType === 'tablet') {
  // 加载平板端组件
} else {
  // 加载桌面端组件
}

// 根据视口宽度调整布局
if (viewport.width < 768) {
  // 小屏幕布局
} else if (viewport.width < 1024) {
  // 中等屏幕布局
} else {
  // 大屏幕布局
}
```

### 浏览器兼容性处理

```typescript
import { getBrowser, getBrowserVersion } from 'your-package-name'

const browser = getBrowser()
const version = getBrowserVersion()

// 针对特定浏览器的兼容处理
if (browser === 'IE') {
  alert('建议使用现代浏览器以获得最佳体验')
}

// 版本检查
if (browser === 'Chrome' && parseFloat(version) < 90) {
  console.warn('Chrome 版本过低，部分功能可能不可用')
}
```

### 移动端特殊处理

```typescript
import { isMobile, isIOS, isAndroid, isWeChat } from 'your-package-name'

if (isMobile()) {
  // 禁用桌面端特有功能
  document.body.classList.add('mobile')
  
  if (isIOS()) {
    // iOS 特定处理（如解决滚动问题）
    document.body.style.webkitOverflowScrolling = 'touch'
  }
  
  if (isAndroid()) {
    // Android 特定处理
  }
  
  if (isWeChat()) {
    // 微信内分享功能
    initWeChatShare()
  }
}
```

### 高清图片适配

```typescript
import { getDevicePixelRatio } from 'your-package-name'

function getOptimizedImageUrl(baseUrl: string): string {
  const dpr = getDevicePixelRatio()
  
  if (dpr >= 3) {
    return baseUrl.replace('.jpg', '@3x.jpg')
  } else if (dpr >= 2) {
    return baseUrl.replace('.jpg', '@2x.jpg')
  }
  
  return baseUrl
}

const imageUrl = getOptimizedImageUrl('/images/logo.jpg')
```

### 数据统计上报

```typescript
import { getDeviceInfo } from 'your-package-name'

function reportAnalytics() {
  const deviceInfo = getDeviceInfo()
  
  // 上报设备信息用于数据分析
  analytics.track('page_view', {
    os: deviceInfo.os,
    browser: deviceInfo.browser,
    browserVersion: deviceInfo.browserVersion,
    deviceType: deviceInfo.deviceType,
    screenResolution: `${deviceInfo.screenResolution.width}x${deviceInfo.screenResolution.height}`,
    isMobile: deviceInfo.isMobile
  })
}
```

### 触摸事件处理

```typescript
import { isTouchDevice } from 'your-package-name'

const eventType = isTouchDevice() ? 'touchstart' : 'mousedown'

element.addEventListener(eventType, (e) => {
  console.log('用户交互')
})
```

## TypeScript 支持

完整的 TypeScript 类型支持。

```typescript
const os: string = getOS()
const isMobileDevice: boolean = isMobile()
const deviceType: 'mobile' | 'tablet' | 'desktop' = getDeviceType()
const resolution: { width: number; height: number } = getScreenResolution()
```

## 注意事项

- 所有判断基于 User Agent，可能存在被伪造的情况
- 部分浏览器可能返回 `'Unknown'`
- 建议结合特性检测（Feature Detection）使用，不要完全依赖 UA 判断
- `getDeviceInfo()` 会一次性执行所有检测，适合需要完整信息的场景
