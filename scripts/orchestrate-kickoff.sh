#!/usr/bin/env bash
# Kick off cloud orchestration for Lesson Loom submission polish.
# Requires CURSOR_API_KEY (user key from https://cursor.com/dashboard/integrations)

set -euo pipefail

ORCH_DIR="${ORCH_DIR:-$HOME/.cursor/plugins/cache/cursor-public/orchestrate/6f2e0c63189ce3b661040153d82a32a2038560ba/skills/orchestrate/scripts}"

if [[ -z "${CURSOR_API_KEY:-}" ]]; then
  echo "Error: export CURSOR_API_KEY before running." >&2
  exit 1
fi

cd "$ORCH_DIR"
test -d node_modules || bun install

GOAL='Lesson Loom (lesson-loom-plan-to-playable): finish submission readiness — deploy public preview URL, close QA/a11y gaps in 08_QA_ACCEPTANCE_CHECKLIST.md, keep npm run verify green. Do not add backend/auth/AI. Preserve safe K-12 copy.'

bun cli.ts kickoff "$GOAL" \
  --repo https://github.com/Bwillia13x/lesson-loom-plan-to-playable.git \
  --ref main
