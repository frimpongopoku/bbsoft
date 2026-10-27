import { ArrowRight } from "lucide-react";
import { WORK } from "@/content/home";

const PREVIEW_TONES = [
  "bg-obsidian text-champagne",
  "bg-champagne text-obsidian",
  "bg-umber text-bone",
] as const;

function ClientGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="belt-group" aria-hidden={hidden || undefined}>
      {WORK.map((client) => (
        <span key={client.name} className="flex items-center">
          <span className="whitespace-nowrap font-serif text-[clamp(28px,3vw,42px)]">{client.name}</span>
          <span aria-hidden="true" className="eyebrow mx-10 text-[11px]">
            In good company
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-linen">
      {/* Infinite client belt */}
      <div className="bg-champagne py-5 text-obsidian" aria-label="Organisations we have built with">
        <div className="belt">
          <div className="belt-track" data-pausable style={{ "--belt-duration": "36s" } as React.CSSProperties}>
            <ClientGroup />
            <ClientGroup hidden />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <p className="eyebrow text-stone">( The index )</p>
        <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
          Work, <span className="accent-serif text-brass">in good company.</span>
        </h2>

        <ol className="mt-14 border-t border-obsidian/15">
          {WORK.map((client, i) => (
            <li
              key={client.name}
              className="hl-row flex items-center gap-4 border-b border-obsidian/15 px-2 py-6 sm:gap-8 sm:py-8"
            >
              <span className="w-8 shrink-0 font-mono text-[13px] text-stone sm:w-11">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="hl-name min-w-0 flex-1 font-serif text-[clamp(32px,4.6vw,64px)] leading-none tracking-[-0.01em]">
                {client.name}
              </span>
              <span className="eyebrow hidden text-[12px] text-taupe md:block">Partner</span>
              <ArrowRight aria-hidden="true" className="hl-arrow h-7 w-7 shrink-0" strokeWidth={1.4} />
              <span aria-hidden="true" className={`hl-preview ${PREVIEW_TONES[i % PREVIEW_TONES.length]}`}>
                <span className="font-serif text-[110px] italic">{client.monogram}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
