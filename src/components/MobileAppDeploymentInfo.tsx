"use client";

import React, { useState } from "react";
import {
  Apple,
  ShoppingBag,
  Clock,
  FileText,
  ShieldCheck,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Building2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";

// ─── Store comparison data ────────────────────────────────────────────────────
const STORE_INFO = [
  {
    id: "apple",
    icon: Apple,
    name: "Apple App Store",
    color: "#555",
    gradientFrom: "rgba(100,100,110,0.08)",
    gradientTo: "rgba(80,80,90,0.03)",
    borderColor: "rgba(100,100,110,0.18)",
    accentColor: "#6e6e73",
    review: "1–3 business days",
    reviewNote: "Average ~24–48 hrs. Complex apps or those with in-app purchases / health features may take 5–7 days.",
    accountCost: "$99 / year",
    accountLink: "Apple Developer Program",
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
    noteType: "warning" as const,
  },
  {
    id: "google",
    icon: ShoppingBag,
    name: "Google Play Store",
    color: "#34a853",
    gradientFrom: "rgba(52,168,83,0.07)",
    gradientTo: "rgba(52,168,83,0.02)",
    borderColor: "rgba(52,168,83,0.18)",
    accentColor: "#34a853",
    review: "1–3 days",
    reviewNote: "Automated checks are near-instant. Human policy review averages 2 hrs for simple apps. First-time submissions may take longer.",
    accountCost: "$25 one-time",
    accountLink: "Google Play Console",
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
    noteType: "info" as const,
  },
] as const;

// ─── Deployment option data ───────────────────────────────────────────────────
const DEPLOY_OPTIONS = [
  {
    id: "own-brand",
    icon: Building2,
    label: "Option A",
    title: "Under Your Own Brand",
    subtitle: "Full ownership & autonomy",
    description:
      "Your company registers its own Apple Developer Program account and Google Play Console account. The app is published under your organisation's name — giving you full control over your developer presence, revenue, and analytics.",
    highlights: [
      "App published under your company name & identity",
      "You own all developer accounts & certificates",
      "Full access to App Store Connect & Play Console analytics",
      "Biibisoft handles all technical submission tasks",
      "You pay Apple ($99/yr) & Google ($25 once) directly",
    ],
    costNote: "Accounts are registered and owned by you. Biibisoft's development & submission work is covered in your project quote.",
    tag: "Recommended for established brands",
    tagColor: "brand-orange" as const,
    borderColor: "var(--accent-orange)",
    bgGradient: "rgba(249,115,22,0.06)",
    selected: false,
  },
  {
    id: "biibisoft-umbrella",
    icon: Sparkles,
    label: "Option B",
    title: "Under Biibisoft Umbrella",
    subtitle: "Fast-track, zero account setup",
    description:
      "We publish your app under the Biibisoft developer namespace. You skip the account registration process entirely — ideal for startups, MVPs, or clients who want to go live quickly without the administrative overhead.",
    highlights: [
      "$50 for your first app published under Biibisoft",
      "+$10 per additional app in the same Biibisoft space",
      "No Apple or Google account required on your side",
      "Fastest path to launch — we handle everything",
      "App transfer to your own account available later",
    ],
    costNote: "First app: $50 · Each additional app: +$10",
    tag: "Best for startups & MVPs",
    tagColor: "brand-emerald" as const,
    borderColor: "var(--accent-emerald)",
    bgGradient: "rgba(52,168,83,0.06)",
    selected: false,
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StoreCard({ store }: { store: (typeof STORE_INFO)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = store.icon;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: store.borderColor,
        background: `linear-gradient(135deg, ${store.gradientFrom}, ${store.gradientTo})`,
      }}
    >
      {/* Store header */}
      <div className="px-5 py-4 flex items-center gap-3">
        <div
          className="p-2 rounded-xl shrink-0"
          style={{ background: `${store.accentColor}18` }}
        >
          <Icon className="w-5 h-5" style={{ color: store.accentColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className="font-extrabold text-sm text-brand-text-title leading-tight"
          >
            {store.name}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-brand-text-muted shrink-0" />
            <span className="text-[11px] text-brand-text-muted font-semibold">
              Review: {store.review}
            </span>
          </div>
        </div>
        <div
          className="text-right shrink-0"
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted">Account</p>
          <p
            className="text-sm font-extrabold"
            style={{ color: store.accentColor }}
          >
            {store.accountCost}
          </p>
        </div>
      </div>

      {/* Quick stat pills */}
      <div className="px-5 pb-3 flex flex-wrap gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
          style={{ borderColor: store.borderColor, color: store.accentColor, background: `${store.accentColor}0d` }}
        >
          <Clock className="w-2.5 h-2.5" />
          {store.review}
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
          style={{ borderColor: store.borderColor, color: store.accentColor, background: `${store.accentColor}0d` }}
        >
          <CreditCard className="w-2.5 h-2.5" />
          {store.accountCost}
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
          style={{ borderColor: store.borderColor, color: store.accentColor, background: `${store.accentColor}0d` }}
        >
          <FileText className="w-2.5 h-2.5" />
          {store.requiredFields.length} required fields
        </span>
      </div>

      {/* Expandable details */}
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-3 text-[11px] font-bold uppercase tracking-widest border-t cursor-pointer"
        style={{
          borderColor: store.borderColor,
          color: store.accentColor,
          background: `${store.accentColor}06`,
          transition: "background-color 0.15s ease",
        }}
        aria-expanded={expanded}
      >
        <span>{expanded ? "Hide details" : "View requirements & criteria"}</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {expanded && (
        <div className="px-5 py-4 space-y-4" style={{ background: `${store.accentColor}04` }}>
          {/* Review time note */}
          <p className="text-[11px] text-brand-text-body leading-relaxed italic border-l-2 pl-3" style={{ borderColor: store.accentColor }}>
            {store.reviewNote}
          </p>

          {/* Required fields */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted mb-2 flex items-center gap-1.5">
              <FileText className="w-3 h-3" />
              Required Submission Fields
            </p>
            <ul className="space-y-1.5">
              {store.requiredFields.map((field) => (
                <li key={field} className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-3 h-3 shrink-0 mt-0.5"
                    style={{ color: store.accentColor }}
                  />
                  <span className="text-[11px] text-brand-text-body leading-snug">{field}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Approval criteria */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Approval Criteria
            </p>
            <ul className="space-y-1.5">
              {store.approvalCriteria.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-3 h-3 shrink-0 mt-0.5"
                    style={{ color: store.accentColor }}
                  />
                  <span className="text-[11px] text-brand-text-body leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Note */}
          <div
            className="flex items-start gap-2.5 p-3 rounded-xl"
            style={{
              background: store.noteType === "warning" ? "rgba(249,115,22,0.07)" : "rgba(52,168,83,0.07)",
              border: `1px solid ${store.noteType === "warning" ? "rgba(249,115,22,0.2)" : "rgba(52,168,83,0.2)"}`,
            }}
          >
            {store.noteType === "warning" ? (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-brand-orange" />
            ) : (
              <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#34a853" }} />
            )}
            <p className="text-[11px] text-brand-text-body leading-relaxed">{store.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DeployOptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: (typeof DEPLOY_OPTIONS)[number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = option.icon;
  const isOrange = option.tagColor === "brand-orange";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left w-full rounded-2xl border-2 p-5 flex flex-col gap-3 focus:outline-none cursor-pointer"
      style={{
        borderColor: isSelected ? option.borderColor : "var(--border-theme)",
        background: isSelected ? option.bgGradient : "var(--option-idle-bg)",
        boxShadow: isSelected ? `0 0 0 3px ${option.borderColor}18` : "none",
        transition: "border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
      }}
      aria-pressed={isSelected}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{
              background: isSelected ? `${option.borderColor}18` : "var(--input-bg)",
              color: isSelected ? option.borderColor : "var(--text-muted)",
              transition: "background-color 0.15s ease, color 0.15s ease",
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p
              className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: isSelected ? option.borderColor : "var(--text-muted)" }}
            >
              {option.label}
            </p>
            <h4
              className="font-extrabold text-sm text-brand-text-title leading-tight"
            >
              {option.title}
            </h4>
            <p className="text-[11px] text-brand-text-muted font-semibold">{option.subtitle}</p>
          </div>
        </div>
        <div
          className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5"
          style={{
            borderColor: isSelected ? option.borderColor : "var(--border-theme)",
            background: isSelected ? option.borderColor : "transparent",
            transition: "all 0.15s ease",
          }}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>

      {/* Description */}
      <p className="text-[12px] text-brand-text-body leading-relaxed">{option.description}</p>

      {/* Highlights */}
      <ul className="space-y-1.5">
        {option.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <CheckCircle2
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: isSelected ? option.borderColor : "var(--text-muted)" }}
            />
            <span className="text-[11px] text-brand-text-body leading-snug">{h}</span>
          </li>
        ))}
      </ul>

      {/* Cost note */}
      <div
        className="rounded-xl px-3 py-2 text-[11px] font-bold"
        style={{
          background: isSelected ? `${option.borderColor}10` : "var(--input-bg)",
          color: isSelected ? option.borderColor : "var(--text-muted)",
          border: `1px solid ${isSelected ? option.borderColor + "30" : "var(--border-theme)"}`,
          transition: "all 0.15s ease",
        }}
      >
        {option.costNote}
      </div>

      {/* Tag */}
      <span
        className="self-start text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
        style={{
          color: isOrange ? "var(--accent-orange)" : "var(--accent-emerald)",
          borderColor: isOrange ? "rgba(249,115,22,0.3)" : "rgba(52,168,83,0.3)",
          background: isOrange ? "rgba(249,115,22,0.07)" : "rgba(52,168,83,0.07)",
        }}
      >
        {option.tag}
      </span>
    </button>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
interface MobileAppDeploymentInfoProps {
  selectedDeployOption: "own-brand" | "biibisoft-umbrella" | null;
  onDeployOptionChange: (id: "own-brand" | "biibisoft-umbrella") => void;
}

export default function MobileAppDeploymentInfo({
  selectedDeployOption,
  onDeployOptionChange,
}: MobileAppDeploymentInfoProps) {
  return (
    <div
      className="rounded-2xl border border-brand-border-theme overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(249,115,22,0.04) 0%, transparent 60%)",
        animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      {/* Section header */}
      <div className="px-6 py-5 border-b border-brand-border-theme flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-orange border border-brand-orange/30 px-1.5 py-0.5 rounded-full">
              Mobile App Stores
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted border border-brand-border-theme px-1.5 py-0.5 rounded-full">
              Important Info
            </span>
          </div>
          <h3 className="text-base font-extrabold text-brand-text-title leading-tight">
            App Store Deployment Guide
          </h3>
          <p className="text-[12px] text-brand-text-body leading-relaxed mt-1 max-w-xl">
            Publishing a mobile app requires accounts on each platform's developer program.
            Review timelines, required assets, and approval criteria vary. Here's everything
            you need to know — and how Biibisoft can handle it for you.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* ── App Store Comparison ─────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted mb-4 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            Platform Review Process
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STORE_INFO.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>

        {/* ── Deployment Options ────────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted mb-1 flex items-center gap-1.5">
            <Building2 className="w-3 h-3" />
            Choose Your Publishing Option
          </p>
          <p className="text-[11px] text-brand-text-muted mb-4 leading-relaxed">
            Select how you'd like your app to be published on the App Stores. This will be reflected in your final quote.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEPLOY_OPTIONS.map((opt) => (
              <DeployOptionCard
                key={opt.id}
                option={opt}
                isSelected={selectedDeployOption === opt.id}
                onSelect={() => onDeployOptionChange(opt.id as "own-brand" | "biibisoft-umbrella")}
              />
            ))}
          </div>

          {/* Selection summary note */}
          {selectedDeployOption && (
            <div
              className="mt-4 flex items-start gap-2.5 p-3.5 rounded-xl border"
              style={{
                background: selectedDeployOption === "biibisoft-umbrella"
                  ? "rgba(52,168,83,0.06)"
                  : "rgba(249,115,22,0.06)",
                borderColor: selectedDeployOption === "biibisoft-umbrella"
                  ? "rgba(52,168,83,0.2)"
                  : "rgba(249,115,22,0.2)",
                animation: "fade-in 0.3s ease both",
              }}
            >
              <CheckCircle2
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{
                  color: selectedDeployOption === "biibisoft-umbrella"
                    ? "var(--accent-emerald)"
                    : "var(--accent-orange)",
                }}
              />
              <p className="text-[11px] text-brand-text-body leading-relaxed">
                {selectedDeployOption === "biibisoft-umbrella" ? (
                  <>
                    <strong className="text-brand-text-title">Biibisoft Umbrella selected.</strong>{" "}
                    A deployment fee of <strong style={{ color: "var(--accent-emerald)" }}>$50</strong> will be added to your
                    quote for the first app, and <strong style={{ color: "var(--accent-emerald)" }}>$10</strong> for
                    each additional app under the Biibisoft namespace. No developer accounts needed from you.
                  </>
                ) : (
                  <>
                    <strong className="text-brand-text-title">Own Brand selected.</strong>{" "}
                    You'll register your Apple Developer ($99/yr) and Google Play ($25 once) accounts.
                    Biibisoft will guide you through the setup and handle all technical submission work.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
