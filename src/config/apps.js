// Powerframe Platform: Unified App Registry
// Single source of truth for all connected applications

export const POWERFRAME_APPS = [
  {
    id: "bms",
    name: "BMS",
    fullName: "Business Management",
    description: "Pilot system for dashboards, project/game environments, local/webpage inputs, and operational control.",
    route: "/bms",
    externalUrl: null,
    repo: "git@github.com:Maxi-flores/Powerframe-BMS-V1.git",
    status: "active",
    accent: "#7c3aed",
    bgGradient: "from-neon-violet/10 to-neon-blue/5",
    borderColor: "border-neon-violet/30",
    iconKey: "rocket",
    category: "platform",
    requiresAuth: true,
  },
  {
    id: "crm",
    name: "CRM",
    fullName: "Customer Relations",
    description: "Stores accounts, connected webshops, service integrations, and customer/service relationships.",
    externalUrl: "http://localhost:5175",
    repo: "git@github.com:Maxi-flores/Powerframe-CRM.git",
    status: "external",
    accent: "#2563eb",
    bgGradient: "from-neon-blue/10 to-neon-cyan/5",
    borderColor: "border-neon-blue/30",
    iconKey: "users",
    category: "platform",
    requiresAuth: true,
  },
  {
    id: "roadmap",
    name: "Roadmap",
    fullName: "Knowledgebase & Planning",
    description: "Project notes, AI prompt orchestration, roadmap planning, and knowledge building.",
    externalUrl: "http://localhost:5176",
    repo: "git@github.com:Maxi-flores/TimePlanner.git",
    status: "external",
    accent: "#0891b2",
    bgGradient: "from-neon-cyan/10 to-neon-blue/5",
    borderColor: "border-neon-cyan/30",
    iconKey: "map",
    category: "platform",
    requiresAuth: true,
  },
];

export function getAppHref(app) {
  return app.externalUrl || app.route || "/";
}

export function isExternalApp(app) {
  return !!app.externalUrl;
}

export function getAppById(id) {
  return POWERFRAME_APPS.find(app => app.id === id);
}

export function getAppByRoute(route) {
  return POWERFRAME_APPS.find(app => app.route === route);
}

// Development validation: warns if app registry has issues
export function validateAppRegistry() {
  if (typeof window === 'undefined' || !window.location.hostname.includes('localhost')) {
    return { errors: [], warnings: [] }; // skip in production
  }

  const errors = [];
  const warnings = [];

  // Check for duplicate IDs
  const ids = POWERFRAME_APPS.map(app => app.id);
  const duplicateIds = ids.filter((id, idx) => ids.indexOf(id) !== idx);
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate app IDs: ${duplicateIds.join(', ')}`);
  }

  // Check each app
  POWERFRAME_APPS.forEach(app => {
    // Must have route OR externalUrl
    if (!app.route && !app.externalUrl) {
      errors.push(`App "${app.id}": missing both route and externalUrl`);
    }

    // iconKey should exist (will be validated at render time, but warn early)
    if (!app.iconKey) {
      warnings.push(`App "${app.id}": missing iconKey`);
    }

    // Status should be valid
    if (!['active', 'coming-soon', 'external', 'maintenance'].includes(app.status)) {
      warnings.push(`App "${app.id}": unknown status "${app.status}"`);
    }
  });

  // Log warnings and errors
  if (warnings.length > 0) {
    console.warn('[Powerframe Registry] Warnings:', warnings);
  }
  if (errors.length > 0) {
    console.error('[Powerframe Registry] Errors:', errors);
  }

  return { errors, warnings };
}
