#!/usr/bin/env bash
# Stop the fallback containers. Images and named volumes are kept.
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/fallback-common.sh"
cd "$ROOT_DIR"

echo "Stopping the self-hosted Toolshop fallback (images and volumes are kept)..."
compose down
