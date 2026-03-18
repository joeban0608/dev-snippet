## ADDED Requirements

### Requirement: 相同 email 的 GitHub 與 Google 登入應連到同一個 user
系統 SHALL 允許 GitHub 與 Google 這兩個已配置的 OAuth providers 在 email 相同時共用同一個 user，而不因 provider 不同而拒絕登入。

#### Scenario: 先以 GitHub 建立帳號，再以 Google 登入
- **WHEN** 使用者已透過 GitHub 建立 user，且之後以相同 email 的 Google 帳號登入
- **THEN** 系統會讓該 Google account 連到既有 user，並建立 authenticated session

#### Scenario: 先以 Google 建立帳號，再以 GitHub 登入
- **WHEN** 使用者已透過 Google 建立 user，且之後以相同 email 的 GitHub 帳號登入
- **THEN** 系統會讓該 GitHub account 連到既有 user，並建立 authenticated session

### Requirement: 不同 email 的 OAuth 帳號不得被自動合併
系統 SHALL 只在 trusted OAuth providers 回傳相同 email 時進行 linking，並 SHALL 保持不同 email 的 user records 分離。

#### Scenario: 不同 email 的 provider 登入
- **WHEN** 使用者以不同 email 的 GitHub 或 Google 帳號登入
- **THEN** 系統不會把該帳號連到其他 user，並維持帳號分離
