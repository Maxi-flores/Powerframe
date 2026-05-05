export const POWERFRAME_APPS = [
  {
    id: "bms",
    name: "BMS",
    fullName: "Business Management System",
    description:
      "Business, project, dashboard, local/web/game environment management system.",
    externalUrl: "https://bms.powerframe.online",
    repo: "git@github.com:Maxi-flores/Powerframe-BMS-V1.git",
    status: "external",
    accent: "#7c3aed",
    bgGradient: "from-neon-violet/10 to-neon-blue/5",
    borderColor: "border-neon-violet/30",
    iconKey: "rocket",
    category: "operations",
    requiresAuth: true,
  },
  {
    id: "crm",
    name: "CRM",
    fullName: "Customer Relationship Management",
    description:
      "Customer accounts, webshop integrations, service relationships, and connected users.",
    externalUrl: "https://crm.powerframe.online",
    repo: "git@github.com:Maxi-flores/Powerframe-CRM.git",
    status: "external",
    accent: "#2563eb",
    bgGradient: "from-neon-blue/10 to-neon-cyan/5",
    borderColor: "border-neon-blue/30",
    iconKey: "users",
    category: "relations",
    requiresAuth: true,
  },
  {
    id: "roadmap",
    name: "Roadmap",
    fullName: "Roadmap / Knowledgebase Builder",
    description:
      "Project notes, AI notes, roadmap planning, prompt orchestration, and knowledgebase building.",
    externalUrl: "https://tpr.powerframe.online",
    repo: "git@github.com:Maxi-flores/TimePlanner.git",
    status: "external",
    accent: "#0891b2",
    bgGradient: "from-neon-cyan/10 to-neon-blue/5",
    borderColor: "border-neon-cyan/30",
    iconKey: "map",
    category: "knowledge",
    requiresAuth: true,
  },
];

export const isExternalApp = (app) => Boolean(app.externalUrl);

export const getAppHref = (app) => app.externalUrl;