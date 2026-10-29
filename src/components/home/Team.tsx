import { PEDIGREE } from "@/content/home";

export default function Team() {
  return (
    <section id="team" className="mx-auto w-full max-w-[1360px] px-5 pb-24 sm:px-8 md:pb-36 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
        <div className="min-w-0 flex-[1_1_560px]">
          <p className="eyebrow text-stone">( The people )</p>
          <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
            Seasoned people.
            <br />
            <span className="accent-serif text-brass">Proven systems.</span>
          </h2>
        </div>
        <p className="flex-[1_1_380px] text-lg leading-relaxed text-taupe">
          Our team has built and shipped at Slack, Google, Andela and Massenergize. We kept the good
          habits: code review, proper testing, and releases nobody is scared of. Every build gets them.
        </p>
      </div>

      <h3 className="eyebrow mt-14 text-stone">Our people have built at</h3>
      <ul className="mt-4 grid grid-cols-2 border-l border-t border-obsidian/15 lg:grid-cols-5">
        {PEDIGREE.map((company, i) => (
          <li
            key={company}
            className="co-cell flex min-h-[120px] flex-col justify-between gap-6 border-b border-r border-obsidian/15 p-5 last:col-span-2 sm:min-h-[150px] sm:p-6 lg:last:col-span-1"
          >
            <span className="co-num font-mono text-[11px] tracking-[0.14em] text-stone">0{i + 1}</span>
            <span className="font-serif text-[clamp(30px,3vw,44px)] leading-none tracking-[-0.01em]">
              {company}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
