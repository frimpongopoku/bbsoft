import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { LAB } from "@/content/home";

const FAN = [
  { eyebrow: "Commerce", name: "Selltns", tone: "bg-umber text-bone" },
  { eyebrow: "Bookings", name: "Booktns", tone: "bg-sand text-obsidian" },
  { eyebrow: "Business suite", name: "Pidaso", tone: "bg-ink-2 text-champagne border border-bone/10" },
] as const;

// Bento spans on the 6-column grid: a wide feature card beside one product, then two even pairs.
// On the 2-column md grid the feature and the last card go full width so every row fills.
const SPANS = [
  "md:col-span-2 lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "md:col-span-2 lg:col-span-3",
] as const;

export default function Lab() {
  return (
    <section id="lab" className="overflow-hidden bg-obsidian text-bone">
      <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="flex flex-wrap items-center gap-14">
          <div className="min-w-0 flex-[1_1_420px]">
            <p className="eyebrow text-ash">( Biibisoft Lab )</p>
            <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
              The ones
              <br />
              we <span className="accent-serif text-champagne">keep.</span>
            </h2>
            <p className="mt-7 max-w-[460px] text-lg font-light leading-relaxed text-mist">
              {LAB.length} products we design, ship and run ourselves, used by real businesses, learners and
              developers every day. We&apos;re our own toughest client, and every lesson ends up in your build.
            </p>
          </div>

          <div className="fan min-w-0 flex-[1_1_520px]" role="img" aria-label="A fanned deck of Biibisoft Lab products">
            {FAN.map((card) => (
              <div key={card.name} className={`fan-card flex flex-col justify-between p-6 ${card.tone}`}>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">{card.eyebrow}</span>
                <span className="font-serif text-[40px] leading-none">{card.name}</span>
              </div>
            ))}
            <div className="fan-card flex flex-col justify-between bg-champagne p-6 text-obsidian">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-75">Biibisoft Lab</span>
              <LogoMark className="h-16 w-auto self-start" coreColor="var(--obsidian)" />
            </div>
          </div>
        </div>

        <ul className="mt-20 grid gap-4 md:mt-28 md:grid-cols-2 lg:grid-cols-6">
          {LAB.map((product, i) => {
            const featured = i === 0;
            return (
              <li key={product.name} className={SPANS[i]}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] p-7 transition-colors sm:p-9 ${
                    featured
                      ? "bg-champagne text-obsidian hover:bg-bone"
                      : "border border-bone/10 bg-ink-2 hover:border-bone/30"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-4 -top-10 font-serif text-[200px] italic leading-none ${
                      featured ? "text-obsidian/[0.07]" : "text-bone/[0.04]"
                    }`}
                  >
                    {product.name[0]}
                  </span>

                  <span
                    className={`flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] ${
                      featured ? "text-obsidian/70" : "text-ash"
                    }`}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{product.category}</span>
                    <span>· {product.platform}</span>
                  </span>

                  <h3
                    className={`mt-8 font-serif leading-[0.95] tracking-[-0.01em] ${
                      featured ? "text-[clamp(52px,6vw,88px)]" : "text-[clamp(38px,3.4vw,48px)]"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`mt-4 max-w-[560px] text-[17px] leading-relaxed ${
                      featured ? "text-obsidian/80" : "text-mist"
                    }`}
                  >
                    {product.pitch}
                  </p>

                  <ul className={`mt-7 grid gap-x-8 ${featured ? "sm:grid-cols-3" : ""}`}>
                    {product.points.map((point) => (
                      <li
                        key={point}
                        className={`border-t py-3 text-[14px] leading-snug ${
                          featured ? "border-obsidian/20" : "border-bone/10 text-fog"
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8 text-sm">
                    <span className={featured ? "font-medium" : "text-champagne"}>
                      {"note" in product ? product.note : product.domain}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      {"note" in product ? product.domain : "Visit"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
