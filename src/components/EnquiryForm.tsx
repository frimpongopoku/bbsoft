"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { mailtoLink, whatsappLink } from "@/content/contact";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const NEEDS = ["Website", "Web app", "Mobile app", "AI system", "Custom software", "Finish my app"] as const;
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

/**
 * Dark-surface enquiry form. There is no backend: submitting composes the
 * message and hands it to WhatsApp (preferred) or the visitor's mail app.
 * `prefill` replaces the idea text whenever it changes (e.g. from the estimator).
 */
export default function EnquiryForm({ prefill = "" }: { prefill?: string }) {
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [idea, setIdea] = useState(prefill);
  const [lastPrefill, setLastPrefill] = useState(prefill);

  if (prefill !== lastPrefill) {
    setLastPrefill(prefill);
    setIdea(prefill);
  }

  const toggleNeed = (need: string) =>
    setNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const lines = [
      `Hi Biibisoft, I'm ${name}${email ? ` (${email})` : ""}.`,
      `I need: ${needs.length ? needs.join(", ") : "Not sure yet"}`,
      `Budget: ${budget ?? "Not specified"}`,
      "",
      idea.trim(),
    ].join("\n");

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "email") {
      window.location.href = mailtoLink(`Project enquiry${name ? ` from ${name}` : ""}`, lines);
    } else {
      window.open(whatsappLink(lines), "_blank", "noopener,noreferrer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-7">
      <div className="flex flex-wrap gap-7">
        <label className="flex flex-[1_1_220px] flex-col gap-1">
          <span className="eyebrow text-[11px] text-ash">Name</span>
          <input className="field" name="name" type="text" autoComplete="name" required placeholder="Ama Mensah" />
        </label>
        <label className="flex flex-[1_1_220px] flex-col gap-1">
          <span className="eyebrow text-[11px] text-ash">Email</span>
          <input className="field" name="email" type="email" autoComplete="email" required placeholder="ama@company.com" />
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
          rows={prefill ? 8 : 3}
          required
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="A few lines is plenty. We'll ask the right questions."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-champagne px-7 text-base font-medium text-obsidian transition-colors hover:bg-bone"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Send on WhatsApp
        </button>
        <button
          type="submit"
          value="email"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-bone/25 px-7 text-base transition-colors hover:border-bone/60"
        >
          <Mail className="h-[18px] w-[18px]" strokeWidth={1.6} />
          Send by email
        </button>
      </div>
      <p className="-mt-3 text-sm text-ash">Opens WhatsApp or your email app with everything filled in.</p>
    </form>
  );
}
