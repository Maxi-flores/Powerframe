# Powerframe Platform Architecture

## Overview

Powerframe is a **multi-application platform hub** — not a single dashboard, but an ecosystem gateway that orchestrates identity, navigation, progression, and integration across multiple interconnected applications.

**Core philosophy:** Powerframe Hub is the entry point, identity layer, and central navigator. Individual applications (BMS, CRM, Roadmap, future Unity projects) connect to the hub for authentication, user context, and cross-app awareness.

---

## Repository Structure

| Repo | Type | Purpose | Status |
|------|------|---------|--------|
| **[Powerframe](git@github.com:Maxi-flores/Powerframe.git)** | Hub | Central platform, portal, identity, navigation | **Active** |
| **[Powerframe-BMS-V1](git@github.com:Maxi-flores/Powerframe-BMS-V1.git)** | Application | Business Management System | **Connected** (separate repo) |
| **[Powerframe-CRM](git@github.com:Maxi-flores/Powerframe-CRM.git)** | Application | Customer Relation Management | **Connected** (separate repo) |

---

## Hub Application (This Repo)

The Powerframe Hub handles:

### Endpoints & Routes
- **`/`** — Platform entry portal
  - Public landing (unauthenticated users)
  - Powerframe ecosystem portal (authenticated users)
- **`/bms-login`** — Unified authentication gateway
- **`/bms`, `/bms/*`** — BMS application shell
- **`/crm`** — CRM application shell
- **`/roadmap`** — Knowledgebase & planning (internal app shell)

### Core Services
- **Authentication** (Firebase Auth)
  - Email/password sign-in
  - Google OAuth
  - User identity via `powerframe_user` localStorage key
- **Theme & Personalization** (ThemeContext)
  - 8 preset themes + custom colors
  - Consistent glassmorphic design language
- **Project Management** (ProjectContext)
  - Shared project context within BMS
  - Default projects: "Powerframe", "Client Portal"

### Design System
- **Framework:** React 18 + React Router v7
- **Styling:** Tailwind CSS 4 + custom glassmorphism effects
- **Icons:** SVG library with neon color tokens
- **Branding:** Powerframe logo variants in `src/img/`

---

## Connected Applications

### BMS — Business Management System

**Repository:** `git@github.com:Maxi-flores/Powerframe-BMS-V1.git`

**Current Status:** External repo (not merged into hub). Integrated via local route `/bms` with placeholder components.

**Purpose:** Pilot system for operational dashboards, project environments, game-like task management, and system generation.

**Features:**
- Overview dashboard
- Project CRUD
- Task management
- Planning & calendar
- Web search
- File browser ("Bestanden")
- Notifications
- Team collaboration
- Admin management console

**Integration:** Currently implemented as `/bms` route with local pages (Overview, Projects, Tasks, etc.). Future: can be replaced with external deployment URL once BMS-V1 repo is productionized.

---

### CRM — Customer Relations Management

**Repository:** `git@github.com:Maxi-flores/Powerframe-CRM.git`

**Current Status:** External repo (not merged). Integrated via route `/crm` with placeholder components.

**Purpose:** Central service for account storage, webshop connections, service integrations, and customer/service relationships.

**Features (Coming Soon):**
- Contact management
- Account management
- Service connectors
- Integration layer for external webshops

**Integration:** Currently a placeholder page at `/crm`. Future: replace with external deployment URL or module federation import once CRM repo is ready.

---

### Roadmap — Knowledgebase & Planning (Internal)

**Repository:** This repo (`Powerframe` main)

**Current Status:** Internal app shell at `/roadmap`.

**Purpose:** Project notes, AI prompt orchestration, knowledge building, and strategic roadmap planning.

**Features:**
- Project documentation
- AI prompt templates
- Milestone planning
- Knowledgebase builder

**Note:** Roadmap remains internal for now. Can be externalized later if team growth requires it.

---

## App Registry

**File:** `src/config/apps.js`

The app registry is the **single source of truth** for all Powerframe applications. It describes each app's metadata, routing, branding, and deployment status.

### Registry Structure

```javascript
{
  id: "bms",                              // Unique identifier
  name: "BMS",                            // Short label
  fullName: "Business Management",        // Full title
  description: "...",                     // One-sentence description
  route: "/bms",                          // Internal route (hub navigation)
  externalUrl: null,                      // Future: deployed app URL
  repo: "git@github.com:...",             // GitHub SSH URL
  status: "active",                       // active | coming-soon | external | maintenance
  accent: "#7c3aed",                      // Neon accent color (hex)
  bgGradient: "from-neon-violet/...",     // Tailwind gradient classes
  borderColor: "border-neon-violet/30",   // Tailwind border classes
  iconKey: "rocket",                      // Icon identifier (maps to UI icons)
  category: "platform",                   // platform | service | external
  requiresAuth: true,                     // Authentication required
}
```

### Adding a New Application

1. Add entry to `POWERFRAME_APPS` array in `src/config/apps.js`
2. Provide `externalUrl` when deployed, or `route` for internal shells
3. Icon will automatically appear in portal and sidebar
4. No changes to Landing.jsx or DashboardLayout needed

### Registry Utilities

- **`getAppHref(app)`** — Returns the correct navigation target (externalUrl or route)
- **`isExternalApp(app)`** — True if app opens in new tab (external URL)
- **`getAppById(id)`** — Look up app by ID
- **`getAppByRoute(route)`** — Look up app by route

---

## Integration Strategy

### Hybrid Monorepo/Polyrepo Approach

Powerframe uses a **hybrid** model: Hub stays in one repo, applications can live separately and integrate via multiple techniques.

### Integration Methods: Tradeoffs

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **Git Submodules** | Version-pinned, clean separation | Complex git workflow, CI/CD overhead | Long-term, stable sub-apps |
| **Git Subtree** | Single repo view, simpler CI/CD | Can pollute commit history | Temporary consolidation |
| **External Deployment Links** | Fully independent apps, easy deployment | Requires IFrame or API gateways | Microservices, multi-team |
| **Module Federation (Webpack 5+)** | Runtime composition, shared deps, no iframe | Complex setup, requires compatible build | Modern, future-proof monorepo |

### Short-term Strategy (Now)
- BMS and CRM: **External deployment links** (static URLs in registry)
- Roadmap: **Internal shell** (local components)
- Hub coordinates via app registry, not code coupling

### Medium-term Strategy (Q3-Q4 2026)
- Evaluate **Module Federation** for true microfrontend architecture
- Enables:
  - Shared React, Tailwind, Firebase contexts
  - Independent app deployments
  - Runtime composition (no rebuild of hub needed)
  - Shared design system library

---

## Authentication & Identity

### Hub Auth Flow

1. User visits `/` (unauthenticated) → sees public landing
2. Click "Sign In" → navigates to `/bms-login` (Firebase Auth)
3. After login:
   - Firebase stores `powerframe_user` (user UID) in localStorage
   - Hub redirects to `/` which now shows authenticated portal
4. User selects app → navigates to app route or external URL
5. Each app validates `powerframe_user` key in localStorage

### Key Implementation Details

- **Firebase Auth:** Email/password + Google OAuth
- **Identity Key:** `localStorage.getItem("powerframe_user")`
- **Token Storage:** User UID (not JWT) stored in localStorage
- **Logout:** `signOut(auth)` + clear `powerframe_user` key

### Sub-App Authentication

When BMS or CRM become external apps:
- They should check for `powerframe_user` in localStorage
- If missing, redirect to `{hubUrl}/bms-login`
- After login, redirect back to the app
- This creates a shared identity layer without JWT token exchange (for now)

Future: Implement OAuth2 or OIDC for token-based auth between apps.

---

## Future Services Layer

As Powerframe scales, the following microservices should be built to support the platform:

### Core Services

| Service | Purpose |
|---------|---------|
| **auth-service** | Centralized authentication, OAuth2 server, token generation |
| **user-service** | User profiles, preferences, progression tracking |
| **project-service** | Shared project/game state, multi-app collaboration |
| **crm-service** | Customer data, relationships, accounts (backend for CRM app) |
| **knowledge-service** | Knowledgebase storage, AI prompt cache, documentation |
| **realtime-service** | WebSocket server for live updates, notifications, multiplayer |
| **unity-bridge-service** | Gateway for Unity client ↔ Hub communication |

### Service Communication

- **Hub ↔ Services:** REST API or gRPC
- **Hub ↔ Sub-Apps:** App registry URLs (external) or shared context (internal)
- **Sub-Apps ↔ Services:** Direct API calls with `powerframe_user` token validation

---

## Unity Integration (Future)

Powerframe will eventually support **multi-user game environments** via Unity client.

### Architecture

```
User → Hub (authentication) → Portal (app selection)
                           ↓
                    [BMS | CRM | Roadmap | Unity Game]
                           ↓
                    Shared Services (auth, user, project, realtime)
```

### Unity Client Flow

1. Player starts game (built in Unity)
2. Game checks for `powerframe_user` in device storage (equivalent to localStorage)
3. If not found, game opens OAuth popup → authenticate via Hub
4. After auth, game gets user session token
5. Game connects to `unity-bridge-service` via WebSocket
6. Bridge service handles:
   - User identity validation
   - Project/game state persistence (project-service)
   - Real-time multiplayer updates (realtime-service)
   - Cross-app progression (user-service)

### Key Services for Unity

- **unity-bridge-service:** Translates HTTP API to WebSocket protocol, manages game sessions
- **realtime-service:** Multiplayer synchronization, live updates
- **project-service:** Persist game progress, levels, team compositions

---

## Development Workflow

### Running Powerframe Hub Locally

```bash
git clone git@github.com:Maxi-flores/Powerframe.git
cd Powerframe/Claude/Web
npm install
npm run dev
# Open http://localhost:5174 (or available port)
```

### Running External Apps (BMS, CRM)

When BMS-V1 and CRM repos are productionized:

```bash
# Option 1: Run separately on different ports
# Hub: http://localhost:5174
# BMS: http://localhost:5175 (external deployment, linked in registry)
# CRM: http://localhost:5176 (external deployment, linked in registry)

# Option 2: Use Module Federation (future)
# Single http://localhost:5174 composes all apps at runtime
```

### Adding a New App to Registry

1. Create app in new repo or internal folder
2. Add entry to `src/config/apps.js`:
   ```js
   {
     id: "myapp",
     name: "My App",
     fullName: "My Application",
     description: "...",
     route: "/myapp",                    // if internal
     externalUrl: "https://myapp.com",  // if external
     repo: "git@github.com:...",
     status: "active",
     accent: "#your-color",
     bgGradient: "from-...to-...",
     borderColor: "border-...",
     iconKey: "your-icon",
     category: "platform",
     requiresAuth: true,
   }
   ```
3. If internal: create route in `src/App.jsx`
4. If external: deploy app and update `externalUrl` in registry
5. App icon appears automatically in hub portal and sidebar

### Icon Keys

Icons map to the `Icons` object in `src/layouts/DashboardLayout.jsx`. Current keys: `rocket`, `users`, `map`. Add more icons as needed.

---

## Future Roadmap

| Phase | Goal | Timeline |
|-------|------|----------|
| **Phase 1** | Hub + BMS/CRM shells, Firebase auth, app registry | Q2 2026 ✅ |
| **Phase 2** | External deployment links for BMS-V1 and CRM | Q3 2026 |
| **Phase 3** | Module Federation setup for microfrontend architecture | Q4 2026 |
| **Phase 4** | Core microservices (auth, user, project, realtime) | 2026 H2 |
| **Phase 5** | Unity bridge service + basic multiplayer support | 2026 H2 |
| **Phase 6** | Advanced features (game studios, leaderboards, cross-app progression) | 2027 |

---

## Resources & References

- **Main Repo:** https://github.com/Maxi-flores/Powerframe
- **BMS Repo:** https://github.com/Maxi-flores/Powerframe-BMS-V1
- **CRM Repo:** https://github.com/Maxi-flores/Powerframe-CRM
- **Tech Stack:** React 18, Vite, Tailwind CSS 4, Firebase
- **Deployment:** Vercel (hub), separate hosting for sub-apps (TBD)

---

## Contributing

When adding features, refer to this architecture to ensure alignment:
1. Does it belong in the hub (shared identity/navigation)?
2. Or in a specific app?
3. Or in a service layer?
4. Update app registry for any new applications
5. Follow existing design patterns (glassmorphism, neon accents, Tailwind)
