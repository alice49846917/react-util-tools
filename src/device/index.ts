/**
 * 获取用户代理字符串
 */
function getUserAgent(): string {
  return navigator.userAgent.toLowerCase()
}

/**
 * 获取操作系统类型
 * @returns 操作系统名称
 */
export function getOS(): string {
  const ua = getUserAgent()
  
  if (ua.includes('win')) return 'Windows'
  if (ua.includes('mac')) return 'MacOS'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return 'iOS'
  
  return 'Unknown'
}

/**
 * 获取浏览器类型
 * @returns 浏览器名称
 */
export function getBrowser(): string {
  const ua = getUserAgent()
  
  if (ua.includes('edg')) return 'Edge'
  if (ua.includes('chrome')) return 'Chrome'
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari'
  if (ua.includes('firefox')) return 'Firefox'
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera'
  if (ua.includes('trident') || ua.includes('msie')) return 'IE'
  
  return 'Unknown'
}

/**
 * 获取浏览器内核
 * @returns 浏览器内核名称
 */
export function getBrowserEngine(): string {
  const ua = getUserAgent()
  
  if (ua.includes('trident')) return 'Trident'
  if (ua.includes('gecko') && !ua.includes('webkit')) return 'Gecko'
  if (ua.includes('webkit')) return 'WebKit'
  if (ua.includes('presto')) return 'Presto'
  
  return 'Unknown'
}

/**
 * 判断是否为移动设备
 * @returns true 为移动设备，false 为桌面设备
 */
export function isMobile(): boolean {
  const ua = getUserAgent()
  return /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
}

/**
 * 判断是否为平板设备
 * @returns true 为平板设备
 */
export function isTablet(): boolean {
  const ua = getUserAgent()
  return /ipad|android(?!.*mobile)|tablet/i.test(ua)
}

/**
 * 判断是否为桌面设备
 * @returns true 为桌面设备
 */
export function isDesktop(): boolean {
  return !isMobile() && !isTablet()
}

/**
 * 获取设备类型
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}

/**
 * 判断是否为微信浏览器
 * @returns true 为微信浏览器
 */
export function isWeChat(): boolean {
  const ua = getUserAgent()
  return /micromessenger/i.test(ua)
}

/**
 * 判断是否为 iOS 设备
 * @returns true 为 iOS 设备
 */
export function isIOS(): boolean {
  const ua = getUserAgent()
  return /iphone|ipad|ipod/i.test(ua)
}

/**
 * 判断是否为 Android 设备
 * @returns true 为 Android 设备
 */
export function isAndroid(): boolean {
  const ua = getUserAgent()
  return /android/i.test(ua)
}

/**
 * 获取浏览器版本号
 * @returns 版本号字符串
 */
export function getBrowserVersion(): string {
  const ua = navigator.userAgent
  const browser = getBrowser()
  
  let match: RegExpMatchArray | null = null
  
  switch (browser) {
    case 'Chrome':
      match = ua.match(/chrome\/([\d.]+)/i)
      break
    case 'Safari':
      match = ua.match(/version\/([\d.]+)/i)
      break
    case 'Firefox':
      match = ua.match(/firefox\/([\d.]+)/i)
      break
    case 'Edge':
      match = ua.match(/edg\/([\d.]+)/i)
      break
    case 'Opera':
      match = ua.match(/(?:opera|opr)\/([\d.]+)/i)
      break
    case 'IE':
      match = ua.match(/(?:msie |rv:)([\d.]+)/i)
      break
  }
  
  return match ? match[1] : 'Unknown'
}

/**
 * 获取设备像素比
 * @returns 设备像素比
 */
export function getDevicePixelRatio(): number {
  return window.devicePixelRatio || 1
}

/**
 * 获取屏幕分辨率
 * @returns { width: number, height: number }
 */
export function getScreenResolution(): { width: number; height: number } {
  return {
    width: window.screen.width,
    height: window.screen.height
  }
}

/**
 * 获取视口尺寸
 * @returns { width: number, height: number }
 */
export function getViewportSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  }
}

/**
 * 判断是否支持触摸事件
 * @returns true 支持触摸
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * 获取设备完整信息
 * @returns 包含所有设备信息的对象
 */
export function getDeviceInfo() {
  return {
    os: getOS(),
    browser: getBrowser(),
    browserVersion: getBrowserVersion(),
    browserEngine: getBrowserEngine(),
    deviceType: getDeviceType(),
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isWeChat: isWeChat(),
    isTouchDevice: isTouchDevice(),
    devicePixelRatio: getDevicePixelRatio(),
    screenResolution: getScreenResolution(),
    viewportSize: getViewportSize(),
    userAgent: navigator.userAgent
  }
}
