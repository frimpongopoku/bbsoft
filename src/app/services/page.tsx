import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/content/services";
import { SITE_URL } from "@/content/contact";

export const metadata: Metadata = {
  title: "Software development services",
  description:
    "Website, web app and mobile app development, custom software, AI integration and dedicated developers, from Biibisoft in Accra, Ghana. For companies and first-time founders.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Biibisoft services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE_URL}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <section className="bg-obsidian text-bone">
        <div className="mx-auto max-w-[1360px] px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44 lg:px-12">
          <p className="eyebrow text-mist">( Services )</p>
          <h1 className="mt-6 text-[clamp(56px,9vw,140px)] font-normal leading-[0.9] tracking-[-0.055em]">
            What we <span className="accent-serif text-champagne">build.</span>
          </h1>
          <p className="mt-8 max-w-[640px] text-[clamp(17px,1.4vw,20px)] font-light leading-relaxed text-mist">
            Software development services for companies that need senior engineering capacity and for
            founders taking a first idea to launch: websites, web and mobile apps, custom platforms and AI.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <ul className="border-t border-obsidian/15">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-obsidian/15 px-1 py-8 transition-colors hover:bg-white/60 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.3fr)_10rem_auto] md:gap-x-8"
              >
                <span className="font-mono text-[13px] text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-serif text-[clamp(32px,3.4vw,48px)] leading-none">{s.name}</h2>
                <ArrowRight className="h-6 w-6 self-center text-brass transition-transform group-hover:translate-x-1 md:order-last" />
                <p className="col-span-3 col-start-1 text-[16px] leading-relaxed text-taupe md:col-span-1 md:col-start-auto">
                  {s.lede.split(". ")[0]}.
                </p>
                <span className="col-span-3 col-start-1 font-mono text-xs uppercase tracking-[0.08em] text-brass md:col-span-1 md:col-start-auto md:text-right">
                  {/^\+?\$/.test(s.from) ? `From ${s.from.replace(/^\+/, "")}` : s.from}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
