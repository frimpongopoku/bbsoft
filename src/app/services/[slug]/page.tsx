import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WhatsAppLink } from "@/components/Phone";
import { LAB } from "@/content/home";
import { SERVICES, getService } from "@/content/services";
import { SITE_URL } from "@/content/contact";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${service.metaTitle} — Biibisoft`, description: service.metaDescription },
  };
}

const heading = "text-[clamp(44px,5.6vw,84px)] font-normal leading-[0.94] tracking-[-0.05em]";

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const url = `${SITE_URL}/services/${service.slug}`;
  const proof = LAB.filter((p) => service.proof.includes(p.name));
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-obsidian text-bone">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="mesh-blob mesh-2 right-[-10%] top-[-10%] h-[min(560px,80vw)] w-[min(560px,80vw)] bg-[#6e4e1e] opacity-60" />
          <div className="mesh-blob mesh-1 bottom-[-30%] left-[-10%] h-[min(520px,80vw)] w-[min(520px,80vw)] bg-champagne opacity-30" />
        </div>
        <div className="relative mx-auto max-w-[1360px] px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44 lg:px-12">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.1em] text-ash">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-bone">Home</Link> /
              </li>
              <li>
                <Link href="/services" className="hover:text-bone">Services</Link> /
              </li>
              <li aria-current="page" className="text-mist">{service.eyebrow}</li>
            </ol>
          </nav>
          <h1 className="mt-8 max-w-[1100px] text-[clamp(52px,8vw,128px)] font-normal leading-[0.9] tracking-[-0.055em]">
            {service.heading[0]} <span className="accent-serif text-champagne">{service.heading[1]}</span>
          </h1>
          <p className="mt-8 max-w-[640px] text-[clamp(17px,1.4vw,20px)] font-light leading-relaxed text-mist">
            {service.lede}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/hire-us#estimator"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-champagne px-7 text-base font-medium text-obsidian transition-colors hover:bg-bone"
            >
              Get an instant estimate
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
            <WhatsAppLink
              text={`Hi Biibisoft, I'd like to talk about ${service.name.toLowerCase()}.`}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-bone/25 px-7 text-base transition-colors hover:border-bone/60"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp us
            </WhatsAppLink>
          </div>

          <dl className="mt-16 grid border-t border-bone/15 sm:grid-cols-3">
            {[
              ["Starting from", service.from],
              ["Typical timeline", service.timeline],
              ["Stack", service.stack],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-bone/15 py-5 sm:border-b-0 sm:pr-6">
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-ash">{label}</dt>
                <dd className="mt-2 font-serif text-[26px] leading-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <p className="eyebrow text-stone">( What&apos;s included )</p>
        <h2 className={`mt-5 ${heading}`}>
          Everything it takes <span className="accent-serif text-brass">to launch.</span>
        </h2>
        <ul className="mt-14 grid border-l border-t border-obsidian/15 sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <li key={item.title} className="border-b border-r border-obsidian/15 p-6 sm:p-8">
              <span className="font-mono text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-serif text-[28px] leading-tight">{item.title}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-taupe">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────── */}
      <section className="bg-linen">
        <div className="mx-auto grid max-w-[1360px] gap-4 px-5 py-24 sm:px-8 md:grid-cols-2 md:py-32 lg:px-12">
          <div className="md:col-span-2">
            <p className="eyebrow text-stone">( Who it&apos;s for )</p>
            <h2 className={`mb-10 mt-5 ${heading}`}>
              Big team or <span className="accent-serif text-brass">first idea.</span>
            </h2>
          </div>
          <article className="rounded-[26px] border border-obsidian/10 bg-white p-7 sm:p-10">
            <p className="eyebrow text-brass">For companies &amp; teams</p>
            <p className="mt-5 font-serif text-[clamp(28px,2.6vw,36px)] leading-[1.1]">{service.forCompanies}</p>
          </article>
          <article className="rounded-[26px] bg-obsidian p-7 text-bone sm:p-10">
            <p className="eyebrow text-champagne">For founders &amp; individuals</p>
            <p className="mt-5 font-serif text-[clamp(28px,2.6vw,36px)] leading-[1.1]">{service.forFounders}</p>
          </article>
        </div>
      </section>

      {/* ── Proof: our own products ──────────────────────────────── */}
      {proof.length > 0 && (
        <section className="mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <p className="eyebrow text-stone">( Built by us )</p>
          <h2 className={`mt-5 ${heading}`}>
            We run products <span className="accent-serif text-brass">like this.</span>
          </h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {proof.map((product) => (
              <li key={product.name}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col rounded-[24px] bg-obsidian p-7 text-bone transition-colors hover:bg-graphite"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
                    {product.category} · {product.platform}
                  </span>
                  <h3 className="mt-6 font-serif text-[40px] leading-none">{product.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist">{product.pitch}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm text-champagne">
                    {product.domain}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className={proof.length > 0 ? "bg-linen" : ""}>
        <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:px-12">
          <div>
            <p className="eyebrow text-stone">( Questions )</p>
            <h2 className={`mt-5 ${heading}`}>
              Asked <span className="accent-serif text-brass">often.</span>
            </h2>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      {/* ── Closing CTA + related services ───────────────────────── */}
      <section className="bg-obsidian text-bone">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <h2 className="text-[clamp(48px,7vw,108px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Ready when <span className="accent-serif text-champagne">you are.</span>
          </h2>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/hire-us#estimator"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-champagne px-7 text-base font-medium text-obsidian transition-colors hover:bg-bone"
            >
              Estimate your project
              <ArrowDown className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href="/hire-us#contact"
              className="inline-flex h-14 items-center justify-center rounded-full border border-bone/25 px-7 text-base transition-colors hover:border-bone/60"
            >
              Talk to us
            </Link>
          </div>

          <h3 className="eyebrow mt-20 text-ash">Other services</h3>
          <ul className="mt-4 border-t border-bone/15">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-bone/15 py-5"
                >
                  <span className="font-serif text-[clamp(26px,2.6vw,36px)] leading-none transition-colors group-hover:text-champagne">
                    {s.name}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-champagne transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
