import Link from "next/link";
import { ArrowRight, Building2, Cpu, FlaskConical, Orbit } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";

const INNOVATION_PILLARS = [
  {
    title: "Internal Product Innovation",
    description:
      "We design and launch original software products from Accra with global product standards.",
    icon: FlaskConical,
  },
  {
    title: "Partner Engineering",
    description:
      "We embed with teams to build client-facing web, mobile, and AI products that deliver measurable value.",
    icon: Building2,
  },
  {
    title: "Scalable Delivery",
    description:
      "Our systems are built for performance, maintainability, and long-term growth across markets.",
    icon: Cpu,
  },
] as const;

const ORGANIZATIONS = [
  "Massenergize",
  "SkilledHQ",
  "New Fire Radio",
  "Pidaso",
  "Royal Cephas",
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans">
      <BackgroundGrid />

      <section className="relative pt-36 pb-20 md:pt-52 md:pb-28 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
          <Orbit className="w-3.5 h-3.5" />
          Biibisoft · Product Innovation + Client Delivery
        </span>

        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-brand-text-title max-w-5xl mx-auto">
          Building Our Own
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange via-brand-amber to-brand-orange">
            {" "}Future-Ready Products{" "}
          </span>
          While Engineering Yours
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-brand-text-body max-w-3xl mx-auto leading-relaxed">
          Biibisoft is a Ghanaian software company that innovates internally and
          partners with organizations to design and deliver high-impact digital
          products. From bold ideas to production systems, we build what moves
          businesses forward.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/hire-us"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-bold uppercase tracking-wider text-white"
          >
            Hire Us
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/hire-us#contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-border-theme bg-brand-card-bg-theme px-7 text-sm font-bold uppercase tracking-wider text-brand-text-body"
          >
            Start A Conversation
          </Link>
        </div>
      </section>

      <section
        aria-label="Organizations we work with"
        className="w-full border-y border-brand-border-theme/60 bg-brand-card-bg-theme/30"
      >
        <div className="org-belt-mask-full">
          <div className="org-belt-track">
            <div className="org-belt-group">
              {ORGANIZATIONS.map((organization) => (
                <span key={`a-${organization}`} className="org-belt-item">
                  {organization}
                </span>
              ))}
            </div>
            <div className="org-belt-group" aria-hidden="true">
              {ORGANIZATIONS.map((organization) => (
                <span key={`b-${organization}`} className="org-belt-item">
                  {organization}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cv-auto-section py-16 md:py-20 border-y border-brand-border-theme/60 bg-brand-card-bg-theme/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {INNOVATION_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="glass-card rounded-2xl p-7">
                <div className="inline-flex p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="mt-4 text-xl font-extrabold text-brand-text-title">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm text-brand-text-body leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cv-auto-section pb-24 md:pb-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass-panel rounded-3xl p-8 md:p-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              Ready to Build
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-title">
              Bring Biibisoft In As Your Product Partner
            </h2>
            <p className="mt-4 text-brand-text-body max-w-2xl mx-auto leading-relaxed">
              Whether you need a full build, a product upgrade, or an AI-first
              system, our team is ready to collaborate with speed and
              engineering precision.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/hire-us#estimator"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-bold uppercase tracking-wider text-white"
              >
                Get Project Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-border-theme bg-brand-card-bg-theme px-7 text-sm font-bold uppercase tracking-wider text-brand-text-body"
              >
                Read Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
