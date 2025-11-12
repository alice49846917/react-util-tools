/**
 * Cookie 操作工具类
 */

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * 设置 Cookie
 * @param name Cookie 名称
 * @param value Cookie 值
 * @param options Cookie 配置选项
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    const expires = options.expires instanceof Date 
      ? options.expires 
      : new Date(Date.now() + options.expires * 1000);
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * 获取 Cookie
 * @param name Cookie 名称
 * @returns Cookie 值，不存在则返回 null
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * 删除 Cookie
 * @param name Cookie 名称
 * @param options Cookie 配置选项（path 和 domain 需要与设置时一致）
 */
export function removeCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0)
  });
}

/**
 * 检查 Cookie 是否存在
 * @param name Cookie 名称
 * @returns 是否存在
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * 获取所有 Cookie
 * @returns Cookie 键值对对象
 */
export function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  const cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    const [name, ...valueParts] = cookie.split('=');
    if (name) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(valueParts.join('='));
    }
  }

  return cookies;
}

/**
 * 清除所有 Cookie
 * @param options Cookie 配置选项（path 和 domain）
 */
export function clearAllCookies(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  const cookies = getAllCookies();
  for (const name in cookies) {
    removeCookie(name, options);
  }
}
