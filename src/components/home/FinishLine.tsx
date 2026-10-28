import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FINISH_LINE } from "@/content/home";
import {
  AI_CHECK_EXTRA,
  CARE_PLANS,
  CODE_CHECK,
  CONTENT_PASS_PER_PAGE,
  REBUILD_THRESHOLD,
  STARTING_POINTS,
} from "@/lib/pricing";
import { WhatsAppLink } from "@/components/Phone";

const CHECKS = [
  { name: "Website", fee: CODE_CHECK.website },
  { name: "Web app", fee: CODE_CHECK.webapp },
  { name: "Mobile app", fee: CODE_CHECK.mobileapp },
  { name: "AI agent", fee: CODE_CHECK.webapp + AI_CHECK_EXTRA },
];

const GRADES = [
  ...STARTING_POINTS.filter((p) => p.grade)
    .reverse()
    .map((p) => ({ grade: p.grade!, desc: p.description, share: `~${Math.round(p.costMultiplier * 100)}%` })),
  { grade: "C · Rebuild", desc: "Little worth keeping. We reuse your designs and flows.", share: "Full price" },
];

const step = "flex flex-col rounded-[26px] p-7 sm:p-8";
const row = "flex items-baseline justify-between gap-4 border-b py-3";

export default function FinishLine() {
  return (
    <section id="finish-line" className="bg-linen">
      <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="min-w-0 flex-[1_1_560px]">
            <p className="eyebrow text-stone">( Started with AI? )</p>
            <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
              Built most of it?
              <br />
              <span className="accent-serif text-brass">We&apos;ll finish it.</span>
            </h2>
          </div>
          <p className="flex-[1_1_360px] text-lg leading-relaxed text-taupe">
            Vibe-coded your app with {FINISH_LINE.tools.slice(0, -1).join(", ")} or{" "}
            {FINISH_LINE.tools.at(-1)}, and stalled before launch? We pick up where the AI left off and
            get it over the line, and you only pay for the part that&apos;s left.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)]">
          {/* Sound familiar? */}
          <div className="rounded-[26px] border border-obsidian/10 bg-white p-7 sm:p-8">
            <p className="eyebrow text-brass">Sound familiar?</p>
            <ul className="mt-5 border-t border-obsidian/10">
              {FINISH_LINE.signs.map((sign) => (
                <li key={sign} className="border-b border-obsidian/10 py-4 font-serif text-[22px] leading-snug">
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-taupe">
              None of that means starting over. Most AI-built projects are well on their way; the last stretch
              is the part that needs an engineer.
            </p>
          </div>

          {/* How it's priced: check → grade → fixed price */}
          <div className="grid gap-4 md:grid-cols-3">
            <article className={`${step} border border-obsidian/10 bg-white`}>
              <span className="font-mono text-xs text-stone">01</span>
              <h3 className="mt-6 font-serif text-[34px] leading-none">Code check</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-taupe">
                We run your project and review the code: what works, what&apos;s broken, what&apos;s unsafe.
              </p>
              <ul className="mt-6 border-t border-obsidian/10">
                {CHECKS.map((c) => (
                  <li key={c.name} className={`${row} border-obsidian/10 text-[14px]`}>
                    {c.name}
                    <span className="font-serif text-[22px] leading-none">${c.fee}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-brass">
                Credited if you go ahead
              </p>
            </article>

            <article className={`${step} bg-obsidian text-bone`}>
              <span className="font-mono text-xs text-ash">02</span>
              <h3 className="mt-6 font-serif text-[34px] leading-none">Your grade</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">
                The check grades your project, and the grade sets the price as a share of a fresh build.
              </p>
              <ul className="mt-6 border-t border-bone/15">
                {GRADES.map((g) => (
                  <li key={g.grade} className="border-b border-bone/10 py-3">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-[22px] leading-none">{g.grade}</span>
                      <span className="font-mono text-xs text-champagne">{g.share}</span>
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-fog">{g.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-[13px] leading-relaxed text-ash">
                If finishing would cost {Math.round(REBUILD_THRESHOLD * 100)}% of a rebuild or more, we&apos;ll say
                so.
              </p>
            </article>

            <article className={`${step} border border-obsidian/10 bg-white`}>
              <span className="font-mono text-xs text-stone">03</span>
              <h3 className="mt-6 font-serif text-[34px] leading-none">A fixed price</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-taupe">
                Hidden gaps and new ideas are normal. Here&apos;s how we keep them fair.
              </p>
              <ul className="mt-6 border-t border-obsidian/10">
                {FINISH_LINE.terms.map((t) => (
                  <li key={t.title} className="border-b border-obsidian/10 py-3">
                    <span className="block text-[14px] font-medium">{t.title}</span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-stone">{t.body}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        {/* After launch */}
        <div className="mt-4 rounded-[26px] border border-obsidian/10 bg-white p-7 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="font-serif text-[30px] leading-none">Keep it running</h3>
            <p className="text-[14px] text-stone">
              Monthly care after launch · AI-written copy rewritten in your voice from ${CONTENT_PASS_PER_PAGE} a page
            </p>
          </div>
          <ul className="mt-6 grid border-t border-obsidian/10 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_PLANS.map((plan) => (
              <li key={plan.id} className="border-b border-obsidian/10 py-4 sm:pr-6 lg:border-b-0">
                <span className="eyebrow text-[11px] text-stone">{plan.name}</span>
                <span className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-serif text-[30px] leading-none">${plan.price}</span>
                  <span className="font-mono text-xs text-stone">/ month</span>
                </span>
                <span className="mt-1.5 block text-[13px] leading-relaxed text-taupe">{plan.covers}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppLink
            text="Hi Biibisoft, I started building my app with AI and need help finishing it."
            className="inline-flex h-14 items-center justify-between gap-3 rounded-full bg-obsidian px-7 text-[15px] font-medium text-bone transition-colors hover:bg-graphite"
          >
            Book a code check
            <ArrowUpRight className="h-[18px] w-[18px] shrink-0" />
          </WhatsAppLink>
          <Link
            href="/hire-us#estimator"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-obsidian/20 px-7 text-[15px] transition-colors hover:border-obsidian/50"
          >
            Estimate your finish
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
          <Link href="/services/vibe-code-rescue" className="ulink px-2 text-[15px] text-taupe hover:text-obsidian">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
