# 📚 文档目录

欢迎来到个人网站模板文档。这里包含了所有配置、管理和使用指南。

## 📖 快速导航

### 🚀 首次使用

1. **[QUICK_START.md](./QUICK_START.md)** - ⚡ 5分钟快速开始（强烈推荐！）
   - 克隆模板
   - 安装依赖
   - 修改个人信息
   - 添加你的内容
   - 快速部署

2. **[USAGE_PATHS.md](./USAGE_PATHS.md)** - 📊 选择你的使用方式
   - 快速决策树
   - 按用户类型推荐
   - 学习路径
   - 时间和难度估算
   - **推荐在 QUICK_START 前先看这个，找到适合你的路径！**

3. **[SETUP.md](./SETUP.md)** - 详细的设置和配置指南
   - 环境变量配置
   - OAuth 登录设置
   - PWA 安装
   - 内容管理基础

4. **[README.md](../README.md)** - 项目概述
   - 功能介绍
   - 技术栈
   - 项目结构

5. **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - 从现有网站迁移到模板
   - 迁移策略选择
   - 从 Hexo/Hugo/WordPress 迁移
   - 内容格式转换
   - 迁移检查清单

### � 部署

6. **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Vercel 部署完整指南 ⭐ **新！**
   - 快速部署（3步）
   - 详细配置说明
   - 常见问题和解决方案
   - 性能优化
   - 故障排除和检查清单
7. **[DEMO_SETUP.md](./DEMO_SETUP.md)** - 创建演示网站实例 ⭐ **新！**
   - 方案对比（两种方式）
   - 设置 GitHub Template 仓库
   - 自定义演示内容
   - 完整检查清单
### 🔐 私密区功能

8. **[PRIVATE_DIARY_GUIDE.md](./PRIVATE_DIARY_GUIDE.md)** - 私密日记使用指南
   - 登录方式 (Passkey / OAuth)
   - 日记管理
   - 数据导出和备份
   - 隐私与安全
   - 常见问题解答

### 💾 数据库配置

9. **[DATABASE_CONFIG.md](./DATABASE_CONFIG.md)** - 详细数据库配置
   - Firebase Firestore 配置
   - Supabase 配置
   - MongoDB 配置
   - PostgreSQL 配置
   - 数据备份与迁移

### 🎛️ 后台管理

10. **[BACKEND_CONTROL.md](./BACKEND_CONTROL.md)** - 内容管理和后台控制
   - TinaCMS 可视化编辑器
   - 博客、笔记、项目管理
   - 权限控制
   - 内容发布流程
   - 分析与监控

---

## 🎯 按用途查找

### 我想要...

#### 立即开始使用
→ [SETUP.md](./SETUP.md) 的 **快速开始** 部分

#### 配置私密日记
→ [SETUP.md](./SETUP.md) 的 **认证与登录**  
→ [PRIVATE_DIARY_GUIDE.md](./PRIVATE_DIARY_GUIDE.md) 的 **登录方式**

#### 设置数据库
→ [DATABASE_CONFIG.md](./DATABASE_CONFIG.md)  
选择合适的数据库（推荐 Firebase）

#### 编辑和发布内容
→ [BACKEND_CONTROL.md](./BACKEND_CONTROL.md)  
了解 TinaCMS 的使用方法

#### 写日记和管理日记
→ [PRIVATE_DIARY_GUIDE.md](./PRIVATE_DIARY_GUIDE.md)  
查看日记管理、导出、安全等功能

#### 安装为 PWA 应用
→ [SETUP.md](./SETUP.md) 的 **PWA 支持**  
将网站安装到手机/电脑

#### 部署到生产环境
→ [SETUP.md](./SETUP.md) 的 **部署指南**

---

## 📋 文档概览

| 文档 | 主要内容 | 适用人群 |
|------|---------|---------|
| **SETUP.md** | 初始化配置、环境变量、快速开始 | 所有人 |
| **PRIVATE_DIARY_GUIDE.md** | 登录使用、日记管理、隐私安全 | 日记用户 |
| **DATABASE_CONFIG.md** | 详细的数据库配置和代码示例 | 后端开发者 |
| **BACKEND_CONTROL.md** | 内容编辑、后台管理、分析监控 | 内容管理员 |

---

## 🔧 配置检查清单

### 基础配置
- [ ] 复制 `.env.example` 为 `.env.local`
- [ ] 填写 `NEXT_PUBLIC_SITE_URL`
- [ ] 生成 `AUTH_SECRET`
- [ ] 运行 `npm install` 和 `npm run dev`

### 登录配置（可选，用于私密区）
- [ ] 设置 GitHub OAuth (可选)
- [ ] 设置 Google OAuth (可选)
- [ ] Passkey 已自动启用，无需配置

### 数据库配置（可选，用于日记存储）
选择一个：
- [ ] Firebase Firestore （推荐）
- [ ] Supabase
- [ ] MongoDB
- [ ] PostgreSQL

### 评论系统配置（可选）
- [ ] Giscus 环境变量配置

### PWA 配置（可选）
- [ ] 生成应用图标放到 `public/`
- [ ] 自定义 `public/manifest.json`

### 部署配置
- [ ] 连接 GitHub 仓库
- [ ] 连接 Vercel / Netlify
- [ ] 配置生产环境变量
- [ ] 设置自定义域名

---

## 🆘 获取帮助

### 常见问题
- **SETUP.md**: 快速开始常见问题
- **PRIVATE_DIARY_GUIDE.md**: 私密区使用常见问题
- **DATABASE_CONFIG.md**: 数据库配置常见问题
- **BACKEND_CONTROL.md**: 内容管理常见问题

### 寻求支持
1. 查看相关文档的 FAQ 部分
2. 在 GitHub Issues 中搜索相似问题
3. 提交新 Issue 描述你的问题
4. 查看项目 README 中的联系方式

---

## 📱 功能特性速览

### 核心功能
- ✅ **博客系统** - MDX 格式，支持 Markdown 和 React 组件
- ✅ **学习笔记** - 支持 KaTeX 数学公式
- ✅ **项目展示** - 展示你的作品
- ✅ **暗色模式** - 自动亮暗切换
- ✅ **响应式设计** - 完美适配各种设备

### 高级功能
- ✅ **私密日记** - 安全的个人日记空间
- ✅ **Passkey 登录** - 无密码认证，最高安全性
- ✅ **OAuth 登录** - GitHub、Google 快速登录
- ✅ **评论系统** - Giscus GitHub Discussions 集成
- ✅ **可视化编辑** - TinaCMS 直观的内容管理
- ✅ **PWA 应用** - 离线支持，可安装为应用
- ✅ **SEO 优化** - 自动生成 sitemap 和 robots.txt

---

## 🛠️ 技术栈

- **框架**: Next.js 16.1.1 (App Router + Turbopack)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui
- **内容**: MDX + Contentlayer2
- **数学**: KaTeX
- **认证**: Auth.js (next-auth@beta) + Passkey
- **评论**: Giscus
- **CMS**: TinaCMS (可选)
- **数据库**: Firebase / Supabase / MongoDB (可选)

---

## 📝 文档更新日期

- SETUP.md - 2026-01-03
- PRIVATE_DIARY_GUIDE.md - 2026-01-03
- DATABASE_CONFIG.md - 2026-01-03
- BACKEND_CONTROL.md - 2026-01-03
- 本文件 - 2026-01-03

---

## 🎓 学习资源

### 官方文档
- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Auth.js 文档](https://authjs.dev)
- [MDX 文档](https://mdxjs.com/)

### 教程和指南
- [React 官方](https://react.dev)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Firebase 指南](https://firebase.google.com/docs/guides)
- [Supabase 文档](https://supabase.com/docs)

---

**祝你使用愉快！如有问题，请参考相关文档或提交 Issue。** 🎉
