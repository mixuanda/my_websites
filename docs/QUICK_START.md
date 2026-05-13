# ⚡ 5分钟快速开始指南

这是最快的方式，用模板创建你的个人网站。

---

## 1️⃣ 克隆模板（1 分钟）

```bash
# 克隆到你的电脑
git clone https://github.com/your-username/Personal_Sites_Template.git my-site
cd my-site

# 移除原始仓库关联
rm -rf .git

# 初始化你自己的 git
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial commit: personal site template"
```

---

## 2️⃣ 安装依赖（1-2 分钟）

```bash
npm install
# 等待安装完成...
```

---

## 3️⃣ 配置个人信息（2 分钟）

### 修改侧边栏信息

打开 `src/components/glass/GlassSidebar.tsx`，找到以下位置修改：

```tsx
// 📍 找到这部分代码（大约在 30-50 行）
<Avatar className="w-24 h-24 mx-auto mb-4">
  <AvatarImage src="/avatar.jpg" alt="Your Name" />
  <AvatarFallback>YN</AvatarFallback>
</Avatar>

<h2 className="text-xl font-bold">Your Name</h2>
<p className="text-sm text-muted-foreground">Your bio here</p>
```

**修改以下内容：**
- 修改 `/avatar.jpg` 为你的头像路径
- 修改 `Your Name` 为你的名字
- 修改签名文本

### 添加你的头像

1. 准备一张头像图片（推荐 200x200 像素）
2. 复制到 `public/avatar.jpg`
3. 在上面的代码中引用

### 修改社交媒体链接

在同一个文件中，找到 `socialLinks` 部分：

```tsx
const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/your-username",
    label: "GitHub",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:your@email.com",
    label: "Email",
  },
  // 添加更多链接...
]
```

---

## 4️⃣ 修改首页内容（可选）

打开 `src/app/page.tsx`，修改 `heroSection` 部分：

```tsx
<h1 className="text-4xl md:text-5xl font-bold">
  👋 你好，我是 Your Name
</h1>
<p className="text-xl text-muted-foreground">
  描述你自己和你的工作...
</p>
```

---

## 5️⃣ 删除示例内容

删除模板中的示例文章、笔记和项目：

```bash
# 删除示例内容
rm -f content/blog/hello-world.mdx
rm -f content/notes/calculus-basics.mdx
rm -f content/projects/personal-site.mdx

# 或者保留这些作为参考
```

---

## 6️⃣ 启动开发服务器

```bash
npm run dev
```

访问 **http://localhost:3000**，你应该看到：
- ✅ 首页显示你的个人信息
- ✅ 侧边栏显示你的头像和链接
- ✅ 深色模式切换按钮可用
- ✅ 所有页面都能访问

---

## ✅ 完成！

你的个人网站现在已经可以使用了！

### 接下来你可以：

#### 添加你的内容

**创建第一篇博客文章：**

1. 创建 `content/blog/my-first-post.mdx`
2. 复制以下模板：

```mdx
---
title: "我的第一篇文章"
date: 2024-01-20
description: "这是我的第一篇博客文章"
category: "技术"
tags:
  - Next.js
  - React
toc: true
published: true
---

# 文章标题

你的内容从这里开始...

## 小标题

- 点 1
- 点 2
- 点 3

```

3. 运行 `npm run dev`，访问 http://localhost:3000/blog，你会看到新文章！

#### 修改样式

所有样式都在 `src/app/globals.css` 中，你可以修改颜色、字体等。

#### 配置数据库（可选）

如果你想使用私人日记功能，需要配置数据库。参考 [docs/DATABASE_CONFIG.md](./DATABASE_CONFIG.md)。

#### 配置认证（可选）

如果需要 GitHub/Google 登录或 Passkey，参考 [docs/DATABASE_CONFIG.md](./DATABASE_CONFIG.md) 和 [docs/PRIVATE_DIARY_GUIDE.md](./PRIVATE_DIARY_GUIDE.md)。

---

## 🚀 部署到网络

### 部署到 Vercel（最简单）

1. 推送代码到 GitHub
2. 访问 https://vercel.com
3. 导入你的仓库
4. 一键部署！

```bash
# 或者用 CLI 部署
npm i -g vercel
vercel
```

👉 **详细说明请看**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - 包含常见问题和解决方案

### 部署到其他平台

- **Netlify**: 类似 Vercel，也是一键部署
- **GitHub Pages**: 免费但需要更多配置
- **自托管**: 最灵活但需要服务器知识

更多部署信息见 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)。

---

## 📝 MDX 文章格式参考

### 基础格式

```mdx
---
title: "文章标题"
date: 2024-01-20
description: "简短描述"
category: "分类名称"
tags:
  - 标签1
  - 标签2
toc: true                    # 显示目录
published: true              # 是否发布
---

# 首级标题

段落内容...

## 二级标题

- 列表项 1
- 列表项 2

### 三级标题

**粗体文本** 和 *斜体文本*

```

### 包含代码块

````mdx
```typescript
function hello() {
  console.log("Hello, World!");
}
```
````

### 包含数学公式

```mdx
行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 包含外部资源

```mdx
![图片描述](/images/my-image.jpg)

[链接文本](https://example.com)

<iframe src="..." width="100%" height="500"></iframe>
```

---

## 🎨 常见自定义任务

### 修改网站名称

编辑 `src/app/layout.tsx`：

```tsx
<title>Your Site Title</title>
<meta name="description" content="Your site description" />
```

### 修改颜色主题

编辑 `src/app/globals.css`，修改颜色变量：

```css
:root {
  --primary: oklch(0.7 0.15 280);     /* 改为你的颜色 */
  --secondary: oklch(0.5 0.1 200);
  /* ... 其他颜色 */
}
```

使用在线工具获取 oklch 颜色代码：https://oklch.com/

### 添加新页面

创建 `src/app/new-page/page.tsx`：

```tsx
export default function NewPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1>新页面</h1>
      <p>你的内容在这里...</p>
    </main>
  )
}
```

然后在 `GlassSidebar.tsx` 的导航菜单中添加链接。

### 修改导航菜单

编辑 `src/components/glass/GlassSidebar.tsx` 的 `navItems`：

```tsx
const navItems = [
  { href: "/", label: "首页", icon: <Home className="w-4 h-4" /> },
  { href: "/blog", label: "博客", icon: <FileText className="w-4 h-4" /> },
  { href: "/about", label: "关于", icon: <User className="w-4 h-4" /> },
  { href: "/my-custom-page", label: "自定义", icon: <Star className="w-4 h-4" /> },
]
```

---

## 🐛 常见问题排除

### 页面显示空白或有错误

```bash
# 清除缓存并重新启动
rm -rf .next
npm run dev
```

### 样式没有加载

```bash
# Tailwind 需要重新编译
npm run dev

# 如果还是不行，清除所有并重新安装
rm -rf node_modules .next
npm install
npm run dev
```

### 文章没有显示

确保：
1. 文件在 `content/blog/` 目录中
2. 文件名使用 `.mdx` 扩展名
3. Frontmatter 中 `published: true`
4. 日期不是未来日期（或者无所谓，根据配置）

### 构建失败

```bash
# 检查错误信息
npm run build

# 通常是缺少依赖，重新安装
npm install

# 检查 TypeScript 错误
npx tsc --noEmit
```

---

## 📚 进阶功能

完成基础设置后，你可以探索：

1. **私人日记功能** - [PRIVATE_DIARY_GUIDE.md](./PRIVATE_DIARY_GUIDE.md)
   - 需要数据库和认证配置
   - 支持 Passkey 和 OAuth

2. **数据库配置** - [DATABASE_CONFIG.md](./DATABASE_CONFIG.md)
   - Firebase、Supabase、MongoDB
   - 数据库设置和迁移

3. **后端控制** - [BACKEND_CONTROL.md](./BACKEND_CONTROL.md)
   - 后台状态检查
   - 管理员权限和用户管理

4. **迁移现有网站** - [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
   - 从 Hugo、Hexo、WordPress 等平台迁移
   - 内容格式转换

---

## 💡 提示

- 🔐 使用 `.env.local` 存放秘密（不要提交到 git！）
- 📝 编辑内容后，浏览器会自动刷新（热重载）
- 🎨 使用浏览器开发者工具的 DevTools 检查样式
- 📱 按 F12 查看响应式设计效果
- 🚀 部署前运行 `npm run build` 测试生产构建

---

**就这样！享受你的新个人网站！** 🎉

有问题？查看 [docs/README.md](./README.md) 获取更多帮助。
