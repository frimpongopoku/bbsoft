import Link from "next/link";
import { CRAFTS } from "@/content/home";

const TONES = [
  "bg-ink-2 text-bone",
  "bg-graphite text-bone",
  "bg-sand text-obsidian",
  "bg-umber text-bone",
  "bg-champagne text-obsidian",
] as const;

export default function Crafts() {
  return (
    <section id="services" className="mx-auto w-full max-w-[1360px] px-5 pb-24 sm:px-8 md:pb-36 lg:px-12">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
          One studio,
          <br />
          <span className="accent-serif text-brass">five crafts.</span>
        </h2>
        <p className="eyebrow hidden text-stone lg:block">Hover a panel to open it</p>
      </div>

      <div className="xp-row">
        {CRAFTS.map((craft, i) => (
          <Link
            key={craft.name}
            href="/hire-us#estimator"
            data-open={i === 0 ? "" : undefined}
            className={`xp block ${TONES[i]}`}
          >
            <span className="eyebrow absolute left-7 top-7 opacity-70 lg:left-8">0{i + 1}</span>
            <span className="xp-label font-serif text-3xl" aria-hidden="true">
              {craft.name}
            </span>
            <span className="xp-body">
              <span className="block font-serif text-[clamp(44px,4.4vw,68px)] leading-[0.95] tracking-[-0.01em]">
                {craft.name}
              </span>
              <span className="mt-4 block text-[17px] leading-relaxed opacity-85">{craft.desc}</span>
              <span className="mt-7 flex flex-wrap justify-between gap-3 border-t border-current pt-4 font-mono text-xs uppercase tracking-[0.08em]">
                <span className="opacity-80">{craft.tech}</span>
                <span>{craft.from}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
