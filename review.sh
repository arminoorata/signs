#!/usr/bin/env bash
# Codex review wrapper for the SIGNS project.
#
# Runs a consistent, project-standard Codex review against any file
# (brief, copy draft, code). Use this at every phase gate.
#
# File contents are piped via stdin so Codex can review them without
# requiring sandboxed shell access.
#
# Usage:
#   ./review.sh path/to/file.md
#   ./review.sh src/components/SomeComponent.tsx

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <file>"
  echo ""
  echo "Runs Codex review against the given file using the project's standard review prompt."
  exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
  echo "Error: file not found: $FILE" >&2
  exit 1
fi

codex exec --dangerously-bypass-approvals-and-sandbox "Review $FILE thoroughly to ensure it fulfills the needs of the brief. Flag anything that feels weak, generic, or off-voice for both the copy and the code. Recommend any improvements as needed."
