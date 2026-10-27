import { LAB } from "@/content/home";

const METRICS = [
  { value: String(LAB.length), label: "products of our own, live today" },
  { value: "4", label: "build tracks, web to custom" },
  { value: "3", unit: " wks", label: "typical website, scope to live" },
  { value: "$1.2k", label: "projects start from", accent: true },
] as const;

export default function Metrics() {
  return (
    <section aria-label="At a glance" className="mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="flex flex-col-reverse border-l border-obsidian/15 px-4 sm:px-6">
            <dt className="mt-2.5 text-sm text-taupe sm:text-[15px]">{m.label}</dt>
            <dd
              className={`font-serif text-[clamp(56px,6vw,96px)] leading-none tracking-[-0.02em] ${
                "accent" in m ? "text-brass" : ""
              }`}
            >
              {m.value}
              {"unit" in m && <span className="text-[0.45em] italic">{m.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
