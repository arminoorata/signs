# SIGNS Toolkit (signs.arminoorata.com)

A free public diagnostic for HR and Total Rewards leaders, executives, and founders. Three modes:
Pressure Test a Decision, Understand What Happened, Spot the Pattern. Standalone Next.js app
deployed on Vercel.

## Reference docs (local-only, in `Docs/`)

1. `Docs/SIGNS-BRIEF.md` — single source of truth. Read this first.
2. `Docs/archive/` — superseded briefs. Reference only. Do not build from these.

## Sibling project

FAIR toolkit at `/srv/projects/fair/` — deploys to `fair.arminoorata.com`.
Design system, voice rules, and brand assets come from the main site at
`/srv/arminoorata.com/`. See `References/Final_PersonalWebsite_Brief.md`
there for site-wide conventions.

## Review gate

After any substantive change to briefs, copy, or code, run:

```bash
./review.sh <file>
```

This runs a project-standard Codex review against the given file.
