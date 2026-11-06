#!/usr/bin/env bash
# Shared helpers for the self-hosted Toolshop fallback.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/fallback/docker-compose.yml"
LOG_DIR="${TMPDIR:-/tmp}/qa-live-evidence-fallback"
mkdir -p "$LOG_DIR"

compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

# Wait for MariaDB, then drop and re-create the schema from the upstream
# seed. Retried because the API container can start before MariaDB accepts
# connections even with the Compose health check.
seed_database() {
  local attempt=1
  local log="$LOG_DIR/seed.log"

  echo "Seeding the fallback database (php artisan migrate:fresh --seed)..."
  while [ "$attempt" -le 90 ]; do
    if compose exec -T laravel-api php artisan migrate:fresh --seed --force >"$log" 2>&1; then
      echo "Database seeded."
      return 0
    fi
    attempt=$((attempt + 1))
    sleep 2
  done

  echo "Failed to seed the fallback after 90 attempts. Last output:" >&2
  tail -n 80 "$log" >&2 || true
  compose ps >&2 || true
  return 1
}

wait_for_http() {
  local url="$1"
  local name="$2"
  local attempt=1

  while [ "$attempt" -le 120 ]; do
    if curl -fsS -o /dev/null "$url" 2>/dev/null; then
      echo "$name is ready at $url"
      return 0
    fi
    attempt=$((attempt + 1))
    sleep 2
  done

  echo "$name did not become ready at $url" >&2
  compose ps >&2 || true
  compose logs --tail=40 laravel-api web angular-ui >&2 || true
  return 1
}
