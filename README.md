# 🌐 个人网站模板

一个现代化、功能完整的个人网站模板，使用 Next.js + TypeScript + Tailwind CSS 构建。

<div align="center">

**[📺 在线演示](https://your-demo-site.vercel.app)** • **[快速开始](./docs/QUICK_START.md)** • **[迁移指南](./docs/MIGRATION_GUIDE.md)** • **[文档](./docs/)** • **[特性](#-特性)**

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

> 👉 **[查看在线演示](https://your-demo-site.vercel.app)** | **[使用这个模板创建你的网站](../../generate)** 

</div>

---

## 📝 你想做什么？

### 🆕 创建全新的个人网站
👉 **[5分钟快速开始](./docs/QUICK_START.md)**

### 🔄 将现有网站转换成这个模板
👉 **[迁移指南](./docs/MIGRATION_GUIDE.md)** - 支持 Hexo、Hugo、WordPress、Notion 等

### 🤔 了解这个模板能做什么
👉 **[继续往下读](#-特性)**

### 🆘 遇到问题或想找特定功能
👉 **[文档](./docs/README.md)** 或 **[FAQ](#-faq)**

---

## ✨ 特性

### 📱 核心功能
- ✅ **响应式设计** - 在所有设备上完美显示
- ✅ **深色模式** - 自动切换或手动选择
- ✅ **PWA 支持** - 离线使用、可安装应用
- ✅ **快速加载** - Turbopack 快速编译、优化的图片加载
- ✅ **SEO 优化** - 完整的 Meta 标签、Sitemap、Robots.txt

### 📝 内容管理
- ✅ **博客系统** - Markdown/MDX 支持，自动生成目录
- ✅ **笔记系统** - 支持 KaTeX 数学公式
- ✅ **项目展示** - 展示你的作品
- ✅ **内容标签和分类** - 自动生成标签页和分类页
- ✅ **评论系统** - 集成 Giscus（基于 GitHub Discussions）

### 🔐 认证和隐私
- ✅ **Passkey 认证** - 支持 WebAuthn 无密码登录
- ✅ **OAuth 社交登录** - GitHub 和 Google 登录
- ✅ **私人日记** - 只有登录用户可见的日记功能
- ✅ **路由保护** - 自动保护私密路由

### 💾 数据管理
- ✅ **灵活的数据库支持** - Firebase、Supabase、MongoDB
- ✅ **内容管理系统** - 可选集成 TinaCMS
- ✅ **自动部署** - 与 GitHub Actions 集成
- ✅ **备份和导出** - 支持数据备份和导出

### 🎨 设计
- ✅ **玻璃态 UI** - 现代的玻璃态设计风格
- ✅ **自定义主题** - 轻松修改颜色和字体
- ✅ **组件库** - shadcn/ui 完整组件库
- ✅ **响应式导航** - 自适应的导航菜单

### 🚀 开发体验
- ✅ **TypeScript** - 完整类型支持
- ✅ **热更新** - 编辑即时看到效果
- ✅ **ESLint 配置** - 代码质量检查
- ✅ **完整文档** - 详细的使用和配置指南

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| **Next.js** | 16.1.1 | 框架 (App Router + Turbopack) |
| **React** | 19 | UI 库 |
| **TypeScript** | 5 | 类型安全 |
| **Tailwind CSS** | 4 | 样式 |
| **Contentlayer2** | 0.5.8 | MDX 内容管理 |
| **Auth.js** | 5 @beta | 认证系统 |
| **shadcn/ui** | latest | UI 组件 |
| **KaTeX** | 0.16.27 | 数学公式 |
| **Giscus** | latest | 评论系统 |

---

## 📁 项目结构

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局（PWA 元标签）
│   ├── page.tsx                 # 首页
│   ├── about/page.tsx           # 关于页面
│   ├── blog/                    # 博客页面
│   ├── notes/                   # 笔记页面
│   ├── projects/                # 项目页面
│   ├── diary/                   # 私人日记（需认证）
│   └── api/auth/[...nextauth]   # OAuth 和 Passkey API
│
├── components/                  # React 组件
│   ├── glass/                   # 玻璃态组件
│   ├── ui/                      # shadcn/ui 组件
│   ├── MainLayout.tsx           # 主布局
│   ├── ThemeProvider.tsx        # 主题提供商
│   └── ...
│
├── lib/                         # 工具函数
│   ├── auth.ts                  # 认证配置
│   ├── db.ts                    # 数据库连接
│   └── utils.ts                 # 通用工具
│
└── proxy.ts                     # 路由中间件

public/                          # 静态资源
├── sw.js                        # Service Worker
├── manifest.json                # PWA 清单
└── offline.html                 # 离线页面

content/                         # MDX 内容
├── blog/                        # 博客文章
├── notes/                       # 笔记
└── projects/                    # 项目

docs/                            # 文档
├── QUICK_START.md              # 快速开始
├── MIGRATION_GUIDE.md          # 迁移指南
├── DATABASE_CONFIG.md          # 数据库配置
├── BACKEND_CONTROL.md          # CMS 配置
└── PRIVATE_DIARY_GUIDE.md      # 私人日记指南
```

---

## 🚀 快速开始

### 最快方式（5分钟）

```bash
# 1. 克隆模板
git clone https://github.com/your-username/Personal_Sites_Template.git my-site
cd my-site

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开 http://localhost:3000
```

然后按照 [快速开始指南](./docs/QUICK_START.md) 修改个人信息即可。

### 详细步骤

1. **完整指南**: [docs/QUICK_START.md](./docs/QUICK_START.md)
2. **从现有网站迁移**: [docs/MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md)
3. **详细设置**: [docs/SETUP.md](./docs/SETUP.md)

---

## 📚 文档

- 📖 **[QUICK_START.md](./docs/QUICK_START.md)** - 5分钟快速开始（新手必读）
- 📖 **[MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md)** - 从其他平台迁移
- 📖 **[SETUP.md](./docs/SETUP.md)** - 详细设置和配置
- 📖 **[DATABASE_CONFIG.md](./docs/DATABASE_CONFIG.md)** - 数据库配置指南
- 📖 **[BACKEND_CONTROL.md](./docs/BACKEND_CONTROL.md)** - CMS 和后端管理
- 📖 **[PRIVATE_DIARY_GUIDE.md](./docs/PRIVATE_DIARY_GUIDE.md)** - 私人日记功能
- 📖 **[docs/README.md](./docs/README.md)** - 文档索引

---

## 🎯 使用场景

这个模板适合：

✅ **开发者和工程师** - 展示你的技术和项目  
✅ **设计师和创意人士** - 展示作品集  
✅ **作家和博主** - 发布文章和想法  
✅ **学生和研究者** - 分享学习笔记和研究  
✅ **自由职业者** - 建立专业形象  
✅ **任何想要个人网站的人** - 完全免费和开源

---

## 💡 功能演示

### 博客

- 支持 Markdown 和 MDX
- 自动生成目录（TOC）
- 支持代码高亮
- 支持 KaTeX 数学公式
- 支持标签和分类
- 自动生成 RSS Feed
- Giscus 评论系统

### 私人日记

- 需要认证（Passkey、GitHub、Google）
- 只有你能看到
- 支持导出和备份
- 数据加密存储

### PWA 支持

- 可离线访问
- 可安装为应用
- 自动同步
- Push 通知（可选）

---

## 🔧 配置

### 环境变量

创建 `.env.local` 文件：

```env
# 网站配置
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME=Your Name

# 认证配置（可选）
AUTH_SECRET=your-secret-key
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret

# 数据库配置（可选）
DATABASE_URL=your-database-url

# 其他服务（可选）
GISCUS_REPO_ID=your-repo-id
```

详细说明见 [docs/SETUP.md](./docs/SETUP.md)。

---

## 📊 性能指标

- ✅ 首屏加载时间：< 1s
- ✅ Lighthouse 分数：95+
- ✅ 完全可访问性
- ✅ 移动端优化

---

## 🔐 隐私和安全

- 🔒 支持 HTTPS
- 🔒 Passkey 无密码认证
- 🔒 数据库加密选项
- 🔒 无第三方追踪（可配置）
- 🔒 GDPR 兼容

---

## 📝 FAQ

### Q: 我能免费使用这个模板吗？
**A:** 是的，完全免费。MIT 许可证。

### Q: 我需要编程知识吗？
**A:** 不需要！只需要修改配置文件。更多功能需要一些 HTML/CSS/JavaScript 知识。

### Q: 我能部署到哪些平台？
**A:** Vercel（推荐）、Netlify、GitHub Pages、自托管等任何支持 Node.js 的平台。

### Q: 我如何迁移现有的网站？
**A:** 查看 [MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md)，支持从 Hugo、Hexo、WordPress 等迁移。

### Q: 我如何添加自己的内容？
**A:** 在 `content/blog/` 创建 `.mdx` 文件。查看示例或 [QUICK_START.md](./docs/QUICK_START.md)。

### Q: 私人日记需要数据库吗？
**A:** 是的。支持 Firebase、Supabase、MongoDB。查看 [DATABASE_CONFIG.md](./docs/DATABASE_CONFIG.md)。

### Q: 我如何自定义样式？
**A:** 修改 `src/app/globals.css` 或各个组件文件。Tailwind CSS 使配置很容易。

### 更多问题？
查看各文档的 FAQ 部分或在 [GitHub Issues](https://github.com/your-username/Personal_Sites_Template/issues) 提问。

---

## 🎓 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [React 文档](https://react.dev)
- [Contentlayer 文档](https://contentlayer.dev)

---

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

如果你有改进建议或发现 bug，请：
1. 在 [GitHub Issues](https://github.com/your-username/Personal_Sites_Template/issues) 提交
2. 或提交 Pull Request

---

## 📄 许可证

MIT License - 自由使用，修改和分发。详见 [LICENSE](./LICENSE)。

---

## 🙏 致谢

感谢所有开源项目的贡献者：Next.js、React、Tailwind CSS、shadcn/ui 等。

---

<div align="center">

**⭐ 如果这个模板对你有帮助，请给个星星支持一下！**

[快速开始](./docs/QUICK_START.md) • [迁移指南](./docs/MIGRATION_GUIDE.md) • [文档](./docs/README.md) • [问题反馈](https://github.com/your-username/Personal_Sites_Template/issues)

</div>
