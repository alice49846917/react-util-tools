import Decimal from 'decimal.js'

/**
 * 安全地创建 Decimal 实例
 * @param value 数值
 * @returns Decimal 实例，如果无效则返回 Decimal(0)
 */
function safeDecimal(value: number | string | Decimal): Decimal {
  try {
    if (value instanceof Decimal) {
      return value
    }
    const decimal = new Decimal(value)
    if (decimal.isNaN()) {
      return new Decimal(0)
    }
    return decimal
  } catch {
    return new Decimal(0)
  }
}

/**
 * 加法运算
 * @param a 第一个数
 * @param b 第二个数
 * @returns 相加结果（number 类型）
 */
export function add(a: number | string | Decimal, b: number | string | Decimal): number {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.plus(decimalB).toNumber()
  } catch {
    return 0
  }
}

/**
 * 减法运算
 * @param a 被减数
 * @param b 减数
 * @returns 相减结果（number 类型）
 */
export function subtract(a: number | string | Decimal, b: number | string | Decimal): number {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.minus(decimalB).toNumber()
  } catch {
    return 0
  }
}

/**
 * 乘法运算
 * @param a 第一个数
 * @param b 第二个数
 * @returns 相乘结果（number 类型）
 */
export function multiply(a: number | string | Decimal, b: number | string | Decimal): number {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.times(decimalB).toNumber()
  } catch {
    return 0
  }
}

/**
 * 除法运算
 * @param a 被除数
 * @param b 除数
 * @returns 相除结果（number 类型），除数为 0 时返回 0
 */
export function divide(a: number | string | Decimal, b: number | string | Decimal): number {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    
    // 除数为 0 时返回 0
    if (decimalB.isZero()) {
      return 0
    }
    
    return decimalA.dividedBy(decimalB).toNumber()
  } catch {
    return 0
  }
}

/**
 * 判断两个数是否相等
 * @param a 第一个数
 * @param b 第二个数
 * @returns 是否相等
 */
export function equals(a: number | string | Decimal, b: number | string | Decimal): boolean {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.equals(decimalB)
  } catch {
    return false
  }
}

/**
 * 判断 a 是否大于 b
 * @param a 第一个数
 * @param b 第二个数
 * @returns a > b
 */
export function greaterThan(a: number | string | Decimal, b: number | string | Decimal): boolean {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.greaterThan(decimalB)
  } catch {
    return false
  }
}

/**
 * 判断 a 是否小于 b
 * @param a 第一个数
 * @param b 第二个数
 * @returns a < b
 */
export function lessThan(a: number | string | Decimal, b: number | string | Decimal): boolean {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.lessThan(decimalB)
  } catch {
    return false
  }
}

/**
 * 判断 a 是否大于等于 b
 * @param a 第一个数
 * @param b 第二个数
 * @returns a >= b
 */
export function greaterThanOrEqual(a: number | string | Decimal, b: number | string | Decimal): boolean {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.greaterThanOrEqualTo(decimalB)
  } catch {
    return false
  }
}

/**
 * 判断 a 是否小于等于 b
 * @param a 第一个数
 * @param b 第二个数
 * @returns a <= b
 */
export function lessThanOrEqual(a: number | string | Decimal, b: number | string | Decimal): boolean {
  try {
    const decimalA = safeDecimal(a)
    const decimalB = safeDecimal(b)
    return decimalA.lessThanOrEqualTo(decimalB)
  } catch {
    return false
  }
}

/**
 * 四舍五入到指定小数位
 * @param value 数值
 * @param decimalPlaces 小数位数，默认 2
 * @returns 四舍五入后的结果（number 类型）
 */
export function round(value: number | string | Decimal, decimalPlaces = 2): number {
  try {
    const decimal = safeDecimal(value)
    return decimal.toDecimalPlaces(decimalPlaces).toNumber()
  } catch {
    return 0
  }
}

/**
 * 向上取整到指定小数位
 * @param value 数值
 * @param decimalPlaces 小数位数，默认 2
 * @returns 向上取整后的结果（number 类型）
 */
export function ceil(value: number | string | Decimal, decimalPlaces = 2): number {
  try {
    const decimal = safeDecimal(value)
    return decimal.toDecimalPlaces(decimalPlaces, Decimal.ROUND_CEIL).toNumber()
  } catch {
    return 0
  }
}

/**
 * 向下取整到指定小数位
 * @param value 数值
 * @param decimalPlaces 小数位数，默认 2
 * @returns 向下取整后的结果（number 类型）
 */
export function floor(value: number | string | Decimal, decimalPlaces = 2): number {
  try {
    const decimal = safeDecimal(value)
    return decimal.toDecimalPlaces(decimalPlaces, Decimal.ROUND_FLOOR).toNumber()
  } catch {
    return 0
  }
}

/**
 * 取绝对值
 * @param value 数值
 * @returns 绝对值（number 类型）
 */
export function abs(value: number | string | Decimal): number {
  try {
    const decimal = safeDecimal(value)
    return decimal.abs().toNumber()
  } catch {
    return 0
  }
}

/**
 * 取反
 * @param value 数值
 * @returns 取反后的值（number 类型）
 */
export function negate(value: number | string | Decimal): number {
  try {
    const decimal = safeDecimal(value)
    return decimal.negated().toNumber()
  } catch {
    return 0
  }
}
