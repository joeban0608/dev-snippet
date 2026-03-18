## ADDED Requirements

### Requirement: 使用者可以透過 GitHub 或 Google OAuth 驗證
系統 SHALL 在公開頁面提供 GitHub 與 Google sign-in 入口，並使用設定好的 provider 與 Auth.js 建立 authenticated session。

#### Scenario: 未登入使用者從公開頁面登入
- **WHEN** 未登入使用者在 `/` 或 `/login` 提交 GitHub 或 Google sign-in action
- **THEN** 系統會啟動對應的 OAuth flow，並在成功後把使用者導向 authenticated application

### Requirement: 受保護的應用路由需要有效 session
系統 SHALL 在渲染受保護的 dashboard routes 之前執行 server-side session 檢查。

#### Scenario: 未登入使用者請求 dashboard
- **WHEN** 沒有有效 session 的使用者請求 `/dashboard` 或其子路由
- **THEN** 系統會把該請求導向 `/login`

#### Scenario: 已登入使用者請求 dashboard
- **WHEN** 具有有效 session 的使用者請求 `/dashboard`
- **THEN** 系統會渲染受保護的 dashboard 內容

### Requirement: 公開 auth 路由應避免重複登入流程
系統 SHALL 把已登入使用者從公開登入入口導向到已登入區域。

#### Scenario: 已登入使用者打開 landing page
- **WHEN** 已登入使用者請求 `/`
- **THEN** 系統會把使用者導向 `/dashboard`

#### Scenario: 已登入使用者打開 login page
- **WHEN** 已登入使用者請求 `/login`
- **THEN** 系統會把使用者導向 `/dashboard`

### Requirement: 使用者可以結束自己的 session
系統 SHALL 提供 sign-out action，使目前 session 失效並把使用者帶回公開頁面。

#### Scenario: 已登入使用者登出
- **WHEN** 已登入使用者提交 sign-out action
- **THEN** 系統會結束目前 session，並把使用者導向 `/`
