# UNIFIED REPOSITORY & PROJECT WORKSPACE TOPOLOGY

## Global Monorepo Axis

Powerframe Hub is a monorepo with four workspaces; the GMS (Game Manager System) Hub provides the unified shell and session control.

```
Powerframe-Monorepo/
├── powerframe-gms/    # Game Manager System central shell architecture
├── powerframe-crm/    # Customer Relation Manager operations portal
├── powerframe-wms/    # Wealth Manager System economic portfolio, not warehouse
└── TimePlanner/       # Time Planner roadmap simulation ticks workspace
```

## Hub Unification Contract

- **Glassmorphic shell**: layout context for nav and tools.
- **Synchronization bridges**: time-aligned event frames, cross-app mirrors, and resilience.
- **Boundary control**: GMS mediates shared identifiers; apps keep data local.
- **Viewport delegation**: route mounts render app views without leaking logic.

## Workspace Coordination Table

| Workspace | Primary Role | Shell Ownership | Cross-App Contract | Runtime Boundary |
|---|---|---|---|---|
| `powerframe-gms/` | Command | Full shell | Layout + auth | Global nav |
| `powerframe-crm/` | Customer ops | Delegated | Escalation events | Isolated stores |
| `powerframe-wms/` | Economic telemetry | Delegated | Metric stream | High-frequency feeds |
| `TimePlanner/` | Timeline simulation | Delegated | Tick cadence | Discrete clock |

# COMPREHENSIVE DIRECTORY LAYOUT SPECIFICATION

## Full Tree of the GMS Hub Workspace

```
powerframe-gms/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json
├── package.json
├── api/
│   ├── health.js
│   └── auth/
│       ├── login.js
│       ├── register.js
│       └── me.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Copilot.jsx
│   │   └── KnowledgeTree3D.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── context/
│   │   ├── ProjectContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── LiveStreamContext.jsx
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

| Node | Classification | Primary Duty | Coupling |
|---|---|---|---|
| `index.html` | Root entry | SPA mount | Runtime core |
| `vite.config.js` | Build control | HMR + proxy | Build-only |
| `tailwind.config.js` | Theme system | Glass tokens | Styling core |
| `vercel.json` | Edge routing | SPA rewrites | Deploy-only |
| `api/` | Serverless layer | Auth + health | Stateless |
| `src/main.jsx` | Execution root | React mount | Critical |
| `src/App.jsx` | Router gate | Route map | Critical |
| `layouts/DashboardLayout.jsx` | Shell core | Frame + outlet | GMS-owned |
| `pages/*` | Route views | Feature UI | Viewport |

# STRUCTURAL ROUTING MATRIX (REACT ROUTER V7)

## Router Spine

GMS uses React Router v7 with a public entry and secured operator gate; protected viewports sit under a single `DashboardLayout` shell.

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
| `/gms-login` | Public | Standalone | `Login` | Token |
| `/gms` | Protected | `DashboardLayout` | `Overview` | Context |
| `/gms/projects` | Protected | `DashboardLayout` | `Projects` | Projects |
| `/gms/tasks` | Protected | `DashboardLayout` | `Tasks` | Tasks |
| `/gms/plans` | Protected | `DashboardLayout` | `Plans` | Plans |
| `/gms/out` | Protected | `DashboardLayout` | `Out` | Outbox |
| `/gms/search` | Protected | `DashboardLayout` | `WebSearch` | Search |
| `/gms/files` | Protected | `DashboardLayout` | `Files` | Files |
| `/gms/info` | Protected | `DashboardLayout` | `Info` | Info |
| `/gms/notifications` | Protected | `DashboardLayout` | `Notifications` | Alerts |
| `/gms/profile` | Protected | `DashboardLayout` | `Profile` | Profile |
| `/gms/settings` | Protected | `DashboardLayout` | `Settings` | Settings |
| `/gms/management` | Protected | `DashboardLayout` | `Management` | Admin |

# CROSS-REPOSITORY MODULE MAPPING MATRIX

Sapient 3D Knowledge Tree rendering binds cross-repository telemetry to read-only morphology.

| Workspace Location | Knowledge Tree Signal Group | Visualized Variables | Output Surface |
|---|---|---|---|
| `powerframe-wms/` | Rolling financial volumes | Leaf count, blossom scale | Canopy density |
| `powerframe-crm/` | Latency spikes, 5xx exceptions | Albedo shifts, emissive glow | Branch shimmer |
| `TimePlanner/` | Iteration step frequency | Task velocity, split kinetics | Growth cadence |
| `powerframe-gms/` | Global health indexes | Trunk height baseline | Core pulse |

# ARCHITECTURAL IN-MEMORY SYNC CONSTRAINTS

## Live Stream Isolation

Real-time streaming payloads handled by `LiveStreamContext.jsx` remain inside volatile memory only; they are never serialized to disk or local storage.

- **In-memory only**: stream frames live in context state.
- **No persistence**: reload reconstructs from upstream sources.
- **Local mutation rule**: reducer-style updates only.

## Fallback Recovery Strategy

1. **Surge detection**: latency threshold triggers soft fail state.
2. **Viewport freeze**: layout geometry locks to last snapshot.
3. **Buffer reset and restore**: clear frames, rehydrate validated metrics, resume cadence.

## Idempotency Execution Rules

- **Idempotent events**: identical inputs yield identical frame signatures.
- **No file writes**: UI interactions never mutate source files.
- **Traceable frames**: deterministic hash per event.

## Runtime State Boundaries

| State Domain | Storage Tier | Mutation Policy | Reset Trigger |
|---|---|---|---|
| Stream frames | Volatile memory | Reducer-controlled | Refresh or surge |
| Layout metrics | Volatile memory | Snapshot overwrite | Shell reflow |
| Theme tokens | Session state | Context-only | Manual change |
| Auth tokens | Secure storage | Explicit logout | Logout or expiry |
