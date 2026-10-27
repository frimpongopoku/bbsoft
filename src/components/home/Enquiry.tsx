"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const EMAIL = "message@biibisoft.com";
const NEEDS = ["Website", "Web app", "Mobile app", "AI system", "Custom software"] as const;
const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k +"] as const;

function Chip({
  active,
  onClick,
  children,
  accent = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-[46px] rounded-full border px-5 text-[15px] transition-colors ${
        active
          ? accent
            ? "border-champagne bg-champagne text-obsidian"
            : "border-bone bg-bone text-obsidian"
          : "border-bone/20 text-mist hover:border-bone/50"
      }`}
    >
      {children}
    </button>
  );
}

export default function Enquiry() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);

  const toggleNeed = (need: string) =>
    setNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));

  // No backend yet: compose the enquiry and hand it to the visitor's mail app.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${String(data.get("email") ?? "").trim()}`,
      `I need: ${needs.length ? needs.join(", ") : "Not sure yet"}`,
      `Budget: ${budget ?? "Not specified"}`,
      "",
      String(data.get("idea") ?? "").trim(),
    ].join("\n");
    const subject = `Project enquiry${name ? ` from ${name}` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="enquire" className="bg-obsidian text-bone">
      <div className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-5 pt-24 sm:px-8 md:pt-36 lg:px-12">
        <div className="min-w-0 flex-[1_1_420px]">
          <p className="eyebrow text-ash">( Studio enquiry )</p>
          <h2 className="mt-5 text-[clamp(52px,7vw,108px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Tell us what
            <br />
            you&apos;re <span className="accent-serif text-champagne">building.</span>
          </h2>
          <p className="mt-7 max-w-[420px] text-lg font-light leading-relaxed text-mist">
            A full build, an upgrade, or an AI-first system. We reply within 24 hours.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="ulink mt-10 inline-block pb-1 font-serif text-[clamp(26px,2.6vw,36px)]"
          >
            {EMAIL}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
          <div className="flex flex-wrap gap-7">
            <label className="flex flex-[1_1_220px] flex-col gap-1">
              <span className="eyebrow text-[11px] text-ash">Name</span>
              <input className="field" name="name" type="text" autoComplete="name" required placeholder="Ama Mensah" />
            </label>
            <label className="flex flex-[1_1_220px] flex-col gap-1">
              <span className="eyebrow text-[11px] text-ash">Email</span>
              <input
                className="field"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="ama@company.com"
              />
            </label>
          </div>

          <fieldset>
            <legend className="eyebrow mb-3.5 text-[11px] text-ash">I need</legend>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((need) => (
                <Chip key={need} accent active={needs.includes(need)} onClick={() => toggleNeed(need)}>
                  {need}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-3.5 text-[11px] text-ash">Budget</legend>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Chip key={b} active={budget === b} onClick={() => setBudget(budget === b ? null : b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1">
            <span className="eyebrow text-[11px] text-ash">The idea</span>
            <textarea
              className="field resize-y"
              name="idea"
              rows={3}
              required
              placeholder="A few lines on what you want to build"
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-flex h-14 items-center gap-3 rounded-full bg-champagne px-7 text-base font-medium text-obsidian transition-colors hover:bg-bone"
            >
              Send enquiry
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </button>
            <span className="text-sm text-ash">Opens your email app with everything filled in.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
