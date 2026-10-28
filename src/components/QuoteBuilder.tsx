"use client";

import React, { useState, useCallback } from "react";
import { Check, Shield, Layers, Rocket, Landmark, ChevronRight, Download, Loader2, AlertCircle, Sprout, Wrench, Sparkles } from "lucide-react";
import MobileAppDeploymentInfo from "./MobileAppDeploymentInfo";
import {
  PROJECT_TYPES,
  SPEEDS,
  STARTING_POINTS,
  REBUILD_THRESHOLD,
  applyPace,
  applyStartingPoint,
  codeCheckFee,
  type ProjectType,
  type Speed,
  type StartingPoint,
} from "@/lib/pricing";

// ─── Static data defined OUTSIDE the component so it is never re-created ────
const FEATURES = [
  { id: "auth",     name: "User Authentication",   price: 300,  weeks: 1,   desc: "Sign-up, social login, roles & permissions" },
  { id: "payments", name: "Payment Gateway",        price: 600,  weeks: 1.5, desc: "Paystack / Stripe / Flutterwave integrations" },
  { id: "admin",    name: "Admin Dashboard",        price: 500, weeks: 2,   desc: "CMS & full content management system" },
  { id: "ai",       name: "AI & LLM Integration",  price: 500, weeks: 3,   desc: "Custom chatbot, RAG pipelines, embeddings" },
  { id: "realtime", name: "Real-time WebSockets",  price: 600,  weeks: 2,   desc: "Live chat, notifications, collaborative sync" },
  { id: "push",     name: "Push Notifications",    price: 250,  weeks: 0.5, desc: "Browser & mobile direct alerts" },
] as const;

const DESIGNS = [
  { id: "standard",  name: "Standard Premium",      price: 0,    weeks: 0,   desc: "Clean, responsive corporate layouts." },
  { id: "custom",    name: "Tailored Custom",        price: 400, weeks: 1.5, desc: "Unique compositions with high visual polish." },
  { id: "immersive", name: "Immersive / Futuristic", price: 800, weeks: 3,   desc: "Animated material gradients, premium scroll effects." },
] as const;

const SPEED_ICONS = { normal: Layers, fast: Shield, rush: Rocket } as const;
const START_ICONS = { fresh: Sprout, finish: Wrench, polish: Sparkles } as const;

const USD_TO_GHS = 14.8;

type Design      = typeof DESIGNS[number];

interface QuoteBuilderProps {
  onSelectEstimate: (text: string) => void;
}

// ─── Small section header ────────────────────────────────────────────────────
function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
      <span className="font-mono text-xs text-brass">0{step}</span>
      <h3 className="font-serif text-[28px] leading-none">{title}</h3>
    </div>
  );
}

function SelectedDot() {
  return (
    <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-obsidian">
      <Check className="h-3 w-3 text-champagne" strokeWidth={3} />
    </span>
  );
}

// ─── Generate a short reference number ──────────────────────────────────────
function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "BSQ-";
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function QuoteBuilder({ onSelectEstimate }: QuoteBuilderProps) {
  const [selectedType,         setSelectedType]         = useState<ProjectType>(PROJECT_TYPES[1]);
  const [startingPoint,        setStartingPoint]        = useState<StartingPoint>(STARTING_POINTS[0]);
  const [selectedFeatures,     setSelectedFeatures]     = useState<string[]>(["auth", "ai"]);
  const [selectedDesign,       setSelectedDesign]       = useState<Design>(DESIGNS[1]);
  const [selectedSpeed,        setSelectedSpeed]        = useState<Speed>(SPEEDS[0]);
  const [mobileDeployOption,   setMobileDeployOption]   = useState<"own-brand" | "biibisoft-umbrella" | null>(null);
  const [isDownloadingPDF,     setIsDownloadingPDF]     = useState(false);
  const [pdfError,             setPdfError]             = useState<string | null>(null);

  // ── Derived totals (no state, no useEffect) ──────────────────────────────
  const featurePrice = FEATURES.filter(f => selectedFeatures.includes(f.id)).reduce((s, f) => s + f.price, 0);
  const featureWeeks = FEATURES.filter(f => selectedFeatures.includes(f.id)).reduce((s, f) => s + f.weeks, 0);
  const rawCost      = selectedType.basePrice + featurePrice + selectedDesign.price;
  const rawWeeks     = selectedType.baseWeeks + featureWeeks + selectedDesign.weeks;
  const isMobile     = selectedType.id === "mobileapp";
  const hasAI        = selectedFeatures.includes("ai");
  const rescue       = applyStartingPoint(rawCost, rawWeeks, startingPoint, { mobile: isMobile, ai: hasAI });
  const { cost: totalCost, weeks: totalWeeks } = applyPace(rescue.cost, rescue.weeks, selectedSpeed);

  // Rescues start with a paid code check (credited), and we flag when a rebuild would be the better deal
  const isRescue       = startingPoint.id !== "fresh";
  const codeCheck      = isRescue ? codeCheckFee(selectedType.id, hasAI) : 0;
  const suggestRebuild = isRescue && totalCost >= applyPace(rawCost, rawWeeks, selectedSpeed).cost * REBUILD_THRESHOLD;

  // Add Biibisoft umbrella fee if applicable
  const deployFee    = (selectedType.id === "mobileapp" && mobileDeployOption === "biibisoft-umbrella") ? 50 : 0;
  const grandTotal   = totalCost + deployFee;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const handleTypeChange = useCallback((type: ProjectType) => {
    setSelectedType(type);
    // Reset mobile deploy option when switching away from mobile
    if (type.id !== "mobileapp") {
      setMobileDeployOption(null);
    }
  }, []);

  const handleApply = useCallback(() => {
    const featureNames = FEATURES.filter(f => selectedFeatures.includes(f.id)).map(f => f.name).join(", ");
    const mobileNote = selectedType.id === "mobileapp" && mobileDeployOption
      ? `\n- App Store Publishing: ${mobileDeployOption === "biibisoft-umbrella" ? "Biibisoft Umbrella ($50 + $10/extra app)" : "Own Brand (self-hosted accounts)"}`
      : "";
    const startNote = isRescue
      ? `\n- Starting point: ${startingPoint.name} (Grade ${startingPoint.grade})\n- Code check: $${codeCheck} (credited to the build)`
      : "";
    onSelectEstimate(
      `Project Estimate Request:\n- Type: ${selectedType.name}${startNote}\n- Design: ${selectedDesign.name}\n- Delivery: ${selectedSpeed.name}\n- Chosen Features: ${featureNames || "None"}${mobileNote}\n- Budget: $${grandTotal.toLocaleString()} USD (~GH₵ ${(grandTotal * USD_TO_GHS).toLocaleString()})\n- Timeline: ${totalWeeks} weeks`
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, [selectedType, startingPoint, isRescue, codeCheck, selectedDesign, selectedSpeed, selectedFeatures, grandTotal, totalWeeks, mobileDeployOption, onSelectEstimate]);

  const handleDownloadPDF = useCallback(async () => {
    setIsDownloadingPDF(true);
    setPdfError(null);
    try {
      // Dynamic import keeps @react-pdf/renderer out of the SSR bundle entirely
      const [rendererModule, pdfModule] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./QuotePDF"),
      ]);

      const { pdf } = rendererModule;
      const QuotePDF = pdfModule.default;

      const now = new Date();
      const generatedAt = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const refNumber = generateRef();

      // @react-pdf/renderer v4: pdf() accepts a React element and returns
      // a PDFInstance with a toBlob() method that returns Promise<Blob>.
      // Cast via any because react-pdf uses its own internal renderer —
      // the element type doesn't overlap with standard ReactElement<DocumentProps>.
      const instance = pdf(
        React.createElement(QuotePDF, {
          projectType:        selectedType.name,
          projectTypeId:      selectedType.id,
          startingPoint:      isRescue ? `${startingPoint.name} (Grade ${startingPoint.grade})` : null,
          codeCheckUSD:       codeCheck,
          rescueFixed:        rescue.fixed.map(f => f.label),
          techStack:          selectedType.tech,
          designTier:         selectedDesign.name,
          deliveryPace:       selectedSpeed.name,
          paceMultiplier:     selectedSpeed.costMultiplier,
          selectedFeatures,
          totalCostUSD:       totalCost,
          totalWeeks,
          mobileDeployOption,
          generatedAt,
          refNumber,
        }) as any // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      const blob = await instance.toBlob();

      const url  = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href     = url;
      link.download = `Biibisoft-Quote-${refNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setPdfError("Could not generate PDF. Please try again.");
      // Auto-clear error after 6 s
      setTimeout(() => setPdfError(null), 6000);
    } finally {
      setIsDownloadingPDF(false);
    }
  }, [selectedType, startingPoint, isRescue, codeCheck, rescue.fixed, selectedDesign, selectedSpeed, selectedFeatures, totalCost, totalWeeks, mobileDeployOption]);

  const card = "rounded-[24px] border border-obsidian/10 bg-white p-5 sm:p-8";

  return (
    <div className="w-full space-y-6">
      <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        {/* ── Configuration ─────────────────────────────────────────────── */}
        <div className="space-y-4 lg:col-span-8">
          {/* 1 — Project Type */}
          <div className={card}>
            <StepHeader step={1} title="Project type" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROJECT_TYPES.map(type => {
                const on = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={`option-btn p-4${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <div className="mb-1.5 flex items-start justify-between">
                      <span className="text-[15px] font-medium leading-tight">{type.name}</span>
                      {on && <SelectedDot />}
                    </div>
                    <p className="mb-2 text-[13px] leading-relaxed text-stone">{type.description}</p>
                    <span className="font-mono text-xs text-brass">From ${type.basePrice.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2 — Starting point */}
          <div className={card}>
            <StepHeader step={2} title="Starting point" />
            <p className="-mt-2 mb-5 text-[14px] leading-relaxed text-stone">
              Already started, maybe with Lovable, Bolt, Cursor or another AI tool? Tell us how far you got.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {STARTING_POINTS.map(point => {
                const Icon = START_ICONS[point.id];
                const on   = startingPoint.id === point.id;
                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setStartingPoint(point)}
                    className={`option-btn flex flex-col gap-2 p-4${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[15px] font-medium">
                        <Icon className="h-4 w-4 text-brass" />
                        {point.name}
                      </span>
                      {on && <SelectedDot />}
                    </div>
                    <span className="font-mono text-xs text-brass">
                      {point.grade ? `Grade ${point.grade} · ~${Math.round(point.costMultiplier * 100)}%` : "Full build"}
                    </span>
                    <p className="text-[13px] leading-relaxed text-stone">{point.description}</p>
                  </button>
                );
              })}
            </div>
            {isRescue && (
              <p className="mt-4 rounded-2xl bg-linen px-4 py-3 text-[13px] leading-relaxed text-taupe">
                We start with a <strong className="font-medium text-obsidian">${codeCheck} code check</strong>: we run
                your project, review the code and confirm the grade with a fixed quote. The fee is credited to the build.
              </p>
            )}
          </div>

          {/* 3 — Features */}
          <div className={card}>
            <StepHeader step={3} title="Modules" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map(feature => {
                const on = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleFeature(feature.id)}
                    className={`option-btn flex items-start justify-between gap-3 p-4${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <div className="min-w-0">
                      <span className="mb-0.5 block text-[15px] font-medium">{feature.name}</span>
                      <span className="block text-[13px] leading-relaxed text-stone">{feature.desc}</span>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="font-mono text-xs text-brass">+${feature.price}</span>
                      <span className="font-mono text-[11px] text-stone">+{feature.weeks}w</span>
                      <span
                        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-md border ${on ? "border-obsidian bg-obsidian" : "border-obsidian/20 bg-white"}`}
                        style={{ transition: "background-color 0.12s ease, border-color 0.12s ease" }}
                      >
                        {on && <Check className="h-3 w-3 text-champagne" strokeWidth={3} />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 — Design */}
          <div className={card}>
            <StepHeader step={4} title="Design fidelity" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {DESIGNS.map(design => {
                const on = selectedDesign.id === design.id;
                return (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design)}
                    className={`option-btn flex flex-col gap-2 p-4${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[15px] font-medium">{design.name}</span>
                      {on && <SelectedDot />}
                    </div>
                    <span className="font-mono text-xs text-brass">
                      {design.price === 0 ? "Included" : `+$${design.price.toLocaleString()}`}
                    </span>
                    <p className="text-[13px] leading-relaxed text-stone">{design.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 — Delivery Speed */}
          <div className={card}>
            <StepHeader step={5} title="Delivery pace" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {SPEEDS.map(speed => {
                const Icon = SPEED_ICONS[speed.id];
                const on   = selectedSpeed.id === speed.id;
                return (
                  <button
                    key={speed.id}
                    type="button"
                    onClick={() => setSelectedSpeed(speed)}
                    className={`option-btn flex items-center gap-3 p-4${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <span
                      className={`shrink-0 rounded-lg p-2 ${on ? "bg-obsidian text-champagne" : "bg-linen text-stone"}`}
                      style={{ transition: "background-color 0.12s ease, color 0.12s ease" }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="block text-[15px] font-medium">{speed.name}</span>
                      <span className="text-[13px] text-stone">{speed.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 — App store publishing (mobile only) */}
          {isMobile && (
            <MobileAppDeploymentInfo
              step={6}
              selectedDeployOption={mobileDeployOption}
              onDeployOptionChange={setMobileDeployOption}
            />
          )}
        </div>

        {/* ── Summary ───────────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-28 lg:col-span-4">
          <div className="rounded-[26px] bg-obsidian p-6 text-bone sm:p-8">
            <p className="eyebrow text-[11px] text-ash">Live estimate</p>
            <div className="mt-3 flex items-end gap-2" aria-live="polite">
              <span className="font-serif text-[64px] leading-none text-champagne">${grandTotal.toLocaleString()}</span>
              <span className="mb-1.5 font-mono text-xs text-fog">USD</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-sm text-fog">
              <Landmark className="h-3.5 w-3.5" />
              GH₵ {(grandTotal * USD_TO_GHS).toLocaleString()}
            </div>
            {deployFee > 0 && (
              <p className="mt-1.5 text-xs text-ash">Includes $50 Biibisoft publishing fee</p>
            )}
            {isRescue && (
              <p className="mt-1.5 text-xs leading-relaxed text-ash">
                Confirmed by a ${codeCheck} code check, credited to this price.
              </p>
            )}
            {suggestRebuild && (
              <p className="mt-3 rounded-xl border border-champagne/30 px-3 py-2 text-xs leading-relaxed text-champagne">
                This is close to a fresh build. The code check will tell us honestly which is the better deal.
              </p>
            )}

            <dl className="mt-7 text-sm">
              {[
                ["Project", selectedType.name],
                ["Starting point", isRescue ? `Grade ${startingPoint.grade}` : "Fresh build"],
                ...(isRescue ? [["Code check", `$${codeCheck} · credited`]] : []),
                ["Timeline", `${totalWeeks} weeks`],
                ["Modules", String(selectedFeatures.length)],
                ["Pace", `${selectedSpeed.costMultiplier}×`],
                ...(isMobile && mobileDeployOption
                  ? [["Publishing", mobileDeployOption === "biibisoft-umbrella" ? "Biibisoft Umbrella" : "Own Brand"]]
                  : []),
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-bone/10 py-3">
                  <dt className="text-fog">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5">
              <p className="eyebrow text-[10px] text-ash">Recommended stack</p>
              <p className="mt-1.5 font-mono text-[13px] leading-relaxed text-champagne">
                {selectedType.tech.replaceAll(" / ", " · ")}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleApply}
                className="flex h-14 w-full items-center justify-between rounded-full bg-champagne px-6 text-[15px] font-medium text-obsidian transition-colors hover:bg-bone"
              >
                Send this quote to us
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloadingPDF}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-bone/25 text-[15px] transition-colors hover:border-bone/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDownloadingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating PDF…
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download quote PDF
                  </>
                )}
              </button>
            </div>

            {pdfError && (
              <div
                role="alert"
                className="mt-4 flex items-center gap-2 rounded-xl border border-[#9c3d1c]/50 bg-[#9c3d1c]/15 px-3 py-2 text-xs text-[#f0b9a4]"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{pdfError}</span>
              </div>
            )}

            <p className="mt-5 text-center text-[11px] leading-relaxed text-ash">
              Rate: GHS {USD_TO_GHS} / $1 USD · Final quotes may vary by requirement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
