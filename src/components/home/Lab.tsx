import { LogoMark } from "@/components/brand/Logo";

const CARDS = [
  { eyebrow: "Lab · 03", line: "Run by us.", tone: "bg-umber text-bone" },
  { eyebrow: "Lab · 02", line: "Shipped to real users.", tone: "bg-sand text-obsidian" },
  { eyebrow: "Lab · 01", line: "Designed in-house.", tone: "bg-ink-2 text-champagne border border-bone/10" },
] as const;

export default function Lab() {
  return (
    <section id="lab" className="overflow-hidden bg-obsidian text-bone">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-14 px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="min-w-0 flex-[1_1_420px]">
          <p className="eyebrow text-ash">( Biibisoft Lab )</p>
          <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
            The ones
            <br />
            we <span className="accent-serif text-champagne">keep.</span>
          </h2>
          <p className="mt-7 max-w-[460px] text-lg font-light leading-relaxed text-mist">
            Our own products, designed, shipped and operated in-house. Every lesson learned here —
            performance, scale, real users — goes straight into the work we do for partners.
          </p>
        </div>

        <div className="fan min-w-0 flex-[1_1_520px]" role="img" aria-label="A fanned deck of Biibisoft Lab cards">
          {CARDS.map((card) => (
            <div key={card.eyebrow} className={`fan-card flex flex-col justify-between p-6 ${card.tone}`}>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">{card.eyebrow}</span>
              <span className="font-serif text-[34px] leading-none">{card.line}</span>
            </div>
          ))}
          <div className="fan-card flex flex-col justify-between bg-champagne p-6 text-obsidian">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">Biibisoft Lab</span>
            <LogoMark className="h-16 w-auto self-start" coreColor="var(--obsidian)" />
          </div>
        </div>
      </div>
    </section>
  );
}
