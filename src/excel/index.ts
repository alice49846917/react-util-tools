/**
 * SheetJS (xlsx) 封装
 * 完整导出 SheetJS 的所有功能
 * 文档：https://docs.sheetjs.com/
 */

import * as XLSX from 'xlsx'

// 导出整个 XLSX 对象，保留所有功能
export { XLSX }

// 导出常用类型
export type {
  WorkBook,
  WorkSheet,
  CellObject,
  Range,
  WritingOptions,
  ParsingOptions,
  BookType,
  Sheet2JSONOpts,
  JSON2SheetOpts
} from 'xlsx'

// 导出常用方法（方便直接使用）
export const {
  read,
  readFile,
  write,
  writeFile,
  writeFileXLSX,
  utils
} = XLSX

/**
 * 读取 Excel 文件（从 File 对象）
 * @param file File 对象
 * @param options 解析选项
 * @returns Promise<WorkBook>
 */
export function readExcelFile(
  file: File,
  options?: XLSX.ParsingOptions
): Promise<XLSX.WorkBook> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result
        const workbook = XLSX.read(data, options)
        resolve(workbook)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 将 WorkBook 转换为 JSON 数据
 * @param workbook WorkBook 对象
 * @param sheetName 工作表名称（可选，默认第一个）
 * @param options 转换选项
 * @returns JSON 数据数组
 */
export function workbookToJSON<T = any>(
  workbook: XLSX.WorkBook,
  sheetName?: string,
  options?: XLSX.Sheet2JSONOpts
): T[] {
  const sheet = sheetName 
    ? workbook.Sheets[sheetName] 
    : workbook.Sheets[workbook.SheetNames[0]]
  
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`)
  }
  
  return XLSX.utils.sheet_to_json<T>(sheet, options)
}

/**
 * 从 JSON 数据创建 WorkBook
 * @param data JSON 数据数组
 * @param sheetName 工作表名称（默认 'Sheet1'）
 * @param options 转换选项
 * @returns WorkBook 对象
 */
export function jsonToWorkbook<T = any>(
  data: T[],
  sheetName = 'Sheet1',
  options?: XLSX.JSON2SheetOpts
): XLSX.WorkBook {
  const worksheet = XLSX.utils.json_to_sheet(data, options)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  return workbook
}

/**
 * 导出 Excel 文件（浏览器下载）
 * @param workbook WorkBook 对象
 * @param filename 文件名（默认 'export.xlsx'）
 * @param options 写入选项
 */
export function exportExcelFile(
  workbook: XLSX.WorkBook,
  filename = 'export.xlsx',
  options?: XLSX.WritingOptions
): void {
  XLSX.writeFile(workbook, filename, options)
}

/**
 * 从 JSON 数据直接导出 Excel 文件
 * @param data JSON 数据数组
 * @param filename 文件名（默认 'export.xlsx'）
 * @param sheetName 工作表名称（默认 'Sheet1'）
 * @param options 写入选项
 */
export function exportJSONToExcel<T = any>(
  data: T[],
  filename = 'export.xlsx',
  sheetName = 'Sheet1',
  options?: XLSX.WritingOptions
): void {
  const workbook = jsonToWorkbook(data, sheetName)
  exportExcelFile(workbook, filename, options)
}

/**
 * 读取 Excel 文件并转换为 JSON
 * @param file File 对象
 * @param sheetName 工作表名称（可选，默认第一个）
 * @param parseOptions 解析选项
 * @param jsonOptions JSON 转换选项
 * @returns Promise<JSON 数据数组>
 */
export async function readExcelToJSON<T = any>(
  file: File,
  sheetName?: string,
  parseOptions?: XLSX.ParsingOptions,
  jsonOptions?: XLSX.Sheet2JSONOpts
): Promise<T[]> {
  const workbook = await readExcelFile(file, parseOptions)
  return workbookToJSON<T>(workbook, sheetName, jsonOptions)
}

/**
 * 获取 WorkBook 中所有工作表的名称
 * @param workbook WorkBook 对象
 * @returns 工作表名称数组
 */
export function getSheetNames(workbook: XLSX.WorkBook): string[] {
  return workbook.SheetNames
}

/**
 * 获取指定工作表
 * @param workbook WorkBook 对象
 * @param sheetName 工作表名称
 * @returns WorkSheet 对象
 */
export function getSheet(
  workbook: XLSX.WorkBook,
  sheetName: string
): XLSX.WorkSheet {
  const sheet = workbook.Sheets[sheetName]
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`)
  }
  return sheet
}

/**
 * 将 WorkSheet 转换为 CSV 字符串
 * @param worksheet WorkSheet 对象
 * @param options 转换选项
 * @returns CSV 字符串
 */
export function sheetToCSV(
  worksheet: XLSX.WorkSheet,
  options?: XLSX.Sheet2CSVOpts
): string {
  return XLSX.utils.sheet_to_csv(worksheet, options)
}

/**
 * 将 WorkSheet 转换为 HTML 字符串
 * @param worksheet WorkSheet 对象
 * @param options 转换选项
 * @returns HTML 字符串
 */
export function sheetToHTML(
  worksheet: XLSX.WorkSheet,
  options?: XLSX.Sheet2HTMLOpts
): string {
  return XLSX.utils.sheet_to_html(worksheet, options)
}

/**
 * 从 HTML 表格创建 WorkSheet
 * @param table HTML 表格元素或字符串
 * @param options 转换选项
 * @returns WorkSheet 对象
 */
export function tableToSheet(
  table: HTMLElement | string,
  options?: XLSX.Table2SheetOpts
): XLSX.WorkSheet {
  return XLSX.utils.table_to_sheet(table, options)
}

/**
 * 从 AOA (Array of Arrays) 创建 WorkSheet
 * @param data 二维数组
 * @param options 转换选项
 * @returns WorkSheet 对象
 */
export function aoaToSheet(
  data: any[][],
  options?: XLSX.AOA2SheetOpts
): XLSX.WorkSheet {
  return XLSX.utils.aoa_to_sheet(data, options)
}

/**
 * 将 WorkSheet 转换为 AOA (Array of Arrays)
 * @param worksheet WorkSheet 对象
 * @param options 转换选项
 * @returns 二维数组
 */
export function sheetToAOA(
  worksheet: XLSX.WorkSheet,
  options?: XLSX.Sheet2JSONOpts
): any[][] {
  return XLSX.utils.sheet_to_json(worksheet, { ...options, header: 1 })
}
