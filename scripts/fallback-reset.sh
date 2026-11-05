#!/usr/bin/env bash
# Reset the self-hosted Toolshop fallback to its seeded state.
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/fallback-common.sh"
cd "$ROOT_DIR"

echo "Resetting the self-hosted Toolshop fallback to its seeded state..."
compose up -d --pull missing

seed_database
wait_for_http "http://localhost:8091/status" "API"

echo "Fallback reset to the seeded state."
