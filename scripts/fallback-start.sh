#!/usr/bin/env bash
# Start the self-hosted Toolshop fallback and put it in its seeded state.
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/fallback-common.sh"
cd "$ROOT_DIR"

echo "Starting the self-hosted Toolshop fallback..."
compose up -d --pull missing

seed_database
wait_for_http "http://localhost:8091/status" "API"
wait_for_http "http://localhost:4200/" "UI"

cat <<'EOF'

Fallback is running and seeded:
  UI:      http://localhost:4200
  API:     http://localhost:8091
  Swagger: http://localhost:8091/api/documentation
EOF
