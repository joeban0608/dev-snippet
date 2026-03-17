## ADDED Requirements

### Requirement: 專案支援本機 PostgreSQL 開發
系統 SHALL 提供以 Docker Compose 執行本機 PostgreSQL 的 workflow，且 repo 內需文件化預期的資料庫名稱與 credentials。

#### Scenario: 開發者啟動本機資料庫
- **WHEN** 開發者執行文件中的 Docker Compose 指令或對應的 Make target
- **THEN** 系統會啟動一個使用既定開發資料庫設定的本機 PostgreSQL instance

### Requirement: Schema 變更需透過 Drizzle migrations 追蹤
系統 SHALL 在 repo 中保留 Drizzle schema 定義與已提交的 SQL migrations，以支援本機開發。

#### Scenario: 開發者套用 migrations
- **WHEN** 開發者對本機資料庫執行 migration 指令
- **THEN** 系統會套用 repo 中已提交的 Drizzle migrations，使資料庫達到目前 schema 狀態

### Requirement: 專案需提供可重複的本機啟動流程
系統 SHALL 提供 `make start` workflow，負責啟動資料庫、等待 ready、套用 migrations，並同時啟動 Drizzle Studio 與 Next.js app。

#### Scenario: 開發者執行 make start
- **WHEN** 開發者在 `.env` 合法存在的情況下執行 `make start`
- **THEN** 系統會啟動 PostgreSQL、套用 migrations、啟動 Drizzle Studio，並啟動應用程式伺服器

### Requirement: 專案需提供可重複的本機停止流程
系統 SHALL 提供 `make stop` workflow，負責停止 app process、停止 Drizzle Studio，並清除本機 Docker stack 與 volume。

#### Scenario: 開發者執行 make stop
- **WHEN** 開發者執行 `make stop`
- **THEN** 系統會停止已追蹤的本機程序，並執行 `docker compose down -v`
