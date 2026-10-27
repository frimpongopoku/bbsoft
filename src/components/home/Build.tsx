import EstimatorTile from "./EstimatorTile";
import { ROUTE } from "@/content/home";

export default function Build() {
  return (
    <section id="estimate" className="mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
      <p className="eyebrow text-stone">( How we build )</p>
      <h2 className="mb-12 mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
        Priced in plain sight. <span className="accent-serif text-brass">Built to last.</span>
      </h2>

      <div className="flex flex-wrap gap-3.5">
        <EstimatorTile />

        <div className="flex min-w-0 flex-[1_1_320px] flex-col items-center justify-between gap-6 rounded-[26px] bg-obsidian p-8 text-bone">
          <div className="flex w-full justify-between">
            <span className="eyebrow text-[11px] text-ash">From Accra</span>
            <span className="eyebrow text-[11px] text-ash">5.60° N</span>
          </div>
          <div className="globe" role="img" aria-label="A halftone globe with Accra marked">
            <div className="globe-dots" />
            <div className="globe-shade" />
            <span className="absolute left-[49%] top-[54%] -ml-[5px] -mt-[5px] h-2.5 w-2.5">
              <span className="pulse absolute inset-0 rounded-full bg-bone" />
              <span className="absolute inset-0 rounded-full bg-bone" />
            </span>
          </div>
          <p className="text-center font-serif text-[30px] leading-tight">
            Built in Ghana, <span className="italic text-champagne">shipped everywhere.</span>
          </p>
        </div>

        <div className="min-w-0 flex-[1_1_300px] rounded-[26px] bg-sand p-8">
          <span className="eyebrow text-[11px] text-taupe">Payments</span>
          <p className="mt-14 font-serif text-[40px] leading-none">Payments, built in from day one.</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {["Paystack", "Stripe", "Flutterwave"].map((p) => (
              <li key={p} className="rounded-full bg-bone px-3.5 py-2">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-[1_1_300px] rounded-[26px] bg-champagne p-8 text-obsidian">
          <span className="eyebrow text-[11px]">AI &amp; LLMs</span>
          <p className="mt-14 font-serif text-[40px] leading-none">
            AI that knows <span className="italic">your</span> business.
          </p>
          <p className="mt-6 font-mono text-[13px] leading-relaxed">RAG pipelines · embeddings · assistants</p>
        </div>

        <div className="min-w-0 flex-[1_1_300px] rounded-[26px] border border-obsidian/10 bg-white p-8">
          <span className="eyebrow text-[11px] text-taupe">The route</span>
          <ol className="mt-7">
            {ROUTE.map((step, i) => (
              <li
                key={step}
                className="flex justify-between border-b border-obsidian/10 py-3 last:border-b-0"
              >
                <span className={`font-serif text-2xl ${i === ROUTE.length - 1 ? "italic text-brass" : ""}`}>
                  {step}
                </span>
                <span className="font-mono text-xs text-taupe">0{i + 1}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
