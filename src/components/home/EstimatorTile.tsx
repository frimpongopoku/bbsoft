"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECT_TYPES, SPEEDS, applyPace } from "@/lib/pricing";

export default function EstimatorTile() {
  const [typeId, setTypeId] = useState<string>("webapp");
  const [speedId, setSpeedId] = useState<string>("normal");

  const type = PROJECT_TYPES.find((t) => t.id === typeId) ?? PROJECT_TYPES[0];
  const speed = SPEEDS.find((s) => s.id === speedId) ?? SPEEDS[0];
  const { cost, weeks } = applyPace(type.basePrice, type.baseWeeks, speed);

  return (
    <div className="min-w-0 flex-[2_1_560px] rounded-[26px] bg-obsidian p-6 text-bone sm:p-10">
      <div className="flex justify-between gap-4">
        <span className="eyebrow text-[11px] text-ash">Instant estimate</span>
        <span className="eyebrow text-[11px] text-champagne">● Live</span>
      </div>

      <fieldset className="mt-6">
        <legend className="sr-only">Project type</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === type.id}
              onClick={() => setTypeId(t.id)}
              className={`h-[46px] rounded-full border px-5 text-[15px] transition-colors ${
                t.id === type.id
                  ? "border-bone bg-bone text-obsidian"
                  : "border-bone/20 text-mist hover:border-bone/50"
              }`}
            >
              {t.shortName}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-3">
        <legend className="sr-only">Delivery pace</legend>
        <div className="flex gap-1 rounded-full border border-bone/15 p-1">
          {SPEEDS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === speed.id}
              onClick={() => setSpeedId(s.id)}
              className={`h-11 flex-1 rounded-full px-3 text-sm transition-colors ${
                s.id === speed.id ? "bg-champagne text-obsidian" : "text-fog hover:text-bone"
              }`}
            >
              {s.shortName}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-5" aria-live="polite">
        <div>
          <div className="eyebrow text-[11px] text-ash">From</div>
          <div className="font-serif text-[clamp(64px,7vw,104px)] leading-none text-champagne">
            ${cost.toLocaleString("en-US")}
          </div>
        </div>
        <div className="sm:text-right">
          <div className="font-serif text-[44px] leading-none">{weeks} weeks</div>
          <div className="mt-2 font-mono text-xs text-fog">{type.tech.replaceAll(" / ", " · ")}</div>
        </div>
      </div>

      <Link
        href="/hire-us#estimator"
        className="mt-8 flex h-14 items-center justify-between rounded-full bg-bone px-6 text-base font-medium text-obsidian transition-colors hover:bg-champagne"
      >
        Build a full, itemised quote
        <ArrowUpRight className="h-[18px] w-[18px]" />
      </Link>
    </div>
  );
}
