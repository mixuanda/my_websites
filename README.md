# 數學 Notes 網站（含會員訂閱）

本專案已不再是通用個人網站樣板，而是一個放在網站 **Notes** 區域中的嚴謹數學筆記系統，主軸課程為：

- `MATH1090`
- `MATH1030`

並已在架構上預留未來課程擴充（例如 `MATH1025`、`MATH1010`）。

---

## 1. 專案定位

- 公開產品入口仍是網站既有 **Notes** 區域。
- 內容以「課本式、嚴謹、可持續擴寫」為原則。
- 每個章節/小節都是可獨立閱讀的 note page。
- 互動元件只在有助理解時使用，避免做成遊戲化學習 app。

---

## 2. 存取與會員模型（Free / Member / Admin）

### Free
- 可閱讀公開核心筆記。
- 可使用部分 quick checks 與部分例題。

### Member（Stripe 訂閱）
- 可閱讀進階筆記單元（premium 單元）。
- 可使用進階 checkpoint、更多例題與引導式解答。
- 可進入會員內容的 API 路徑（伺服器端判斷）。

### Admin（伺服器白名單）
- 由 `ADMIN_EMAILS` 決定。
- 不需付款，自動擁有完整權限。
- 以**伺服器端 entitlement 檢查**生效，不是只隱藏前端按鈕。

---

## 3. Stripe 訂閱整合摘要

目前為 Stripe Billing 訂閱流程（非一次性付款）：

1. 前端在 `Notes Membership` 頁面發起 checkout。
2. 後端建立 `mode=subscription` 的 Checkout Session。
3. 成功/取消回到網站對應頁面。
4. Webhook 驗簽後同步會員狀態到使用者資料。
5. 會員可開啟 Stripe Customer Portal 管理付款方式與取消。

詳細部署設定請看：
- 中文：`docs/stripe-deployment.zh-HK.md`
- English: `docs/stripe-deployment.en.md`

---

## 4. 必要環境變數

> 請勿把真實 key/secret 寫入 Git。部署時於平台環境變數設定。

### Stripe / 會員
- `STRIPE_SECRET_KEY`
  - Stripe 後端 API 金鑰，格式 `sk_live_...`（測試環境可 `sk_test_...`）。
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - Stripe 前端 publishable key，格式 `pk_live_...`（或 `pk_test_...`）。
- `STRIPE_WEBHOOK_SECRET`
  - Webhook endpoint 簽章密鑰，格式 `whsec_...`。
- `STRIPE_PRICE_ID_MEMBER_MONTHLY`
  - 月費方案 Price ID，格式 `price_...`。
- `STRIPE_PRICE_ID_MEMBER_YEARLY`
  - 年費方案 Price ID，格式 `price_...`；若未啟用年費可留空。
- `APP_URL`
  - 站點正式網址，例如 `https://your-domain.com`。
- `ADMIN_EMAILS`
  - 伺服器端管理員 email 白名單，逗號分隔。

### Auth / Session
- `AUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SITE_URL`
- OAuth 相關變數（若啟用第三方登入）：
  - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

### Firebase（若使用）
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

完整範例請見 `.env.example`。

---

## 5. 本機啟動

```bash
npm install
npm run dev
```

預設開發網址：`http://localhost:3000`

---

## 6. 建置與驗證

```bash
npm run lint
npm run build
```

如遇非本次改動造成的既有問題，請參考終端輸出與既有 docs 紀錄。

---

## 7. 內容撰寫與擴充

- Notes 內容位於 `content/textbook/**`。
- 課程/章節/單元 metadata 位於 `src/lib/textbook/catalog.ts`。
- 題型與 checkpoint 題庫位於 `src/lib/textbook/problem-bank.ts`。
- 參考資料來源以 `reference/**` 為準。
- 覆蓋追蹤在 `docs/reference-coverage.md`。

撰寫原則：
- 嚴謹、完整、逐步推理。
- 清楚區分定義、定理、例題、常見錯誤、練習與引導解答。
- 不捏造超出 `reference/` 支持的課程內容。

---

## 8. 現有限制

- Stripe webhook 的真實狀態同步需在部署平台綁定公開 endpoint 才能完整驗證。
- 部分會員頁面文案目前先以英文為主，後續會補齊三語一致性。
- `reference/` 仍有後續章節待持續消化為公開筆記內容。

---

## 9. Roadmap（短期）

1. 將會員中心與付款文案完整本地化（EN / 繁中 / 簡中）。
2. 把 premium checkpoint 擴到更多單元並維持解答一致性。
3. 逐步消化 `reference/` 未完成章節（含未來課程）。
4. 強化匯出（TXT/PDF）對互動區塊的靜態轉換品質。

