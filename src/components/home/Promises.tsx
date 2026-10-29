import { PROMISES } from "@/content/home";

export default function Promises() {
  return (
    <section aria-label="What you can count on" className="mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
      <dl className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map((p, i) => (
          <div key={p.word} className="border-l border-obsidian/15 px-4 sm:px-6">
            <dt
              className={`font-serif text-[clamp(52px,5.4vw,84px)] leading-none tracking-[-0.02em] ${
                i === PROMISES.length - 1 ? "italic text-brass" : ""
              }`}
            >
              {p.word}
            </dt>
            <dd className="mt-3 max-w-[280px] text-sm leading-relaxed text-taupe sm:text-[15px]">{p.line}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
