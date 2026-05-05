# Powerframe Platform Architecture

## Overview

Powerframe Hub is a **pure ecosystem launcher** — not an application, not a dashboard. It is the platform entry point that handles identity, branding, and navigation to external applications.

**Core principle:** The Hub contains no application code. Every application (BMS, CRM, Roadmap) is a fully independent repository deployed on its own port or domain. The Hub only knows their URLs.

---

## Polyrepo Architecture

```
Powerframe Hub (this repo)
  └─ Platform layer: landing, login, app launcher

External Application Repos (separate, independent):
  ├─ Powerframe-BMS-V1   → git@github.com:Maxi-flores/Powerframe-BMS-V1.git
  ├─ Powerframe-CRM      → git@github.com:Maxi-flores/Powerframe-CRM.git
  └─ TimePlanner         → git@github.com:Maxi-flores/TimePlanner.git
```

Each repo is developed, built, and deployed independently. The Hub links to them — it does not contain them.

---

## Hub Responsibilities

The Hub does:
- Render the public landing page (unauthenticated users)
- Provide the login/SSO entry point (Firebase Auth)
- Render the authenticated app launcher (authenticated users)
- Open external applications via plain `<a href>` links
- Maintain the app registry (`src/config/apps.js`)

The Hub does NOT:
- Contain BMS dashboard pages or layouts
- Contain CRM pages
- Contain Roadmap pages
- Route internally to any application dashboards
- Duplicate application logic

---

## Hub Source Structure

```
src/
├── App.jsx                  # Routing: /, /login, /bms-login redirect, *
├── main.jsx                 # React entry point
├── index.css                # Global styles
├── firebase.js              # Firebase Auth init
├── config/
│   └── apps.js              # App registry — single source of truth
├── pages/
│   ├── Landing.jsx          # Authenticated launcher (renders app cards)
│   ├── Login.jsx            # Firebase login form
│   └── PublicLanding.jsx    # Public/marketing landing page
└── img/
    └── ...                  # Logos, favicons
```

---

## Hub Routes

| Route | Behavior |
|-------|----------|
| `/` | Public landing (unauthenticated) or app launcher (authenticated) |
| `/login` | Firebase login page |
| `/bms-login` | Redirects to `/login` (legacy compatibility) |
| `*` | Redirects to `/` |

No internal application routes exist in the Hub.

---

## App Registry (`src/config/apps.js`)

The registry is the single source of truth for all connected applications.

```js
{
  id: "bms",
  name: "BMS",
  fullName: "Business Management System",
  description: "...",
  externalUrl: "http://localhost:5173",   // local dev; replace with prod URL
  repo: "git@github.com:Maxi-flores/Powerframe-BMS-V1.git",
  status: "external",
  iconKey: "rocket",
  category: "operations",
  requiresAuth: true,
}
```

All apps use `externalUrl`. No app uses an internal `route`.

### Current Registry

| App | Dev URL | Repo |
|-----|---------|------|
| BMS | `http://localhost:5173` | Powerframe-BMS-V1 |
| CRM | `http://localhost:5175` | Powerframe-CRM |
| Roadmap | `http://localhost:5176` | TimePlanner |

---

## Navigation Behavior

Every app card on the launcher uses a plain anchor:

```jsx
<a href={app.externalUrl} target="_self" rel="noreferrer">
  Open →
</a>
```

No React Router `<Link>`, no `navigate()` call. The browser navigates directly to the external app.

---

## Authentication Flow

1. User visits `/` → sees `PublicLanding` (unauthenticated)
2. Clicks "Sign In" → navigates to `/login`
3. Firebase login → stores `powerframe_user` (UID) in `localStorage`
4. Redirects to `/` → now shows `Landing` (authenticated launcher)
5. User clicks an app card → browser navigates to the app's `externalUrl`
6. Each external app reads `powerframe_user` from `localStorage` to validate the session

### Logout

- Hub calls `signOut(auth)` and clears `powerframe_user`
- Redirect back to `/` shows `PublicLanding`

---

## Running Locally

```bash
# Hub (this repo)
npm run dev
# → http://localhost:5174

# External apps (separate terminals, separate repos)
# BMS:     http://localhost:5173
# CRM:     http://localhost:5175
# Roadmap: http://localhost:5176
```

Each app runs independently. The Hub links to them via the registry.

---

## Future Integration

| Option | Description | When |
|--------|-------------|------|
| **SSO / Firebase bridge** | Each app redirects to Hub login if no `powerframe_user` found | Near-term |
| **OAuth2 / OIDC** | Token-based auth between Hub and apps | Medium-term |
| **Module Federation** | Runtime composition of micro-frontends, shared deps | Long-term |
| **Unity integration** | Unity client authenticates via Hub, connects to bridge service | Future |

---

## Connected Repositories

| Repo | Purpose | SSH URL |
|------|---------|---------|
| Powerframe Hub | Platform launcher & identity | `git@github.com:Maxi-flores/Powerframe.git` |
| BMS | Business Management System | `git@github.com:Maxi-flores/Powerframe-BMS-V1.git` |
| CRM | Customer Relationship Management | `git@github.com:Maxi-flores/Powerframe-CRM.git` |
| Roadmap | Knowledgebase & Planning | `git@github.com:Maxi-flores/TimePlanner.git` |
