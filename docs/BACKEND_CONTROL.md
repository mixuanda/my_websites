# 后台管理与后端控制指南

本文记录当前项目的后台入口、账号权限、状态检查和内容发布边界。

TinaCMS 已从项目中移除。当前仓库不再提供浏览器内 Git-backed CMS 编辑器，也不再需要任何 Tina 相关依赖、脚本或环境变量。

登录、用户资料、账号绑定、会员权限和 Firestore 持久化的当前实现记录在 [`docs/backend-auth.md`](./backend-auth.md)。后台管理不应绕过该登录与权限层。

管理员登入后可以使用 `/api/admin/system-status` 进行安全自检，查看 Admin 白名单、Firebase、Stripe secret、Stripe webhook、会员 gating、recurring price 是否就绪。该 API 不会向非管理员公开。

## 目录

- [后台入口](#后台入口)
- [内容管理](#内容管理)
- [权限管理](#权限管理)
- [内容发布](#内容发布)
- [分析与监控](#分析与监控)
- [常见操作](#常见操作)
- [常见问题](#常见问题)

---

## 后台入口

### `/admin`

`/admin` 是当前后台状态页。它显示：

- Admin 白名单数量
- Firebase / Firestore 是否配置
- 会员 gating 是否启用
- Stripe secret key 是否配置
- Stripe webhook secret 是否配置
- 已配置的 recurring plan 数量
- 用户管理入口

生产环境下 `/admin` 仍然由 `notFoundInProduction()` 隐藏。Preview / development 环境中，只有登录并且 email 命中 `ADMIN_EMAILS` 白名单的用户可以访问。

### `/api/admin/system-status`

管理员可请求此 API 做后端状态自检。它只返回配置状态和必要诊断，不返回 secret 值。

### `/admin/users`

管理员可查看用户管理界面，包括：

- 登录 email
- 登录方式
- admin/member/user 角色
- 最近登录时间
- 登录次数
- 会员状态
- 订阅 ID

对应 JSON API 是 `/api/admin/users`。

---

## 内容管理

当前内容管理方式是直接编辑仓库文件，然后通过 Git / PR / Vercel 部署发布。

主要内容目录：

| 内容 | 路径 |
| --- | --- |
| 数学 Notes 正文 | `content/textbook/**` |
| 博客文章 | `content/blog/**` |
| 旧式学习笔记 | `content/notes/**` |
| 项目内容 | `content/projects/**` |
| 课程来源材料 | `reference/**` |
| 内部进度和 QA 文档 | `docs/**` |

数学 Notes 的公共产品方向、写作标准、i18n、导出和 QA 要求以根目录 `AGENTS.md` 为准。

---

## 权限管理

管理员由服务端 `ADMIN_EMAILS` 环境变量控制：

```env
ADMIN_EMAILS=you@example.com,second@example.com
```

后台页面和管理 API 都必须经过：

1. Auth.js 登录会话检查。
2. `ADMIN_EMAILS` 白名单检查。
3. production surface guard 检查。

普通用户不能通过前端 API 修改：

- email
- role
- membership
- entitlement
- provider binding
- billing state

这些边界由 `src/lib/auth.ts`、`src/lib/user-store.ts`、`src/lib/membership/**`、`src/lib/billing/**` 和对应 API route 共同维护。

---

## 内容发布

当前发布流程：

```text
编辑仓库内容 -> 本地验证 -> commit -> push -> Vercel build -> production verification
```

默认构建命令：

```bash
npm run build
```

该命令执行：

```bash
npm run verify:mdx-tables
contentlayer2 build
next build --webpack
```

内容发布前应至少运行：

```bash
npm run contentlayer
npm run verify:mdx-tables
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

对于 Notes 内容补充，还应按 `docs/notes-content-supplement-workflow.md` 更新对应 QA / coverage 文档。

---

## 分析与监控

### Vercel Analytics

项目使用 `@vercel/analytics`。部署后可在 Vercel Dashboard 查看页面访问和性能指标。

### 系统状态检查

管理员状态检查：

```text
/api/admin/system-status
```

公开 billing 配置健康检查只在 preview/development surface 开放：

```text
/api/billing/status
```

生产环境目前隐藏未完成的后台、登录、settings、billing 和 diary surface。详见 `docs/production-preview-surface.md`。

---

## 常见操作

### 修改网站信息

编辑相关页面和 layout 文件，例如：

| 文件 | 内容 |
| --- | --- |
| `src/app/page.tsx` | 首页内容 |
| `src/app/about/page.tsx` | 关于页面 |
| `src/app/[locale]/notes/**` | Notes 页面 |
| `.env.example` | 环境变量示例 |

### 修改主题色

编辑 `src/app/globals.css` 中的 CSS variables / design tokens。

### 添加新页面

1. 在 `src/app/` 中创建新文件夹。
2. 添加 `page.tsx`。
3. 根据 production surface 策略决定是否公开。

### 添加新数学 Notes 内容

1. 先确认 `reference/**` 是否支持该内容。
2. 在 `content/textbook/**` 下补充三语 MDX。
3. 更新 `docs/reference-coverage.md`、`docs/chapter-coverage-map.md` 和相关 QA 文档。
4. 运行完整 Notes 验证。

---

## 常见问题

### Q: 现在还有 CMS 吗？

A: 没有。TinaCMS 已移除。内容编辑通过仓库文件、Git 分支和 PR 完成。

### Q: 如何恢复以前的版本？

A: 在 Git 历史中 revert 对应 commit，或从 GitHub PR / commit history 恢复对应文件。

### Q: 如何隐藏未完成页面？

A: 使用 `src/lib/site-surface.ts` 的 preview-only surface 策略，并在页面或 API 中调用 production guard。

### Q: 数据库和登录系统在哪里维护？

A: 当前实现见 `docs/backend-auth.md`、`src/lib/firebase-admin.ts`、`src/lib/auth.ts`、`src/lib/user-store.ts`、`src/lib/membership/**`、`src/lib/billing/**`。

---

## 参考链接

- [Auth.js 文档](https://authjs.dev/)
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Firebase 文档](https://firebase.google.com/docs)
