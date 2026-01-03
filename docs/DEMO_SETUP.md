# 🌐 创建演示网站实例

本指南说明如何为你的模板创建一个在线演示网站，让用户看到模板的实际效果。

---

## 📋 目录

- [为什么需要演示网站](#为什么需要演示网站)
- [方案对比](#方案对比)
- [方案 A: 直接部署模板（简单）](#方案-a-直接部署模板简单)
- [方案 B: 创建独立演示仓库（推荐）](#方案-b-创建独立演示仓库推荐)
- [设置 GitHub Template 仓库](#设置-github-template-仓库)
- [自定义演示内容](#自定义演示内容)

---

## 为什么需要演示网站

### 对用户很重要
- 🎯 看到真实的网站效果，而不仅仅是代码
- 🎨 查看设计和交互
- 🧪 测试所有功能
- 📱 检查响应式设计

### 提高模板可信度
- ✅ 证明模板真的可以工作
- ✅ 展示最终效果
- ✅ 建立用户信心

### 帮助用户学习
- 📚 看到完整的配置示例
- 🔗 参考内容结构和格式
- 📸 示例文章、图片使用方式

---

## 方案对比

### 方案 A: 直接部署模板

| 优点 | 缺点 |
|------|------|
| ✅ 最简单 | ❌ 修改演示会影响模板 |
| ✅ 无需维护多个仓库 | ❌ 用户看到"示例"内容 |
| ✅ 快速部署 | ❌ 混淆模板和演示 |

**适用**: 快速演示，内容完全是示例

### 方案 B: 独立演示仓库（推荐）

| 优点 | 缺点 |
|------|------|
| ✅ 清晰的模板 vs 演示分离 | ❌ 需要管理两个仓库 |
| ✅ 演示可以自由修改 | ⚠️ 需要同步模板更新 |
| ✅ 用户从模板创建自己的版本 | - |
| ✅ 演示展示最佳实践 | - |

**适用**: 长期维护，演示是独立的网站

---

## 方案 A: 直接部署模板（简单）

这是最快的方式，直接部署你当前的模板仓库。

### 步骤

#### 1. 确保代码已推送到 GitHub

```bash
cd /Users/mixuanda/Github/Personal_Sites_Template
git add .
git commit -m "Ready for demo deployment"
git push origin main
```

#### 2. 在 Vercel 部署

访问 [vercel.com](https://vercel.com)：

```
1. 登录 Vercel
2. 点击 "Add New..." → "Project"
3. 选择 "Import Git Repository"
4. 选择你的模板仓库
5. 项目名称：personal-site-template-demo
6. 点击 Deploy
```

#### 3. 获取部署 URL

部署完成后，Vercel 会给你一个 URL，例如：
```
https://personal-site-template-demo.vercel.app
```

#### 4. 更新 README

在 README.md 中添加演示链接：

```markdown
## 🎥 在线演示

👉 **[查看实时演示](https://personal-site-template-demo.vercel.app)**

![演示截图](./docs/images/demo-screenshot.png)
```

### 这个方案的问题

❌ 用户会看到"示例"内容（hello-world 文章等）  
❌ 修改演示内容时，会影响模板  
❌ 不够专业

---

## 方案 B: 创建独立演示仓库（推荐）

这是更专业的方式，创建一个真实的、有实际内容的演示网站。

### 步骤

#### 1. 创建新的演示仓库

在 GitHub 创建新仓库：

```
Repository name: personal-sites-template-demo
Description: Demo website using Personal Sites Template
Visibility: Public
Initialize with: None (we'll push from existing repo)
```

#### 2. 在本地创建演示版本

```bash
# 进入工作目录（不是模板目录）
cd ~/projects  # 或任何你想放演示的地方

# 克隆模板
git clone https://github.com/your-username/Personal_Sites_Template.git demo
cd demo

# 修改 remote 指向新仓库
git remote remove origin
git remote add origin https://github.com/your-username/personal-sites-template-demo.git

# 推送到新仓库
git branch -M main
git push -u origin main
```

#### 3. 自定义演示内容

参考下一部分"自定义演示内容"。

#### 4. 在 Vercel 部署演示仓库

```
1. 访问 vercel.com
2. 点击 "Add New..." → "Project"
3. 选择"personal-sites-template-demo"仓库
4. 点击 Deploy
```

#### 5. 配置自定义域名（可选）

```
Vercel Dashboard
→ Project Settings
→ Domains
→ Add your domain (e.g., demo.example.com)
```

---

## 设置 GitHub Template 仓库

使用户可以一键从你的模板创建仓库。

### 步骤

#### 1. 在模板仓库启用 Template 功能

```
GitHub 网站
→ 进入 Personal_Sites_Template 仓库
→ Settings（右上角）
→ General
→ 勾选 "Template repository"
→ Save
```

#### 2. 在 README 中添加快速使用按钮

更新 README.md：

```markdown
## 🚀 快速开始

### 方式 1: 从这个模板创建你的仓库

<a href="https://github.com/your-username/Personal_Sites_Template/generate">
  <img src="https://img.shields.io/badge/Use%20this%20template-green?style=for-the-badge&logo=github" alt="Use this template" />
</a>

或者手动：
1. 点击本页右上角的 "Use this template"
2. 选择 "Create a new repository"
3. 输入你的仓库名
4. 点击 "Create repository from template"

### 方式 2: 查看演示网站

👉 **[在线演示](https://demo.example.com)**

### 方式 3: 按照快速开始指南

👉 **[5分钟快速开始](./docs/QUICK_START.md)**
```

---

## 自定义演示内容

如果你创建了独立的演示仓库，应该用真实的内容替换示例内容。

### 1. 替换个人信息

编辑 `src/components/glass/GlassSidebar.tsx`：

```typescript
// 修改名字、头像、签名
<h2 className="text-xl font-bold">示例网站</h2>
<p className="text-sm text-muted-foreground">这是使用 Personal Sites Template 创建的演示网站</p>

// 修改社交链接
const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/your-username/Personal_Sites_Template",
    label: "模板仓库",
  },
  // ...
]
```

### 2. 创建真实的示例内容

用真实的、有趣的内容替换示例文章：

```bash
# 删除示例
rm -f content/blog/hello-world.mdx
rm -f content/notes/calculus-basics.mdx
rm -f content/projects/personal-site.mdx

# 创建演示内容
cat > content/blog/introducing-template.mdx << 'EOF'
---
title: "介绍 Personal Sites Template"
date: 2024-01-20
description: "一个现代化、功能完整的个人网站模板"
category: "技术"
tags:
  - Next.js
  - 模板
  - 个人网站
published: true
---

# 介绍 Personal Sites Template

这是一个使用 Personal Sites Template 创建的演示网站。

## 主要特性

- 🎨 现代玻璃态设计
- 📱 完全响应式
- 🌙 深色模式支持
- ⚡ 快速加载（Turbopack）
- 🔐 内置认证系统

[查看模板仓库](https://github.com/your-username/Personal_Sites_Template)
EOF
```

### 3. 添加真实的项目示例

```bash
cat > content/projects/template-demo.mdx << 'EOF'
---
title: "Personal Sites Template - 演示网站"
date: 2024-01-20
description: "使用该模板创建的演示网站"
tags:
  - Next.js
  - 模板
published: true
---

# 演示网站

这个网站就是使用 Personal Sites Template 创建的！

## 源代码

- [模板仓库](https://github.com/your-username/Personal_Sites_Template)
- [演示仓库](https://github.com/your-username/personal-sites-template-demo)

## 特点演示

- 📝 博客系统（见博客页面）
- 📚 笔记系统（见笔记页面）
- 🎯 项目展示（你正在看这个）
EOF
```

### 4. 更新首页

编辑 `src/app/page.tsx`，替换为关于模板的内容：

```typescript
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Personal Sites Template 演示
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          一个现代化、功能完整的个人网站模板，使用 Next.js + TypeScript + Tailwind CSS。
        </p>
        <div className="flex gap-4">
          <a 
            href="/blog"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90"
          >
            查看博客
          </a>
          <a 
            href="https://github.com/your-username/Personal_Sites_Template"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10"
          >
            查看代码
          </a>
        </div>
      </section>

      {/* 特性展示 */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* ... */}
      </section>
    </main>
  )
}
```

### 5. 更新关于页面

编辑 `src/app/about/page.tsx`：

```typescript
export default function About() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">关于这个模板</h1>
      
      <section className="prose max-w-none mb-8">
        <h2>Personal Sites Template</h2>
        <p>
          一个现代化、功能完整的个人网站模板...
        </p>
        
        <h2>特性</h2>
        <ul>
          <li>Next.js 16 + Turbopack</li>
          <li>TypeScript + Tailwind CSS</li>
          <li>玻璃态 UI 设计</li>
          <li>PWA 支持</li>
          <li>内置认证系统</li>
        </ul>

        <h2>快速开始</h2>
        <p>
          想使用这个模板？
          <a href="https://github.com/your-username/Personal_Sites_Template/generate">
            点击这里创建你的仓库
          </a>
        </p>
      </section>
    </main>
  )
}
```

---

## 完整检查清单

### 创建演示网站

- [ ] 选择方案 A 或 B
- [ ] 创建/修改仓库
- [ ] 推送代码到 GitHub
- [ ] 本地运行 `npm run build` 测试
- [ ] 在 Vercel 部署
- [ ] 获取部署 URL

### 设置模板仓库

- [ ] 在 GitHub 启用 "Template repository" 选项
- [ ] 在 README 添加演示链接
- [ ] 在 README 添加"Use this template"按钮
- [ ] 测试一键创建仓库功能

### 自定义演示内容（仅方案 B）

- [ ] 替换个人信息
- [ ] 删除示例文章
- [ ] 创建演示文章
- [ ] 更新首页内容
- [ ] 更新关于页面
- [ ] 测试所有页面

### 文档更新

- [ ] 在 README 添加演示链接
- [ ] 更新快速开始指南指向演示
- [ ] 添加截图（可选）

---

## 📊 推荐的完整设置

这是我推荐的最佳实践设置：

```
你的 GitHub
├── Personal_Sites_Template (模板仓库)
│   ├── 设置为 Template repository
│   ├── README 中有演示链接
│   └── 文档完整
│
└── personal-sites-template-demo (演示仓库)
    ├── 部署到 demo.example.com
    ├── 真实的示例内容
    └── 展示最佳实践
```

用户流程：
```
1. 访问模板仓库
2. 看到演示链接，查看实际效果
3. 点击 "Use this template" 创建自己的仓库
4. 按照快速开始指南配置
5. 完成！
```

---

## 🆘 遇到问题？

### 仓库问题
- 检查 GitHub 是否正确连接
- 确保仓库是公开的
- 检查 `.gitignore` 是否正确

### 部署问题
- 查看 [VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)
- 检查 Vercel 部署日志
- 确保环境变量正确

### 内容问题
- 检查 Markdown 语法
- 确保文件名正确
- 本地运行 `npm run dev` 预览

---

## 🎯 总结

- ✅ **方案 A**: 快速演示（推荐用于初期）
- ✅ **方案 B**: 专业演示（推荐用于长期）
- ✅ **设置 Template**: 让用户一键创建
- ✅ **自定义内容**: 展示最佳实践

**建议**: 先用方案 A 快速部署，测试一切正常后，再用方案 B 创建专业的演示网站。

---

**祝你创建出漂亮的演示网站！** 🎉
