# 🎛️ 后台管理与内容控制指南

本指南说明如何使用 TinaCMS 进行内容管理和后台控制。

登录、用户资料、账号绑定、会员权限和 Firestore 持久化的当前实现记录在
[`docs/backend-auth.md`](./backend-auth.md)。后台内容管理不应绕过该登录与权限层。

管理員登入後可以使用 `/api/admin/system-status` 進行安全自檢，查看 Admin 白名單、Firebase、Stripe secret、Stripe webhook、會員 gating、recurring price 是否就緒。該 API 不會向非管理員公開。

## 目录

- [TinaCMS 编辑器](#tinacms-编辑器)
- [内容管理](#内容管理)
- [权限管理](#权限管理)
- [内容发布](#内容发布)
- [分析与监控](#分析与监控)

---

## TinaCMS 编辑器

### 什么是 TinaCMS？

TinaCMS 是一个 Git-backed 内容管理系统，允许你直接在浏览器中编辑 MDX 内容，自动提交到 GitHub。

### 启用 TinaCMS

#### 本地开发

```bash
# 安装依赖
npm install tinacms @tinacms/cli

# 启动开发模式
npx tinacms dev -c "npm run dev"

# 访问 http://localhost:3000/admin
```

#### 云端（部署到 Vercel）

1. 在 [tina.io](https://tina.io) 注册账户
2. 创建新项目并连接你的 GitHub 仓库
3. 获取 `TINA_CLIENT_ID` 和 `TINA_TOKEN`
4. 在 Vercel 环境变量中添加：
   ```
   TINA_CLIENT_ID=xxx
   TINA_TOKEN=xxx
   ```
5. 部署后，访问 `https://your-site.com/admin`

### 访问编辑器

- **本地**: http://localhost:3000/admin
- **云端**: https://your-domain.com/admin

### 编辑器界面

```
┌─────────────────────────────────────┐
│  导航菜单  │        编辑器         │  
├─────────────┼─────────────────────┤
│ 博客文章    │ 标题输入框          │
│ 笔记        │ 日期选择器          │
│ 项目        │ 内容编辑器          │
│             │ 预览窗口            │
└─────────────┴─────────────────────┘
```

---

## 内容管理

### 创建博客文章

#### 步骤

1. 打开 TinaCMS 编辑器
2. 左侧菜单选择 "博客文章"
3. 点击 "+ 新建文章"
4. 填写以下信息：
   - **标题**: 文章标题
   - **日期**: 发布日期
   - **描述**: SEO 描述（160 字以内）
   - **分类**: 文章分类（如"技术"、"生活"）
   - **标签**: 多个标签，用逗号分隔
   - **封面图**: 可选
   - **内容**: MDX 格式的正文

#### 示例

```markdown
---
title: "学习 React Hooks"
date: 2024-01-15
description: "深入理解 React Hooks 的使用和最佳实践"
category: "技术"
tags: ["React", "JavaScript", "前端"]
---

# React Hooks 完全指南

## 什么是 Hooks？

Hooks 是 React 提供的一种新特性...
```

### 创建笔记

#### 步骤

1. 打开编辑器，选择 "学习笔记"
2. 点击 "+ 新建笔记"
3. 填写字段

#### 特殊功能

- **数学公式**: 使用 KaTeX 语法
  ```markdown
  行内: $E = mc^2$
  块级: $$\int_0^1 x dx$$
  ```

- **系列笔记**: 为相关笔记标记同一 series
  ```yaml
  series: "微积分基础"
  ```

### 创建项目

#### 步骤

1. 选择 "项目"
2. 点击 "+ 新建项目"
3. 填写信息：
   - **项目名**: 项目标题
   - **描述**: 项目介绍
   - **技术栈**: 使用的技术（多个）
   - **截图**: 项目演示图
   - **演示链接**: 在线演示 URL
   - **GitHub**: GitHub 仓库链接
   - **推荐**: 是否在首页推荐

---

## 权限管理

### 控制访问权限

在 `src/lib/auth.ts` 中配置授权用户：

```typescript
const ALLOWED_USERS = [
  'your-email@gmail.com',
  'another@example.com',
]

export const auth = NextAuth({
  callbacks: {
    authorized({ auth }) {
      if (!auth?.user?.email) return false
      return ALLOWED_USERS.includes(auth.user.email)
    },
  },
})
```

### TinaCMS 权限

在 `tina/config.ts` 中配置编辑器权限：

```typescript
export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  
  // 编辑器权限（仅允许特定用户）
  editorAuthCallbacks: {
    canEditContent: async (user) => {
      const allowedEmails = ['your-email@gmail.com']
      return allowedEmails.includes(user.email)
    },
  },
})
```

---

## 内容发布

### 发布流程

```
编辑内容 → 预览 → 提交 → GitHub 审查 → 自动部署
```

### 自动部署

1. 推送到 GitHub main 分支时自动触发
2. Vercel 检测到代码变化自动部署
3. 约 1-2 分钟后生效

### 草稿与发布

在文章 frontmatter 中控制：

```yaml
published: false  # 草稿，不显示在列表中
```

### 预览

TinaCMS 提供实时预览，保存时自动更新。

---

## 分析与监控

### 查看网站统计

#### Google Analytics

1. 连接 Google Analytics
2. 在 `src/components/MainLayout.tsx` 中添加：
   ```tsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   ```

#### Vercel Analytics

自动启用，访问 Vercel Dashboard 查看：
- 页面浏览量
- 访问者数
- 性能指标

### 错误监控

#### Sentry 集成

1. 注册 [Sentry](https://sentry.io) 账户
2. 创建 Next.js 项目
3. 安装依赖：
   ```bash
   npm install @sentry/nextjs
   ```
4. 配置 `next.config.ts`
5. 设置环境变量

### 性能监控

#### Web Vitals

检查关键页面性能指标：

```bash
npm run build
npm run analyze  # 分析包大小
```

使用 Chrome DevTools：
1. 打开 DevTools (F12)
2. 转到 Performance 标签
3. 记录页面加载

---

## 常见操作

### 修改网站信息

编辑以下文件：

| 文件 | 内容 |
|------|------|
| `src/components/glass/GlassSidebar.tsx` | 个人信息、头像 |
| `src/app/about/page.tsx` | 关于页面 |
| `src/app/page.tsx` | 首页内容 |
| `.env.local` | 网站 URL、服务配置 |

### 修改主题色

编辑 `src/app/globals.css`：

```css
:root {
  --primary: oklch(0.7 0.15 280);  /* 主色 */
  --accent: oklch(0.75 0.1 330);   /* 强调色 */
  /* ... 更多颜色 */
}
```

### 添加新页面

1. 在 `src/app/` 中创建新文件夹
2. 添加 `page.tsx`:
   ```tsx
   export default function Page() {
     return <div>新页面</div>
   }
   ```
3. 自动生成路由

### 添加新导航菜单项

编辑 `src/components/glass/GlassSidebar.tsx`：

```tsx
const navItems: NavItem[] = [
  { href: "/", label: "首页", icon: <Home /> },
  { href: "/about", label: "关于", icon: <User /> },
  // 添加新项
  { href: "/new-page", label: "新页面", icon: <NewIcon /> },
]
```

---

## 常见问题

### Q: 如何隐藏某篇文章？
A: 在 frontmatter 中设置：
```yaml
published: false
```

### Q: 如何修改已发布的内容？
A: 在 TinaCMS 中编辑后自动提交到 GitHub，网站自动更新。

### Q: 能否批量导入内容？
A: 可以通过以下方式：
1. 手动复制 MDX 文件到 `content/` 目录
2. Git 推送文件
3. TinaCMS 会自动识别

### Q: 编辑器变慢怎么办？
A: 
- 清除浏览器缓存
- 减少内容大小
- 检查网络连接

### Q: 如何恢复以前的版本？
A: 在 GitHub 上查看提交历史，恢复某个提交即可。

---

## 高级功能

### 自定义 MDX 组件

在 `src/components/Mdx.tsx` 中定义自定义组件：

```tsx
const components = {
  GlassCard: ({ children }) => (
    <GlassCard variant="elevated">{children}</GlassCard>
  ),
  Alert: ({ type, children }) => (
    <div className={`alert alert-${type}`}>{children}</div>
  ),
}
```

在 MDX 中使用：

```markdown
<GlassCard>
  特殊内容
</GlassCard>
```

### 添加评论系统

已集成 Giscus，需配置：

```env
NEXT_PUBLIC_GISCUS_REPO=your-username/repo
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
# ...其他配置
```

### 集成搜索功能

可使用 Algolia：

```bash
npm install algoliasearch react-instantsearch-hooks-web
```

---

## 参考链接

- [TinaCMS 文档](https://tina.io/docs/)
- [MDX 语法](https://mdxjs.com/)
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
