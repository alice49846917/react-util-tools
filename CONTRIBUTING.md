# 贡献指南

## 发布新版本

### 1. 确保已登录 npm

```bash
npm whoami
```

如果未登录：

```bash
npm login
```

### 2. 拉取最新代码

```bash
git pull origin main
```

### 3. 修改代码并测试

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建测试
npm run build
```

### 4. 提交代码

```bash
git add .
git commit -m "feat: 添加新功能"
```

### 5. 发布新版本

根据改动类型选择：

```bash
# 修复 bug: 1.0.3 -> 1.0.4
npm run release
# 或
npm run release:patch

# 新功能: 1.0.3 -> 1.1.0
npm run release:minor

# 破坏性更新: 1.0.3 -> 2.0.0
npm run release:major
```

这个命令会自动：
- ✅ 更新版本号
- ✅ 构建项目
- ✅ 推送到 GitHub（包含 tag）
- ✅ 发布到 npm

### 6. 验证发布

```bash
npm view react-util-tools
```

## 版本号规范

遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

- **MAJOR**: 不兼容的 API 修改
- **MINOR**: 向下兼容的功能性新增
- **PATCH**: 向下兼容的问题修正

## 注意事项

- ⚠️ 发布前务必测试代码
- ⚠️ 确保代码已提交到 git
- ⚠️ 不要直接修改 `dist/` 目录
- ⚠️ 发布后无法撤销，请谨慎操作
- ⚠️ 使用 `npm run release` 命令会自动构建和发布
