## Context

目前 repo 已同時支援 GitHub 與 Google OAuth，但 Auth.js 預設不會自動把不同 provider 的相同 email 帳號連到同一個 user。因此，只要某個 email 先透過其中一個 provider 建立過 user，另一個 provider 再登入時就會拋出 `OAuthAccountNotLinked`。這與專案目前提供雙 provider 登入入口的產品期待不一致。

## Goals / Non-Goals

**Goals:**
- 讓 GitHub 與 Google 在相同 email 下可以登入到同一個 user。
- 保持既有 session、route protection、sign-out 與 snippet ownership 行為不變。
- 用 OpenSpec 補上這個 auth contract，讓後續資料修復或 UI 提示能獨立演進。

**Non-Goals:**
- 不處理 production 既有資料清理、回補或 merge script。
- 不支援 GitHub / Google 以外的新 provider。
- 不新增「已綁定哪些 provider」的設定頁或 UI 呈現。

## Decisions

### 在 trusted providers 上啟用 Auth.js email account linking
- 在 GitHub 與 Google provider 設定加入 `allowDangerousEmailAccountLinking: true`。
- 之所以採這個方案，是因為改動最小，且足以滿足目前雙 provider 共用帳號的產品需求。
- 替代方案是保留預設行為並要求使用者固定使用第一次登入的 provider，但這會讓雙 provider 支援失去實際價值。

### 不修改資料表 schema 或 adapter 行為
- 現有 `account` table 已可讓同一 `user_id` 對應多個 provider records。
- 因此這次只需調整 provider linking policy，不需要 migration 或 custom adapter。
- 替代方案是自行實作 linking callbacks 或 merge logic，但在目前需求下屬於過度設計。

### 把 production data remediation 留作後續 change
- 既有 production 環境若已經因舊策略形成分裂帳號或測試資料，需要另外評估清理方式。
- 這次先修正未來登入行為，不把 live data 操作和 auth contract 變更混在一起。

## Risks / Trade-offs

- [相同 email 會跨 provider 自動 linking] → Mitigation: 僅對 GitHub 與 Google 這兩個 trusted providers 開啟，並明確記錄行為邊界。
- [既有 production 測試資料可能仍需人工整理] → Mitigation: 把資料修復明確留在後續 change，不在這次實作中隱性處理。
- [repo 目前缺少自動化 auth integration tests] → Mitigation: 先以 lint、build 與手動 provider flow 驗證，後續再補測試。

## Migration Plan

1. 更新 provider 設定，允許 GitHub / Google 依 email linking。
2. 部署後以新的登入流程驗證 GitHub 與 Google 可共用同一 user。
3. 若正式環境遇到既有測試資料衝突，再另外規劃資料清理或人工調整。

## Open Questions

- production 若已有為測試建立的 split account records，最終要採手動清理還是補一個 admin-only repair script？
