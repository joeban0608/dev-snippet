## 1. Auth 與受保護路由

- [x] 1.1 建立 Auth.js v5 GitHub provider、Drizzle adapter 與 database session 設定
- [x] 1.2 建立 `/`、`/login`、`/api/auth/[...nextauth]` 與 dashboard protected layout
- [x] 1.3 實作 sign-in / sign-out action，並在公開頁與受保護頁之間做正確導向

## 2. Snippet domain 與 ownership

- [x] 2.1 建立 `user`、`account`、`session`、`verification_token`、`snippet` 的 Drizzle schema 與 migration
- [x] 2.2 實作 dashboard snippet list、empty state 與 owner-only query
- [x] 2.3 以 server actions + Zod 完成 snippet create / update / delete flow
- [x] 2.4 在 edit / delete 路徑中以 `snippetId + userId` 實作 ownership enforcement
- [ ] 2.5 補 auth / validation / ownership 路徑的自動化測試

## 3. 本機開發流程與硬化

- [x] 3.1 補 Docker Compose、`.env.example`、README 與 Drizzle config
- [x] 3.2 建立 `make help`、`make start`、`make stop` 與相關本機 workflow targets
- [x] 3.3 修正 `account.expires_at` migration cast 問題，讓既有 migration 可重跑
- [ ] 3.4 以真實 GitHub OAuth credentials 完整驗證一次本機登入與 CRUD 流程
- [ ] 3.5 決定 archive 前是否要將目前 migration history 壓成單一乾淨 baseline
