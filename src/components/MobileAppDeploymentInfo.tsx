"use client";

import { Check, ChevronDown } from "lucide-react";

type DeployOptionId = "own-brand" | "biibisoft-umbrella";

// ─── Store comparison data ────────────────────────────────────────────────────
const STORE_INFO = [
  {
    id: "apple",
    name: "Apple App Store",
    review: "1–3 business days",
    reviewNote: "Average ~24–48 hrs. Complex apps or those with in-app purchases / health features may take 5–7 days.",
    accountCost: "$99 / year",
    requiredFields: [
      "App name & subtitle",
      "Bundle ID (unique reverse-domain)",
      "App description & keywords",
      "Screenshots — 6.5\" (iPhone), 5.5\" (legacy), iPad sizes",
      "App icon (1024×1024 px, no alpha)",
      "Privacy Policy URL (mandatory for all apps)",
      "Support URL",
      "Age rating questionnaire",
      "Primary & secondary categories",
      "Privacy Nutrition Labels (data collection declaration)",
    ],
    approvalCriteria: [
      "No use of private/undocumented Apple APIs",
      "App must not crash on review devices",
      "Accurate metadata — no keyword stuffing",
      "Privacy Manifest file required (as of 2024)",
      "All in-app purchase items must be reviewable",
      "Complies with App Store Review Guidelines 4.x",
      "No misleading UI or dark patterns",
    ],
    notes: "Apple reviews are more stringent. Expect at least one rejection on first submission — this is normal. We handle resubmission at no extra cost.",
  },
  {
    id: "google",
    name: "Google Play Store",
    review: "1–3 days",
    reviewNote: "Automated checks are near-instant. Human policy review averages 2 hrs for simple apps. First-time submissions may take longer.",
    accountCost: "$25 one-time",
    requiredFields: [
      "Package name (unique, cannot be changed after publish)",
      "App title & short description (80 chars max)",
      "Full description (4,000 chars max)",
      "Screenshots — phone, 7\" tablet, 10\" tablet",
      "Feature graphic (1024×500 px)",
      "App icon (512×512 px)",
      "Privacy Policy URL",
      "Content rating questionnaire (IARC)",
      "Data Safety form (data collection & sharing declarations)",
      "Target SDK / API level (must meet annual minimum requirements)",
    ],
    approvalCriteria: [
      "Signed APK or Android App Bundle (AAB) — AAB strongly preferred",
      "Target API level meets Google's current minimum (raised annually)",
      "No prohibited content (malware, spyware, hate speech, etc.)",
      "Data Safety form accurately reflects app behavior",
      "In-app billing uses Google Play Billing Library",
      "Complies with Google Play Developer Program Policies",
      "64-bit support required for all native code",
    ],
    notes: "Google Play is generally faster to approve but enforces a strict annual API level upgrade. We keep your app compliant year-over-year.",
  },
] as const;

// ─── Deployment option data ───────────────────────────────────────────────────
const DEPLOY_OPTIONS = [
  {
    id: "own-brand",
    label: "Option A",
    title: "Under your own brand",
    subtitle: "Full ownership & autonomy",
    description:
      "Your company registers its own Apple Developer Program and Google Play Console accounts. The app is published under your organisation’s name, giving you full control over your developer presence, revenue and analytics.",
    highlights: [
      "App published under your company name & identity",
      "You own all developer accounts & certificates",
      "Full access to App Store Connect & Play Console analytics",
      "Biibisoft handles all technical submission tasks",
      "You pay Apple ($99/yr) & Google ($25 once) directly",
    ],
    costNote: "Accounts are yours. Our development & submission work is covered in your quote.",
    tag: "For established brands",
  },
  {
    id: "biibisoft-umbrella",
    label: "Option B",
    title: "Under the Biibisoft umbrella",
    subtitle: "Fast-track, zero account setup",
    description:
      "We publish your app under the Biibisoft developer namespace. You skip account registration entirely — ideal for startups, MVPs, or anyone who wants to go live quickly without the admin.",
    highlights: [
      "$50 for your first app published under Biibisoft",
      "+$10 per additional app in the same Biibisoft space",
      "No Apple or Google account required on your side",
      "Fastest path to launch — we handle everything",
      "App transfer to your own account available later",
    ],
    costNote: "First app: $50 · Each additional app: +$10",
    tag: "For startups & MVPs",
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13px] leading-snug text-taupe">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function StoreCard({ store }: { store: (typeof STORE_INFO)[number] }) {
  return (
    <div className="rounded-2xl bg-linen p-5">
      <h4 className="font-serif text-[26px] leading-none">{store.name}</h4>
      <dl className="mt-4 text-sm">
        {[
          ["Review", store.review],
          ["Developer account", store.accountCost],
          ["Required fields", String(store.requiredFields.length)],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-obsidian/10 py-2.5">
            <dt className="text-stone">{label}</dt>
            <dd className="text-right font-mono text-[13px]">{value}</dd>
          </div>
        ))}
      </dl>

      <details className="group mt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
          Requirements & approval criteria
          <ChevronDown className="h-4 w-4 text-brass transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-5 pb-1 pt-3">
          <p className="border-l-2 border-brass pl-3 text-[13px] italic leading-relaxed text-taupe">
            {store.reviewNote}
          </p>
          <div>
            <p className="eyebrow mb-2.5 text-[10px] text-stone">Submission fields</p>
            <CheckList items={store.requiredFields} />
          </div>
          <div>
            <p className="eyebrow mb-2.5 text-[10px] text-stone">Approval criteria</p>
            <CheckList items={store.approvalCriteria} />
          </div>
          <p className="rounded-xl bg-white px-4 py-3 text-[13px] leading-relaxed text-taupe">{store.notes}</p>
        </div>
      </details>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
interface MobileAppDeploymentInfoProps {
  step: number;
  selectedDeployOption: DeployOptionId | null;
  onDeployOptionChange: (id: DeployOptionId) => void;
}

export default function MobileAppDeploymentInfo({
  step,
  selectedDeployOption,
  onDeployOptionChange,
}: MobileAppDeploymentInfoProps) {
  return (
    <div className="animate-fade-up rounded-[24px] border border-obsidian/10 bg-white p-5 sm:p-8">
      <div className="mb-3 flex items-baseline gap-4">
        <span className="font-mono text-xs text-brass">0{step}</span>
        <h3 className="font-serif text-[28px] leading-none">App store publishing</h3>
      </div>
      <p className="mb-7 max-w-xl text-[15px] leading-relaxed text-taupe">
        Every mobile app needs a developer account on each store, and each store reviews it differently.
        Choose how you&apos;d like to publish; we handle the submission either way.
      </p>

      {/* ── Publishing options ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {DEPLOY_OPTIONS.map((option) => {
          const on = selectedDeployOption === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onDeployOptionChange(option.id)}
              className={`option-btn flex flex-col gap-4 p-5${on ? " selected" : ""}`}
              aria-pressed={on}
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-brass">{option.label}</span>
                  <span className="mt-1.5 block text-[17px] font-medium leading-tight">{option.title}</span>
                  <span className="mt-0.5 block text-[13px] text-stone">{option.subtitle}</span>
                </div>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${on ? "border-obsidian bg-obsidian" : "border-obsidian/20"}`}
                >
                  {on && <Check className="h-3 w-3 text-champagne" strokeWidth={3} />}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-taupe">{option.description}</p>
              <CheckList items={option.highlights} />
              <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-2 border-t border-obsidian/10 pt-4">
                <span className="font-mono text-xs text-obsidian">{option.costNote}</span>
                <span className="rounded-full bg-linen px-2.5 py-1 text-[11px] text-stone">{option.tag}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedDeployOption && (
        <p className="mt-4 animate-fade-in rounded-2xl bg-obsidian px-5 py-4 text-[13px] leading-relaxed text-mist" aria-live="polite">
          {selectedDeployOption === "biibisoft-umbrella" ? (
            <>
              <strong className="font-medium text-champagne">Biibisoft umbrella.</strong> A $50 publishing fee is
              added for your first app, and $10 for each additional app under the Biibisoft namespace. No developer
              accounts needed from you.
            </>
          ) : (
            <>
              <strong className="font-medium text-champagne">Your own brand.</strong> You&apos;ll register Apple
              Developer ($99/yr) and Google Play ($25 once). We guide you through setup and handle all technical
              submission work.
            </>
          )}
        </p>
      )}

      {/* ── Store comparison ───────────────────────────────────────────── */}
      <p className="eyebrow mb-3 mt-9 text-[11px] text-stone">How each store reviews</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {STORE_INFO.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}
