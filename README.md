# OSRS Ledger — Test Candidate

A local-first OSRS progress tracker built from the OSRS Ledger context pack.

## Working in v2
- All 24 skills, including Sailing
- Per-player saved skill targets
- XP-to-target calculations
- Train dashboard with editable XP/hour estimates
- Goals CRUD + completion state
- Custom Collection Log foundation
- JSON profile backup / restore
- Live Wise Old Man player snapshot integration
- Training Planner with estimated hours
- Responsive desktop/mobile UI
- Rust/WASM validation boundary remains scaffolded under `rust/osrs-core`

## Live data
Player lookup uses the Wise Old Man v2 player endpoint and validates that all 24 skills, including Sailing, are present before replacing the current snapshot. Saved goals and targets remain local and independent from live stats.

## Run
```bash
npm install
npm run dev
```

## Verify
```bash
npm test
npm run build
```
