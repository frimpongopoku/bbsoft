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

// ─── Rescue pricing: projects someone has already started (often with AI tools) ───
// A paid code check grades the project, and the grade sets the price as a share of a
// fresh build. The shares already carry a buffer for gaps the check can't see.

export const STARTING_POINTS = [
  { id: "fresh",  name: "Starting fresh", shortName: "Fresh",        grade: null,         costMultiplier: 1,    timeMultiplier: 1,   description: "An idea, a sketch or a brief. We build it end to end." },
  { id: "finish", name: "Partly built",   shortName: "Partly built", grade: "B · Finish", costMultiplier: 0.65, timeMultiplier: 0.6, description: "The core works, but big pieces are missing or broken." },
  { id: "polish", name: "Nearly done",    shortName: "Nearly done",  grade: "A · Polish", costMultiplier: 0.35, timeMultiplier: 0.4, description: "Mostly working. Needs fixes, security and a launch." },
] as const;

export type StartingPoint = (typeof STARTING_POINTS)[number];

/** Code check fee by project type, credited to the build if the client goes ahead. */
export const CODE_CHECK = { website: 100, webapp: 150, mobileapp: 250, custom: 300 } as const;
/** AI features need prompts, tools and running costs reviewed too. */
export const AI_CHECK_EXTRA = 150;

/** Rescue work that costs the same however far along the project is, so it isn't discounted. */
export const RESCUE_FIXED = {
  mobile: { price: 250, weeks: 1, label: "Native builds & store submission" },
  ai:     { price: 250, weeks: 1, label: "AI evaluation & guardrails" },
} as const;

/** Above this share of a fresh build, we recommend rebuilding instead of rescuing. */
export const REBUILD_THRESHOLD = 0.8;

/** Applies a starting point to a fresh-build cost/weeks, before pace. */
export function applyStartingPoint(
  rawCost: number,
  rawWeeks: number,
  point: StartingPoint,
  { mobile = false, ai = false } = {},
) {
  if (point.id === "fresh") return { cost: rawCost, weeks: rawWeeks, fixed: [] };
  const fixed = [...(mobile ? [RESCUE_FIXED.mobile] : []), ...(ai ? [RESCUE_FIXED.ai] : [])];
  return {
    cost: Math.round(rawCost * point.costMultiplier) + fixed.reduce((s, f) => s + f.price, 0),
    weeks: Math.round(rawWeeks * point.timeMultiplier * 10) / 10 + fixed.reduce((s, f) => s + f.weeks, 0),
    fixed,
  };
}

export function codeCheckFee(typeId: ProjectType["id"], ai = false) {
  return CODE_CHECK[typeId] + (ai ? AI_CHECK_EXTRA : 0);
}

/** Monthly care after launch. AI model usage is passed through at cost. */
export const CARE_PLANS = [
  { id: "website",   name: "Website",  price: 80,  covers: "Hosting, uptime and small edits" },
  { id: "webapp",    name: "Web app",  price: 150, covers: "Backups, security patches and fixes" },
  { id: "mobileapp", name: "Mobile",   price: 200, covers: "Store rules, OS updates and rebuilds" },
  { id: "ai",        name: "AI agent", price: 250, covers: "Model changes and answer-quality checks, plus usage at cost" },
] as const;

/** Rewriting AI-generated copy in the client's voice, per page. */
export const CONTENT_PASS_PER_PAGE = 40;
