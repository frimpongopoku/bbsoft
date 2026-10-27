// Single source of truth for project pricing, shared by the homepage
// estimator and the full QuoteBuilder on /hire-us.

export const PROJECT_TYPES = [
  { id: "website",   name: "Corporate Website", shortName: "Website",    basePrice: 1200, baseWeeks: 3,  description: "Polished static or CMS-backed marketing site.", tech: "Next.js / Tailwind CSS / MDX" },
  { id: "webapp",    name: "Web Application",   shortName: "Web app",    basePrice: 1500, baseWeeks: 6,  description: "Interactive systems with complex roles & data.",  tech: "Next.js / TypeScript / PostgreSQL" },
  { id: "mobileapp", name: "Mobile App",        shortName: "Mobile app", basePrice: 1500, baseWeeks: 8,  description: "Native iOS & Android apps on the App Stores.",   tech: "React Native / Expo / Firebase" },
  { id: "custom",    name: "Custom Software",   shortName: "Custom",     basePrice: 3000, baseWeeks: 10, description: "Enterprise solutions & WebSockets dashboards.",   tech: "Next.js / Go / Docker / AWS" },
] as const;

export const SPEEDS = [
  { id: "normal", name: "Normal Pace",      shortName: "Normal",     costMultiplier: 1.0, timeMultiplier: 1.0, label: "Base pricing" },
  { id: "fast",   name: "Fast-Track",       shortName: "Fast-track", costMultiplier: 1.3, timeMultiplier: 0.7, label: "30% premium" },
  { id: "rush",   name: "Rush (Expedited)", shortName: "Rush",       costMultiplier: 1.6, timeMultiplier: 0.5, label: "60% premium" },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Speed = (typeof SPEEDS)[number];

/** Applies a delivery pace to raw cost/weeks. Weeks never drop below 2. */
export function applyPace(rawCost: number, rawWeeks: number, speed: Speed) {
  return {
    cost: Math.round(rawCost * speed.costMultiplier),
    weeks: Math.max(2, Math.round(rawWeeks * speed.timeMultiplier * 10) / 10),
  };
}
