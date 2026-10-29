// Homepage copy and lists. Edit here — the section components only render it.

/** The strip under the hero: what every client can count on, whatever the size of the job. */
export const PROMISES = [
  { word: "Upfront.", line: "See the price before you commit. Our estimator shows its working." },
  { word: "Weekly.", line: "A working link every week. Progress you can click, not just hear about." },
  { word: "Plain.", line: "Updates in plain English. Jargon available on request." },
  { word: "Yours.", line: "Your code, your app, your call. We just build it really well." },
] as const;

export const STACK = [
  "Next.js",
  "TypeScript",
  "React Native",
  "Expo",
  "Go",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Firebase",
  "LLMs + RAG",
] as const;

export const CRAFTS = [
  {
    name: "Websites",
    slug: "web-development",
    desc: "Sites that load fast, read beautifully and get found on Google.",
    tech: "Next.js · Tailwind · MDX",
    from: "From $1,200",
  },
  {
    name: "Web apps",
    slug: "web-app-development",
    desc: "For when the spreadsheet (or the WhatsApp group) has finally had enough.",
    tech: "Next.js · TypeScript · PostgreSQL",
    from: "From $1,500",
  },
  {
    name: "Mobile",
    slug: "mobile-app-development",
    desc: "iPhone and Android apps, from first sketch to the App Store and Google Play.",
    tech: "React Native · Expo · Firebase",
    from: "From $1,500",
  },
  {
    name: "Custom",
    slug: "custom-software-development",
    desc: "Platforms, integrations and live dashboards for problems no off-the-shelf tool fits.",
    tech: "Next.js · Go · Docker · AWS",
    from: "From $3,000",
  },
  {
    name: "AI systems",
    slug: "ai-integration",
    desc: "Assistants and automations that answer from your own data, not from wild guesses.",
    tech: "LLMs · RAG · Embeddings",
    from: "Add-on",
  },
] as const;

/** Companies our people have built at. */
export const PEDIGREE = ["Slack", "Google", "Andela", "Massenergize", "Pidaso"] as const;

/** Organisations we have built with. */
export const WORK = [
  { name: "Massenergize", monogram: "Me" },
  { name: "SkilledHQ", monogram: "Sk" },
  { name: "New Fire Radio", monogram: "Nf" },
  { name: "Pidaso", monogram: "Pd" },
  { name: "Royal Cephas", monogram: "Rc" },
  { name: "Community Learning Initiative", monogram: "Cl" },
  { name: "Kehillah", monogram: "Kh" },
] as const;

/** Biibisoft Lab — products we design, ship and run ourselves. Copy summarises each live site. */
export const LAB = [
  {
    name: "Pidaso",
    url: "https://pidaso.com",
    domain: "pidaso.com",
    category: "Business suite",
    platform: "Web",
    pitch: "Payroll, accounting, sales and HR: eight apps running on one shared set of books.",
    points: [
      "Payroll with PAYE and pensions, posted straight to the ledger",
      "Double-entry accounting, invoices, bills and reports",
      "Sales, CRM, people, time tracking and expense claims",
    ],
    note: "Trusted by Kehillah, SkilledHQ and CLI",
  },
  {
    name: "Selltns",
    url: "https://selltns.com",
    domain: "selltns.com",
    category: "Commerce",
    platform: "Web",
    pitch: "Moves a WhatsApp shop onto its own storefront link, with Mobile Money checkout.",
    points: ["Mobile Money and bank payments", "Pre-orders with deposits", "Staff logins and custom domains"],
  },
  {
    name: "Booktns",
    url: "https://booktns.com",
    domain: "booktns.com",
    category: "Bookings",
    platform: "Web",
    pitch: "Online booking and storefronts for Ghana's hair, nail, lash and skin businesses.",
    points: ["Availability checked against staff schedules", "Deposits in cedis with reference codes", "Email and SMS alerts both ways"],
  },
  {
    name: "Stella Teaches Typing",
    url: "https://stellateachestyping.com",
    domain: "stellateachestyping.com",
    category: "Education",
    platform: "Web",
    pitch: "Learn to type without looking, coached by Stella through a course, game worlds and live races.",
    points: ["Guided classroom with on-screen hands", "Live races for up to eight players", "QWERTY, AZERTY, Dvorak and Colemak"],
  },
  {
    name: "Termite",
    url: "https://termite.site",
    domain: "termite.site",
    category: "Developer tools",
    platform: "macOS",
    pitch: "A native Mac terminal where every tab is named, grouped and searchable.",
    points: ["Sidebar tabs that show what's running", "A Touch ID vault for secrets", "Workspaces and session restore"],
  },
  {
    name: "Pongo Pad",
    url: "https://pongo-pad.web.app/",
    domain: "Pongo Pad for Chrome",
    category: "Productivity",
    platform: "Chrome extension",
    pitch: "Your day, floating over every page: to-dos, a focus timer, notes and links in one pad.",
    points: ["Type @org, #label or ~30m to file tasks", "Weekly recaps and printable reports", "Private by default, no account needed"],
  },
] as const;

/** Who we build for — the two audiences the homepage and hire-us speak to. */
export const AUDIENCES = [
  {
    id: "companies",
    eyebrow: "For companies & teams",
    title: "Extra senior hands, without the hiring cycle.",
    body: "Engineers who have shipped inside Slack, Google and Andela, plugged into your roadmap. Bring us a new product, a platform overhaul, or the backlog that's been 'next sprint' since last year.",
    points: [
      "Itemised estimates you can take to procurement",
      "Weekly releases on a staging link you can review",
      "Clean, documented handover to your in-house team",
      "Web, mobile, internal tools and AI on one bill",
    ],
    cta: "Request a proposal",
  },
  {
    id: "founders",
    eyebrow: "For founders & individuals",
    title: "An idea, no team yet? Start here.",
    body: "A side project, a first startup or a small business going online: we help you shape the idea, fit it to your budget and launch it, explaining every decision in plain language. No question is too basic.",
    points: [
      "Start from an idea, a sketch or a voice note",
      "A first version scoped to fit your budget",
      "Updates you can read without a dictionary",
      "We can publish your app under Biibisoft until you're ready",
    ],
    cta: "Chat with us on WhatsApp",
  },
] as const;

export const ROUTE = ["Scope", "Shape", "Ship weekly", "Launch & grow"] as const;

/** The finish-line offer — for people who started building (often with AI tools) and got stuck.
 *  Prices come from src/lib/pricing.ts; this is only the copy. */
export const FINISH_LINE = {
  tools: ["Lovable", "Bolt", "v0", "Cursor", "Replit", "Claude Code"],
  signs: [
    "It works on your laptop, but not once it's online",
    "Every fix the AI makes breaks something else",
    "Login, payments or the database are only half wired",
    "You're not sure it's safe to put real users on it",
    "The App Store or Play Store keeps rejecting it",
  ],
  /** How a rescue is scoped so hidden gaps and new asks never turn into surprise bills. */
  terms: [
    { title: "A written 'done' list", body: "The fixed price covers exactly what's on it. Anything else is a change, priced before we start it." },
    { title: "Buffer built in", body: "Every quote carries room for the small surprises, so you don't hear about them." },
    { title: "Big finds, quoted first", body: "If we uncover something the check couldn't see, we stop, explain it and quote it. You decide." },
    { title: "A code freeze", body: "No AI edits to the main code while we work, so your next prompt doesn't undo our fixes." },
    { title: "Paid in milestones", body: "Half to start, half at launch. Larger jobs split 40/40/20." },
  ],
} as const;
