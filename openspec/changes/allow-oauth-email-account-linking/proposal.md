## Why

Google OAuth 已經加入專案，但目前 Auth.js 維持預設行為：同一個 email 若先透過 GitHub 建立 user，再改用 Google 登入時會被擋下並回傳 `OAuthAccountNotLinked`。這會讓雙 provider 支援停留在表面，使用者實際上仍被綁死在第一次登入使用的 provider。

## What Changes

- 允許 GitHub 與 Google 這兩個 trusted OAuth providers 依 email 自動 linking 到同一個 user。
- 保持既有 database session、protected routes、sign-out 與 ownership enforcement 行為不變。
- 補文件化這個新 auth contract，明確說明 linking 範圍與不處理的資料修復邊界。

## Capabilities

### New Capabilities
- `oauth-account-linking`: 定義 GitHub 與 Google 在相同 email 下共用同一個 user 的登入行為。

### Modified Capabilities

## Impact

- 影響 `lib/auth/auth-config.ts` 的 provider 設定。
- 影響 `README.md` 與相關 OpenSpec auth 文件，需同步說明跨 provider email linking 行為。
- 不新增依賴、不修改資料表 schema，也不在這次 change 中處理 production 既有資料修復。
