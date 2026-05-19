#!/usr/bin/env bash
# Run `next dev` with reliable child cleanup.
#
# Next.js spawns SWC compilation workers via jest-worker. Those children do
# not set PR_SET_PDEATHSIG, so if the parent is killed harshly (SIGKILL,
# terminal disappears, OOM-kill) they get reparented to PID 1 and idle there
# indefinitely. After a few crashed dev sessions this can leak hundreds of
# node processes and exhaust system memory.
#
# This wrapper:
#   1. Sweeps any leftover workers from a prior run of THIS project's path.
#   2. Spawns `next` as a tracked child and forwards SIGINT/SIGTERM.
#   3. On exit, kills any survivors in our process subtree as a final sweep.

set -u

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NEXT_PATH_PREFIX="$PROJECT_DIR/node_modules/next/dist/"

stale=$(pgrep -f "$NEXT_PATH_PREFIX" 2>/dev/null || true)
if [ -n "$stale" ]; then
  count=$(echo $stale | wc -w)
  echo "[dev.sh] cleaning $count stale next worker(s) from prior run" >&2
  kill $stale 2>/dev/null || true
  sleep 1
  kill -9 $stale 2>/dev/null || true
fi

export NODE_OPTIONS="${NODE_OPTIONS:-} --max-old-space-size=1536"

next_bin="$PROJECT_DIR/node_modules/.bin/next"
if [ ! -x "$next_bin" ]; then
  echo "[dev.sh] $next_bin not found — run \`pnpm install\` first" >&2
  exit 1
fi

"$next_bin" "$@" &
child=$!

cleanup() {
  trap - INT TERM EXIT
  kill -TERM "$child" 2>/dev/null || true
  for _ in 1 2 3 4 5; do
    kill -0 "$child" 2>/dev/null || break
    sleep 1
  done
  pkill -P $$ 2>/dev/null || true
  pkill -9 -f "$NEXT_PATH_PREFIX" 2>/dev/null || true
}
trap cleanup INT TERM EXIT

wait "$child"
exit $?
