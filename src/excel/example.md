# Excel 模块使用示例

## React 组件示例

### 1. Excel 文件上传和解析

```tsx
import React, { useState } from 'react'
import { readExcelToJSON } from 'react-util-tools'

interface UserData {
  name: string
  age: number
  email: string
}

function ExcelUploader() {
  const [data, setData] = useState<UserData[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const jsonData = await readExcelToJSON<UserData>(file)
      setData(jsonData)
      console.log('解析成功:', jsonData)
    } catch (error) {
      console.error('解析失败:', error)
      alert('文件解析失败，请检查文件格式')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <p>正在解析...</p>}
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>年龄</th>
              <th>邮箱</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ExcelUploader
```

### 2. 导出数据为 Excel

```tsx
import React from 'react'
import { exportJSONToExcel } from 'react-util-tools'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

function ProductList() {
  const products: Product[] = [
    { id: 1, name: 'iPhone 15', price: 5999, stock: 100 },
    { id: 2, name: 'iPad Pro', price: 6999, stock: 50 },
    { id: 3, name: 'MacBook Pro', price: 12999, stock: 30 }
  ]

  const handleExport = () => {
    exportJSONToExcel(
      products,
      'products.xlsx',
      'ProductList'
    )
  }

  return (
    <div>
      <button onClick={handleExport}>导出为 Excel</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>产品名称</th>
            <th>价格</th>
            <th>库存</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>¥{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
```

### 3. 多工作表导出

```tsx
import React from 'react'
import { XLSX, utils, exportExcelFile } from 'react-util-tools'

function MultiSheetExport() {
  const handleExport = () => {
    // 创建工作簿
    const workbook = utils.book_new()

    // 用户数据
    const users = [
      { name: '张三', age: 25, department: '技术部' },
      { name: '李四', age: 30, department: '市场部' }
    ]
    const userSheet = utils.json_to_sheet(users)
    utils.book_append_sheet(workbook, userSheet, '员工列表')

    // 销售数据
    const sales = [
      { month: '1月', revenue: 100000, profit: 20000 },
      { month: '2月', revenue: 120000, profit: 25000 }
    ]
    const salesSheet = utils.json_to_sheet(sales)
    utils.book_append_sheet(workbook, salesSheet, '销售数据')

    // 导出
    exportExcelFile(workbook, 'company-report.xlsx')
  }

  return (
    <button onClick={handleExport}>
      导出多工作表报表
    </button>
  )
}

export default MultiSheetExport
```

### 4. 读取指定工作表

```tsx
import React, { useState } from 'react'
import { readExcelFile, getSheetNames, workbookToJSON } from 'react-util-tools'

function MultiSheetReader() {
  const [sheets, setSheets] = useState<string[]>([])
  const [selectedSheet, setSelectedSheet] = useState<string>('')
  const [data, setData] = useState<any[]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const workbook = await readExcelFile(file)
      const sheetNames = getSheetNames(workbook)
      setSheets(sheetNames)
      
      // 默认读取第一个工作表
      if (sheetNames.length > 0) {
        const firstSheet = sheetNames[0]
        setSelectedSheet(firstSheet)
        const jsonData = workbookToJSON(workbook, firstSheet)
        setData(jsonData)
      }
    } catch (error) {
      console.error('读取失败:', error)
    }
  }

  const handleSheetChange = async (sheetName: string) => {
    setSelectedSheet(sheetName)
    // 重新读取文件并获取指定工作表
    // 实际应用中应该缓存 workbook
  }

  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      
      {sheets.length > 0 && (
        <div>
          <label>选择工作表：</label>
          <select value={selectedSheet} onChange={e => handleSheetChange(e.target.value)}>
            {sheets.map(sheet => (
              <option key={sheet} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
        </div>
      )}

      {data.length > 0 && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default MultiSheetReader
```

### 5. 从 HTML 表格导出

```tsx
import React, { useRef } from 'react'
import { tableToSheet, utils, exportExcelFile } from 'react-util-tools'

function TableExporter() {
  const tableRef = useRef<HTMLTableElement>(null)

  const handleExport = () => {
    if (!tableRef.current) return

    const worksheet = tableToSheet(tableRef.current)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    
    exportExcelFile(workbook, 'table-export.xlsx')
  }

  return (
    <div>
      <button onClick={handleExport}>导出表格</button>
      
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>城市</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>张三</td>
            <td>25</td>
            <td>北京</td>
          </tr>
          <tr>
            <td>李四</td>
            <td>30</td>
            <td>上海</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableExporter
```

### 6. 高级用法 - 自定义样式和格式

```tsx
import React from 'react'
import { XLSX, utils, exportExcelFile } from 'react-util-tools'

function AdvancedExport() {
  const handleExport = () => {
    const data = [
      { name: '张三', score: 95, grade: 'A' },
      { name: '李四', score: 87, grade: 'B' },
      { name: '王五', score: 92, grade: 'A' }
    ]

    // 创建工作表
    const worksheet = utils.json_to_sheet(data)

    // 设置列宽
    worksheet['!cols'] = [
      { wch: 15 },  // 姓名列宽度
      { wch: 10 },  // 分数列宽度
      { wch: 10 }   // 等级列宽度
    ]

    // 合并单元格（如果需要）
    // worksheet['!merges'] = [
    //   { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }  // 合并第一行的 A-C 列
    // ]

    // 创建工作簿
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Scores')

    // 导出
    exportExcelFile(workbook, 'student-scores.xlsx', {
      bookType: 'xlsx',
      compression: true
    })
  }

  return (
    <button onClick={handleExport}>
      导出成绩单
    </button>
  )
}

export default AdvancedExport
```

## 纯 JavaScript 示例

### Node.js 环境

```javascript
import { readFile, jsonToWorkbook, exportExcelFile } from 'react-util-tools'
import fs from 'fs'

// 读取 Excel 文件
async function readExcelInNode() {
  const buffer = fs.readFileSync('input.xlsx')
  const workbook = readFile(buffer)
  const data = workbookToJSON(workbook)
  console.log(data)
}

// 导出 Excel 文件
function exportExcelInNode() {
  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ]
  
  const workbook = jsonToWorkbook(data)
  writeFile(workbook, 'output.xlsx')
}
```

## 常见问题

### 1. 如何处理大文件？

对于大文件，建议分批处理或使用流式读取：

```typescript
import { readExcelFile, getSheetNames, getSheet, sheetToAOA } from 'react-util-tools'

async function processBigFile(file: File) {
  const workbook = await readExcelFile(file)
  const sheet = getSheet(workbook, 'Sheet1')
  
  // 转换为数组，逐行处理
  const rows = sheetToAOA(sheet)
  
  // 分批处理
  const batchSize = 1000
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)
    await processBatch(batch)
  }
}
```

### 2. 如何处理日期格式？

```typescript
import { readExcelFile, workbookToJSON } from 'react-util-tools'

async function handleDates(file: File) {
  const workbook = await readExcelFile(file, {
    cellDates: true  // 将日期解析为 Date 对象
  })
  
  const data = workbookToJSON(workbook)
  console.log(data)
}
```

### 3. 如何导出 CSV？

```typescript
import { jsonToWorkbook, getSheet, sheetToCSV } from 'react-util-tools'

function exportToCSV(data: any[]) {
  const workbook = jsonToWorkbook(data)
  const sheet = getSheet(workbook, 'Sheet1')
  const csv = sheetToCSV(sheet)
  
  // 下载 CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'data.csv'
  link.click()
}
```
