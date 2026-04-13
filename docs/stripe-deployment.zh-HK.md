# Stripe 訂閱部署指南（繁中）

本文說明如何把本專案的會員訂閱（Free / Member / Admin）在正式環境接通。

## A. 在 Stripe 建立產品與價格

1. 到 Stripe Dashboard → Product catalog。
2. 建立產品（例如 `Notes Membership`）。
3. 建立至少一個 recurring price：
   - 月費：`STRIPE_PRICE_ID_MEMBER_MONTHLY` 對應 `price_...`
4. 如要年費，再建另一個 recurring price：
   - 年費：`STRIPE_PRICE_ID_MEMBER_YEARLY` 對應 `price_...`

## B. 設定環境變數（部署平台）

請在 Vercel/Netlify/自託管平台設定：

- `STRIPE_SECRET_KEY`：Stripe secret key（`sk_live_...`）
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`：publishable key（`pk_live_...`）
- `STRIPE_PRICE_ID_MEMBER_MONTHLY`：月費 price id（`price_...`）
- `STRIPE_PRICE_ID_MEMBER_YEARLY`：年費 price id（可選）
- `STRIPE_WEBHOOK_SECRET`：Webhook signing secret（`whsec_...`）
- `APP_URL`：正式站點 URL（例：`https://your-domain.com`）
- `ADMIN_EMAILS`：管理員白名單（逗號分隔）

## C. 建立 Webhook Endpoint

1. Stripe Dashboard → Developers → Webhooks。
2. 新增 endpoint：
   - `https://your-domain.com/api/billing/webhook`
3. 事件至少勾選：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. 複製 `Signing secret`（`whsec_...`）填入 `STRIPE_WEBHOOK_SECRET`。

## D. 本地測試流程

1. 啟動本機：`npm run dev`
2. 建議使用 Stripe CLI 轉送 webhook：
   - `stripe listen --forward-to localhost:3000/api/billing/webhook`
3. 將 CLI 顯示的 `whsec_...` 暫填到 `.env.local`。
4. 在 `/notes/membership` 發起 checkout，確認成功頁與 webhook 更新。

## E. Admin bypass 驗證

1. 登入一個 email 並加入 `ADMIN_EMAILS`。
2. 該帳號應可直接讀取 premium 單元與 premium checkpoint。
3. 驗證 API：premium 題目提交不應被 403 擋下。

## F. 常見問題

- 問：顯示成功頁但仍是 Free？
  - 答：通常是 webhook 未成功送達或 `STRIPE_WEBHOOK_SECRET` 錯誤。
- 問：Customer portal 開不起來？
  - 答：代表該用戶未建立 Stripe customer / membership record 尚未同步。
- 問：Admin 看不到完整內容？
  - 答：檢查 `ADMIN_EMAILS` 是否逗號分隔且 email 大小寫一致（系統會轉小寫比對）。
