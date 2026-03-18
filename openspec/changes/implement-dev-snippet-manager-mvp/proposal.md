## Why

這個專案在正式建立 OpenSpec 變更之前就已經先直接落到程式碼，因此目前缺少一份能夠描述範圍、需求與進度的結構化來源。現在需要補一個回補式的 OpenSpec change，把 MVP 的實際 contract、剩餘工作與目前完成度整理清楚，讓後續擴充有可追蹤的基線。

## What Changes

- 補文件化目前已完成的 MVP：GitHub + Google OAuth、database-backed sessions、protected dashboard，以及 user-owned snippet CRUD。
- 以 spec 形式定義 auth/session、snippet ownership、local development workflow，與未來部署到 Vercel + Supabase 的接縫策略。
- 補一份 tasks checklist，明確標示 repo 內哪些項目已完成、哪些項目仍待補強。
- 建立一個可驗證的 OpenSpec change，讓後續功能能走 apply / verify / archive 流程，而不是繼續用臨時追蹤方式維護。

## Capabilities

### New Capabilities
- `oauth-session-auth`: GitHub + Google OAuth 登入、資料庫 session、protected routes 與 logout 行為。
- `snippet-management`: 使用者自己的 snippet 清單、建立、編輯、刪除、驗證與 ownership enforcement。
- `local-dev-workflow`: 本機 PostgreSQL、migrations、Drizzle Studio、Makefile-based 開發流程，以及 Vercel + Supabase 部署接縫。

### Modified Capabilities
- 無。

## Impact

- 影響範圍包含 `app/`、`components/`、`lib/auth/`、`lib/db/`、`lib/snippets/`、`lib/validation/`、`drizzle/`、`Makefile` 與 `README.md`。
- 已引入的依賴包含 Auth.js v5 beta、`@auth/drizzle-adapter`、Drizzle ORM、`postgres` 與 `zod`。
- 這個 change 會成為後續驗證與 archive 的 TODO / checklist 基線。
