// Homepage copy and lists. Edit here — the section components only render it.

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
    desc: "Polished static or CMS-backed marketing sites that load fast and read beautifully.",
    tech: "Next.js · Tailwind · MDX",
    from: "From $1,200",
  },
  {
    name: "Web apps",
    desc: "Interactive systems with complex roles, data and workflows.",
    tech: "Next.js · TypeScript · PostgreSQL",
    from: "From $1,500",
  },
  {
    name: "Mobile",
    desc: "Native iOS and Android apps, shipped to the App Store and Google Play.",
    tech: "React Native · Expo · Firebase",
    from: "From $1,500",
  },
  {
    name: "Custom",
    desc: "Enterprise software and real-time dashboards built for scale.",
    tech: "Next.js · Go · Docker · AWS",
    from: "From $3,000",
  },
  {
    name: "AI systems",
    desc: "Assistants, RAG pipelines and embeddings grounded in your own data.",
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
] as const;

export const ROUTE = ["Scope", "Shape", "Ship weekly", "Launch & grow"] as const;
