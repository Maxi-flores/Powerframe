# 1. UNIFIED REPOSITORY & PROJECT WORKSPACE TOPOLOGY

## Global Monorepo Axis Layout

```
Powerframe-Monorepo/
├── powerframe-gms/    # Game Manager System central shell architecture
├── powerframe-crm/    # Customer Relation Manager operations portal
├── powerframe-wms/    # Wealth Manager System economic portfolio
└── TimePlanner/       # Time Planner roadmap simulation ticks workspace
```

- `powerframe-gms/`: unified shell | auth gate | navigation spine | glass chrome
- `powerframe-crm/`: customer operations | ticket flow | escalation relay | SLA telemetry
- `powerframe-wms/`: economic telemetry | portfolio state | ledger signals | risk pulse
- `TimePlanner/`: tick simulator | roadmap cadence | temporal rules | sync clock

## Workspace Coordination Table

| Workspace | Primary Role | Shell Ownership | Cross-App Contract | Runtime Boundary |
|---|---|---|---|---|
| `powerframe-gms/` | Command hub | Full shell | Layout + auth gate | Global nav frame |
| `powerframe-crm/` | Customer ops | Delegated | Event escalation | Isolated stores |
| `powerframe-wms/` | Economic telemetry | Delegated | Metric stream | High-frequency feeds |
| `TimePlanner/` | Timeline simulation | Delegated | Tick cadence | Discrete clock |

## Hub Unification Contract

- **Glassmorphic shell layout**: GMS owns translucent chrome; blur layers; persistent rails
- **Synchronization bridges**: cross-app event frames aligned to hub clock; mirror-only propagation; relay guardrails
- **Boundary control**: shared identifiers brokered by GMS; domain data stays local; scope locks enforced
- **Viewport delegation paths**: routed views mount inside shell slots; no cross-portal logic bleed; outlet isolation

# 2. COMPREHENSIVE DIRECTORY LAYOUT SPECIFICATION

## powerframe-gms/ Workspace Tree

```
powerframe-gms/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── api/
│   ├── health.js
│   └── auth/
│       ├── login.js
│       ├── register.js
│       └── me.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── firebase.js
│   ├── config/
│   │   └── apps.js
│   ├── assets/
│   │   ├── symbol_logo.png
│   │   ├── symbol_logo_small.png
│   │   └── symbol_splash_powerframe_logo.png
│   ├── components/
│   │   ├── Copilot.jsx
│   │   └── KnowledgeTree3D.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── context/
│   │   ├── LiveStreamContext.jsx
│   │   ├── ProjectContext.jsx
│   │   └── ThemeContext.jsx
│   └── pages/
│       ├── Landing.jsx
│       ├── Login.jsx
│       ├── Overview.jsx
│       ├── Projects.jsx
│       ├── Tasks.jsx
│       ├── Plans.jsx
│       ├── Out.jsx
│       ├── WebSearch.jsx
│       ├── Files.jsx
│       ├── Info.jsx
│       ├── Notifications.jsx
│       ├── Profile.jsx
│       ├── Settings.jsx
│       └── Management.jsx
├── Concepts/
│   ├── GMS_Login.js
│   └── GMS_Register.js
└── tools/
    └── PROMPT_fix_vite_subpath_routing
```

## Layout Role Index

| Node | Classification | Primary Duty | Coupling Constraints |
|---|---|---|---|
| `index.html` | Root entry | SPA mount + preloads | Runtime core only |
| `package.json` | Dependency graph | Runtime + toolchain | Build-time coupling |
| `vite.config.js` | Build control | HMR, bundling, base path | Build-only |
| `tailwind.config.js` | Theme system | Glass tokens, palette grid | Styling core |
| `postcss.config.js` | CSS pipeline | Vendor prefix + transforms | Build-only |
| `vercel.json` | Edge routing | SPA rewrites, function map | Deploy-only |
| `api/` | Serverless layer | Auth + health endpoints | Stateless boundary |
| `src/main.jsx` | Execution root | React mount + providers | Critical path |
| `src/App.jsx` | Router gate | Route spine + guards | Critical path |
| `src/assets/*` | Asset pack | Shell imagery + marks | Read-only |
| `components/*` | UI modules | Shell widgets + tools | Leaf-only |
| `layouts/DashboardLayout.jsx` | Shell core | Frame + outlet + rails | GMS-owned |
| `context/*` | State core | Shared in-memory state | Local-only |
| `pages/*` | View modules | Route-bound surfaces | Viewport-only |
| `Concepts/` | Legacy refs | Deprecated auth prototypes | No runtime use |
| `tools/` | Utilities | Maintenance aids | Dev-only |

# 3. STRUCTURAL ROUTING MATRIX (REACT ROUTER V7)

## Router Spine Paths

```
/               → Landing (public)
/gms-login      → Operator login (public)
/gms            → DashboardLayout (protected shell)
  ├── /gms                 → Overview
  ├── /gms/projects        → Projects
  ├── /gms/tasks           → Tasks
  ├── /gms/plans           → Plans
  ├── /gms/out             → Out
  ├── /gms/search          → WebSearch
  ├── /gms/files           → Files
  ├── /gms/info            → Info
  ├── /gms/notifications   → Notifications
  ├── /gms/profile         → Profile
  ├── /gms/settings        → Settings
  └── /gms/management      → Management
```

## Route Enforcement Table

| Path | Access Gate | Container | View Module | Session Impact |
|---|---|---|---|---|
| `/` | Public | Standalone | `Landing` | Minimal |
| `/gms-login` | Public | Standalone | `Login` | Token seed |
| `/gms` | Protected | `DashboardLayout` | `Overview` | Context boot |
| `/gms/projects` | Protected | `DashboardLayout` | `Projects` | Project scope |
| `/gms/tasks` | Protected | `DashboardLayout` | `Tasks` | Task state |
| `/gms/plans` | Protected | `DashboardLayout` | `Plans` | Plan buffer |
| `/gms/out` | Protected | `DashboardLayout` | `Out` | Outbox state |
| `/gms/search` | Protected | `DashboardLayout` | `WebSearch` | Query cache |
| `/gms/files` | Protected | `DashboardLayout` | `Files` | File index |
| `/gms/info` | Protected | `DashboardLayout` | `Info` | Reference pane |
| `/gms/notifications` | Protected | `DashboardLayout` | `Notifications` | Alert queue |
| `/gms/profile` | Protected | `DashboardLayout` | `Profile` | Identity data |
| `/gms/settings` | Protected | `DashboardLayout` | `Settings` | Preference state |
| `/gms/management` | Protected | `DashboardLayout` | `Management` | Admin controls |

# 4. CROSS-REPOSITORY MODULE MAPPING MATRIX

## Sapient 3D Knowledge Tree Read-Only Morphology Guidelines

- **Read-only binding**: visualization consumes telemetry, zero mutation writes
- **Signal normalization**: cross-app values translated into shared growth units
- **Cadence governance**: redraw aligned to GMS frame clock cadence (hub tick), jitter suppression enforced
- **Surface isolation**: per-branch rendering isolated from source runtimes

| Workspace Location | Knowledge Tree Signal Group | Visualized Variables | Output Surfaces |
|---|---|---|---|
| `powerframe-wms/` | Rolling financial volumes | Leaf count, blossom scale | Canopy density |
| `powerframe-crm/` | Latency spikes, 5xx exceptions | Albedo shifts, emissive glow | Branch shimmer |
| `TimePlanner/` | Iteration step frequency | Task velocity, split kinetics | Growth cadence |
| `powerframe-gms/` | Global health indexes | Trunk height baseline | Core pulse |

# 5. ARCHITECTURAL IN-MEMORY SYNC CONSTRAINTS

## Live Stream Isolation

- **Volatile-only frames**: `LiveStreamContext.jsx` retains streams in memory
- **Zero persistence**: no disk, no localStorage, no sessionStorage writes
- **Reducer-safe mutations**: deterministic state transitions only
- **Frame hygiene**: expunge orphaned payloads on clock drift

## Fallback Recovery Strategy

1. **Surge detection**: latency threshold trips soft-fail state
2. **Viewport freeze**: geometry locks to last stable snapshot
3. **Buffer reset/restore**: clear frames, rehydrate verified metrics, resume cadence

## Idempotency Execution Rules

- **Deterministic signatures**: identical inputs yield identical outputs
- **No source writes**: UI interaction never mutates repository files
- **Replay-safe frames**: hash-stable event sequence

## Runtime State Boundaries

| State Domain | Storage Tier | Mutation Policy | Reset Triggers |
|---|---|---|---|
| Stream frames | Volatile memory | Reducer-controlled | Refresh or surge |
| Layout metrics | Volatile memory | Snapshot overwrite | Shell reflow |
| Theme tokens | Session state | Context-only | Manual change |
| Auth tokens | Secure storage | Explicit logout | Logout or expiry |
