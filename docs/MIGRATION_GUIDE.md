# 🚀 模板使用和迁移指南

本指南说明如何使用这个个人网站模板，以及如何从现有网站迁移。

## 📋 目录

- [快速使用](#快速使用)
- [完全迁移指南](#完全迁移指南)
- [内容迁移](#内容迁移)
- [样式定制](#样式定制)
- [常见迁移场景](#常见迁移场景)
- [FAQ](#faq)

---

## 快速使用

### 方案 1: 从模板开始新项目（推荐）

如果你要创建全新的个人网站，最简单的方式是：

```bash
# 1. 克隆模板
git clone https://github.com/your-username/Personal_Sites_Template.git my-personal-site
cd my-personal-site

# 2. 移除原始 git 历史
rm -rf .git
git init

# 3. 安装依赖
npm install

# 4. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填写你的配置

# 5. 修改项目信息
# 编辑以下文件，替换示例内容：
# - src/components/glass/GlassSidebar.tsx (个人信息、头像)
# - src/app/page.tsx (首页)
# - src/app/about/page.tsx (关于页面)
# - content/blog/*.mdx (删除示例文章)
# - content/notes/*.mdx (删除示例笔记)
# - content/projects/*.mdx (删除示例项目)

# 6. 添加你自己的内容
# - 创建 content/blog/your-post.mdx
# - 创建 content/notes/your-note.mdx
# - 创建 content/projects/your-project.mdx

# 7. 启动开发服务器
npm run dev

# 8. 访问 http://localhost:3000
```

### 方案 2: 从现有项目迁移

如果你已经有一个个人网站，想用这个模板替换，需要更多步骤。继续阅读 **完全迁移指南**。

---

## 完全迁移指南

### 步骤 1: 备份现有项目

```bash
# 完整备份你的项目
cp -r my-old-site my-old-site-backup

# 初始化 git（如果还没有）
cd my-old-site-backup
git init
git add .
git commit -m "备份原始项目"
```

### 步骤 2: 选择迁移策略

#### 策略 A: 直接替换（推荐）

适合：
- 完全重写网站
- 旧网站结构与模板差异大
- 想要清新的开始

```bash
# 1. 克隆模板到新位置
git clone https://github.com/your-username/Personal_Sites_Template.git my-site-new
cd my-site-new

# 2. 删除原始 git 历史
rm -rf .git
git init

# 3. 保留旧项目的 git 记录（可选）
# 在新项目中添加旧项目作为 remote：
git remote add old ../my-old-site-backup

# 4. 迁移内容和配置
# （见下面的步骤 3-5）

# 5. 删除旧项目（备份在 my-old-site-backup）
cd ..
rm -rf my-old-site
mv my-site-new my-site
```

#### 策略 B: 逐步迁移

适合：
- 想保留旧网站的某些代码
- 需要平稳过渡
- 旧网站还在使用

```bash
# 1. 创建新分支用于迁移
cd my-old-site
git checkout -b migrate/template

# 2. 复制模板文件
cp -r ../Personal_Sites_Template/src/components ./src/
cp -r ../Personal_Sites_Template/src/lib ./src/
cp ../Personal_Sites_Template/src/app/layout.tsx ./src/app/
# ... 复制其他核心文件

# 3. 更新依赖
npm install (更新 package.json)

# 4. 测试并调整
npm run dev

# 5. 逐步替换页面和内容
# （见下面的内容迁移部分）

# 6. 合并到 main 分支
git checkout main
git merge migrate/template
```

### 步骤 3: 复制必要文件

从模板项目复制这些关键文件到你的项目：

```
src/
├── app/
│   ├── layout.tsx (新的根布局)
│   ├── globals.css (新的全局样式)
│   ├── page.tsx (新的首页)
│   └── proxy.ts (路由保护)
├── components/
│   ├── glass/ (玻璃态组件)
│   ├── ThemeProvider.tsx (主题提供商)
│   ├── MainLayout.tsx (主布局)
│   └── ui/ (UI 组件库)
└── lib/
    ├── auth.ts (认证配置)
    ├── db.ts (数据库)
    └── utils.ts (工具函数)

public/
├── sw.js (Service Worker)
├── sw-register.js (SW 注册)
├── manifest.json (PWA 配置)
└── offline.html (离线页面)

contentlayer.config.ts (内容配置)
next.config.ts (Next.js 配置)
tsconfig.json (TypeScript 配置)
```

### 步骤 4: 更新 package.json

比较你的 package.json 和模板的版本，确保有所有必要的依赖：

```json
{
  "dependencies": {
    "next": "16.1.1",
    "react": "19.2.3",
    "tailwind-css": "^4.0.0",
    "next-auth": "^5.0.0-beta.30",
    "@simplewebauthn/server": "^9.0.3",
    "contentlayer2": "^0.5.8",
    "katex": "^0.16.27",
    // ... 其他依赖
  },
  "scripts": {
    "dev": "next dev",
    "build": "contentlayer2 build && next build",
    "start": "next start"
  }
}
```

安装依赖：
```bash
npm install
```

### 步骤 5: 环境变量配置

```bash
cp .env.example .env.local
# 编辑 .env.local，根据需要填写：
# - NEXT_PUBLIC_SITE_URL
# - AUTH_SECRET
# - OAuth 凭证（可选）
# - 数据库配置（可选）
```

---

## 内容迁移

### 迁移博客文章

#### 从 Markdown 到 MDX

如果你的文章是 Markdown 格式：

```bash
# 1. 复制所有旧 Markdown 文件到 content/blog/
cp old-blog-posts/*.md content/blog/

# 2. 重命名为 .mdx（如果还不是）
cd content/blog
for file in *.md; do mv "$file" "${file%.md}.mdx"; done

# 3. 检查 frontmatter 格式（下面有示例）

# 4. 检查 Markdown 内容是否兼容
# - 大多数 Markdown 在 MDX 中都能工作
# - 如果有自定义语法，需要转换
```

#### Frontmatter 格式调整

**旧格式** → **新格式**

```yaml
# 旧 Hugo 格式
---
title: "文章标题"
date: 2024-01-15
tags: [标签1, 标签2]
---

# 转换为模板格式
---
title: "文章标题"
date: 2024-01-15
description: "文章描述"
category: "分类"
tags:
  - 标签1
  - 标签2
toc: true
published: true
---
```

#### 自动迁移脚本

使用此脚本自动转换 frontmatter：

```bash
#!/bin/bash
# migrate-frontmatter.sh

for file in content/blog/*.mdx; do
    # 如果缺少 description，从开头几行提取
    if ! grep -q "^description:" "$file"; then
        # 提取第一段文本作为描述
        description=$(sed -n '/^---$/,/^---$/p' "$file" | tail -n +2 | head -1 | cut -c1-160)
        # 在 frontmatter 中添加 description
        sed -i '' '/^title:/a\
description: '"\"$description\"" "$file"
    fi
done
```

运行：
```bash
chmod +x migrate-frontmatter.sh
./migrate-frontmatter.sh
```

### 迁移笔记和项目

类似的方式迁移笔记和项目：

```bash
# 迁移笔记
cp old-notes/*.md content/notes/
cd content/notes
for f in *.md; do mv "$f" "${f%.md}.mdx"; done

# 迁移项目
cp old-projects/*.md content/projects/
cd content/projects
for f in *.md; do mv "$f" "${f%.md}.mdx"; done
```

### 迁移图片和资源

```bash
# 复制所有图片到 public/
cp -r old-site/images/* public/images/

# 更新内容中的图片路径
# 旧: ![image](./images/pic.jpg)
# 新: ![image](/images/pic.jpg)

# 可以用 sed 批量替换
find content -name "*.mdx" -exec sed -i '' 's|\./images/|/images/|g' {} \;
```

---

## 样式定制

### 修改个人信息

编辑 `src/components/glass/GlassSidebar.tsx`:

```tsx
// 修改头像
<Avatar className="w-24 h-24 mx-auto mb-4">
  <AvatarImage src="/your-avatar.jpg" alt="Your Name" />
  <AvatarFallback>YN</AvatarFallback>
</Avatar>

// 修改名称
<h2 className="text-xl font-bold">Your Name</h2>

// 修改签名
<p className="text-sm text-muted-foreground">Your bio/signature</p>
```

### 修改颜色主题

编辑 `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.7 0.15 280);  /* 改为你喜欢的颜色 */
  --secondary: oklch(0.5 0.1 200);
  --accent: oklch(0.75 0.15 330);
  /* ... 其他颜色 */
}
```

### 修改导航菜单

编辑 `src/components/glass/GlassSidebar.tsx` 的 `navItems`:

```tsx
const navItems: NavItem[] = [
  { href: "/", label: "首页", icon: <Home className="w-4 h-4" /> },
  { href: "/blog", label: "博客", icon: <FileText className="w-4 h-4" /> },
  { href: "/about", label: "关于", icon: <User className="w-4 h-4" /> },
  // 添加或删除菜单项
]
```

### 修改首页内容

编辑 `src/app/page.tsx`，替换你自己的内容。

### 修改关于页面

编辑 `src/app/about/page.tsx`，写入你的个人介绍。

---

## 常见迁移场景

### 场景 1: 从 Hexo 迁移

#### Hexo 项目结构
```
hexo-site/
├── source/
│   └── _posts/*.md
├── themes/
└── _config.yml
```

#### 迁移步骤

```bash
# 1. 复制所有文章
cp hexo-site/source/_posts/*.md content/blog/

# 2. 转换为 MDX 并更新 frontmatter
# Hexo 日期格式: 2024-01-15 10:30:00
# 转换为: 2024-01-15

# 3. 更新分类和标签格式
# Hexo:
# categories:
#   - 技术
# tags:
#   - Node.js
#
# 新格式:
# category: 技术
# tags:
#   - Node.js

# 4. 添加 description 和其他必要字段
```

### 场景 2: 从 Hugo 迁移

#### Hugo 项目结构
```
hugo-site/
├── content/
│   ├── blog/*.md
│   └── projects/*.md
├── static/
│   └── images/
└── config.toml
```

#### 迁移步骤

```bash
# 1. 复制内容和资源
cp -r hugo-site/content/blog/*.md content/blog/
cp -r hugo-site/content/projects/*.md content/projects/
cp -r hugo-site/static/images/* public/images/

# 2. 转换 frontmatter（TOML → YAML）
# Hugo: 
# +++
# title = "标题"
# date = 2024-01-15
# +++
#
# 转换为:
# ---
# title: "标题"
# date: 2024-01-15
# ---

# 3. 使用在线工具或脚本转换
# https://www.bejson.com/
```

### 场景 3: 从 WordPress 迁移

WordPress 迁移更复杂，因为 WordPress 是数据库驱动的。

```bash
# 1. 导出 WordPress 为 Markdown
# 使用工具: https://github.com/lonelyplanetdev/wordpress-to-markdown
# 或: https://exit.wordpress.com/ (官方导出工具)

# 2. 下载导出的 HTML
wget https://yoursite.wordpress.com/wp-admin/export.php

# 3. 转换 HTML 到 Markdown
# 使用工具: https://pandoc.org/
pandoc export.xml -t markdown -o blog.md

# 4. 按照 Hugo 迁移流程继续
# （分割为多个文件，转换 frontmatter，复制图片）

# 5. 下载媒体库
# 在 WordPress 管理后台导出媒体文件到 public/images/
```

### 场景 4: 从 Notion 迁移

```bash
# 1. 在 Notion 中导出为 Markdown
# 选择数据库 → Export → Markdown & CSV

# 2. 解压导出文件
unzip notion-export.zip

# 3. 使用转换工具
# https://github.com/jamslevy/notion-to-markdown
# 或 https://github.com/souvikinator/notion-to-md

# 4. 复制转换后的文件到 content/
# 更新 frontmatter 和图片路径
```

---

## 迁移检查清单

### 内容迁移
- [ ] 所有博客文章已复制到 `content/blog/`
- [ ] 所有笔记已复制到 `content/notes/`
- [ ] 所有项目已复制到 `content/projects/`
- [ ] Frontmatter 格式正确且包含所有必需字段
- [ ] 图片已复制到 `public/images/`
- [ ] 内容中的图片路径已更新为 `/images/...`

### 配置迁移
- [ ] `.env.local` 已配置
- [ ] `package.json` 依赖已更新
- [ ] 个人信息已在 `GlassSidebar.tsx` 中更新
- [ ] 首页内容已更新 (`page.tsx`)
- [ ] 关于页面已更新 (`about/page.tsx`)
- [ ] 导航菜单已定制
- [ ] 颜色主题已调整（可选）

### 功能配置
- [ ] OAuth 配置已设置（如果需要）
- [ ] 数据库配置已设置（如果需要）
- [ ] 评论系统 (Giscus) 已配置（可选）
- [ ] PWA 图标已添加（可选）

### 测试
- [ ] 本地开发服务器运行正常 (`npm run dev`)
- [ ] 所有页面都能正常访问
- [ ] 博客文章显示正确
- [ ] 样式和布局符合预期
- [ ] 暗色模式正常工作
- [ ] 响应式设计正常工作
- [ ] 构建成功 (`npm run build`)

### 部署
- [ ] 代码推送到 GitHub
- [ ] 连接 Vercel 或其他部署平台
- [ ] 配置生产环境变量
- [ ] 域名配置完成
- [ ] 部署测试通过

---

## FAQ

### Q: 我能同时保留旧网站吗？
**A:** 是的，你可以：
1. 在新域名或子域名（如 `new.example.com`）上运行新网站
2. 测试完成后，将 DNS 指向新网站
3. 旧网站保存为备份（可以改为只读）

### Q: 如何迁移用户评论？
**A:** 取决于你的评论系统：
- **Disqus**: Disqus 通常会自动跟踪 URL 变更
- **自定义数据库**: 需要手动导出并导入到新系统
- **本模板 (Giscus)**: 使用 GitHub Discussions，需要手动创建讨论

### Q: 我的旧网站有 SEO，迁移会影响吗？
**A:** 会有短期影响，但可以最小化：
1. 使用 301 重定向（在 `next.config.ts` 中配置）
2. 在 `robots.txt` 和 `sitemap.xml` 中更新 URL
3. 更新 Google Search Console
4. 使用 `og:url` 标签

重定向配置示例：
```typescript
// next.config.ts
module.exports = {
  redirects: async () => [
    {
      source: '/blog/old-post',
      destination: '/blog/new-post',
      permanent: true, // 301 重定向
    },
  ],
}
```

### Q: 如何导出我的旧网站的数据？
**A:** 取决于旧网站类型：
- **静态站点**: 直接复制文件
- **数据库驱动**: 使用导出功能（WordPress、Notion、Medium 等都有）
- **CMS**: 查看 CMS 的导出功能

### Q: 迁移后，旧网站数据会被删除吗？
**A:** 不会。你的旧网站数据保持原样，直到你主动删除。始终保留备份。

### Q: 我可以逐步迁移内容吗？
**A:** 可以。使用"策略 B：逐步迁移"，分别迁移不同的内容类型。

### Q: 如何处理 URL 变更？
**A:** 
1. **保持 URL 一致**: 如果可能，保持 `/blog/post-name` 的 URL 格式
2. **设置重定向**: 如果无法保持一致，配置 301 重定向
3. **更新链接**: 更新网站中的所有内部链接
4. **提交 sitemap**: 向搜索引擎提交新的 sitemap

### Q: 新网站会自动导入旧网站的分析数据吗？
**A:** 不会。你需要：
1. 在新网站上添加分析追踪（Google Analytics 等）
2. 旧数据保留在旧的分析账户中（可以导出对比）

---

## 获取帮助

如果迁移过程中遇到问题：

1. **查看官方文档**：
   - [docs/README.md](./docs/README.md) - 文档索引
   - [docs/SETUP.md](./docs/SETUP.md) - 设置指南

2. **常见问题**：
   - 每个文档都有 FAQ 部分
   - 搜索关键词看是否已有答案

3. **获取支持**：
   - GitHub Issues - 报告 bug
   - GitHub Discussions - 提问和讨论
   - 项目文档评论 - 特定文档问题

---

**祝你的迁移顺利！** 🎉
