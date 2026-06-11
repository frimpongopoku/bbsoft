"use client";

import React, { useState, useCallback } from "react";
import { Check, Shield, Layers, Rocket, Landmark, ChevronRight } from "lucide-react";

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

// ─── Main component ──────────────────────────────────────────────────────────
export default function QuoteBuilder({ onSelectEstimate }: QuoteBuilderProps) {
  const [selectedType,     setSelectedType]     = useState<ProjectType>(PROJECT_TYPES[1]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["auth", "ai"]);
  const [selectedDesign,   setSelectedDesign]   = useState<Design>(DESIGNS[1]);
  const [selectedSpeed,    setSelectedSpeed]    = useState<Speed>(SPEEDS[0]);

  // ── Derived totals (no state, no useEffect) ──────────────────────────────
  const featurePrice = FEATURES.filter(f => selectedFeatures.includes(f.id)).reduce((s, f) => s + f.price, 0);
  const featureWeeks = FEATURES.filter(f => selectedFeatures.includes(f.id)).reduce((s, f) => s + f.weeks, 0);
  const rawCost      = selectedType.basePrice + featurePrice + selectedDesign.price;
  const rawWeeks     = selectedType.baseWeeks + featureWeeks + selectedDesign.weeks;
  const totalCost    = Math.round(rawCost * selectedSpeed.costMultiplier);
  const totalWeeks   = Math.max(2, Math.round(rawWeeks * selectedSpeed.timeMultiplier * 10) / 10);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const handleApply = useCallback(() => {
    const featureNames = FEATURES.filter(f => selectedFeatures.includes(f.id)).map(f => f.name).join(", ");
    onSelectEstimate(
      `Project Estimate Request:\n- Type: ${selectedType.name}\n- Design: ${selectedDesign.name}\n- Delivery: ${selectedSpeed.name}\n- Chosen Features: ${featureNames || "None"}\n- Budget: $${totalCost.toLocaleString()} USD (~GH₵ ${(totalCost * USD_TO_GHS).toLocaleString()})\n- Timeline: ${totalWeeks} weeks`
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, [selectedType, selectedDesign, selectedSpeed, selectedFeatures, totalCost, totalWeeks, onSelectEstimate]);

  return (
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
                onClick={() => setSelectedType(type)}
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
                ${totalCost.toLocaleString()}
              </span>
              <span className="text-sm text-white/70 font-mono font-bold mb-0.5">USD</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Landmark className="w-3 h-3 text-white/80" />
              <span className="text-sm font-bold text-white/90">
                GH₵ {(totalCost * USD_TO_GHS).toLocaleString()}
              </span>
            </div>
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
            </div>

            {/* Tech recommendation */}
            <div className="p-3.5 rounded-xl bg-brand-input-bg-theme border border-brand-border-theme">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-text-muted mb-1.5">Recommended Stack</p>
              <p className="text-xs font-mono font-extrabold text-brand-orange leading-relaxed">{selectedType.tech}</p>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer flex items-center justify-center gap-2"
              style={{ transition: "background-color 0.15s ease, box-shadow 0.15s ease" }}
            >
              Apply Config & Request Quote
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-brand-text-muted text-center leading-relaxed">
              Rate: GH₵ {USD_TO_GHS} / $1 USD · Final quotes may vary by requirement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
