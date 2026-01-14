import Decimal from "decimal.js"

/**
 * 金额格式化：将数字格式化为金额字符串
 * @param amount 金额数字
 * @param options 格式化选项
 * @returns 格式化后的金额字符串
 */
export function formatMoney(
  amount: number | string,
  options: {
    decimals?: number // 小数位数，默认 2
    symbol?: string // 货币符号，默认 '¥'
    separator?: string // 千分位分隔符，默认 ','
    decimalPoint?: string // 小数点符号，默认 '.'
  } = {}
): string {
  const {
    decimals = 2,
    symbol = '¥',
    separator = ',',
    decimalPoint = '.'
  } = options

  return tryRun(() => {
    // 使用 Decimal 处理，避免精度问题
    const dec = new Decimal(amount)
    
    // 处理负数
    const isNegative = dec.isNegative()
    const absDec = dec.abs()
    
    // 固定小数位（向下取整）
    const fixed = absDec.toFixed(decimals, Decimal.ROUND_DOWN)
    const [integerPart, decimalPart] = fixed.split('.')
    
    // 添加千分位分隔符
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    
    // 组合结果
    let result = symbol + formattedInteger
    if (decimals > 0 && decimalPart) {
      result += decimalPoint + decimalPart
    }
    
    return isNegative ? `-${result}` : result
  }) ?? `${symbol}0${decimalPoint}${'0'.repeat(decimals)}`
}

/**
 * 金额反格式化：将格式化的金额字符串转换为数字
 * @param formattedAmount 格式化的金额字符串
 * @returns 数字
 */
export function parseMoney(formattedAmount: string): number {
  if (!formattedAmount || typeof formattedAmount !== 'string') {
    return 0
  }

  // 移除所有非数字、小数点、负号的字符
  const cleaned = formattedAmount.replace(/[^\d.-]/g, '')

  // 转换为数字
  const num = parseFloat(cleaned)

  return isNaN(num) ? 0 : num
}

/**
 * 金额格式化（简化版）：只添加千分位分隔符
 * @param amount 金额数字
 * @param decimals 小数位数，默认 2
 * @returns 格式化后的金额字符串（不含货币符号）
 */
export function formatNumber(amount: number | string, decimals = 2): string {
  return tryRun(() => {
    // 使用 Decimal 处理，避免精度问题
    const dec = new Decimal(amount)
    const fixed = dec.toFixed(decimals, Decimal.ROUND_DOWN)
    const [integerPart, decimalPart] = fixed.split('.')
    
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    return decimals > 0 && decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger
  }) ?? '0.' + '0'.repeat(decimals)
}

/**
 * 金额转中文大写
 * @param amount 金额数字
 * @returns 中文大写金额
 */
export function formatMoneyToChinese(amount: number | string): string {
  return tryRun(() => {
    const dec = new Decimal(amount)
    
    if (dec.isNegative()) {
      return '零元整'
    }
    
    const num = dec.toNumber()
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    const units = ['', '拾', '佰', '仟']
    const bigUnits = ['', '万', '亿', '兆']
    const decimalUnits = ['角', '分']
    
    // 分离整数和小数部分
    const [integerPart, decimalPart] = num.toFixed(2).split('.')
    let result = ''
    
    // 处理整数部分
    if (integerPart === '0') {
      result = '零元'
    } else {
      const integerStr = integerPart
      const len = integerStr.length
      let zeroCount = 0
      
      for (let i = 0; i < len; i++) {
        const digit = parseInt(integerStr[i])
        const unitIndex = (len - i - 1) % 4
        const bigUnitIndex = Math.floor((len - i - 1) / 4)
        
        if (digit === 0) {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            result += '零'
          }
          result += digits[digit] + units[unitIndex]
          zeroCount = 0
        }
        
        if (unitIndex === 0 && bigUnitIndex > 0) {
          if (result[result.length - 1] !== bigUnits[bigUnitIndex]) {
            result += bigUnits[bigUnitIndex]
          }
        }
      }
      
      result += '元'
    }
    
    // 处理小数部分
    if (decimalPart && decimalPart !== '00') {
      const jiao = parseInt(decimalPart[0])
      const fen = parseInt(decimalPart[1])
      
      if (jiao > 0) {
        result += digits[jiao] + decimalUnits[0]
      } else if (fen > 0) {
        result += '零'
      }
      
      if (fen > 0) {
        result += digits[fen] + decimalUnits[1]
      }
    } else {
      result += '整'
    }
    
    return result
  }) ?? '零元整'
}

/**
 * 格式化为百分比
 * @param value 数值（0-1 或 0-100）
 * @param options 格式化选项
 * @returns 百分比字符串
 */
export function formatPercent(
  value: number,
  options: {
    decimals?: number // 小数位数，默认 2
    multiply?: boolean // 是否需要乘以 100，默认 true（当输入为 0-1 时）
  } = {}
): string {
  const { decimals = 2, multiply = true } = options

  if (isNaN(value)) {
    return '0%'
  }

  const num = multiply ? value * 100 : value
  return num.toFixed(decimals) + '%'
}

/**
 * 邮箱脱敏：只展示前3个字符+@和后面的字符串，中间用***表示
 * @param email 邮箱地址
 * @returns 脱敏后的邮箱地址
 * @example
 * maskEmail('dj49846917@proton.me') // 'dj4***@proton.me'
 * maskEmail('abc@example.com') // 'abc***@example.com'
 */
export function maskEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return ''
  }

  const atIndex = email.indexOf('@')
  if (atIndex <= 0) {
    return email // 无效邮箱，返回原值
  }

  const localPart = email.substring(0, atIndex)
  const domainPart = email.substring(atIndex)

  // 只展示前3个字符
  const visiblePart = localPart.substring(0, 3)
  
  return `${visiblePart}***${domainPart}`
}

/**
 * 邮箱解脱敏：将脱敏的邮箱还原（需要提供原始邮箱）
 * @param maskedEmail 脱敏后的邮箱地址
 * @param originalEmail 原始邮箱地址
 * @returns 解脱敏后的邮箱地址
 * @example
 * unmaskEmail('dj4***@proton.me', 'dj49846917@proton.me') // 'dj49846917@proton.me'
 */
export function unmaskEmail(maskedEmail: string, originalEmail: string): string {
  if (!maskedEmail || !originalEmail) {
    return ''
  }

  // 验证脱敏邮箱格式
  if (!maskedEmail.includes('***@')) {
    return maskedEmail // 不是脱敏格式，直接返回
  }

  // 验证原始邮箱和脱敏邮箱是否匹配
  const maskedParts = maskedEmail.split('***@')
  const atIndex = originalEmail.indexOf('@')
  
  if (atIndex <= 0) {
    return maskedEmail // 原始邮箱无效
  }

  const originalPrefix = originalEmail.substring(0, 3)
  const originalDomain = originalEmail.substring(atIndex + 1)
  const maskedDomain = maskedParts[1]

  // 验证前缀和域名是否匹配
  if (maskedParts[0] === originalPrefix && maskedDomain === originalDomain) {
    return originalEmail
  }

  return maskedEmail // 不匹配，返回脱敏邮箱
}

/* thousandths processing
 ** value The coin string to be processed
 */
export function toLocalString(value: string) {
  // Do thousandths
  let result = value
  if (Number(value) >= 1000) {
    result = Number(value).toLocaleString('en-US')
  } else {
    result = value
  }
  return result
}

export const integerTokenArr = ['SATS']
export type AmountNum = string | number | Decimal

export function removeInvalidZero(num: string) {
  let result = num
  if (num.includes('.')) {
    result = result.replace(/\.?0+$/, '')
  }
  return result
}

//(<= 8)Output precision control, if it is greater than 8 digits, 8 digits will be reserved, if it is less than 8 digits, the corresponding digits will be displayed, and the default is 8 digits
export function formatePrecision(
  n: AmountNum,
  precision?: number,
  tokenSymbol?: string
) {
  if (!isNaN(Number(n))) {
    let prec = precision && precision <= 8 ? precision : 8
    if (tokenSymbol && integerTokenArr.includes(tokenSymbol)) {
      prec = 0
    }
    return new Decimal(Number(n)).toFixed(prec, Decimal.ROUND_DOWN)
  }
  const num = new Decimal(n).toNumber()
  return num
}

/**
 * (>= 8) formatted amount, number of tokens
 * Keep 8 digits after the decimal point, a total of 10 digits
 */
export function formateAmount({
  num = 0,
  precision = 8,
  tokenSymbol = '',
  type = '0',
}: {
  num: AmountNum
  precision?: number
  tokenSymbol?: string
  type?: string
}) {
  return (
    tryRun(() => {
      const dec = new Decimal(num)
      const { length } = dec.abs().floor().toString()
      const pres = precision
      precision = precision > 8 ? 9 : precision + 1
      if (length >= precision) {
        let value = ''
        // Here it is necessary to judge whether it is greater than 1, and if it is greater than 1, directly retain 8 decimal places
        if (dec.greaterThan(1)) {
          value = dec.toFixed(8, Decimal.ROUND_DOWN)
        } else {
          value = dec.toFixed(precision - length, Decimal.ROUND_DOWN)
        }
        value = formatePrecision(value, pres).toString()
        // If you round up here, the decimal place will be removed
        // If it is a sats token, round up
        if (integerTokenArr.includes(tokenSymbol)) {
          value = new Decimal(value).toFixed(0, Decimal.ROUND_CEIL)
        }
        // Do thousandths
        let result = ''
        if (typeof value === 'string') {
          if (value.includes('.')) {
            result = value.replace(/\d(?=(\d{3})+\.)/g, '$&,')
          } else {
            result = toLocalString(value)
          }
        } else {
          result = value
        }

        if (Number(num) === 0) {
          return result
        } else {
          return dec.greaterThan(new Decimal(0))
            ? removeInvalidZero(result)
            : type === '0'
              ? '-' + removeInvalidZero(result)
              : removeInvalidZero(result)
        }
      } else {
        let value = ''
        // Here it is necessary to judge whether it is greater than 1, and if it is greater than 1, directly retain 8 decimal places
        if (dec.greaterThan(1)) {
          value = dec.toFixed(8, Decimal.ROUND_DOWN)
        } else {
          value = dec.toFixed(precision - length, Decimal.ROUND_DOWN)
        }

        value = formatePrecision(value, pres).toString()
        // If it is a sats token, round up
        if (integerTokenArr.includes(tokenSymbol)) {
          value = new Decimal(value).toFixed(0, Decimal.ROUND_CEIL)
        }

        // Do thousandths
        let result = ''
        if (typeof value === 'string') {
          if (value.includes('.')) {
            result = value.replace(/\d(?=(\d{3})+\.)/g, '$&,')
          } else {
            result = toLocalString(value)
          }
        } else {
          result = value
        }

        return removeInvalidZero(result)
      }
    }) ?? '0.00'
  )
}

/**
 * Format the local fiat currency, with two decimal places by default
 */
export function formateFaitAmount(num: AmountNum = 0) {
  return (
    tryRun(() => {
      const dec = new Decimal(num)
      const fnum = dec.toFixed(2, Decimal.ROUND_DOWN)
      // If it is greater than 1000, perform thousandths processing
      if (Number(num) >= 1000) {
        let result = toLocalString(fnum)
        if (!result.includes('.')) {
          result = result + '.00'
        }
        return result
      } else {
        return fnum
      }
    }) ?? '0.00'
  )
}

export function tryRun(fn: () => any) {
  try {
    return fn()
  } catch (error: any) {
    return null
  }
}