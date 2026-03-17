## ADDED Requirements

### Requirement: 使用者只能看到自己的 snippets
系統 SHALL 只列出目前 authenticated user 的 snippets，且 SHALL 不在 dashboard 暴露其他使用者的 snippets。

#### Scenario: 已登入使用者打開 dashboard
- **WHEN** 已登入使用者請求 `/dashboard`
- **THEN** 系統會以該使用者 identifier 作為查詢條件取得 snippets，並只渲染該結果

#### Scenario: 已登入使用者目前沒有 snippets
- **WHEN** 已登入使用者請求 `/dashboard`，且沒有任何自己擁有的 snippets
- **THEN** 系統會渲染帶有 create action 的 empty state

### Requirement: 使用者可以透過 server action 建立 snippet
系統 SHALL 允許已登入使用者透過 server action 建立 snippet，且 `title` 與 `content` 為必填欄位，`language` 與 `description` 為選填欄位。

#### Scenario: 合法的 snippet 建立
- **WHEN** 已登入使用者提交合法的 snippet form data
- **THEN** 系統會驗證 payload、寫入一筆屬於該使用者的新 snippet，並導向 snippet 編輯頁

#### Scenario: 不合法的 snippet 建立
- **WHEN** 已登入使用者提交不合法的 snippet form data
- **THEN** 系統會拒絕該提交、回傳 validation errors，且不會寫入任何 snippet record

### Requirement: 使用者只能編輯自己擁有的 snippets
系統 SHALL 只在目標 snippet 屬於目前 authenticated user 時允許更新。

#### Scenario: 擁有者更新 snippet
- **WHEN** 已登入擁有者對既有且屬於自己的 snippet 提交合法更新資料
- **THEN** 系統會保存變更，並刷新相關 dashboard 與 edit views

#### Scenario: 非擁有者嘗試編輯 snippet
- **WHEN** 已登入使用者請求或提交更新另一位使用者擁有的 snippet
- **THEN** 系統不會暴露該筆資料，並拒絕該操作

### Requirement: 使用者只能刪除自己擁有的 snippets
系統 SHALL 只在目標 snippet 屬於目前 authenticated user 時執行刪除。

#### Scenario: 擁有者刪除 snippet
- **WHEN** 已登入擁有者對自己擁有的 snippet 提交 delete action
- **THEN** 系統會移除該 snippet，並導向 dashboard

#### Scenario: 非擁有者嘗試刪除 snippet
- **WHEN** 已登入使用者對另一位使用者擁有的 snippet 提交 delete action
- **THEN** 系統會維持資料不變，且不暴露敏感的存在資訊

### Requirement: Snippet 輸入必須在 server 端驗證
系統 SHALL 在任何 create 或 update 寫入資料庫之前，先使用 Zod 在 server 端驗證 snippet 輸入。

#### Scenario: 缺少必填欄位
- **WHEN** snippet mutation 提交時沒有非空的 `title` 或 `content`
- **THEN** 系統會回傳 validation errors 並拒絕寫入

#### Scenario: 選填欄位為空白
- **WHEN** snippet mutation 提交了空白的 `language` 或 `description`
- **THEN** 系統會把這些欄位正規化成 optional value，而不是讓驗證失敗
