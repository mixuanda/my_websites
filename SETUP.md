# 🚀 个人网站模板 - 配置指南

这是一个基于 Next.js 15 + Tailwind CSS v4 + Contentlayer 的现代个人网站模板。

## 📋 目录

- [快速开始](#快速开始)
- [环境变量配置](#环境变量配置)
- [认证与登录](#认证与登录)
- [PWA 支持](#pwa-支持)
- [内容管理](#内容管理)
- [功能配置](#功能配置)
- [部署指南](#部署指南)

---

## 快速开始

### 1. 克隆模板

```bash
# 使用模板创建新项目
git clone https://github.com/your-username/Personal_Sites_Template.git my-site
cd my-site

# 删除 git 历史，初始化新仓库
rm -rf .git
git init
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local 填写你的配置
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

---

## 环境变量配置

### 必需配置

| 变量 | 说明 | 获取方式 |
|------|------|----------|
| `NEXT_PUBLIC_SITE_URL` | 网站 URL | 你的域名 |
| `AUTH_SECRET` | Auth.js 密钥 | `openssl rand -base64 32` |

### OAuth 登录 (私密区功能)

#### GitHub OAuth

1. 前往 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写信息:
   - Application name: 你的网站名称
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com/api/auth/callback/github`
4. 复制 Client ID 和 Client Secret

```env
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

#### Google OAuth (可选)

1. 前往 [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. 创建 OAuth 2.0 客户端 ID
3. 添加授权重定向 URI: `https://your-domain.com/api/auth/callback/google`

### Giscus 评论系统

1. 前往 [Giscus 配置页面](https://giscus.app/zh-CN)
2. 启用你的 GitHub 仓库的 Discussions 功能
3. 按照页面指引获取配置:

```env
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxx
```

---

## 认证与登录

### Passkey 无密码登录 (推荐)

Passkey 是最安全的认证方式，使用生物识别或 PIN 码登录。

**优势:**
- ✅ 无需密码
- ✅ 最高安全性
- ✅ 快速便捷

**支持的设备:**
- Face ID / Touch ID (iOS)
- 指纹识别 (Android)
- Windows Hello
- 安全密钥（USB）

**配置:**
Passkey 已在 Auth.js 中启用，无需额外配置。

**使用:**
1. 打开 `/login` 页面
2. 点击 "使用 Passkey 登录"
3. 使用生物识别验证
4. 首次使用会提示注册

### OAuth 登录

除 Passkey 外，还支持 GitHub 和 Google 登录。详见上面的 OAuth 配置章节。

---

## PWA 支持

将网站安装为应用，支持离线使用。

### 自动启用功能

模板已自动配置 PWA，包括：
- ✅ `manifest.json` - 应用配置
- ✅ Service Worker - 离线支持
- ✅ 快捷菜单 - 快速操作
- ✅ 应用图标 - 安装提示

### 安装 PWA

#### Windows / macOS

1. 打开网站
2. 地址栏右侧 "安装" 按钮
3. 点击 "安装"
4. 应用会出现在桌面或应用菜单

#### iOS

1. 打开网站 → Safari
2. 点击分享按钮
3. 选择 "添加到主屏幕"
4. 应用出现在主屏幕

#### Android

1. 打开网站 → Chrome
2. 顶部弹出 "安装应用" 提示
3. 点击 "安装"
4. 应用出现在桌面

### 离线功能

安装后，即使离线也可以：
- ✅ 浏览已缓存的页面
- ✅ 阅读已保存的文章
- ✅ 查看已缓存的内容

网络恢复后自动同步最新内容。

### 自定义应用信息

编辑 `public/manifest.json`:

```json
{
  "name": "个人网站",
  "short_name": "My Site",
  "description": "网站描述",
  "start_url": "/",
  "theme_color": "#6d28d9",
  "background_color": "#ffffff"
}
```

### 添加应用图标

需要添加 PWA 图标到 `public/` 目录：

```
public/
├── icon-192.png      (192x192)
├── icon-192-maskable.png
├── icon-512.png      (512x512)
└── icon-512-maskable.png
```

**推荐工具：**
- [favicon.io](https://favicon.io) - 快速生成
- [PWA Asset Generator](https://tomayac.github.io/pwa-asset-generator/)

---

## 内容管理

### 目录结构

```
content/
├── blog/           # 博客文章
│   └── *.mdx
├── notes/          # 学习笔记
│   └── *.mdx
└── projects/       # 项目展示
    └── *.mdx
```

### NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxx
```

### 文章格式

#### 博客文章 (`content/blog/*.mdx`)

```mdx
---
title: 文章标题
date: 2024-01-15
description: 文章描述，用于 SEO 和预览
tags:
  - 标签1
  - 标签2
category: 分类名称
image: /images/cover.jpg  # 可选
---

文章正文，支持 Markdown 和 React 组件...
```

#### 学习笔记 (`content/notes/*.mdx`)

```mdx
---
title: 笔记标题
date: 2024-01-15
description: 笔记描述
subject: 学科名称
tags:
  - 标签
---

笔记内容，支持 KaTeX 数学公式：

行内公式: $E = mc^2$

块级公式:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

#### 项目 (`content/projects/*.mdx`)

```mdx
---
title: 项目名称
date: 2024-01-15
description: 项目描述
tags:
  - 技术栈
github: https://github.com/username/repo
demo: https://demo.example.com
image: /images/project.jpg
---

项目详情...
```

### MDX 组件

你可以在 MDX 中使用自定义组件：

```mdx
import { GlassCard } from '@/components/glass'

<GlassCard variant="elevated">
  特殊高亮内容
</GlassCard>
```

---

## 功能配置

### 1. 修改个人信息

编辑 `src/components/glass/GlassSidebar.tsx`:

```tsx
// 修改头像
<Avatar className="h-24 w-24 border-2 border-primary/20">
  <AvatarImage src="/your-avatar.jpg" alt="Your Name" />
  <AvatarFallback>YN</AvatarFallback>
</Avatar>

// 修改名称和签名
<h2 className="text-xl font-semibold text-foreground">你的名字</h2>
<p className="text-sm text-muted-foreground">你的签名</p>
```

### 2. 修改导航菜单

同样在 `GlassSidebar.tsx` 中修改 `navItems`:

```tsx
const navItems = [
  { href: '/', icon: Home, label: '首页' },
  { href: '/blog', icon: FileText, label: '博客' },
  { href: '/notes', icon: BookOpen, label: '笔记' },
  { href: '/projects', icon: FolderOpen, label: '项目' },
  // 添加更多...
]
```

### 3. 修改关于页面

编辑 `src/app/about/page.tsx`。

### 4. 私密区授权用户

编辑 `src/lib/auth.ts`:

```tsx
// 添加允许访问私密区的邮箱或 ID
const ALLOWED_USERS = [
  'your-email@example.com',
  // 添加更多...
]

// 在 callbacks 中检查
authorized: async ({ auth, request }) => {
  if (isPrivate) {
    if (!auth?.user) return false
    return ALLOWED_USERS.includes(auth.user.email || '')
  }
  return true
}
```

### 5. 数据库配置 (私密日记)

默认使用内存存储（开发用）。生产环境建议配置:

#### Firebase Firestore

```typescript
// src/lib/db.ts
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

export const db = getFirestore(app)
```

#### Supabase

```typescript
// src/lib/db.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

---

## TinaCMS 可视化编辑 (可选)

TinaCMS 提供了一个可视化的内容管理界面，让你可以直接在浏览器中编辑 MDX 内容。

### 1. 安装依赖

```bash
npm install tinacms @tinacms/cli
```

### 2. 注册 Tina Cloud

1. 前往 [tina.io](https://tina.io) 注册账号
2. 创建新项目，连接你的 GitHub 仓库
3. 获取 Client ID 和 Token

### 3. 配置环境变量

```env
TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token
```

### 4. 使用方式

```bash
# 本地开发（带可视化编辑）
npx tinacms dev -c "npm run dev"

# 访问 http://localhost:3000/admin 进行编辑
```

### 5. 配置文件

模板已包含 `tina/config.ts` 配置文件，定义了博客、笔记、项目三种内容类型。你可以根据需要修改字段。

### 6. 部署说明

部署到 Vercel 后，TinaCMS 会自动启用云端编辑功能。编辑的内容会自动提交到 GitHub 仓库。

---

## 部署指南

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署

### Cloudflare Pages

```bash
npm run build
# 上传 .next 目录
```

### 自托管

```bash
npm run build
npm start
```

使用 PM2 或 Docker 进行进程管理。

---

## 🎨 主题定制

### 修改颜色

编辑 `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.7 0.15 280);  /* 主色调 */
  --background: oklch(0.98 0.01 280);
  /* ... */
}

.dark {
  --primary: oklch(0.75 0.12 280);
  --background: oklch(0.13 0.02 280);
  /* ... */
}
```

### Glass 效果调整

编辑 `src/components/glass/GlassCard.tsx` 的 variants。

---

## 📝 License

MIT License - 自由使用和修改。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
