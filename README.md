# Evanalysis Notes

這個專案現在不是通用個人網站樣板，而是放在既有網站 **Notes**
區域中的嚴謹課程筆記系統。產品方向是：

- Notes-first，而不是獨立的「Textbook portal」
- 課本式、文章式、可持續擴寫的數學筆記
- 以 `reference/` 為唯一課程內容真實來源
- 互動只在能真正提升理解時才加入
- 會員制只負責解鎖更深的筆記與評量，不改變整個網站的 Notes 外層

目前主軸是 `MATH1090` 與 `MATH1030`。架構已預留未來課程，例如
`MATH1025`。`MATH1010` 目前沒有對應的 `reference/` 來源樹，所以只做
架構預留，不做內容承諾。

## 目前產品是什麼

這個 repo 現在包含幾個同時存在的層次：

- 公開 Notes 體驗：三語系課程筆記、章節導覽、先備關係、匯出
- 數學內容主線：`math1090`、`math1030`
- 未來課程與相鄰內容：`math1025` 目前已有內部內容骨架；catalog
  也仍保留少量其他課程樣本，例如 `csci2520`
- 會員與權限：Free / Member，加上一個伺服器端 Admin bypass
- 內部實作命名空間：程式碼與內容路徑仍使用 `textbook`
  這個內部名稱，但公開頁面一律應以 **Notes** 呈現

## Notes 路由與資訊架構

目前公開 Notes 的主要路由如下：

- `/${locale}/notes`
  Notes 首頁，顯示課程系列卡片與三語筆記入口
- `/${locale}/notes/${course}`
  某一課程的章節總覽頁
- `/${locale}/notes/${course}/${chapter}/${unit}`
  單一小節的詳細 note page
- `/${locale}/notes/membership`
  locale-aware 會員中心
- `/${locale}/notes/membership/success`
  Stripe Checkout 成功返回頁
- `/${locale}/notes/membership/cancel`
  Stripe Checkout 取消返回頁

相容性與舊路由：

- `/notes`
  仍保留作為舊的 notes archive / 入口頁，並連回 locale-aware Notes
- `/notes/membership*`
  仍存在，但現在會 redirect 到預設 locale 的 membership 路由
- `/${locale}/courses/**`
  僅作相容性 redirect；公開產品不再把這一段視為主入口

## 課程與內容架構

目前 repo 內的課程內容狀態可以分成三類：

- 已公開、持續擴寫的主線：
  `math1090`、`math1030`
- 已建立骨架、但仍需繼續依 `reference/` 深化：
  `math1025`
- 僅做未來架構保留、目前沒有來源支撐：
  `math1010`

內容檔案位於：

- `content/textbook/**`

這是**內部 authoring / storage namespace**，不是公開產品名稱。公開頁面、
README、導覽、breadcrumbs、CTA，都應以 **Notes**、**course notes**、
**section notes** 為主。

共享 metadata 與課程結構位於：

- `src/lib/textbook/catalog.ts`

共享 route helpers 位於：

- `src/lib/textbook/routes.ts`

共享 MDX block、互動、評量、匯出相關實作位於：

- `src/components/textbook/**`
- `src/lib/textbook/**`
- `src/app/api/textbook/**`
- `src/app/api/textbook-export/**`

## `reference/` 如何使用

`reference/` 是這個 repo 的唯一課程來源真相。任何具體課程說明、定義、
例題鋪排、章節次序、術語翻譯，都應優先服從 repository 內現有資料，而不是
外部記憶或猜測。

目前的工作規則是：

- 每個相關來源都要先被審核
- 可用內容要被整理進公開 Notes
- 重複來源要合併，不要重複計帳
- 弱、模糊、無法抽取、衝突的來源要在 docs 中標記
- 來源不足的地方，不可以假裝內容完整

目前的 coverage / audit 文檔包括：

- `docs/reference-coverage.md`
- `docs/chapter-coverage-map.md`
- `docs/source-audit.md`

## quick checks、練習、guided solutions、checkpoints

目前單一 note page 的評量層大致是：

- 文章正文內的 quick checks
- 題庫驅動的 section-level checkpoint
- Preview 與 Submit 分離
- 即時作答與批改
- 錯誤時回饋提示
- normalized answer preview
- attempts used / attempts remaining
- per-problem best status
- checkpoint summary 與 weak topics 提示
- 視權限而定的 guided solution reveal

對應實作：

- 題型與題庫：
  `src/lib/textbook/problem-bank.ts`
- 批改邏輯：
  `src/lib/textbook/problem-grading.ts`
- 作答紀錄與 section mastery：
  `src/lib/textbook/problem-attempts.ts`
- API：
  `src/app/api/textbook/problems/**`
- 前端元件：
  `src/components/textbook/AttemptInput.tsx`
  `src/components/textbook/PracticeQuestion.tsx`
  `src/components/textbook/UnitCheckpoint.tsx`

目前支援的基礎題型至少包括：

- MCQ
- fill-in-the-blank
- Preview 不消耗 attempts
- Submit 才會記錄正式嘗試
- 即時 correctness feedback
- hints
- step-by-step guided solution reveal
- per-problem attempts / best score / solved status
- section checkpoint progress
- checkpoint-level summary 與 weak-tag remediation signals

目前的 fill-in-the-blank 已開始走向輕量 WeBWorK 風格：

- math-aware normalized preview
- problem-specific syntax guidance
- configurable equivalence / tolerance policy
- per-problem reveal policy，而不是單靠靜態 “show answer”

這個層次會受到會員權限控制：

- Free 可以做公開題與公開解說
- Member 可以進入 premium 題與 deeper checkpoints
- Admin 透過伺服器白名單直接擁有完整權限

## 會員模型

目前的權限模型在型別上是：

- `FREE`
- `MEMBER`

另外還有一個**不是第三種公開 tier**的伺服器端 bypass：

- `Admin`

`Admin` 並不是 `AccessTier` enum 的第三值，而是由伺服器端 entitlement
helper 根據 `ADMIN_EMAILS` 判斷後，自動賦予完整權限。

### Free

- 可讀公開 core notes
- 可做部分 quick checks
- 可見部分 worked examples 與公開 guided solution

### Member

- 可讀 premium note units
- 可進入 premium checkpoints
- 可解鎖更完整的 guided solutions
- 可使用 Stripe customer portal 管理訂閱

### Admin

- 不需付款
- 由 server-side `ADMIN_EMAILS` 白名單直接放行
- 權限檢查會覆蓋 note page、題目 API、premium solutions、membership UI

主要 entitlement 程式碼位於：

- `src/lib/membership/entitlements.ts`

## Stripe 整合方式

目前採用的方式是：

- Stripe Billing
- Stripe Checkout（建立 subscription）
- Stripe webhook 驗簽後同步 membership 狀態
- Stripe customer portal 讓已綁定帳單檔案的會員管理付款與訂閱

主要流程：

1. 使用者在 `/${locale}/notes/membership` 發起訂閱
2. 前端呼叫 `POST /api/billing/checkout`
3. 後端建立 `mode=subscription` 的 Checkout Session
4. 成功 / 取消返回 locale-aware membership 頁
5. `POST /api/billing/webhook` 驗證 Stripe 簽章並同步 membership record
6. 已有 `customerId` 的帳號可透過 `POST /api/billing/portal`
   開啟 customer portal

相關檔案：

- `src/app/api/billing/checkout/route.ts`
- `src/app/api/billing/portal/route.ts`
- `src/app/api/billing/webhook/route.ts`
- `src/lib/membership/stripe.ts`
- `src/components/membership/BillingActions.tsx`

## Admin bypass 怎麼運作

Admin bypass 是**伺服器端**做的，不是前端隱藏按鈕而已。

來源：

- `ADMIN_EMAILS`

判斷方式：

- 逗號分隔 email
- 比對時會轉成小寫後做 case-insensitive 檢查

目前會套用到的主要位置：

- `src/lib/membership/entitlements.ts`
- locale-aware note page route
- `src/app/api/textbook/problems/*`
- billing UI decision logic
- `/admin` layout gate

## 語言切換

目前支援三種書面語模式：

- English
- Traditional Chinese（zh-HK）
- Simplified Chinese（zh-CN）

語言切換會影響：

- Notes 路由
- breadcrumbs
- sidebar
- TOC labels
- export labels
- 題目與 checkpoint UI
- membership center UI
- 共享 note-shell 文案

關鍵實作：

- `src/components/SiteLanguageSwitcher.tsx`
- `src/components/textbook/LanguageSwitcher.tsx`
- `src/lib/textbook/i18n.ts`

## 匯出

目前每個 learning unit 都支援匯出：

- TXT
- PDF

路由：

- `/api/textbook-export/[locale]/[course]/[chapter]/[unit]`
- `/api/textbook-export/[locale]/[course]/[chapter]/[unit]/pdf`

匯出不是保留互動，而是把互動退化成可溫習的靜態內容，例如：

- quick checks 轉成題目加答案內容
- stepper 轉成步驟序列
- interactive widgets 轉成代表性 snapshot
- guided solution 轉成靜態步驟

細節請看：

- `docs/export-behavior.md`

## 環境變數

以下列出目前實作會讀取、或目前 repo 明確保留在 `.env.example`
中的環境變數。沒有任何真實 secret 應該被寫入 repo。

### 必填：Auth / site

- `AUTH_SECRET`
  NextAuth secret。請填高熵隨機字串，例如用
  `openssl rand -base64 32` 產生。主要由部署環境建立。
- `AUTH_TRUST_HOST`
  `0` 或 truthy 值。現在 `src/lib/auth.ts` 會把 `0` 視為關閉，其他值視為
  啟用。通常部署在反向代理或平台上時維持 truthy。
- `NEXT_PUBLIC_SITE_URL`
  網站公開 origin，例如 `https://your-domain.com`。由部署網域決定。
  供 robots、sitemap 與 app base URL fallback 使用。
- `NEXTAUTH_URL`
  Auth callback origin，通常與 `NEXT_PUBLIC_SITE_URL` 相同。
- `APP_URL`
  Stripe checkout / portal return URL 使用的 canonical base URL。通常也與
  `NEXT_PUBLIC_SITE_URL` 相同。

### 必填：登入供應商（至少配置一種，否則只剩空 provider 狀態）

- `NEXT_PUBLIC_AUTH_PROVIDERS`
  逗號分隔字串，例如 `github,google`。由你決定前端要顯示哪些 provider。
- `GITHUB_CLIENT_ID`
  GitHub OAuth App client id。從 GitHub OAuth app 後台取得。
- `GITHUB_CLIENT_SECRET`
  GitHub OAuth App client secret。從 GitHub OAuth app 後台取得。
- `GOOGLE_CLIENT_ID`
  Google OAuth client id，通常格式為
  `your-client-id.apps.googleusercontent.com`。
- `GOOGLE_CLIENT_SECRET`
  Google OAuth client secret。

相容性 fallback：

- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `NEXTAUTH_SECRET`

這些名稱目前仍被程式碼接受，但 `.env.example` 與 README 以新的
`GITHUB_CLIENT_ID` / `GOOGLE_CLIENT_ID` 形式為主。

### 必填：Firebase Admin

- `FIREBASE_PROJECT_ID`
  Firebase project id，從 Firebase 專案設定取得。
- `FIREBASE_CLIENT_EMAIL`
  Firebase service account client email。
- `FIREBASE_PRIVATE_KEY`
  Firebase service account private key。`.env` 內要保留 `\n`
  轉義，格式類似：
  `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`

這一組目前用於：

- NextAuth Firestore adapter
- membership record 同步
- problem attempts / section mastery persistence

### 必填：Stripe 會員

- `STRIPE_SECRET_KEY`
  Stripe secret key，格式為 `sk_test_...` 或 `sk_live_...`，從 Stripe
  Dashboard 取得。
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  Stripe publishable key，格式為 `pk_test_...` 或 `pk_live_...`。
- `STRIPE_WEBHOOK_SECRET`
  Webhook signing secret，格式為 `whsec_...`。本機通常由 Stripe CLI
  `listen` 指令提供；正式環境由 Dashboard endpoint 提供。
- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
  月費方案的 recurring price id，格式為 `price_...`。
- `STRIPE_PRICE_ID_MEMBER_YEARLY`
  年費方案的 recurring price id，格式為 `price_...`。如果沒有開年費，
  可以留空，UI 就不會顯示年費訂閱按鈕。
- `ADMIN_EMAILS`
  逗號分隔 email 白名單，例如
  `you@example.com,second@example.com`。值來自你的營運 / 管理帳號列表。

### 可選或目前未啟用：保留變數

- `AUTH_DISABLE_PASSKEY`
  目前保留在 `.env.example`，但現行 auth code 尚未讀取它。把它視為保留位，
  不要當成已生效的 runtime 開關。
- `TINA_CLIENT_ID`
  TinaCMS client id。只有在你真的要啟用 TinaCMS workflow 時才需要。
- `NEXT_PUBLIC_TINA_CLIENT_ID`
  TinaCMS client id 的 public 版本。通常與 `TINA_CLIENT_ID` 相同。
- `TINA_TOKEN`
  TinaCMS token。只有在你要使用 Tina cloud workflow 時才需要。

## 本機開發

1. 安裝依賴：

   ```bash
   npm install
   ```

2. 建立本機 `.env`，填入至少：

   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXTAUTH_URL`
   - `APP_URL`
   - 一組 OAuth provider
   - Firebase Admin 三件組
   - Stripe keys 與至少月費 `price_...`

3. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

4. 打開：

   - `http://localhost:3000`
   - `http://localhost:3000/zh-hk/notes`
   - `http://localhost:3000/en/notes`

### 本機 webhook 測試

目前 webhook route 是：

- `/api/billing/webhook`

典型本機測法：

1. 啟動本機站點
2. 用 Stripe CLI 把事件轉送到：
   `http://localhost:3000/api/billing/webhook`
3. 把 CLI 顯示的 `whsec_...` 放進本機 `STRIPE_WEBHOOK_SECRET`
4. 觸發 checkout 或直接用 Stripe CLI 送測試事件

## 驗證與建置

常用命令：

```bash
npm run lint
npm run build
```

如果要做本機視覺驗證，通常也會先跑：

```bash
npm run dev
```

## 目前限制

- `reference/` 雖然已很大，但仍有不少後續章節未完全轉成公開 Notes
- `math1025` 已有內部骨架，但還沒有達到與 `math1090` / `math1030`
  同等完成度
- `math1010` 目前沒有對應 `reference/MATH1010/**`，只能預留架構
- 舊 docs 中仍有一部分早期模板 / Tina / migration 內容，未必完全反映
  當前 Notes-first 產品主線
- 本機 Stripe 測試需要正確配置 webhook forwarding 與 test keys

## 接下來的高價值工作

1. 依 `reference/` 繼續擴寫最缺的 source-backed 章節，優先
   `math1030` 的 determinants / eigenvalues / inner products
2. 繼續補齊薄弱單元的三語內容深度與匯出 QA
3. 讓 `math1025` 由骨架狀態進一步走向完整公開課程
4. 持續清理舊模板文檔，使所有 docs 都反映現在的 Notes-first 產品
