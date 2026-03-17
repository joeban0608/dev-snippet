## Context

目前 repo 已經有一版可運作的 Next.js 16 App Router MVP，用途是做開發者 snippet manager，但整體實作是在還沒建立任何 OpenSpec artifacts 的情況下先完成的。現有程式碼橫跨 public / protected routes、Auth.js 驗證、Drizzle ORM schema / migrations、server actions，以及本地開發 workflow helper。由於 authentication、session storage 與 ownership 檢查都屬於跨模組關注點，所以需要先把這一版的設計邊界補文件化，避免後續擴充時失焦。

## Goals / Non-Goals

**Goals:**
- 把目前這版 MVP 架構保存成後續演進的 baseline contract。
- 讓 auth、authorization、validation 與 persistence 邏輯維持 server-first 且責任清楚。
- 定義 App Router 頁面、shared libraries 與 local development tooling 的責任分界。
- 記錄在此 change 完成前仍需要補強的項目。

**Non-Goals:**
- 不納入 tags、search、admin roles、sharing、public/private visibility。
- 不額外加入超過目前 `lib/*` domain split 的 repository / service abstraction。
- 不在 MVP 階段擴充成 GitHub 以外的 auth provider 策略。
- 不把 Drizzle Studio 或本機 Docker workflow 改成 hosted database workflow。

## Decisions

### 使用 Auth.js + database session + Drizzle adapter
- 之所以這樣選，是因為這個專案的目標本來就不只是做 OAuth 登入，而是要實際練習 session 管理。
- database-backed session 可以讓 auth model 與 PostgreSQL-backed snippet data model 保持一致。
- 替代方案是 JWT session，但最後不採用，因為它會降低 session 管理的練習價值，也會讓 auth state 與資料庫模型分離。

### 把 authorization 留在 server 端
- Protected routes 透過 dashboard layout 與 auth helper 的 server-side session check 進行保護。
- Snippet read / mutation 一律同時以 `snippetId` 與 `userId` 作為 scope。
- 替代方案是依賴 middleware 或 client-side session check，但最後不採用，因為 UI gating 無法真正保證 ownership enforcement。

### 以 server actions 作為 snippet mutation 唯一入口
- Create、update、delete 全部走 `lib/snippets/actions.ts`。
- Zod validation 在 server action 中先執行，任何不合法資料都不會寫入資料庫。
- 替代方案是混用 route handlers 與 server actions，但最後不採用，因為 MVP 階段應該優先保持 mutation 模型單純且可追蹤。

### 依 route / UI / domain layer 做責任切分
- `app/` 負責 route composition 與 route protection。
- `components/` 負責呈現層 UI 與 form wiring。
- `lib/auth`、`lib/db`、`lib/snippets`、`lib/validation` 負責基礎設施與 domain logic。
- 這樣可以讓 codebase 在維持清楚分層的同時，不需要引入多餘抽象層。

### 支援 local-first development workflow
- PostgreSQL 由 Docker Compose 提供。
- Drizzle migrations 直接納入版本控制。
- Make targets 包裝常見生命週期：啟動 DB、等待 ready、套 migration、啟動 Studio、啟動 app，以及完整停止整套本地流程。

## Risks / Trade-offs

- [Auth.js v5 beta 仍有版本面風險] → Mitigation: 把 auth wiring 集中在 `lib/auth/*`，並在 archive 前以真實 GitHub OAuth credentials 驗證一次。
- [Migration 歷史已包含一個修正型 follow-up migration] → Mitigation: 先保留目前已修正版本，之後再決定 archive 前是否要 squash 成乾淨 baseline。
- [auth / ownership 路徑目前沒有自動化測試] → Mitigation: 把測試補齊列成明確剩餘任務，避免誤判 MVP 已完成。
- [local workflow 依賴 Docker 與環境變數] → Mitigation: 持續讓 `.env.example`、`README.md` 與 `Makefile` 保持一致，降低 setup 偏差。

## Migration Plan

1. 複製 `.env.example` 為 `.env`，填入 GitHub OAuth credentials 與 `DATABASE_URL`。
2. 用 Docker Compose 啟動本機 PostgreSQL。
3. 套用已納入 repo 的 Drizzle migrations。
4. 透過 `make start` 或對應手動指令啟動 Drizzle Studio 與 Next.js app。
5. 在繼續做下一步功能之前，先驗證 GitHub login、dashboard protection、snippet CRUD，以及 owner-only access。

這個階段的 rollback 相對單純：停止本機 stack 並移除 Docker volume 即可，因為目前 workflow 主要還是針對本地 MVP 開發，不是 production deployment。

## Open Questions

- 在 archive 之前，是否要先把 migration history squash 成單一乾淨 baseline？
- 在 MVP 視為完成前，最少需要補到什麼程度的自動化測試：integration-only，還是一條最小 end-to-end flow？
- 後續若擴充功能，snippet viewing 與 editing 是否要拆頁，還是暫時保留單頁編輯模型？
