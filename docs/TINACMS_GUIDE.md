# TinaCMS 配置和使用教程

## 概述

TinaCMS 是一个 Git-backed CMS（内容管理系统），它允许你通过可视化界面编辑存储在 Git 仓库中的 MDX 内容。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

依赖包括：
- `tinacms`：核心库
- `@tinacms/cli`：命令行工具

### 2. 注册 Tina Cloud 账号

访问 https://tina.io，注册并创建一个新项目：

1. 点击 "Sign up" 或 "Sign in"
2. 授权你的 GitHub 账号
3. 在 Tina Cloud 创建一个新的项目
4. 选择你的 GitHub 仓库

### 3. 获取认证凭证

在 Tina Cloud 控制面板中找到：
- **Client ID**
- **Token**

### 4. 配置环境变量

#### 本地开发（.env.local）
```
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

#### Vercel 部署（Vercel Dashboard → Settings → Environment Variables）
```
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### 5. 启动本地编辑器

运行以下命令启动 TinaCMS 编辑器（访问 http://localhost:3000/admin）：

```bash
npm run tina:dev
```

这会同时启动：
- TinaCMS 编辑器后端
- Next.js 开发服务器

## 使用指南

### 访问编辑器

**本地：** http://localhost:3000/admin  
**生产（Vercel）：** https://your-domain/admin

### 编辑内容

TinaCMS 支持编辑以下类型的内容：

#### 1. 博客文章（Blog Posts）
路径：`content/blog/*.mdx`

可编辑字段：
- **标题**：文章标题
- **发布日期**：yyyy-MM-dd 格式
- **描述**：文章摘要
- **分类**：文章所属分类
- **标签**：多个标签
- **封面图片**：文章首图
- **显示目录**：是否显示文章目录
- **已发布**：控制文章是否公开
- **内容**：使用富文本编辑器编辑 MDX 内容

#### 2. 学习笔记（Notes）
路径：`content/notes/*.mdx`

可编辑字段：
- **标题**
- **日期**
- **描述**
- **分类**
- **标签**
- **系列**：笔记所属系列
- **显示目录**
- **内容**

#### 3. 项目（Projects）
路径：`content/projects/*.mdx`

可编辑字段：
- **项目名称**
- **项目描述**
- **日期**
- **标签**
- **项目封面**
- **项目链接**：项目在线地址
- **GitHub 链接**
- **精选项目**：是否在首页展示
- **项目详情**

### 新建内容

1. 在编辑器左侧菜单选择要创建的内容类型
2. 点击 "+" 或 "Create New" 按钮
3. 填写各字段信息
4. 点击 "Save" 保存

TinaCMS 会自动：
- 创建新的 MDX 文件
- 提交到 Git（可选）
- 触发网站重新部署（如果配置了）

### 编辑现有内容

1. 在编辑器中找到要编辑的文件
2. 点击打开
3. 修改内容
4. 点击 "Save"

### 删除内容

1. 打开文件
2. 点击 "Delete" 按钮
3. 确认删除

## 文件结构

```
project/
├── tina/
│   └── config.ts          # TinaCMS 配置文件（定义内容模型）
├── content/
│   ├── blog/              # 博客文章
│   │   ├── hello-world.mdx
│   │   └── ...
│   ├── notes/             # 学习笔记
│   │   ├── calculus-basics.mdx
│   │   └── ...
│   └── projects/          # 项目
│       ├── personal-site.mdx
│       └── ...
└── public/images/         # 上传的图片存储位置
```

## 常见问题

### Q: 如何上传图片？

在富文本编辑器中，点击图片按钮，选择本地文件上传。图片会自动保存到 `public/images` 目录。

### Q: 修改的内容何时生效？

1. **本地**：修改后自动生效（需要刷新浏览器）
2. **Vercel**：点击 Save 后，TinaCMS 会提交代码变更，Vercel 会自动重新构建部署

### Q: 如何删除或重命名文件？

通过 TinaCMS 编辑器进行删除或重命名操作时，它会：
1. 在 Git 中记录这些变更
2. 自动提交到你的仓库
3. 触发 Vercel 重新部署

### Q: 如何禁用 Tina 某个功能？

编辑 `tina/config.ts`：

```typescript
// 例如：禁用某个集合
schema: {
  collections: [
    // 移除不需要的集合定义
  ]
}
```

### Q: 我的修改没有保存？

检查以下项目：
1. 确保 `TINA_CLIENT_ID` 和 `TINA_TOKEN` 已正确设置
2. 确保 GitHub 权限已授予（TinaCMS 需要写入仓库权限）
3. 检查浏览器控制台是否有错误
4. 尝试在本地运行 `npm run tina:dev` 测试

### Q: Vercel 构建日志提示 “Branch is not on TinaCloud” 或显示 Unindexed Branch？

1. 登录 [Tina Cloud 项目配置页](https://app.tina.io/projects/a7d1dd0d-b855-4b0e-afec-ec20859c52a2/configuration)
2. 在 *Branches* 卡片中点击 **Refresh Branches**
3. 找到 `main`（或报错中提到的分支）并点击 **Index Branch**
4. 等待状态变为 *Indexed* 后重新触发 Vercel 部署
5. 如果仍失败，确认本地已 `git push` 到 GitHub，确保 Tina Cloud 能拉取到最新代码

## 与 Next.js 集成

TinaCMS 完全集成在 Next.js 中，修改流程如下：

```
编辑器修改内容
    ↓
保存到 Git
    ↓
触发 GitHub webhook
    ↓
Vercel 收到推送
    ↓
执行 npm run build
    ↓
contentlayer2 生成新数据
    ↓
Next.js 构建
    ↓
部署到 Vercel
```

## 构建命令

```bash
# 本地开发（含热更新）
npm run tina:dev

# 生产构建（TinaCMS）
npm run tina:build

# 网站构建
npm run build

# 启动网站
npm start
```

## 安全性说明

- **不要提交 TINA_TOKEN 到 Git**
- TINA_CLIENT_ID 可以公开（包含在客户端代码中）
- TINA_TOKEN 必须通过环境变量私密配置
- 确保只有你能访问 https://your-domain/admin

## 后续步骤

1. ✅ 已安装 TinaCMS
2. ✅ 已配置 `tina/config.ts`
3. 🔲 配置 TINA_CLIENT_ID 和 TINA_TOKEN（从 tina.io）
4. 🔲 本地测试：`npm run tina:dev`
5. 🔲 在 Vercel 添加环境变量
6. 🔲 部署到 Vercel
7. 🔲 访问 https://your-domain/admin 开始编辑内容

## 官方资源

- [Tina 官网](https://tina.io)
- [Tina 文档](https://tina.io/docs/)
- [Tina 配置参考](https://tina.io/docs/reference/config/)
- [GitHub 集成](https://tina.io/docs/features/git/github/)
