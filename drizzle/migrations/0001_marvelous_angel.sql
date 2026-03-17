ALTER TABLE "account"
ALTER COLUMN "expires_at" SET DATA TYPE integer
USING EXTRACT(EPOCH FROM "expires_at")::integer;
