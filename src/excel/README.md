# Excel - SheetJS 封装

基于 [SheetJS (xlsx)](https://docs.sheetjs.com/) 的 Excel 文件处理工具，保留了 SheetJS 的所有原生功能。

## 特性

- ✅ 完整导出 SheetJS 所有功能
- 📖 读取 Excel 文件（.xlsx, .xls, .csv 等）
- 📝 创建和导出 Excel 文件
- 🔄 JSON 与 Excel 互转
- 🌐 支持多种格式（CSV, HTML, AOA 等）
- 💻 浏览器和 Node.js 环境均可使用

## 安装

```bash
npm install react-util-tools
```

## 基础用法

### 导入模块

```typescript
import {
  XLSX,                    // 完整的 XLSX 对象
  readExcelFile,           // 读取 Excel 文件
  exportJSONToExcel,       // 导出 JSON 为 Excel
  workbookToJSON,          // WorkBook 转 JSON
  jsonToWorkbook,          // JSON 转 WorkBook
  utils                    // XLSX 工具函数
} from 'react-util-tools'
```

## 常用功能

### 1. 读取 Excel 文件

```typescript
import { readExcelFile, workbookToJSON } from 'react-util-tools'

// 从 File 对象读取
async function handleFileUpload(file: File) {
  try {
    const workbook = await readExcelFile(file)
    
    // 获取所有工作表名称
    console.log(workbook.SheetNames) // ['Sheet1', 'Sheet2']
    
    // 转换为 JSON
    const data = workbookToJSON(workbook)
    console.log(data)
  } catch (error) {
    console.error('读取失败:', error)
  }
}

// 在 React 中使用
function ExcelUploader() {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleFileUpload(file)
    }
  }
  
  return <input type="file" accept=".xlsx,.xls" onChange={handleChange} />
}
```

### 2. 直接读取为 JSON

```typescript
import { readExcelToJSON } from 'react-util-tools'

async function loadExcelData(file: File) {
  // 读取第一个工作表
  const data = await readExcelToJSON(file)
  console.log(data)
  
  // 读取指定工作表
  const sheet2Data = await readExcelToJSON(file, 'Sheet2')
  console.log(sheet2Data)
}
```

### 3. 导出 JSON 为 Excel

```typescript
import { exportJSONToExcel } from 'react-util-tools'

function exportData() {
  const data = [
    { name: '张三', age: 25, city: '北京' },
    { name: '李四', age: 30, city: '上海' },
    { name: '王五', age: 28, city: '广州' }
  ]
  
  // 导出为 Excel 文件
  exportJSONToExcel(data, 'users.xlsx', 'UserList')
}

// 在 React 中使用
function ExportButton() {
  return <button onClick={exportData}>导出 Excel</button>
}
```

### 4. 创建多工作表 Excel

```typescript
import { XLSX, utils, exportExcelFile } from 'react-util-tools'

function exportMultiSheet() {
  // 创建工作簿
  const workbook = utils.book_new()
  
  // 第一个工作表
  const users = [
    { name: '张三', age: 25 },
    { name: '李四', age: 30 }
  ]
  const sheet1 = utils.json_to_sheet(users)
  utils.book_append_sheet(workbook, sheet1, '用户列表')
  
  // 第二个工作表
  const products = [
    { product: 'iPhone', price: 5999 },
    { product: 'iPad', price: 3999 }
  ]
  const sheet2 = utils.json_to_sheet(products)
  utils.book_append_sheet(workbook, sheet2, '产品列表')
  
  // 导出文件
  exportExcelFile(workbook, 'data.xlsx')
}
```

### 5. 自定义表头

```typescript
import { jsonToWorkbook, exportExcelFile } from 'react-util-tools'

function exportWithCustomHeaders() {
  const data = [
    { name: '张三', age: 25, city: '北京' },
    { name: '李四', age: 30, city: '上海' }
  ]
  
  // 自定义表头
  const workbook = jsonToWorkbook(data, 'Sheet1', {
    header: ['姓名', '年龄', '城市']
  })
  
  exportExcelFile(workbook, 'custom-headers.xlsx')
}
```

### 6. 使用 AOA (Array of Arrays)

```typescript
import { aoaToSheet, utils, exportExcelFile } from 'react-util-tools'

function exportFromArray() {
  const data = [
    ['姓名', '年龄', '城市'],
    ['张三', 25, '北京'],
    ['李四', 30, '上海'],
    ['王五', 28, '广州']
  ]
  
  const worksheet = aoaToSheet(data)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  
  exportExcelFile(workbook, 'array-data.xlsx')
}
```

### 7. 转换为 CSV

```typescript
import { readExcelFile, getSheet, sheetToCSV } from 'react-util-tools'

async function convertToCSV(file: File) {
  const workbook = await readExcelFile(file)
  const sheet = getSheet(workbook, 'Sheet1')
  const csv = sheetToCSV(sheet)
  
  console.log(csv)
  
  // 下载 CSV
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'data.csv'
  a.click()
}
```

### 8. 从 HTML 表格创建 Excel

```typescript
import { tableToSheet, utils, exportExcelFile } from 'react-util-tools'

function exportTableToExcel() {
  const table = document.querySelector('table')
  if (!table) return
  
  const worksheet = tableToSheet(table)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  
  exportExcelFile(workbook, 'table-export.xlsx')
}
```

## 高级用法

### 使用完整的 XLSX 对象

```typescript
import { XLSX } from 'react-util-tools'

// 访问所有 SheetJS 功能
const workbook = XLSX.read(data, { type: 'binary' })
const worksheet = workbook.Sheets[workbook.SheetNames[0]]

// 设置单元格样式（需要 xlsx-style 或 xlsx-js-style）
worksheet['A1'].s = {
  font: { bold: true },
  fill: { fgColor: { rgb: 'FFFF00' } }
}

// 合并单元格
worksheet['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }
]

// 设置列宽
worksheet['!cols'] = [
  { wch: 20 },
  { wch: 15 },
  { wch: 30 }
]
```

### 读取选项

```typescript
import { readExcelFile } from 'react-util-tools'

const workbook = await readExcelFile(file, {
  type: 'binary',           // 数据类型
  cellDates: true,          // 将日期解析为 Date 对象
  cellNF: false,            // 不保存数字格式
  cellStyles: false,        // 不保存样式
  sheetStubs: false,        // 不生成空单元格
  raw: false                // 不使用原始值
})
```

### 写入选项

```typescript
import { exportExcelFile } from 'react-util-tools'

exportExcelFile(workbook, 'output.xlsx', {
  bookType: 'xlsx',         // 文件类型
  type: 'binary',           // 输出类型
  compression: true,        // 启用压缩
  Props: {                  // 文档属性
    Title: '数据报表',
    Author: '系统管理员',
    CreatedDate: new Date()
  }
})
```

## 支持的文件格式

### 读取格式
- `.xlsx` - Excel 2007+ XML 格式
- `.xlsb` - Excel 2007+ 二进制格式
- `.xlsm` - Excel 2007+ 宏文件
- `.xls` - Excel 97-2004 格式
- `.csv` - 逗号分隔值
- `.txt` - 文本文件
- `.ods` - OpenDocument 电子表格
- 更多格式请参考 [SheetJS 文档](https://docs.sheetjs.com/)

### 导出格式
- `xlsx` - Excel 2007+ XML 格式（默认）
- `xlsb` - Excel 2007+ 二进制格式
- `xls` - Excel 97-2004 格式
- `csv` - 逗号分隔值
- `txt` - UTF-16 文本
- `html` - HTML 表格
- `ods` - OpenDocument 电子表格

## API 参考

### 核心导出

- `XLSX` - 完整的 SheetJS 对象
- `utils` - SheetJS 工具函数集合
- `read` - 读取数据
- `write` - 写入数据
- `readFile` - 读取文件（Node.js）
- `writeFile` - 写入文件

### 封装函数

#### readExcelFile(file, options?)
从 File 对象读取 Excel 文件

#### workbookToJSON(workbook, sheetName?, options?)
将 WorkBook 转换为 JSON 数组

#### jsonToWorkbook(data, sheetName?, options?)
从 JSON 数组创建 WorkBook

#### exportExcelFile(workbook, filename?, options?)
导出 Excel 文件（浏览器下载）

#### exportJSONToExcel(data, filename?, sheetName?, options?)
直接从 JSON 导出 Excel 文件

#### readExcelToJSON(file, sheetName?, parseOptions?, jsonOptions?)
读取 Excel 文件并转换为 JSON

#### getSheetNames(workbook)
获取所有工作表名称

#### getSheet(workbook, sheetName)
获取指定工作表

#### sheetToCSV(worksheet, options?)
将工作表转换为 CSV 字符串

#### sheetToHTML(worksheet, options?)
将工作表转换为 HTML 字符串

#### tableToSheet(table, options?)
从 HTML 表格创建工作表

#### aoaToSheet(data, options?)
从二维数组创建工作表

#### sheetToAOA(worksheet, options?)
将工作表转换为二维数组

## TypeScript 支持

完整的 TypeScript 类型定义：

```typescript
import type {
  WorkBook,
  WorkSheet,
  CellObject,
  Range,
  WritingOptions,
  ParsingOptions,
  BookType,
  Sheet2JSONOpts,
  JSON2SheetOpts
} from 'react-util-tools'
```

## 注意事项

1. **浏览器环境**：文件读取使用 FileReader API
2. **文件大小**：处理大文件时注意内存占用
3. **样式支持**：基础版本不支持样式，需要额外的库
4. **日期格式**：Excel 日期需要特殊处理
5. **公式**：默认读取公式的计算结果，不是公式本身

## 相关链接

- [SheetJS 官方文档](https://docs.sheetjs.com/)
- [SheetJS GitHub](https://github.com/SheetJS/sheetjs)
- [在线演示](https://sheetjs.com/demos)

## 示例项目

完整的使用示例请参考项目中的示例代码。
