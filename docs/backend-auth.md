# 后端登录与用户系统

本文档记录本站当前后端登录、用户资料、账号绑定和数据持久化策略。

## 当前后端能力

- NextAuth 统一处理登录会话。
- 支持 GitHub OAuth、Google OAuth。
- 支持可选的站点邮箱密码登录，用于没有 OAuth 或需要管理员直登的场景。
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
```

只启用实际已经配置的 provider。若后端没有配置密码用户，不应把 `credentials` 放进公开列表。

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

密码登录不提供公开注册、找回密码或前端创建账号。它是受控站点账号入口，适合个人站点管理和受保护内容访问。

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

## 用户资料 API

`GET /api/user/profile`

返回：

- `profile`: 用户 ID、邮箱、显示名称、头像、角色、默认语言、默认主题、登录次数、最近登录时间。
- `backend`: 当前认证 provider 是否配置、密码账号数量、持久化模式。

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

## 生产检查

上线前至少检查：

- `AUTH_SECRET` 已设置为强随机值。
- 公开 provider 列表只包含实际配置的 provider。
- Firestore 服务账号已配置，否则受保护数据不会持久化。
- `ADMIN_EMAILS` 只包含可信邮箱。
- Stripe webhook 已配置并能写入会员资格。
