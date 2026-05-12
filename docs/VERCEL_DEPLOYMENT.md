# 🚀 Vercel 部署完整指南

本指南提供详细的 Vercel 部署步骤、常见问题和解决方案。

---

## 📋 目录

- [前置要求](#前置要求)
- [快速部署（3步）](#快速部署3步)
- [详细部署指南](#详细部署指南)
- [常见问题和解决方案](#常见问题和解决方案)
- [部署后配置](#部署后配置)
- [性能优化](#性能优化)
- [故障排除](#故障排除)

---

## 前置要求

在部署之前，确保你已经有：

- ✅ **GitHub 账号** - 用于连接仓库
- ✅ **Vercel 账号** - 免费注册在 [vercel.com](https://vercel.com)
- ✅ **代码已推送到 GitHub** - 完整的项目代码
- ✅ **本地构建通过** - 运行 `npm run build` 成功
- ✅ **环境变量已配置** - 如果需要的话（见下文）

---

## 快速部署（3步）

### 步骤 1: 推送代码到 GitHub

```bash
# 在你的项目目录中

# 1. 初始化 git（如果还没有）
git init

# 2. 添加 Vercel 作为部署远程（可选）
git remote add origin https://github.com/your-username/your-repo.git

# 3. 提交所有更改
git add .
git commit -m "Initial commit: personal site template"

# 4. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 2: 在 Vercel 连接你的仓库

1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账号登录（或注册）
3. 点击 **"Add New..." → "Project"**
4. 选择 **"Continue with GitHub"**
5. 授权 Vercel 访问你的 GitHub 仓库
6. 选择你的仓库
7. 点击 **"Import"**

### 步骤 3: 配置和部署

1. **项目名称** - 保持默认或修改
2. **Framework** - 应该自动检测为 **Next.js**
3. **Root Directory** - 保持默认 `./`
4. **Build Command** - 应该自动填充为：
   ```
   npm run build
   ```
5. **Output Directory** - 保持默认 `.next`
6. **Environment Variables** - 根据需要添加（见下文）
7. 点击 **"Deploy"**

✅ **完成！** 你的网站现在已部署到 Vercel。等待几分钟后，你会得到一个部署 URL。

---

## 详细部署指南

### 配置步骤详解

#### 1. GitHub 连接

**如果 Vercel 无法找到你的仓库：**

```bash
# 确保你的仓库是公开的，或者：
# 1. 访问 https://vercel.com/account/integrations
# 2. 重新连接 GitHub 并授予更多权限
# 3. 重新部署
```

#### 2. 项目设置

在 Vercel 的项目设置中确认以下内容：

| 设置 | 值 | 说明 |
|------|-----|------|
| **Framework Preset** | Next.js | 自动检测 |
| **Build Command** | `npm run build` | 包括 contentlayer 编译 |
| **Output Directory** | `.next` | Next.js 标准输出目录 |
| **Install Command** | `npm install` | 自动 |
| **Development Command** | `npm run dev` | 自动 |

#### 3. 环境变量配置

如果你使用了认证或数据库功能，需要添加环境变量：

**在 Vercel 中添加环境变量：**

1. 进入项目 → **Settings** → **Environment Variables**
2. 添加以下变量（根据实际需要）

---

### 📌 完整的环境变量配置列表

#### 3.1 基础配置

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Name
```

#### 3.2 Next.Auth OAuth 配置

**GitHub OAuth:**
```env
AUTH_SECRET=your-secret-key-here-at-least-32-chars
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret
```

**Google OAuth:**
```env
AUTH_GOOGLE_ID=your-google-oauth-id
AUTH_GOOGLE_SECRET=your-google-oauth-secret
```

**获取 GitHub OAuth 凭证：**
1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **New OAuth App**
3. 填写信息：
   - **Application name**: Your App Name
   - **Homepage URL**: `https://your-domain.com` (本地开发用 `http://localhost:3000`)
   - **Authorization callback URL**: `https://your-domain.com/api/auth/callback/github`
4. 获取 **Client ID** 和 **Client Secret**

**获取 Google OAuth 凭证：**
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 **Google+ API**
4. 创建 OAuth 2.0 凭证（OAuth consent screen）
5. 授权重定向 URI: `https://your-domain.com/api/auth/callback/google`
6. 获取 **Client ID** 和 **Client Secret**

#### 3.3 Firebase Admin / Firestore 配置

```env
# Firebase Admin SDK（后端私密）
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

当前代码只使用 Firebase Admin SDK 访问 Firestore，不读取 Firebase Web SDK 的
`NEXT_PUBLIC_FIREBASE_*` 配置，也不读取旧式 `FIREBASE_SERVICE_ACCOUNT_KEY` 或
`FIREBASE_ADMIN_SDK_KEY` 变量。

Firestore 目前支撑 Auth.js adapter、用户资料、注册账号、会员资格、billing entitlement、Stripe customer 映射、textbook progress 和私密日记。除非已经完成备份、schema mapping、staging rehearsal 和 rollback 计划，否则不要迁移或删除生产 Firestore 数据。

当前数据库状态和后续 Vercel Marketplace 数据库评估见：

- [`docs/database-inventory.md`](./database-inventory.md)
- [`docs/vercel-database-evaluation.md`](./vercel-database-evaluation.md)
- [`docs/database-backup-rollback-runbook.md`](./database-backup-rollback-runbook.md)
- [`docs/billing-entitlement-reconciliation.md`](./billing-entitlement-reconciliation.md)

**获取 Firebase Admin 凭证的步骤：**

1. **访问 Firebase Console**
   - 前往 [console.firebase.google.com](https://console.firebase.google.com/)

2. **创建或选择项目**
   - 点击 **Create Project**
   - 输入项目名称
   - 按步骤完成创建

3. **启用 Firestore 数据库**
   ```
   Build → Firestore Database → Create Database
   选择 Start in production mode（可后续修改规则）
   ```

4. **获取服务账户密钥**（用于后端操作）
   ```
   项目设置 → Service Accounts → 生成新密钥
   ```
   将 JSON 中的 `project_id`、`client_email` 和 `private_key` 分别配置到
   `FIREBASE_PROJECT_ID`、`FIREBASE_CLIENT_EMAIL` 和 `FIREBASE_PRIVATE_KEY`。
   `FIREBASE_PRIVATE_KEY` 必须保留换行；在 Vercel 中通常使用带 `\n` 的完整 PEM 字符串。

#### 3.4 评论系统 (Giscus)

```env
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
```

**设置 Giscus 的步骤：**

1. 访问 [giscus.app](https://giscus.app)
2. 输入你的 GitHub 仓库
3. 在仓库设置中启用 Discussions
4. 获取必要的配置信息

---

### 🔧 在 Vercel 中添加环境变量

#### 方法 1: 通过 Vercel Web 界面（推荐）

```
1. 访问 Vercel Dashboard
2. 选择你的项目
3. 点击 Settings → Environment Variables
4. 点击 "Add New"
5. 输入 Name 和 Value
6. 选择应用环境（Production、Preview、Development）
7. 点击 "Save"
8. 点击项目的 Deployments 标签，选择最新部署
9. 点击右上角的三个点，选择 "Redeploy"
```

#### 方法 2: 使用 Vercel CLI

```bash
# 安装 Vercel CLI（如果还没安装）
npm i -g vercel

# 登录 Vercel
vercel login

# 添加环境变量
vercel env add NEXT_PUBLIC_SITE_URL

# 列出所有环境变量
vercel env list

# 拉取所有环境变量到本地 .env.local
vercel env pull
```

---

### ✅ 环境变量检查清单

- [ ] **NEXT_PUBLIC_SITE_URL** - 你的部署域名
- [ ] **AUTH_SECRET** - 至少 32 个字符的随机字符串
- [ ] **AUTH_GITHUB_ID** 和 **AUTH_GITHUB_SECRET** - GitHub OAuth
- [ ] **AUTH_GOOGLE_ID** 和 **AUTH_GOOGLE_SECRET** - Google OAuth（可选）
- [ ] **FIREBASE_PROJECT_ID** - Firebase project id（Firestore 持久化需要）
- [ ] **FIREBASE_CLIENT_EMAIL** - Firebase service account email
- [ ] **FIREBASE_PRIVATE_KEY** - Firebase service account private key

#### 4. 自定义域名（可选）

```
项目 → Settings → Domains
→ Add Domain
→ 输入你的域名（如 example.com）
→ 按照 DNS 配置说明更新 DNS 记录
```

---

## 常见问题和解决方案

### Q1: "Build failed" - 构建失败

**原因可能：**
- 代码有语法错误
- 缺少依赖
- 环境变量未设置

**解决方案：**

```bash
# 1. 检查本地构建
npm run build

# 2. 查看 Vercel 部署日志中的具体错误
# 在 Vercel Dashboard 中点击 "View Function logs"

# 3. 常见错误：
# - "Cannot find module" → npm install 未完成
# - "SyntaxError" → 检查代码语法
# - "EACCES" → 权限问题，联系 Vercel 支持
```

### Q2: "NEXT_PUBLIC_* is not defined"

**原因：** 环境变量未正确添加

**解决方案：**

```bash
# 1. 确保变量以 NEXT_PUBLIC_ 开头（用于浏览器端）
NEXT_PUBLIC_SITE_URL=https://example.com

# 2. 在 Vercel 中添加后，重新部署（不需要 git push）
# Settings → Redeployment → Redeploy

# 3. 检查变量名拼写（区分大小写）
```

### Q3: "403 Forbidden" - 访问权限错误

**原因：** Vercel 无法访问你的 GitHub 仓库

**解决方案：**

```bash
# 1. 检查仓库是否为公开
# GitHub 仓库 → Settings → Visibility → Make public

# 2. 重新连接 GitHub
# Vercel Settings → Integrations → GitHub → Reauthorize

# 3. 清除 Vercel 缓存
# Project → Settings → Git → Redeploy
```

### Q4: "Timeout" - 构建超时

**原因：** 构建时间过长

**解决方案：**

```bash
# 1. 检查是否有大量静态生成
# 优化 generateStaticParams() 只生成必要的页面

# 2. 清除不必要的依赖
npm list  # 查看依赖树

# 3. 联系 Vercel 支持请求更高的超时限制
```

### Q5: "Node.js 版本不兼容"

**原因：** Vercel 的 Node.js 版本与你的代码不兼容

**解决方案：**

在项目根目录创建 `.nvmrc` 文件：

```
20.10.0
```

或在 `package.json` 中指定：

```json
{
  "engines": {
    "node": "20.10.0",
    "npm": "10.0.0"
  }
}
```

### Q6: "Static generation failed"

**原因：** 某个页面的静态生成失败

**解决方案：**

```typescript
// src/app/[slug]/page.tsx

// 1. 检查 generateStaticParams() 是否正确
export async function generateStaticParams() {
  return [{ slug: 'valid-slug' }]
}

// 2. 如果确实不能静态生成，改为动态：
// 删除 generateStaticParams 或改为 ISR（增量静态再生成）
export const revalidate = 60  // 每 60 秒重新验证一次
```

### Q7: "Image optimization failed"

**原因：** 远程图片 URL 未被允许

**解决方案：**

在 `next.config.ts` 中配置允许的域名：

```typescript
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',  // 允许 GitHub
      },
    ],
  },
}
```

---

## 部署后配置

### 1. 设置自定义域名

```
Vercel Dashboard
→ Project Settings
→ Domains
→ Add Domain
→ 输入域名并按照 DNS 说明配置
```

### 2. 配置 SSL 证书

Vercel 会自动为你的域名配置免费的 SSL 证书（Let's Encrypt）。

### 3. 配置重定向（可选）

在 `vercel.json` 中配置重定向：

```json
{
  "redirects": [
    {
      "source": "/old-url",
      "destination": "/new-url",
      "permanent": true
    }
  ]
}
```

### 4. 配置 Analytics（可选）

Vercel 提供免费的 Web Analytics：

1. Project Settings → Analytics
2. 启用 "Enable Vercel Analytics"
3. 访问网站几次，数据会开始显示

### 5. 设置 GitHub 部署检查

```
Project Settings → Git
→ Production Branch: main
→ Automatically deploy on Git push: enabled
```

---

## 性能优化

### 1. 缓存策略

在 `vercel.json` 中配置缓存：

```json
{
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=300"
        }
      ]
    },
    {
      "source": "/:path*.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

### 2. 启用 Compression

Vercel 默认启用 Gzip，无需额外配置。

### 3. 监控性能

- **Vercel Analytics**: 查看真实用户性能数据
- **Web Vitals**: 使用 `next/analytics` 模块
- **Lighthouse**: 在浏览器 DevTools 中运行

### 4. 优化构建大小

```bash
# 分析构建大小
npx next-bundle-analyzer

# 删除未使用的依赖
npm prune

# 使用生产构建测试
npm run build
npm start
```

---

## 故障排除

### 部署流程故障排查表

| 问题 | 检查项 | 解决方案 |
|------|--------|--------|
| 无法连接 GitHub | GitHub 账户权限 | 重新授权 Vercel GitHub App |
| 构建失败 | 代码错误 | 检查 `npm run build` 本地 |
| 页面 404 | 路由配置 | 检查 `src/app` 目录结构 |
| 环境变量未生效 | 变量名称和值 | 重新部署后再测试 |
| 样式丢失 | CSS 导入 | 检查 Tailwind 配置 |
| 数据库连接失败 | 连接字符串 | 确认 URL 和凭据正确 |
| 速度慢 | 静态生成 | 优化 `generateStaticParams` |

### 查看部署日志

```
Vercel Dashboard
→ Deployments
→ 选择部署
→ Function Logs
→ 查看详细错误信息
```

### 回滚到上一个版本

```
Vercel Dashboard
→ Deployments
→ 选择之前的部署
→ Promote to Production
```

---

## 完整的部署检查清单

### 部署前检查
- [ ] 代码已提交到 GitHub
- [ ] 本地 `npm run build` 成功
- [ ] 没有未 commit 的更改
- [ ] `.env.local` 中的敏感信息未提交（检查 `.gitignore`）

### Vercel 配置检查
- [ ] 项目已导入到 Vercel
- [ ] GitHub 仓库已连接
- [ ] Build Command 正确
- [ ] 所有必需的环境变量已添加
- [ ] Node.js 版本兼容

### 部署后检查
- [ ] 网站可以访问
- [ ] 所有页面都能加载
- [ ] 样式正确显示
- [ ] 响应式设计正常
- [ ] 深色模式工作正常
- [ ] 所有链接都正常
- [ ] 数据库连接正常（如需要）
- [ ] 认证功能正常（如需要）

### 性能检查
- [ ] 运行 Lighthouse 检查
- [ ] Core Web Vitals 良好
- [ ] 页面加载时间 < 3s
- [ ] 首字节时间 (TTFB) < 600ms

---

## 💡 最佳实践

### 1. 使用预览部署

Vercel 为每个 Pull Request 创建预览 URL：

```
GitHub PR
→ Vercel Bot 评论中的预览 URL
→ 在生产环境之前测试
```

### 2. 自动部署

每次推送到 main 分支时自动部署：

```
Project Settings
→ Git
→ Automatically deploy on Git push: enabled
```

### 3. 安全性最佳实践

- ✅ 不要在代码中提交密钥
- ✅ 使用 Vercel Environment Variables
- ✅ 定期轮换 API 密钥
- ✅ 使用 `.env.local` 本地测试
- ✅ 在 `.gitignore` 中排除敏感文件

### 4. 监控和告警

```
Project Settings → Integration & Webhooks
→ 配置 Slack 或其他通知
→ 部署失败时接收通知
```

---

## 📊 Vercel 免费层 vs 付费层

| 功能 | 免费 | Pro |
|------|------|-----|
| **部署** | ✅ 无限制 | ✅ |
| **带宽** | 100GB/月 | 按流量计费 |
| **静态资源缓存** | ✅ | ✅ |
| **Edge Middleware** | ✅ | ✅ |
| **分析** | ✅ | ✅ |
| **支持** | 社区 | 优先支持 |
| **SLA** | 无 | 99.95% |

**对于个人网站，免费层通常足够！**

---

## 🆘 获取帮助

如果遇到问题：

1. **检查 Vercel 文档**: [vercel.com/docs](https://vercel.com/docs)
2. **查看部署日志**: Dashboard → Deployments → View Function Logs
3. **搜索常见问题**: [Vercel Discussions](https://github.com/vercel/next.js/discussions)
4. **联系 Vercel 支持**: Vercel Dashboard → Help → Contact Support
5. **查看项目文档**: [本项目的 FAQ](./docs/README.md)

---

## ✅ 部署成功标志

当你看到以下内容时，说明部署成功了：

- ✅ Vercel Dashboard 显示 **"Deployment successful"**
- ✅ 绿色的部署状态指示灯
- ✅ 能够访问部署 URL 并看到你的网站
- ✅ 所有页面和功能都正常工作
- ✅ 没有 404 或 500 错误

---

## 📈 下一步

部署成功后：

1. **配置自定义域名** - 使用你自己的域名
2. **设置 Google Analytics** - 跟踪访问数据
3. **启用 Comments** - 配置 Giscus 评论系统
4. **添加内容** - 发布你的第一篇文章
5. **优化性能** - 根据 Lighthouse 建议优化

---

**祝部署顺利！** 🚀

如有问题，查看各部分的详细说明或提交 GitHub Issue。
