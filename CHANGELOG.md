# 更新日志

## v1.1.0 - 2026-01-03 - 最终完成版本

### ✨ 新增功能

#### 认证与登录
- 🔑 **Passkey 无密码登录** - 集成 Auth.js Passkey 提供商，支持生物识别认证
- 🔐 **安全的身份认证** - SimpleWebAuthn 库提供 WebAuthn 标准支持
- 📱 **多种登录方式** - Passkey（推荐）、GitHub OAuth、Google OAuth

#### PWA 应用功能
- 📦 **完整 PWA 配置** - manifest.json 清单文件
- 🔄 **Service Worker** - 离线支持、缓存管理、推送通知
- 📲 **可安装应用** - 可安装到桌面和移动设备
- ⚡ **离线功能** - 网络不可用时仍可浏览已缓存内容
- 🚀 **快捷菜单** - 应用快捷操作（新日记、阅读博客等）

### 📚 文档完善

#### 新增文档
- 📖 **docs/DATABASE_CONFIG.md** - 数据库配置详细指南
  - Firebase Firestore 完整教程和代码示例
  - Supabase PostgreSQL 配置指南
  - MongoDB 配置和 Mongoose 实现
  - 数据备份和迁移方案

- 🎛️ **docs/BACKEND_CONTROL.md** - 后台管理指南
  - TinaCMS 可视化编辑器使用
  - 内容管理（博客、笔记、项目）
  - 权限管理和发布工作流
  - 分析和监控配置

- 🔐 **docs/PRIVATE_DIARY_GUIDE.md** - 私密区使用指南
  - 三种登录方式详细说明
  - 日记管理和编辑
  - 数据导出备份
  - 隐私和安全最佳实践
  - 常见问题解答

- 📚 **docs/README.md** - 文档索引和导航
  - 快速导航按用途
  - 文档概览表
  - 配置检查清单
  - 技术栈概览

- ✅ **PROJECT_COMPLETION.md** - 项目完成总结
  - 功能完整清单
  - 技术栈详情
  - 文件结构说明
  - 质量保证报告

#### 更新文档
- 📖 **SETUP.md** - 添加 Passkey 和 PWA 配置说明
- 📝 **.env.example** - 添加详细的环境变量说明和分类

### 🔧 技术改进

#### Auth.js 更新
- 添加 Passkey 提供商支持
- 优化登录页面 UI/UX
- 支持多种认证方式并存

#### PWA 配置
- 完整的 manifest.json 配置
- 实现完整的 Service Worker
- 离线页面和错误处理
- 应用图标和快捷菜单

#### 项目配置
- 更新 Next.js layout.tsx PWA 元标签
- 添加 Service Worker 自动注册
- 完善 TypeScript 配置

### 🐛 Bug 修复
- 修复 hydration mismatch 错误（GlassSidebar 主题切换）
- 修复 middleware 弃用警告（迁移到 proxy.ts）
- 修复 Contentlayer 警告（添加 baseUrl）
- 修复登录页 metadata 问题（创建 layout.tsx）

### 📦 依赖更新
- 添加 `@simplewebauthn/server` - Passkey 认证支持

---

## v1.0.0 - 2026-01-03 - 初始发布

### ✨ 核心功能
- ✅ 博客系统（MDX 支持）
- ✅ 学习笔记（KaTeX 数学公式）
- ✅ 项目展示
- ✅ 私密日记（认证保护）
- ✅ 评论系统（Giscus）
- ✅ 暗色模式
- ✅ 玻璃态 UI 设计
- ✅ 完整文档

### 🏗️ 技术栈
- Next.js 16.1.1
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- MDX + Contentlayer2
- KaTeX
- Auth.js

### 📄 文档
- SETUP.md - 基础设置指南
- 示例内容和样式

---

## 版本号说明
- 主版本 (Major): 重大功能更新
- 次版本 (Minor): 新增功能或改进
- 修订版本 (Patch): Bug 修复

---

## 贡献与反馈
欢迎提交 Issue 和 Pull Request！
