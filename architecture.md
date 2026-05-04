# Powerframe Dashboard - Architecture Documentation

## Project Overview

**Powerframe Dashboard** is a modern, premium web-based management platform built with React 18, Vite, and Tailwind CSS. The application provides a comprehensive dashboard for managing projects, tasks, plans, and related operations with a focus on visual excellence, glassmorphic design, and smooth user interactions.

- **Version**: 2.0
- **Framework**: React 18.3 + React Router 7
- **Build Tool**: Vite 6.1
- **Styling**: Tailwind CSS 4.2 + Custom PostCSS
- **Authentication**: JWT-based (localStorage)
- **Deployment**: Vercel

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18.3.1 |
| **Routing** | React Router DOM 7.13.0 |
| **Build Tool** | Vite 6.1.0 |
| **CSS Framework** | Tailwind CSS 4.2.1 |
| **CSS Processing** | PostCSS 8.5.6 + Autoprefixer |
| **React Plugin** | @vitejs/plugin-react 4.7.0 |
| **Security** | bcryptjs 2.4.3, jsonwebtoken 9.0.2 |
| **Backend Services** | Firebase 12.12.1 |
| **Platform** | Node.js (ES Modules) |

---

## Project Structure

```
powerframe-bms/
├── index.html                    # Entry point (SPA)
├── vite.config.js               # Vite configuration with API proxy
├── tailwind.config.js           # Tailwind theming & extensions
├── vercel.json                  # Vercel deployment config (SPA rewrites)
├── package.json                 # Dependencies & scripts
├── .gitignore
│
├── src/
│   ├── main.jsx                 # React app mount point
│   ├── App.jsx                  # Root component with routing
│   │
│   ├── components/
│   │   └── Copilot.jsx          # AI assistant modal component
│   │
│   ├── context/                 # React Context API
│   │   ├── ProjectContext.jsx   # Project management state
│   │   └── ThemeContext.jsx     # Theme & customization state
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # Main layout (sidebar + topbar + outlet)
│   │
│   ├── pages/                   # Route-bound page components
│   │   ├── Landing.jsx          # Home page (/)
│   │   ├── Login.jsx            # Auth page (/bms-login)
│   │   ├── Overview.jsx         # Dashboard (/bms)
│   │   ├── Projects.jsx         # Project management (/bms/projects)
│   │   ├── Tasks.jsx            # Task list (/bms/tasks)
│   │   ├── Plans.jsx            # Planning (/bms/plans)
│   │   ├── Out.jsx              # Outgoing/Send (/bms/out)
│   │   ├── WebSearch.jsx        # Search feature (/bms/search)
│   │   ├── Files.jsx            # File browser (/bms/files)
│   │   ├── Info.jsx             # Information (/bms/info)
│   │   ├── Notifications.jsx    # Notifications (/bms/notifications)
│   │   ├── Profile.jsx          # User profile (/bms/profile)
│   │   ├── Settings.jsx         # Settings (/bms/settings)
│   │   └── Management.jsx       # Management console (/bms/management)
│   │
│   └── img/                     # Static assets
│       ├── symbol_logo.png
│       ├── symbol_logo_small.png
│       └── symbol_splash_powerframe_logo.png
│
├── api/                         # Backend endpoints (serverless functions)
│   ├── health.js                # Health check endpoint
│   ├── auth/
│   │   ├── login.js             # POST /api/auth/login
│   │   ├── register.js          # POST /api/auth/register
│   │   └── me.js                # GET /api/auth/me
│
├── Concepts/                    # Legacy/reference components
│   ├── BMS_Login.js
│   └── BMS_Register.js
│
├── tools/                       # Development utilities
│   └── PROMPT_fix_vite_subpath_routing
│
└── node_modules/               # Dependencies

```

---

## Architecture Layers

### 1. **Presentation Layer** (UI Components & Pages)

#### Core Layout Components
- **DashboardLayout** (`src/layouts/DashboardLayout.jsx`): Main shell providing:
  - Collapsible sidebar (68px collapsed → 260px expanded)
  - Top navigation bar with search, notifications, AI copilot
  - Main content area with nested routes
  - Glassmorphic design with blur effects and gradients
  - Project switcher dropdown
  - Theme-aware styling

#### Page Components
All located in `src/pages/`:
- **Public Pages**:
  - `Landing.jsx`: Home page with marketing content
  - `Login.jsx`: Authentication gateway

- **Dashboard Pages** (require authentication, nested under `/bms`):
  - `Overview.jsx`: Main dashboard/home
  - `Projects.jsx`: Project CRUD operations
  - `Tasks.jsx`: Task management interface
  - `Plans.jsx`: Planning & scheduling
  - `Out.jsx`: Outgoing requests/communications
  - `WebSearch.jsx`: Search functionality
  - `Files.jsx`: File management ("Bestanden")
  - `Info.jsx`: Information/documentation
  - `Notifications.jsx`: Notification center
  - `Profile.jsx`: User profile management
  - `Settings.jsx`: User preferences & configuration
  - `Management.jsx`: Admin/management console

#### Component Library
- **Copilot.jsx**: AI assistant modal (toggleable via button in top bar)

### 2. **State Management Layer** (React Context API)

#### ProjectContext
**Location**: `src/context/ProjectContext.jsx`

Manages global project state:
```javascript
{
  projects: [],           // Array of project objects
  activeProject: {},      // Currently selected project
  addProject(project),    // Create new project
  updateProject(id, updates),  // Modify project
  deleteProject(id),      // Remove project
  switchProject(id)       // Change active project
}
```

**Default Projects**:
- Powerframe (ID: 1, purple #7c3aed)
- Client Portal (ID: 2, blue #2563eb)

**Persistence**: localStorage (`bms_projects`, `bms_active_project`)

#### ThemeContext
**Location**: `src/context/ThemeContext.jsx`

Theme management with 8 presets + customization:
```javascript
{
  theme: string,           // Current theme key
  setTheme(name),         // Switch theme
  themes: {},             // All available themes
  currentTheme: {},       // Active theme object
  customBg,               // Custom background (gradient/solid)
  setCustomBg(value),     // Set custom background
  customAccent,           // Custom accent color
  setCustomAccent(value), // Set custom accent
  bgPresets: []           // Background preset options
}
```

**Theme Presets** (8 total):
1. **Default Purple**: #7c3aed accent, purple-blue gradient
2. **Ocean Blue**: #0ea5e9 accent, cyan gradient
3. **Forest Green**: #22c55e accent, green gradient
4. **Sunset Orange**: #f97316 accent, orange-red gradient
5. **Rose Pink**: #ec4899 accent, magenta gradient
6. **Midnight Dark**: #6366f1 accent, deep indigo
7. **Ember Red**: #ef4444 accent, red gradient
8. **Golden Hour**: #eab308 accent, gold-orange gradient

**Persistence**: localStorage (`bms_theme`, `bms_custom_bg`, `bms_custom_accent`)

### 3. **Routing Layer** (React Router)

**Root Router**: `src/App.jsx`

```
/                          → Landing page
/bms-login                 → Login screen
/bms                       → DashboardLayout (wrapper)
├── /bms                   → Overview (index)
├── /bms/projects          → Projects
├── /bms/tasks             → Tasks
├── /bms/plans             → Plans
├── /bms/out               → Out
├── /bms/search            → WebSearch
├── /bms/files             → Files
├── /bms/info              → Info
├── /bms/notifications     → Notifications
├── /bms/profile           → Profile
├── /bms/settings          → Settings
└── /bms/management        → Management
*                          → Redirect to /
```

**Features**:
- React Router v7 with `<BrowserRouter>` and `<Routes>`
- Nested routing with `<Outlet>` in DashboardLayout
- Fallback redirect to home on unknown routes
- basename support for subdirectory deployment

---

## Design System

### Color Palette

**Base Colors**:
- Navy (Dark): `#0f172a`, `#020617`, `#010409`
- Glass: Semi-transparent whites (3% → 15% opacity)
- Surface: Dark semi-transparent overlays

**Neon Accent Colors**:
```
neon-violet:  #8B5CF6
neon-blue:    #3B82F6
neon-cyan:    #06B6D4
neon-purple:  #A855F7
neon-pink:    #EC4899
neon-green:   #22C55E
neon-orange:  #F97316
neon-red:     #EF4444
neon-amber:   #F59E0B
```

### Typography

- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Font Sizes**: 2xs (0.625rem) → 4xl (custom sizes)
- **Font Weights**: 400 (regular) → 900 (black)

### Layout & Spacing

- **Border Radius**: Custom (14px, 20px, 22px rounds for cards)
- **Sidebar**: 68px (collapsed) or 260px (expanded)
- **Spacing Scale**: Custom (18, 68, 88, 128 spacing units)
- **Gaps**: 3.5 (14px) default between major sections

### Visual Effects

#### Glassmorphism
- **Backdrop Blur**: 20px (glass), 30px (glass-lg), 40px (glass-xl)
- **Border**: `border-white/[0.12]` to `border-white/[0.14]`
- **Shadow**: `shadow-glass` (0 8px 32px), `shadow-glass-lg` (0 16px 48px)

#### Gradients
- **Navy Gradient**: 135deg purple-to-blue fade
- **Neon Gradients**: Violet-Blue, Blue-Cyan, Violet-Pink
- **Sidebar/Topbar**: Semi-transparent dark overlays

#### Animations
- **glow-pulse**: 3s ease-in-out (opacity breathing)
- **fade-in-up**: 0.4s ease-out (component entry)
- **slide-in-right/left**: 0.3s ease-out (directional entry)
- **scale-in**: 0.2s ease-out (zoom entry)
- **shimmer**: 2s linear infinite (shimmer effect)

---

## State & Data Flow

### Component Hierarchy

```
App (BrowserRouter)
├── ThemeProvider (global theme state)
└── ProjectProvider (global project state)
    └── Routes
        ├── Landing
        ├── Login
        └── DashboardLayout (uses Projects & Theme)
            ├── Sidebar (Projects context, Theme context)
            ├── Topbar (Projects context, Theme context)
            ├── Outlet (child pages)
            └── Copilot (modal)
```

### Data Persistence Strategy

| Data | Storage | Context |
|------|---------|---------|
| User Token | localStorage | Manual (not in context) |
| Active Project | localStorage | ProjectContext |
| Projects List | localStorage | ProjectContext |
| Current Theme | localStorage | ThemeContext |
| Custom Background | localStorage | ThemeContext |
| Custom Accent Color | localStorage | ThemeContext |

### Authentication Flow

1. **Login** (`/bms-login`):
   - User submits credentials
   - POST to `/api/auth/login`
   - Token stored in localStorage
   - Redirect to `/bms`

2. **Protected Routes**:
   - Check for token in localStorage
   - If absent, redirect to `/bms-login`

3. **Logout**:
   - Remove token from localStorage
   - Navigate to `/bms-login`

---

## Build & Deployment

### Development Server

```bash
npm run dev
```

**Configuration** (`vite.config.js`):
- Vite default: `http://localhost:5173`
- API Proxy: `/api/*` → `http://localhost:5000`

### Production Build

```bash
npm run build
```

**Output**: `dist/` folder with optimized assets

### Deployment: Vercel

**Configuration** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Purpose**:
- API calls proxied to backend
- All non-API routes rewritten to `index.html` (SPA handling)

---

## Styling Architecture

### Tailwind Configuration

**Extended Theme** (`tailwind.config.js`):
- Custom colors (navy, glass, neon, surface)
- Background images (gradients, streaks)
- Box shadows (glass effects, glows)
- Border radius (2xl, 3xl, 4xl)
- Backdrop blur (xs, glass, glass-lg, glass-xl)
- Custom spacing (sidebar sizes)
- Complex animations (glow-pulse, fade-in-up, etc.)
- Timing functions (smooth, bounce-sm)

### Styling Patterns

1. **Inline Styles**: Dynamic theming (background colors, gradients from context)
2. **Tailwind Classes**: Static layout, spacing, transitions
3. **CSS Variables**: Not used (all hardcoded theme values)

### Example: Theme-Aware Component

```jsx
// DashboardLayout uses currentTheme from context
<div style={{
  background: currentTheme.customBg || currentTheme.gradient
}} />

// Sidebar button inherits active theme accent color
<div style={{ background: `${currentTheme.accent}22` }} />
```

---

## Backend Integration

### Firebase Integration

**Firebase** (v12.12.1) is now integrated into the application for:
- Authentication (Firebase Auth)
- Real-time database operations (Firestore)
- Cloud storage capabilities
- Backend cloud functions

### API Endpoints

**Proxy Setup** (Vite):
```
Development: http://localhost:5000
Production: API routing via Vercel rewrites
```

**Endpoints**:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | User authentication |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Get current user |

**Implementation**:
- Located in `api/` folder (serverless functions)
- Uses `jsonwebtoken` for JWT generation/validation
- Uses `bcryptjs` for password hashing
- Firebase API handles cloud-based services (auth, database, storage)

---

## Notable Features & UX Details

### 1. Collapsible Sidebar
- Expands on hover: 68px → 260px
- Smooth CSS transitions (300ms)
- Active navigation indicator with theme accent color
- Project switcher dropdown (animated fade-in-up)
- Progress bar showing V2 completion (58%)

### 2. Top Navigation Bar
- Left: Branding + current page title
- Center: Search input (hidden on mobile)
- Right: Notifications, Profile, Menu, AI Copilot buttons
- Glassmorphic styling with blur backdrop

### 3. Project Management
- Quick switcher in sidebar
- Create new project via FAB button
- Color-coded projects
- Persistent selection via localStorage

### 4. Theme Customization
- 8 preset themes
- Custom background gradient/solid options
- Custom accent color picker
- Live preview + persistent storage
- Theme colors propagate to all components

### 5. AI Copilot
- Toggle button in top-right (animated)
- Modal overlay with glassmorphic styling
- Toggles gradient glow on activation

### 6. Responsive Design
- Mobile: Sidebar hidden, menu drawer
- Tablet: Partial sidebar, hidden search
- Desktop: Full layout with all features

---

## Performance Considerations

1. **React Router v7**: Latest version for optimized routing
2. **CSS-in-JS**: Minimal use; mostly Tailwind for faster processing
3. **Lazy Components**: Pages loaded on-demand via React Router
4. **localStorage**: Used for persistence (no backend calls for preferences)
5. **Image Optimization**: SVG icons (inline), PNG assets in `/src/img`

---

## Security Notes

- **JWT Tokens**: Stored in localStorage (XSS vulnerable but standard practice)
- **Password Hashing**: bcryptjs used server-side
- **CORS**: Handled via Vite proxy in dev, Vercel routing in prod
- **SPA Pattern**: No server-side session storage

---

## Development Workflow

### Commands

```bash
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Key Files to Edit

- **Pages**: `src/pages/*.jsx`
- **Layouts**: `src/layouts/DashboardLayout.jsx`
- **State**: `src/context/*.jsx`
- **Styling**: `tailwind.config.js` (global), inline styles (component-specific)
- **Routing**: `src/App.jsx`

### Hot Module Replacement (HMR)
- Automatically enabled by Vite
- Changes to React components refresh instantly
- State persists in localStorage (projects, theme, token)

---

## Future Extensibility

### Recommended Additions
1. **Component Library**: Extract reusable UI components
2. **Custom Hooks**: Auth hook, theme hook improvements
3. **API Layer**: Service/API abstraction for fetch calls
4. **Error Boundaries**: Error handling UI
5. **Testing**: Vitest + React Testing Library
6. **Accessibility**: ARIA labels, keyboard navigation
7. **Dark Mode Toggle**: Extend theme system
8. **Internationalization**: i18n support

---

## Summary

**Powerframe** is a premium, visually-driven dashboard application emphasizing:

- **Modern Stack**: React 18 + Vite for fast development
- **Premium Design**: Glassmorphic UI with neon accents and smooth animations
- **Persistent State**: localStorage-backed contexts for projects & themes
- **Scalable Routing**: React Router v7 for complex nested navigation
- **Flexible Theming**: 8 presets + custom colors for per-user personalization
- **Production-Ready**: Vercel deployment with SPA rewrites and API proxying

The architecture prioritizes user experience with smooth transitions, responsive layouts, and persistent preferences while maintaining clean separation between routing, state, and presentation layers.
