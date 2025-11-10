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

  // 转换为数字
  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  // 处理无效数字
  if (isNaN(num)) {
    return `${symbol}0${decimalPoint}${'0'.repeat(decimals)}`
  }

  // 处理负数
  const isNegative = num < 0
  const absNum = Math.abs(num)

  // 固定小数位
  const fixed = absNum.toFixed(decimals)
  const [integerPart, decimalPart] = fixed.split('.')

  // 添加千分位分隔符
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  // 组合结果
  let result = symbol + formattedInteger
  if (decimals > 0 && decimalPart) {
    result += decimalPoint + decimalPart
  }

  return isNegative ? `-${result}` : result
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
  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(num)) {
    return '0.' + '0'.repeat(decimals)
  }

  const fixed = num.toFixed(decimals)
  const [integerPart, decimalPart] = fixed.split('.')

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return decimals > 0 && decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger
}

/**
 * 金额转中文大写
 * @param amount 金额数字
 * @returns 中文大写金额
 */
export function formatMoneyToChinese(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(num) || num < 0) {
    return '零元整'
  }

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
