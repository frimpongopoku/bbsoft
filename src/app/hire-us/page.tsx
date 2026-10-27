"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import QuoteBuilder from "@/components/QuoteBuilder";
import ContactChannels from "@/components/ContactChannels";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CRAFTS } from "@/content/home";
import { whatsappLink } from "@/content/contact";

const JUMP_LINKS = [
  { href: "#services", label: "What we build" },
  { href: "#process", label: "How we work" },
  { href: "#estimator", label: "Estimate & PDF quote" },
  { href: "#contact", label: "Talk to us" },
] as const;

const PROCESS = [
  { title: "Scope", body: "An itemised estimate and a clear plan before any code is written." },
  { title: "Shape", body: "Flows and interfaces you can click through, not just look at." },
  { title: "Ship weekly", body: "Working software in your hands every week, on a staging link." },
  { title: "Launch & grow", body: "Store submissions, monitoring and iteration after go-live." },
] as const;

const heading = "text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]";

export default function HireUsPage() {
  const [estimate, setEstimate] = useState("");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-obsidian text-bone">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="mesh-blob mesh-2 right-[-10%] top-[-10%] h-[min(560px,80vw)] w-[min(560px,80vw)] bg-[#6e4e1e] opacity-60" />
          <div className="mesh-blob mesh-1 bottom-[-30%] left-[-10%] h-[min(520px,80vw)] w-[min(520px,80vw)] bg-champagne opacity-30" />
        </div>
        <div className="relative mx-auto max-w-[1360px] px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44 lg:px-12">
          <p className="eyebrow text-mist">( Hire Biibisoft )</p>
          <h1 className="mt-6 text-[clamp(60px,10vw,160px)] font-normal leading-[0.88] tracking-[-0.055em]">
            Let&apos;s build
            <br />
            <span className="accent-serif text-champagne">your</span> product.
          </h1>
          <p className="mt-8 max-w-[600px] text-[clamp(17px,1.4vw,20px)] font-light leading-relaxed text-mist">
            A team that has shipped at Slack, Google and Andela, a studio that runs its own products,
            and pricing you can see before you commit.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#estimator"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-champagne px-7 text-base font-medium text-obsidian transition-colors hover:bg-bone"
            >
              Estimate your project
              <ArrowDown className="h-[18px] w-[18px]" />
            </Link>
            <a
              href={whatsappLink("Hi Biibisoft, I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-bone/25 px-7 text-base transition-colors hover:border-bone/60"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp us
            </a>
          </div>

          {/* On-page index */}
          <nav aria-label="On this page" className="mt-16 md:mt-24">
            <ul className="grid grid-cols-2 border-t border-bone/15 lg:grid-cols-4">
              {JUMP_LINKS.map((link, i) => (
                <li key={link.href} className="border-b border-bone/15 odd:border-r lg:border-r lg:last:border-r-0">
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col justify-between gap-6 p-4 transition-colors hover:bg-bone/[0.04] sm:p-6"
                  >
                    <span className="font-mono text-xs text-ash">0{i + 1}</span>
                    <span className="flex items-end justify-between gap-3">
                      <span className="font-serif text-[clamp(22px,2.2vw,30px)] leading-tight">{link.label}</span>
                      <ArrowDown className="h-4 w-4 shrink-0 text-champagne transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section id="services" className="mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <p className="eyebrow text-stone">( What we build )</p>
        <h2 className={`mt-5 ${heading}`}>
          Five crafts, <span className="accent-serif text-brass">one standard.</span>
        </h2>
        <ul className="mt-14 border-t border-obsidian/15">
          {CRAFTS.map((craft, i) => (
            <li key={craft.name}>
              <Link
                href="#estimator"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-obsidian/15 px-1 py-7 transition-colors hover:bg-white/60 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_auto] md:gap-x-8 md:py-9"
              >
                <span className="font-mono text-[13px] text-stone">0{i + 1}</span>
                <span className="font-serif text-[clamp(32px,3.4vw,48px)] leading-none">{craft.name}</span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-brass md:order-last md:text-right">
                  {craft.from}
                </span>
                <span className="col-span-3 col-start-1 text-[16px] leading-relaxed text-taupe md:col-span-1 md:col-start-auto">
                  {craft.desc}
                </span>
                <span className="col-span-3 col-start-1 font-mono text-xs uppercase tracking-[0.08em] text-stone md:col-span-1 md:col-start-auto">
                  {craft.tech}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section id="process" className="bg-linen">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <p className="eyebrow text-stone">( How we work )</p>
          <h2 className={`mt-5 ${heading}`}>
            Clear from <span className="accent-serif text-brass">day one.</span>
          </h2>
          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li
                key={step.title}
                className={`border-t py-7 ${i === PROCESS.length - 1 ? "border-t-2 border-brass" : "border-obsidian/20"}`}
              >
                <span className={`font-mono text-xs ${i === PROCESS.length - 1 ? "text-brass" : "text-stone"}`}>
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-serif text-[34px] leading-none">{step.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-taupe">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Estimator ────────────────────────────────────────────── */}
      <section id="estimator" className="mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="min-w-0 flex-[1_1_560px]">
            <p className="eyebrow text-stone">( Estimator )</p>
            <h2 className={`mt-5 ${heading}`}>
              Your quote, <span className="accent-serif text-brass">itemised.</span>
            </h2>
          </div>
          <p className="flex-[1_1_360px] text-lg leading-relaxed text-taupe">
            Pick a platform, add modules, choose a design level and pace. Download a PDF quote, or send it
            straight to us and we&apos;ll take it from there.
          </p>
        </div>
        <QuoteBuilder onSelectEstimate={setEstimate} />
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-obsidian text-bone">
        <div className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
          <div className="min-w-0 flex-[1_1_420px]">
            <p className="eyebrow text-ash">( Talk to us )</p>
            <h2 className="mt-5 text-[clamp(52px,7vw,108px)] font-normal leading-[0.9] tracking-[-0.055em]">
              Let&apos;s <span className="accent-serif text-champagne">talk.</span>
            </h2>
            <p className="mt-7 max-w-[420px] text-lg font-light leading-relaxed text-mist">
              WhatsApp or email is the quickest way to reach us. We reply within 24 hours, usually sooner.
            </p>
            <div className="mt-10 max-w-[460px]">
              <ContactChannels />
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            {estimate && (
              <p className="mb-6 flex items-center gap-2 rounded-2xl border border-champagne/30 bg-champagne/10 px-4 py-3 text-sm text-champagne">
                <ArrowRight className="h-4 w-4 shrink-0" />
                Your estimate is filled in below. Add your details and send.
              </p>
            )}
            <EnquiryForm prefill={estimate} />
          </div>
        </div>
        <div className="mx-auto max-w-[1360px] px-5 pt-16 sm:px-8 lg:px-12">
          <Link href="/" className="ulink inline-flex items-center gap-2 text-sm text-fog hover:text-bone">
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
