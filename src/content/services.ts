// Service landing pages (/services/[slug]). Each page targets one search intent, so keep the
// copy specific to that service. Prices and timelines mirror src/lib/pricing.ts.

export type Service = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: [string, string];
  lede: string;
  from: string;
  timeline: string;
  stack: string;
  forCompanies: string;
  forFounders: string;
  includes: readonly { title: string; body: string }[];
  /** Names of LAB products that demonstrate this service. */
  proof: readonly string[];
  faqs: readonly { q: string; a: string }[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: "web-development",
    name: "Website development",
    metaTitle: "Website design & development in Ghana",
    metaDescription:
      "Fast, beautifully designed websites for companies, startups and personal brands, built in Accra by Biibisoft. Marketing sites and CMS websites from $1,200, live in about three weeks.",
    eyebrow: "Websites",
    heading: ["Websites that load fast and", "read beautifully."],
    lede: "A website is often the first conversation someone has with your business. We design and build marketing sites, company websites and content-managed sites that are quick, easy to update and built to be found on Google.",
    from: "$1,200",
    timeline: "About 3 weeks",
    stack: "Next.js · Tailwind CSS · MDX / headless CMS",
    forCompanies:
      "A corporate website that reflects the standard of your work, with a CMS your marketing team can update without a developer.",
    forFounders:
      "A launch site or landing page that makes a small brand look established, ready to collect leads, bookings or payments.",
    includes: [
      { title: "Design that fits your brand", body: "Layouts composed around your content and identity, not a recycled template." },
      { title: "Built for search", body: "Clean markup, metadata, sitemaps, structured data and fast load times from day one." },
      { title: "Editable content", body: "Update pages, posts and images yourself through a simple content manager." },
      { title: "Mobile first", body: "Every page designed and tested for phones, where most of your visitors arrive." },
      { title: "Forms & integrations", body: "Enquiry forms, WhatsApp, newsletters, analytics and payments wired in." },
      { title: "Launch & handover", body: "Domain, hosting and SSL set up, with a walkthrough so you're confident running it." },
    ],
    proof: ["Stella Teaches Typing", "Pongo Pad"],
    faqs: [
      {
        q: "How much does a website cost in Ghana?",
        a: "Our websites start from $1,200 for a polished marketing or company site. The final price depends on the number of pages, the level of custom design and any extras like payments or a CMS. Our online estimator gives you an itemised figure in a couple of minutes.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A typical website goes from agreed scope to live in about three weeks. Fast-track delivery is available if you have a launch date to hit.",
      },
      {
        q: "Will I be able to update the website myself?",
        a: "Yes. We can set your site up with a content manager so you can edit text, images and posts without touching code, and we walk you through it at handover.",
      },
      {
        q: "Do you work with clients outside Ghana?",
        a: "Yes. We're based in Accra and work with companies and individuals anywhere, over WhatsApp, email and video calls.",
      },
    ],
  },
  {
    slug: "web-app-development",
    name: "Web app development",
    metaTitle: "Web application development",
    metaDescription:
      "Custom web applications, SaaS platforms, dashboards and portals with roles, payments and real-time data. Built by Biibisoft in Accra, Ghana, from $1,500.",
    eyebrow: "Web apps",
    heading: ["Web apps for real", "workflows."],
    lede: "When a spreadsheet, a WhatsApp group or an off-the-shelf tool stops being enough, we build the system your business actually runs on: customer portals, internal tools, marketplaces and SaaS products.",
    from: "$1,500",
    timeline: "About 6 weeks",
    stack: "Next.js · TypeScript · PostgreSQL",
    forCompanies:
      "Internal tools, client portals and dashboards that replace manual processes, with the roles and permissions your teams need.",
    forFounders:
      "Your SaaS or marketplace idea turned into a first version real customers can sign up to and pay for.",
    includes: [
      { title: "Accounts & permissions", body: "Sign-up, Google sign-in, teams and role-based access done properly." },
      { title: "Payments", body: "Paystack, Stripe, Flutterwave and Mobile Money for checkouts, deposits and subscriptions." },
      { title: "Admin dashboards", body: "Manage users, orders, content and reports from one place." },
      { title: "Real-time features", body: "Live updates, notifications and collaboration where your workflow needs them." },
      { title: "Email & SMS", body: "Transactional emails, alerts and receipts that reach customers reliably." },
      { title: "Weekly releases", body: "A working staging link every week, so you see progress instead of waiting for a big reveal." },
    ],
    proof: ["Selltns", "Booktns", "Pidaso"],
    faqs: [
      {
        q: "What is the difference between a website and a web app?",
        a: "A website mostly presents information. A web app lets people do things: sign in, place orders, make bookings, manage data or collaborate. Web apps need accounts, databases and business logic, which is why they take longer to build.",
      },
      {
        q: "How much does it cost to build a web app?",
        a: "Web apps start from $1,500 for a focused first version. Modules like payments, admin dashboards and real-time features are priced individually, and you can see the full breakdown in our estimator.",
      },
      {
        q: "Can you build an MVP for my startup?",
        a: "Yes. We help founders scope a first version around the features that prove the idea, so you can launch, learn from real users and grow from there.",
      },
      {
        q: "Do you accept Mobile Money payments in the apps you build?",
        a: "Yes. Our own products, like Selltns and Booktns, take Mobile Money and bank payments, and we bring the same integrations to client projects.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile app development",
    metaTitle: "Mobile app development for iOS & Android",
    metaDescription:
      "iOS and Android app development by Biibisoft in Accra, Ghana. We design, build and publish your app to the App Store and Google Play, from $1,500.",
    eyebrow: "Mobile",
    heading: ["iOS and Android apps,", "shipped to the stores."],
    lede: "We design and build mobile apps for iPhone and Android from one codebase, then take care of the part most people dread: getting it approved and published on the App Store and Google Play.",
    from: "$1,500",
    timeline: "About 8 weeks",
    stack: "React Native · Expo · Firebase",
    forCompanies:
      "Customer and staff apps published under your own developer accounts, with analytics and push notifications built in.",
    forFounders:
      "No developer accounts yet? We can publish your app under the Biibisoft umbrella and transfer it to you later.",
    includes: [
      { title: "One codebase, two platforms", body: "A native-feeling app for both iOS and Android without paying twice." },
      { title: "Store submission handled", body: "Screenshots, listings, privacy declarations and review back-and-forth, done for you." },
      { title: "Push notifications", body: "Reach users with reminders, updates and alerts directly on their phones." },
      { title: "Payments & accounts", body: "Sign-in, profiles and in-app payments integrated end to end." },
      { title: "Analytics", body: "See how people use your app, so every update is based on real behaviour." },
      { title: "Updates after launch", body: "Ongoing releases and compliance with each store's yearly requirements." },
    ],
    proof: [],
    faqs: [
      {
        q: "How much does it cost to build a mobile app?",
        a: "Mobile apps start from $1,500 for a focused first version on both iOS and Android. Features like payments, real-time chat and admin dashboards add to that, and the estimator shows the exact breakdown.",
      },
      {
        q: "Do I need my own Apple and Google developer accounts?",
        a: "Not necessarily. You can publish under your own accounts (Apple charges $99 a year, Google $25 once), or under the Biibisoft umbrella for a $50 publishing fee, with the option to transfer the app to your accounts later.",
      },
      {
        q: "How long does App Store approval take?",
        a: "Apple usually reviews apps within one to three business days and Google Play within a few days. Rejections on a first Apple submission are common, and we handle resubmissions at no extra cost.",
      },
      {
        q: "Can you build for both iPhone and Android at the same time?",
        a: "Yes. We build with React Native, so one codebase produces both an iOS and an Android app.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom software development",
    metaTitle: "Custom & enterprise software development",
    metaDescription:
      "Custom software for organisations: enterprise platforms, real-time dashboards, integrations and internal systems built to scale. Biibisoft, Accra, Ghana.",
    eyebrow: "Custom",
    heading: ["Software shaped around", "how you operate."],
    lede: "Some problems don't fit a product you can buy. We build bespoke platforms, integrations and real-time systems for organisations, with the engineering discipline our team brought from companies like Slack, Google and Andela.",
    from: "$3,000",
    timeline: "About 10 weeks",
    stack: "Next.js · Go · Docker · AWS",
    forCompanies:
      "Platforms that connect your existing systems, automate operations and give leadership live visibility.",
    forFounders:
      "A technically ambitious product, built on foundations that will hold when it takes off.",
    includes: [
      { title: "Discovery & architecture", body: "We map your processes and design a system that fits, before any code is written." },
      { title: "Integrations", body: "Connect accounting, payments, CRMs and legacy systems through clean APIs." },
      { title: "Real-time dashboards", body: "Live operational data for the people who make decisions." },
      { title: "Cloud infrastructure", body: "Containerised, monitored deployments on AWS or the cloud of your choice." },
      { title: "Security & access", body: "Roles, audit trails and secrets management designed in, not bolted on." },
      { title: "Documentation & handover", body: "Clear docs and knowledge transfer so your team can own it." },
    ],
    proof: ["Pidaso", "Termite"],
    faqs: [
      {
        q: "When should we build custom software instead of buying a product?",
        a: "When your process is a competitive advantage, when off-the-shelf tools force workarounds, or when you need several systems to work together. We'll tell you honestly if an existing product would serve you better.",
      },
      {
        q: "How much does custom software cost?",
        a: "Custom projects start from $3,000. Because every system is different, we scope each one with an itemised estimate before work begins.",
      },
      {
        q: "Can you work with our existing systems and team?",
        a: "Yes. We regularly integrate with existing tools and can work alongside your in-house engineers, then hand over with full documentation.",
      },
    ],
  },
  {
    slug: "ai-integration",
    name: "AI integration & automation",
    metaTitle: "AI integration & automation for businesses",
    metaDescription:
      "Bring AI into your business: assistants, RAG chatbots trained on your documents, automation and LLM features in your apps. Built by Biibisoft in Accra, Ghana.",
    eyebrow: "AI systems",
    heading: ["AI that knows", "your business."],
    lede: "We help organisations put AI to work in ways that are useful and safe: assistants that answer from your own documents, automations that remove repetitive work, and AI features built into the products your customers already use.",
    from: "+$500 as a module",
    timeline: "From 3 weeks",
    stack: "LLMs · RAG · Embeddings · Vector search",
    forCompanies:
      "Internal knowledge assistants, document processing and workflow automation, grounded in your data and access rules.",
    forFounders:
      "An AI-powered product or feature, scoped so it's reliable enough to put in front of customers.",
    includes: [
      { title: "AI readiness review", body: "We find where AI will genuinely save time or money, and where it won't." },
      { title: "Assistants on your data", body: "Chatbots and search that answer from your documents, policies and knowledge base (RAG)." },
      { title: "Workflow automation", body: "Summarising, classifying, drafting and data entry handled by AI with human review." },
      { title: "AI inside your product", body: "LLM features added to new or existing web and mobile apps." },
      { title: "Privacy & guardrails", body: "Access controls, sensible data handling and evaluation so answers stay accurate." },
      { title: "Team enablement", body: "Training and documentation so your people use the tools well." },
    ],
    proof: [],
    faqs: [
      {
        q: "How can AI help my business?",
        a: "Common wins include answering staff and customer questions from your own documents, drafting and summarising, sorting and extracting data from files, and automating repetitive admin. We start by identifying the tasks where AI will make a measurable difference.",
      },
      {
        q: "What is a RAG chatbot?",
        a: "Retrieval-augmented generation (RAG) lets an AI assistant look up answers in your own documents before responding, so it gives answers grounded in your information rather than guessing.",
      },
      {
        q: "Is our data safe when using AI?",
        a: "We design AI systems with access controls and careful data handling, choose providers whose terms suit your requirements, and keep sensitive information out of places it shouldn't go.",
      },
      {
        q: "Can you add AI to an app we already have?",
        a: "Yes. AI features can be added to existing web and mobile apps as a module, or we can build a standalone AI tool around your workflow.",
      },
    ],
  },
  {
    slug: "vibe-code-rescue",
    name: "Finish your vibe-coded app",
    metaTitle: "Finish your AI-built app: vibe coding rescue",
    metaDescription:
      "Started your app with Lovable, Bolt, v0, Cursor or Replit and got stuck? Biibisoft fixes, secures and launches AI-built web apps, mobile apps and AI agents. Code checks from $100.",
    eyebrow: "Vibe code rescue",
    heading: ["You built most of it.", "We'll finish it."],
    lede: "AI tools get you a long way fast, then stall on the hard parts: real sign-in, payments, security, deployment and the bugs that multiply with every prompt. We take your project as it is, fix what's broken and get it live, without starting over.",
    from: "$100 code check",
    timeline: "2–4 weeks to launch",
    stack: "Whatever you built it in",
    forCompanies:
      "An internal tool or prototype someone vibe-coded that's now business-critical, made reliable, secure and maintainable.",
    forFounders:
      "Your AI-built MVP taken from 'works on my laptop' to live, with real users, payments and a codebase you can keep building on.",
    includes: [
      { title: "Code check first", body: "From $100 for a website to $300 for an AI agent. We run your project, review the code and send a written report, a grade and a fixed quote. Credited if you continue." },
      { title: "Bugs fixed properly", body: "We find the root cause instead of patching symptoms, so fixes stop breaking other things." },
      { title: "Real backend", body: "Sign-in, database, file storage and payments wired up properly, not mocked." },
      { title: "Security pass", body: "API keys out of the code, data access locked down and common AI-generated holes closed." },
      { title: "Deployed & live", body: "Your domain, hosting and SSL, or App Store and Play Store submission, handled." },
      { title: "Priced by grade", body: "Nearly done (A) costs about 35% of a fresh build, partly built (B) about 65%. Mostly unusable (C) is quoted as a rebuild, and we'll tell you if that's the better deal." },
    ],
    proof: [],
    faqs: [
      {
        q: "Can you finish an app I started with Lovable, Bolt, v0, Cursor or Replit?",
        a: "Yes. We work with projects built in any AI coding tool. As long as we can access the code, we can pick it up, fix what's broken and take it to launch.",
      },
      {
        q: "Will you make me start from scratch?",
        a: "Almost never. Most AI-built projects have a usable foundation. We keep what works and rebuild only the parts that are unsafe or holding you back, and the code check tells you which is which before you spend more.",
      },
      {
        q: "How much does it cost to finish a vibe-coded app?",
        a: "It depends on how far along it is and what it is. A code check ($100 for a website, $150 for a web app, $250 for a mobile app, $300 for an AI agent) grades the project. A nearly-done project costs about 35% of a fresh build and a partly-built one about 65%, with fixed extras for app store submission and AI guardrails. The check fee is credited if you go ahead.",
      },
      {
        q: "Is my AI-generated code safe to launch?",
        a: "Often not yet. Common issues include API keys exposed in the browser, databases anyone can read and missing permission checks. Our security pass finds and fixes these before real users arrive.",
      },
      {
        q: "What if you find more problems, or I think of new features, midway?",
        a: "Every quote has a written list of what 'done' means and a buffer for small surprises. If we uncover something bigger, we stop, explain it and quote it before doing it. New features are priced from our standard module list, so nothing lands on your bill unannounced.",
      },
      {
        q: "Can I keep using AI tools after you've finished?",
        a: "Yes. We hand back clean, documented code so you and your AI tools can keep building on it, and we're on hand if you get stuck again.",
      },
    ],
  },
  {
    slug: "hire-developers",
    name: "Hire software developers",
    metaTitle: "Hire software developers & engineering teams",
    metaDescription:
      "Hire senior software developers from Biibisoft. Engineers who have shipped at Slack, Google and Andela join your roadmap for web, mobile and AI work.",
    eyebrow: "Team extension",
    heading: ["Senior engineers,", "without the hiring cycle."],
    lede: "Need more hands on your roadmap? Bring in Biibisoft engineers who have shipped at companies like Slack, Google and Andela. We plug into your tools and rituals and ship from week one.",
    from: "Scoped per engagement",
    timeline: "Start within weeks",
    stack: "TypeScript · React · React Native · Go · Cloud",
    forCompanies:
      "Extra senior capacity for a launch, a backlog or a new product line, without months of recruiting.",
    forFounders:
      "A technical partner for the stretch between idea and your first in-house hire.",
    includes: [
      { title: "Senior by default", body: "Engineers used to production systems at scale, not juniors learning on your project." },
      { title: "Works your way", body: "Your repo, your tracker, your stand-ups. We adapt to how your team already operates." },
      { title: "Full-stack coverage", body: "Web, mobile, backend, cloud and AI from one partner." },
      { title: "Flexible scope", body: "A single project, an ongoing retainer, or a team that grows and shrinks with your roadmap." },
      { title: "Clear communication", body: "Written updates, weekly demos and fast replies on WhatsApp or email." },
      { title: "Knowledge transfer", body: "Documentation and handover so the work stays with you." },
    ],
    proof: ["Pidaso", "Selltns", "Booktns"],
    faqs: [
      {
        q: "Why hire Biibisoft instead of freelancers?",
        a: "You get a team that has shipped at Slack, Google and Andela, and runs its own products, with shared standards, code review and continuity, rather than a single person working alone.",
      },
      {
        q: "How quickly can your developers start?",
        a: "Once we've agreed scope, we can usually start within a few weeks.",
      },
      {
        q: "Can you work in our time zone?",
        a: "We're based in Accra (GMT) and overlap comfortably with working hours in Europe and the Americas' mornings.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/** General questions shown on the homepage (and marked up as FAQPage). */
export const GENERAL_FAQS = [
  {
    q: "What does Biibisoft do?",
    a: "Biibisoft is a software development studio in Accra, Ghana. We design and build websites, web apps, mobile apps, custom software and AI systems for companies and individuals, and we run six products of our own.",
  },
  {
    q: "Do you work with startups and individuals, or only companies?",
    a: "Both. We work with established companies that need senior engineering capacity, and with first-time founders and small businesses who need a partner to take an idea from sketch to launch.",
  },
  {
    q: "How much does it cost to build software with Biibisoft?",
    a: "Websites start from $1,200, web and mobile apps from $1,500, and custom software from $3,000. Our online estimator gives you an itemised quote and a downloadable PDF in a couple of minutes.",
  },
  {
    q: "Can you finish an app I started building with AI tools?",
    a: "Yes. If you vibe-coded a project with Lovable, Bolt, v0, Cursor or Replit and got stuck, a code check from $100 grades it, and finishing costs a share of a fresh build depending on how far along it is. We fix, secure and launch it without starting over.",
  },
  {
    q: "Can Biibisoft help our organisation adopt AI?",
    a: "Yes. We build AI assistants that answer from your own documents, automate repetitive work, and add AI features to new and existing apps, with guardrails around your data.",
  },
  {
    q: "How do I start a project?",
    a: "Message us on WhatsApp or email with a few lines about what you need (a voice note works too), or use the estimator on our Hire us page. We reply within 24 hours, usually much sooner.",
  },
] as const;
