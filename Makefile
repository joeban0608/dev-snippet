SHELL := /bin/bash
.DEFAULT_GOAL := help
ENV_FILE ?= .env
ENV_NAME := $(notdir $(ENV_FILE))
PID_DIR := .make/$(ENV_NAME)
APP_PID_FILE := $(PID_DIR)/app.pid
STUDIO_PID_FILE := $(PID_DIR)/studio.pid

.PHONY: help ensure-env install db-up db-wait db-down db-reset db-prepare db-generate db-migrate db-studio dev lint build start stop stop-services clean-pids

help: ## Show available make targets
	@awk 'BEGIN {FS = ":.*## "; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_.-]+:.*## / { printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@printf "\nEnv override:\n  ENV_FILE=.env.production make \033[36mdb-migrate\033[0m\n"

ensure-env: ## Ensure the selected env file exists before running commands
	@test -f $(ENV_FILE) || (echo "Missing $(ENV_FILE)." && exit 1)

install: ## Install project dependencies
	pnpm install

db-up: ## Start the local PostgreSQL container
	docker compose up -d postgres

db-wait: ## Wait until PostgreSQL is ready to accept connections
	@until docker compose exec -T postgres pg_isready -U postgres -d local >/dev/null 2>&1; do \
		echo "Waiting for PostgreSQL..."; \
		sleep 1; \
	done
	@echo "PostgreSQL is ready."

db-down: ## Stop the PostgreSQL container
	docker compose stop postgres

db-reset: ## Recreate the PostgreSQL container and its data volume
	docker compose down -v
	docker compose up -d postgres

db-prepare: ensure-env ## Prepare database access for the selected env file
	@if [ "$(ENV_FILE)" = ".env" ]; then \
		$(MAKE) db-up; \
		$(MAKE) db-wait; \
	else \
		echo "Skipping local PostgreSQL bootstrap for ENV_FILE=$(ENV_FILE)"; \
	fi

db-generate: ## Generate Drizzle migrations from the current schema
	@set -a; source $(ENV_FILE); set +a; pnpm db:generate

db-migrate: db-prepare ## Apply existing Drizzle migrations
	@set -a; source $(ENV_FILE); set +a; pnpm db:migrate

db-studio: db-prepare ## Launch Drizzle Studio
	@set -a; source $(ENV_FILE); set +a; pnpm db:studio

dev: ensure-env ## Start the Next.js development server
	@set -a; source $(ENV_FILE); set +a; pnpm dev

lint: ## Run ESLint
	pnpm lint

build: ## Run a production build with webpack
	@set -a; source $(ENV_FILE); set +a; pnpm exec next build --webpack

start: db-migrate ## Start DB, Drizzle Studio, and the Next.js app
	@mkdir -p $(PID_DIR)
	@if [ -f $(APP_PID_FILE) ] || [ -f $(STUDIO_PID_FILE) ]; then \
		echo "Existing PID files found. Run 'make stop' first if the stack is already running."; \
		exit 1; \
	fi
	@echo "Env:    $(ENV_FILE)"
	@echo "App:    http://localhost:3000"
	@echo "Studio: https://local.drizzle.studio or the URL printed by drizzle-kit"
	@trap '$(MAKE) stop-services' INT TERM EXIT; \
		(set -a; source $(ENV_FILE); set +a; pnpm db:studio > $(PID_DIR)/studio.log 2>&1) & echo $$! > $(STUDIO_PID_FILE); \
		(set -a; source $(ENV_FILE); set +a; pnpm dev > $(PID_DIR)/app.log 2>&1) & echo $$! > $(APP_PID_FILE); \
		wait $$(cat $(STUDIO_PID_FILE)) $$(cat $(APP_PID_FILE))

stop-services: ## Stop app and studio processes recorded by make start
	@if [ -f $(APP_PID_FILE) ]; then \
		kill $$(cat $(APP_PID_FILE)) >/dev/null 2>&1 || true; \
		rm -f $(APP_PID_FILE); \
	fi
	@if [ -f $(STUDIO_PID_FILE) ]; then \
		kill $$(cat $(STUDIO_PID_FILE)) >/dev/null 2>&1 || true; \
		rm -f $(STUDIO_PID_FILE); \
	fi

clean-pids: ## Remove stale PID files
	rm -f $(APP_PID_FILE) $(STUDIO_PID_FILE)

stop: stop-services ## Stop app, Drizzle Studio, and remove local Docker data
	docker compose down -v
