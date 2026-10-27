import { ArrowUpRight, Check } from "lucide-react";
import { AUDIENCES } from "@/content/home";
import { mailtoLink } from "@/content/contact";
import { WhatsAppLink } from "@/components/Phone";

const ctaClass =
  "mt-auto inline-flex h-14 items-center justify-between gap-3 rounded-full px-7 text-[15px] font-medium transition-colors";

export default function Audiences() {
  const [companies, founders] = AUDIENCES;

  return (
    <section id="who" className="mx-auto w-full max-w-[1360px] px-5 pb-24 sm:px-8 md:pb-36 lg:px-12">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
        <div className="min-w-0 flex-[1_1_560px]">
          <p className="eyebrow text-stone">( Who we build for )</p>
          <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
            Big team or
            <br />
            <span className="accent-serif text-brass">first idea.</span>
          </h2>
        </div>
        <p className="flex-[1_1_360px] text-lg leading-relaxed text-taupe">
          Companies get senior engineers who fit into how they already work. Founders get a partner who
          takes them from idea to launch. Same team, same standard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[companies, founders].map((a) => {
          const dark = a.id === "founders";
          const body = (
            <>
              {a.cta}
              <ArrowUpRight className="h-[18px] w-[18px] shrink-0" />
            </>
          );
          return (
            <article
              key={a.id}
              className={`flex flex-col gap-7 rounded-[28px] p-7 sm:p-10 ${
                dark ? "bg-obsidian text-bone" : "border border-obsidian/10 bg-white"
              }`}
            >
              <p className={`eyebrow ${dark ? "text-champagne" : "text-brass"}`}>{a.eyebrow}</p>
              <h3 className="font-serif text-[clamp(34px,3.4vw,48px)] leading-[1.02]">{a.title}</h3>
              <p className={`text-[17px] leading-relaxed ${dark ? "text-mist" : "text-taupe"}`}>{a.body}</p>
              <ul className={`border-t ${dark ? "border-bone/15" : "border-obsidian/10"}`}>
                {a.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 border-b py-3.5 text-[15px] ${
                      dark ? "border-bone/10" : "border-obsidian/10"
                    }`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-champagne" : "text-brass"}`}
                      strokeWidth={2.5}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              {dark ? (
                <WhatsAppLink
                  text="Hi Biibisoft, I have an idea I'd like help building."
                  className={`${ctaClass} bg-champagne text-obsidian hover:bg-bone`}
                >
                  {body}
                </WhatsAppLink>
              ) : (
                <a
                  href={mailtoLink("Proposal request", "Company:\nWhat we need:\nTimeline:\n")}
                  className={`${ctaClass} bg-obsidian text-bone hover:bg-graphite`}
                >
                  {body}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
