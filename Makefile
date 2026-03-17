SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: help ensure-env install db-up db-wait db-down db-reset db-generate db-migrate db-studio dev lint build start stop

help: ## Show available make targets
	@awk 'BEGIN {FS = ":.*## "; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_.-]+:.*## / { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

ensure-env: ## Ensure .env exists before running app commands
	@test -f .env || (echo "Missing .env. Run 'cp .env.example .env' first." && exit 1)

install: ## Install project dependencies
	pnpm install

db-up: ## Start the local PostgreSQL container
	docker compose up -d postgres

db-wait: ## Wait until PostgreSQL is ready to accept connections
	@until docker compose exec -T postgres pg_isready -U postgres -d dev_snippet >/dev/null 2>&1; do \
		echo "Waiting for PostgreSQL..."; \
		sleep 1; \
	done
	@echo "PostgreSQL is ready."

db-down: ## Stop the PostgreSQL container
	docker compose stop postgres

db-reset: ## Recreate the PostgreSQL container and its data volume
	docker compose down -v
	docker compose up -d postgres

db-generate: ## Generate Drizzle migrations from the current schema
	pnpm db:generate

db-migrate: ensure-env db-up db-wait ## Apply existing Drizzle migrations
	pnpm db:migrate

db-studio: ensure-env db-up db-wait ## Launch Drizzle Studio
	pnpm db:studio

dev: ensure-env ## Start the Next.js development server
	pnpm dev

lint: ## Run ESLint
	pnpm lint

build: ## Run a production build with webpack
	pnpm exec next build --webpack

start: ensure-env db-up db-wait db-migrate ## Start DB, Drizzle Studio, and the Next.js app
	@echo "App:    http://localhost:3000"
	@echo "Studio: https://local.drizzle.studio or the URL printed by drizzle-kit"
	@trap 'trap - INT TERM EXIT; kill 0' INT TERM EXIT; \
		pnpm db:studio & \
		pnpm dev & \
		wait

stop: ## Stop docker services started for local development
	docker compose down
