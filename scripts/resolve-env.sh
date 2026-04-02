#!/bin/bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load .env
if [ -f "$ROOT/.env" ]; then
  set -a; source "$ROOT/.env"; set +a
fi

if [ -z "${AGENTBUDDY_ROOT:-}" ]; then
  echo "Error: AGENTBUDDY_ROOT not set. Create .env from .env.example"
  exit 1
fi

if [ ! -d "$AGENTBUDDY_ROOT/packages/api" ]; then
  echo "Error: $AGENTBUDDY_ROOT does not contain packages/api/"
  exit 1
fi

AB_API="$AGENTBUDDY_ROOT/packages/api"
AB_DEFS_OUT="$AB_API/defs/dist/scratchpad"
AB_SEED_DATA="$AB_API/src/setup/seed/data"
