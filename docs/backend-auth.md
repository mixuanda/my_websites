# 后端登录与用户系统

本文档记录本站当前后端登录、用户资料、账号绑定和数据持久化策略。

## 当前后端能力

- NextAuth 统一处理登录会话。
- 支持 GitHub OAuth、Google OAuth。
- 支持可选的站点邮箱密码登录，用于没有 OAuth 或需要管理员直登的场景。
- 支持可选的站点账号注册；注册用户存入 Firestore 的 `credentialUsers` 集合，管理员邮箱不会开放注册。
- 注册接口带有账号 / IP 速率限制；配置 Turnstile 后，注册必须通过服务端验证码校验。
- Firestore 配置存在时，Auth adapter、用户资料、日记、会员资格和练习进度都写入 Firestore。
- Firestore 未配置时，部分功能使用内存模式，仅适合本地开发和临时演示。
- `/settings` 是受保护页面，未登录会先跳转 `/login?callbackUrl=/settings`。
- `/api/user/profile` 提供当前用户资料读取和安全字段更新。
- `/api/user/accounts` 返回当前用户绑定的 OAuth 账号和站点账号状态。

## 环境变量

基础变量：

```env
AUTH_SECRET=generate-with-openssl-rand-base64-32
AUTH_TRUST_HOST=1
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

公开登录按钮由 `NEXT_PUBLIC_AUTH_PROVIDERS` 控制：

```env
NEXT_PUBLIC_AUTH_PROVIDERS=credentials,github,google
AUTH_REGISTRATION_ENABLED=true
NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED=true
AUTH_REGISTRATION_REQUIRE_TURNSTILE=true
NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE=true
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
AUTH_TURNSTILE_SECRET_KEY=...
```

只启用实际已经配置的 provider。若没有站点账号、也没有启用注册，不应把 `credentials` 放进公开列表。
若 `NEXT_PUBLIC_AUTH_PROVIDERS` 未设置，或设置为 `disabled`、`none`、`off`，前端不会默认展示 GitHub / Google，也不会请求 NextAuth provider endpoint，避免按钮显示但后端 provider 未配置。

## 站点密码登录

生成密码哈希：

```bash
npm run auth:hash-password -- "a-long-private-password"
```

单用户配置：

```env
AUTH_PASSWORD_EMAIL=you@example.com
AUTH_PASSWORD_NAME=Evan
AUTH_PASSWORD_ROLE=admin
AUTH_PASSWORD_HASH=pbkdf2$v1$sha256$310000$...
NEXT_PUBLIC_AUTH_PROVIDERS=credentials,github,google
```

多用户配置：

```env
AUTH_PASSWORD_USERS_JSON='[
  {
    "email": "you@example.com",
    "name": "Evan",
    "role": "admin",
    "passwordHash": "pbkdf2$v1$sha256$310000$..."
  }
]'
```

公开注册的服务端真实开关只由 `AUTH_REGISTRATION_ENABLED=true` 控制；`NEXT_PUBLIC_AUTH_REGISTRATION_ENABLED` 只负责前端是否展示注册入口。注册接口是 `POST /api/auth/register`，只会创建普通 `user` 账号，不允许注册 `ADMIN_EMAILS` 中的保留邮箱。管理权限仍只由服务端 `ADMIN_EMAILS` 白名单决定。

部署环境中的公开注册还要求 Firestore 持久化已经配置完成。Vercel preview /
production runtime 若缺少 `FIREBASE_PROJECT_ID`、`FIREBASE_CLIENT_EMAIL` 或
`FIREBASE_PRIVATE_KEY`，即使 `AUTH_REGISTRATION_ENABLED=true`，注册接口也会返回
`registration_persistence_not_configured`，避免把内存 fallback 误当成公开账号系统。
本地临时演示仍可在无 Firestore 时使用内存注册，但不能用于公开 domain。

`GET /api/auth/register` 返回公开注册 readiness 摘要，只包含布尔状态和 blocker
代码，不泄露 secret。Preview / development 可用它确认 `ready=true` 后再解除
Vercel Authentication；production surface 仍会隐藏该接口。

远程 development QA 可运行：

```bash
npm run auth:apply-development-env -- --file .env.codex-account.preview.local
npm run auth:apply-development-env -- --file .env.codex-account.preview.local --apply
npm run auth:verify-development
npm run auth:verify-development -- --require-ready
npm run auth:verify-development -- --require-ready --expect-public
```

先从 `.env.codex-account.preview.example` 复制出本地
`.env.codex-account.preview.local`，填入 staging Firebase、Turnstile、
development OAuth 和 Stripe test key。`auth:apply-development-env` 默认只 dry-run；
加 `--apply` 才会写入 Vercel，并且只写入 branch-scoped
`Preview (codex/account)`。`auth:verify-development` 第一条用于当前受保护状态；
第二条用于写入 staging Firebase 和 Turnstile 后确认注册 ready；第三条用于明确
解除 Vercel Authentication 后确认公开访问。

注册防滥用：

- `registration-ip`：每个 IP 每小时最多 8 次注册尝试。
- `registration-email`：同一邮箱每小时最多 3 次注册尝试。
- `credentials-login-email`：同一邮箱每 15 分钟最多 10 次密码登录尝试。
- Firestore 存在时，速率限制写入 `authRateLimits` 集合；本地无 Firestore 时使用内存 fallback。
- 当服务端 `AUTH_REGISTRATION_REQUIRE_TURNSTILE=true` 时，`/api/auth/register` 会调用 Cloudflare Turnstile Siteverify API。`NEXT_PUBLIC_AUTH_REGISTRATION_REQUIRE_TURNSTILE` 只负责前端按钮和组件显示；没有 token、密钥缺失或校验失败都会被服务端拒绝。

当前不提供找回密码流程；如需重设管理员密码，更新 `AUTH_PASSWORD_HASH` 后重新部署。

当前 production bootstrap 管理员邮箱：

- `mixuanda@outlook.com`

管理员密码只保存为 Vercel 环境变量中的 PBKDF2 hash，不写入仓库。

## OAuth 登录

GitHub：

```env
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

Google：

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

NextAuth 也兼容 `AUTH_GITHUB_ID`、`AUTH_GITHUB_SECRET`、`AUTH_GOOGLE_ID`、`AUTH_GOOGLE_SECRET`。

OAuth readiness 当前规则：

- 后端只有在 client id 与 secret 成对存在时才注册 GitHub / Google provider。
- 前端 `/login` 会同时检查 `NEXT_PUBLIC_AUTH_PROVIDERS` 和 NextAuth 的实际 provider 列表；不会因为 public env 写错而展示不可用按钮。
- 当前 preview 可用 `NEXT_PUBLIC_AUTH_PROVIDERS=disabled` 暂停公开登录入口；真正开放邮箱密码、GitHub 或 Google 前，必须先配置对应后端 provider / secret。
- Google 登录要求 provider profile 的 `email_verified=true`。
- GitHub 登录会调用 GitHub emails API，要求登录邮箱已验证。

## 数据存储决策

当前不切换到所谓“Vercel 自带用户库”。截至 2026-05-25 的评估，Vercel 的存储路线主要是 Blob、Edge Config，以及 Marketplace 上的 Postgres / Redis / NoSQL 等集成；它不是一个可直接替换 Firestore 的单一账号数据库。

本仓库下一阶段继续使用 Firestore，原因：

- 当前 Auth.js Firestore adapter 已经接入。
- `users`、OAuth `accounts`、`credentialUsers`、会员资格、Stripe customer / subscription 映射、练习记录和日记数据都已经围绕 Firestore 组织。
- 对现在的 `codex/account` 分支来说，最大风险是注册安全与环境隔离，而不是数据库供应商本身。

长期迁移方向：

- 如果希望更 Vercel-native，可评估 Clerk 作为完整用户身份系统；这会是一次 auth 架构迁移，不是小改动。
- 如果保留 Auth.js，但想用关系数据库，优先评估 Neon / Supabase Postgres via Vercel Marketplace。迁移前必须先完成 schema、备份、迁移 fixture、Stripe entitlement reconciliation 和 rollback。
- Upstash Redis 更适合作为速率限制 / idempotency / cache，不适合作为主用户库。

## 用户资料 API

`GET /api/user/profile`

返回：

- `profile`: 用户 ID、邮箱、显示名称、头像、角色、默认语言、默认主题、登录次数、最近登录时间。
- `backend`: 当前认证 provider 是否配置、密码账号数量、持久化模式。
- `entitlements`: 当前用户是否为 Admin / Member。
- `membership`: 当前用户的 Stripe 会员记录。
- `billing`: Stripe 付款配置摘要。

`PATCH /api/user/profile`

允许更新：

- `name`
- `preferredLocale`: `en`、`zh-hk`、`zh-cn`
- `theme`: `system`、`light`、`dark`

不允许从客户端更新邮箱、角色、会员状态或登录 provider。

## 权限边界

- 管理员由 `ADMIN_EMAILS` 服务端白名单决定。
- 会员由 Stripe webhook 写入用户 `membership` 字段。
- 普通用户不能通过设置页提升角色或修改会员状态。
- 公开页面不展示后端内部追踪信息。
- 管理员可访问 `/api/admin/system-status` 查看安全诊断：admin 白名单数量、Firebase 持久化状态、Stripe secret/webhook/price 配置状态，以及 Stripe price 是否是 recurring price。
- 管理员可访问 `/admin/users` 查看用户管理界面，包含登录方式、会员状态、最近登录与订阅 ID。
- 管理员可访问 `/api/admin/users` 获取同样的用户管理 JSON。
- `/api/billing/status` 可在 preview/development surface 做安全的付款配置健康检查；该接口只返回布林状态和 plan 是否配置，不泄露 secret 或完整 price metadata。当前 production surface 会隐藏 `/api/billing/**`。

## 当前会员等级模型

- `FREE`：公开核心笔记、部分例题和每日限额的可评分 checkpoint。默认限额为每天 8 次，可用 `NOTES_FREE_DAILY_ATTEMPT_LIMIT` 或 `NEXT_PUBLIC_NOTES_FREE_DAILY_ATTEMPT_LIMIT` 调整。
- `MEMBER` / Notes Plus：进阶笔记单元、会员 checkpoint、深入引导解答、TXT/PDF study export 和不限量可评分 checkpoint。该等级需要 Stripe recurring subscription price。
- `PRO` / Notes Pro：包含 Plus 全部权限，并预留给最高等级的进阶工具、更完整的 premium export 套装和未来 premium 学习功能。该等级使用独立的 Stripe recurring subscription price。
- `ADMIN`：服务端 `ADMIN_EMAILS` 白名单，不需要付款，拥有完整访问权。

会员付款入口只会在以下条件同时满足时显示：

- `STRIPE_SECRET_KEY` 已配置。
- 至少一个会员 price id 已配置。
- `STRIPE_WEBHOOK_SECRET` 已配置，确保付款后能够同步会员资格。

如果 Stripe 账户只有一次性 price，而没有 recurring price，网站不会展示订阅按钮，因为当前会员系统使用 Stripe subscription checkout。

当前 live Stripe 已建立 `Notes Membership` Plus 产品：

- 月费 HKD 20：`price_1TPjAE906oPVRv7kzcP3UNsk`
- 年费 HKD 200：`price_1TPjAG906oPVRv7kr2IpEaO7`

这两个 price 是当前 Plus 方案使用的 Stripe price id。它们应写入当前启用会员
surface 的部署环境；现阶段优先用于 development / preview surface，production
surface 只有在明确移除 membership production guard 后才应开放。
Pro 方案预留以下 env：

- `STRIPE_PRICE_ID_PRO_MONTHLY`
- `STRIPE_PRICE_ID_PRO_YEARLY`

捐赠入口使用 Stripe Checkout payment mode 和代码内固定 HKD 金额，不需要预先创建 Stripe price。订阅付款闭环还需要 `STRIPE_SECRET_KEY` 与 `STRIPE_WEBHOOK_SECRET`。

## 生产检查

上线前至少检查：

- `AUTH_SECRET` 已设置为强随机值。
- 公开 provider 列表只包含实际配置的 provider。
- Firestore 服务账号已配置，否则受保护数据不会持久化。
- `ADMIN_EMAILS` 只包含可信邮箱。
- Stripe webhook 已配置并能写入会员资格。
- Stripe Plus / Pro 会员 price 必须是 recurring price；一次性 price 不能用于当前 subscription checkout。
