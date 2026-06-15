"use client";

import React, { useState, useCallback } from "react";
import { Check, Shield, Layers, Rocket, Landmark, ChevronRight, Download, Loader2, AlertCircle } from "lucide-react";
import MobileAppDeploymentInfo from "./MobileAppDeploymentInfo";

// ─── Static data defined OUTSIDE the component so it is never re-created ────
const PROJECT_TYPES = [
  { id: "website",   name: "Corporate Website", basePrice: 1200, baseWeeks: 3,  description: "Polished static or CMS-backed marketing site.", tech: "Next.js / Tailwind CSS / MDX" },
  { id: "webapp",    name: "Web Application",   basePrice: 1500, baseWeeks: 6,  description: "Interactive systems with complex roles & data.",  tech: "Next.js / TypeScript / PostgreSQL" },
  { id: "mobileapp", name: "Mobile App",         basePrice: 1500, baseWeeks: 8,  description: "Native iOS & Android apps on the App Stores.",   tech: "React Native / Expo / Firebase" },
  { id: "custom",    name: "Custom Software",    basePrice: 3000, baseWeeks: 10, description: "Enterprise solutions & WebSockets dashboards.",   tech: "Next.js / Go / Docker / AWS" },
] as const;

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

const SPEEDS = [
  { id: "normal", name: "Normal Pace",       costMultiplier: 1.0, timeMultiplier: 1.0, icon: Layers, label: "Base pricing" },
  { id: "fast",   name: "Fast-Track",        costMultiplier: 1.3, timeMultiplier: 0.7, icon: Shield, label: "30% premium" },
  { id: "rush",   name: "Rush (Expedited)",  costMultiplier: 1.6, timeMultiplier: 0.5, icon: Rocket, label: "60% premium" },
] as const;

const USD_TO_GHS = 14.8;

type ProjectType = typeof PROJECT_TYPES[number];
type Design      = typeof DESIGNS[number];
type Speed       = typeof SPEEDS[number];

interface QuoteBuilderProps {
  onSelectEstimate: (text: string) => void;
}

// ─── Small section header ────────────────────────────────────────────────────
function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange text-white text-[10px] font-extrabold shrink-0">
        {step}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-brand-text-title">{title}</span>
    </div>
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
  const totalCost    = Math.round(rawCost * selectedSpeed.costMultiplier);
  const totalWeeks   = Math.max(2, Math.round(rawWeeks * selectedSpeed.timeMultiplier * 10) / 10);

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
    onSelectEstimate(
      `Project Estimate Request:\n- Type: ${selectedType.name}\n- Design: ${selectedDesign.name}\n- Delivery: ${selectedSpeed.name}\n- Chosen Features: ${featureNames || "None"}${mobileNote}\n- Budget: $${grandTotal.toLocaleString()} USD (~GH₵ ${(grandTotal * USD_TO_GHS).toLocaleString()})\n- Timeline: ${totalWeeks} weeks`
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, [selectedType, selectedDesign, selectedSpeed, selectedFeatures, grandTotal, totalWeeks, mobileDeployOption, onSelectEstimate]);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const instance = pdf(
        React.createElement(QuotePDF, {
          projectType:        selectedType.name,
          projectTypeId:      selectedType.id,
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
        }) as any
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
  }, [selectedType, selectedDesign, selectedSpeed, selectedFeatures, totalCost, totalWeeks, mobileDeployOption]);

  const isMobile = selectedType.id === "mobileapp";

  return (
    <div className="w-full space-y-6">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Configuration columns (8 cols) ─────────────────────────────── */}
        <div className="lg:col-span-8 space-y-6">

          {/* 1 — Project Type */}
          <div className="rounded-2xl border border-brand-border-theme bg-brand-card-bg-theme p-6 shadow-sm">
            <StepHeader step={1} title="Select Project Archetype" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={`option-btn p-4 focus:outline-none${selectedType.id === type.id ? " selected" : ""}`}
                  aria-pressed={selectedType.id === type.id}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={`font-bold text-sm leading-tight ${selectedType.id === type.id ? "text-brand-orange" : "text-brand-text-title"}`}>
                      {type.name}
                    </span>
                    {selectedType.id === type.id && (
                      <span className="w-4 h-4 rounded-full bg-brand-orange flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed mb-2">{type.description}</p>
                  <span className="text-[11px] font-bold font-mono text-brand-orange">From ${type.basePrice.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2 — Features */}
          <div className="rounded-2xl border border-brand-border-theme bg-brand-card-bg-theme p-6 shadow-sm">
            <StepHeader step={2} title="Integrate Functional Modules" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map(feature => {
                const on = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleFeature(feature.id)}
                    className={`option-btn p-4 flex items-start justify-between gap-3 focus:outline-none${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <div className="min-w-0">
                      <span className={`font-bold text-sm block mb-0.5 ${on ? "text-brand-orange" : "text-brand-text-title"}`}>
                        {feature.name}
                      </span>
                      <span className="text-[11px] text-brand-text-muted block leading-relaxed">{feature.desc}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span className="text-[11px] font-bold font-mono text-brand-orange">+${feature.price}</span>
                      <span className="text-[10px] text-brand-text-muted font-mono">+{feature.weeks}w</span>
                      {/* Checkbox — no transition to avoid layout thrash */}
                      <span className={`w-4 h-4 rounded border flex items-center justify-center mt-1 ${on ? "bg-brand-orange border-brand-orange" : "bg-brand-card-bg-theme border-brand-border-theme"}`} style={{ transition: "background-color 0.12s ease, border-color 0.12s ease" }}>
                        {on && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 — Design */}
          <div className="rounded-2xl border border-brand-border-theme bg-brand-card-bg-theme p-6 shadow-sm">
            <StepHeader step={3} title="Design Fidelity & Aesthetics" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {DESIGNS.map(design => (
                <button
                  key={design.id}
                  type="button"
                  onClick={() => setSelectedDesign(design)}
                  className={`option-btn p-4 flex flex-col gap-2 focus:outline-none${selectedDesign.id === design.id ? " selected" : ""}`}
                  aria-pressed={selectedDesign.id === design.id}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-bold text-sm ${selectedDesign.id === design.id ? "text-brand-orange" : "text-brand-text-title"}`}>
                      {design.name}
                    </span>
                    {selectedDesign.id === design.id && (
                      <span className="w-4 h-4 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold font-mono text-brand-orange">
                    {design.price === 0 ? "Included" : `+$${design.price.toLocaleString()}`}
                  </span>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed">{design.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 4 — Delivery Speed */}
          <div className="rounded-2xl border border-brand-border-theme bg-brand-card-bg-theme p-6 shadow-sm">
            <StepHeader step={4} title="Delivery Timeline Urgency" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SPEEDS.map(speed => {
                const Icon = speed.icon;
                const on   = selectedSpeed.id === speed.id;
                return (
                  <button
                    key={speed.id}
                    type="button"
                    onClick={() => setSelectedSpeed(speed)}
                    className={`option-btn p-4 flex items-center gap-3 focus:outline-none${on ? " selected" : ""}`}
                    aria-pressed={on}
                  >
                    <span className={`p-2 rounded-lg shrink-0 ${on ? "bg-brand-orange text-white" : "bg-brand-input-bg-theme text-brand-text-muted"}`} style={{ transition: "background-color 0.12s ease, color 0.12s ease" }}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className={`font-bold text-sm block ${on ? "text-brand-orange" : "text-brand-text-title"}`}>
                        {speed.name}
                      </span>
                      <span className="text-[11px] text-brand-text-muted">{speed.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Summary sidebar (4 cols) ────────────────────────────────────── */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="glass-panel rounded-2xl overflow-hidden">
            {/* Header band */}
            <div className="bg-gradient-to-r from-brand-orange to-brand-amber px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Live Estimate</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-white font-sans leading-none">
                  ${grandTotal.toLocaleString()}
                </span>
                <span className="text-sm text-white/70 font-mono font-bold mb-0.5">USD</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Landmark className="w-3 h-3 text-white/80" />
                <span className="text-sm font-bold text-white/90">
                  GH₵ {(grandTotal * USD_TO_GHS).toLocaleString()}
                </span>
              </div>
              {deployFee > 0 && (
                <p className="text-[10px] text-white/60 mt-1.5">
                  Includes $50 Biibisoft publishing fee
                </p>
              )}
            </div>

            {/* Details */}
            <div className="p-6 space-y-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-brand-text-muted">Project Type</span>
                  <span className="font-bold text-brand-text-title text-right max-w-[55%] leading-tight">{selectedType.name}</span>
                </div>
                <div className="h-px bg-brand-border-theme/50" />
                <div className="flex justify-between items-center">
                  <span className="text-brand-text-muted">Timeline</span>
                  <span className="font-bold text-brand-text-title">{totalWeeks} weeks</span>
                </div>
                <div className="h-px bg-brand-border-theme/50" />
                <div className="flex justify-between items-center">
                  <span className="text-brand-text-muted">Modules selected</span>
                  <span className="font-bold text-brand-text-title">{selectedFeatures.length}</span>
                </div>
                <div className="h-px bg-brand-border-theme/50" />
                <div className="flex justify-between items-center">
                  <span className="text-brand-text-muted">Pace multiplier</span>
                  <span className="font-bold text-brand-orange">{selectedSpeed.costMultiplier}×</span>
                </div>
                {isMobile && mobileDeployOption && (
                  <>
                    <div className="h-px bg-brand-border-theme/50" />
                    <div className="flex justify-between items-center">
                      <span className="text-brand-text-muted">Publishing</span>
                      <span className="font-bold text-brand-text-title text-right text-xs max-w-[55%] leading-tight">
                        {mobileDeployOption === "biibisoft-umbrella" ? "Biibisoft Umbrella" : "Own Brand"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Tech recommendation */}
              <div className="p-3.5 rounded-xl bg-brand-input-bg-theme border border-brand-border-theme">
                <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted mb-1.5">Recommended Stack</p>
                <p className="text-xs font-mono font-extrabold text-brand-orange leading-relaxed">{selectedType.tech}</p>
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer flex items-center justify-center gap-2"
                style={{ transition: "background-color 0.15s ease, box-shadow 0.15s ease" }}
              >
                Apply Config & Request Quote
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* PDF Download CTA */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloadingPDF}
                className="w-full py-3 rounded-xl border-2 border-brand-orange/40 hover:border-brand-orange text-brand-orange font-bold text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "transparent",
                  transition: "border-color 0.15s ease, background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isDownloadingPDF) {
                    e.currentTarget.style.backgroundColor = "rgba(249,115,22,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {isDownloadingPDF ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Quote PDF
                  </>
                )}
              </button>

              {/* PDF error message */}
              {pdfError && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs"
                  style={{ animation: "fade-in 0.2s ease both" }}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{pdfError}</span>
                </div>
              )}

              <p className="text-[10px] text-brand-text-muted text-center leading-relaxed">
                Rate: GHS {USD_TO_GHS} / $1 USD · Final quotes may vary by requirement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile App Deployment Info (conditional, full-width below grid) ── */}
      {isMobile && (
        <MobileAppDeploymentInfo
          selectedDeployOption={mobileDeployOption}
          onDeployOptionChange={setMobileDeployOption}
        />
      )}
    </div>
  );
}
