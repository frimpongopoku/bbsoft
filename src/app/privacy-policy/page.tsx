import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { EMAIL, mailtoLink } from "@/content/contact";
import { PhoneNumber, WhatsAppLink } from "@/components/Phone";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Biibisoft, aligned with Ghana's Data Protection Act, 2012 (Act 843).",
  alternates: { canonical: "/privacy-policy" },
};

const policySections = [
  {
    title: "Who We Are",
    body: "Biibisoft is the data controller for personal data processed through our website and services. Our registered business details are maintained in the Republic of Ghana.",
  },
  {
    title: "Legal Framework and Scope",
    body: "This policy is prepared with regard to Ghana's Data Protection Act, 2012 (Act 843) and applies to personal data collected through inquiries, service delivery, product usage, and related communications.",
  },
  {
    title: "Categories of Personal Data We Collect",
    body: "We may collect identity data (for example, name), contact data (for example, email and phone), business information, communication content, technical data (device/browser/IP), and service usage data required to deliver and improve our products and services.",
  },
  {
    title: "Purposes and Lawful Basis for Processing",
    body: "We process personal data to respond to inquiries, provide requested services, manage client relationships, secure our systems, comply with legal obligations, and improve product quality. Processing is based on consent, contractual necessity, legitimate interests, and legal compliance as applicable.",
  },
  {
    title: "How We Collect Data",
    body: "Data is collected directly from you through forms, emails, consultations, and project onboarding, and indirectly through website analytics, security tools, and service integrations.",
  },
  {
    title: "Data Sharing and Third-Party Processors",
    body: "We may share personal data with trusted vendors and processors that support hosting, analytics, communications, or project delivery under confidentiality and data protection obligations. We do not sell personal data.",
  },
  {
    title: "Cross-Border Transfers",
    body: "Where personal data is transferred outside Ghana, we apply safeguards such as contractual protections, vendor due diligence, and transfer controls appropriate to the sensitivity of the data and legal requirements.",
  },
  {
    title: "Data Retention",
    body: "We retain personal data only for as long as necessary for business, contractual, legal, and regulatory purposes.",
  },
  {
    title: "Information Security",
    body: "We apply organizational and technical security controls designed to prevent unauthorized access, disclosure, alteration, and loss, including role-based access, secure transmission, and operational monitoring.",
  },
  {
    title: "Your Rights",
    body: "Subject to applicable law, you may request access to your data, correction of inaccurate data, withdrawal of consent where consent applies, and other rights recognized under Act 843. You may also raise a complaint with the Data Protection Commission of Ghana.",
  },
  {
    title: "Cookies and Similar Technologies",
    body: "We may use cookies and similar technologies for core website functionality, performance measurement, and user experience improvements.",
  },
  {
    title: "Children and Sensitive Data",
    body: "Our services are not intentionally directed to children without appropriate safeguards and legal basis. We avoid collecting sensitive personal data unless necessary and supported by lawful grounds.",
  },
  {
    title: "Policy Updates",
    body: "We may update this policy from time to time to reflect legal, technical, or operational changes. Material updates will be posted on this page with a revised effective date.",
  },
] as const;

const slug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const sections = [...policySections, { title: "Contact Us" }];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-obsidian text-bone">
        <div className="mx-auto max-w-[1360px] px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44 lg:px-12">
          <p className="eyebrow text-mist">( Privacy &amp; data protection )</p>
          <h1 className="mt-6 text-[clamp(56px,9vw,140px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Privacy <span className="accent-serif text-champagne">policy.</span>
          </h1>
          <p className="mt-8 max-w-[620px] text-[clamp(17px,1.4vw,20px)] font-light leading-relaxed text-mist">
            How Biibisoft collects, uses, stores and protects personal data in connection with our website,
            products and service delivery, prepared with regard to Ghana&apos;s Data Protection Act, 2012
            (Act 843).
          </p>
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-4 border-t border-bone/15 pt-6 font-mono text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.08em] text-ash">Effective</dt>
              <dd className="mt-1">1 March 2022</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.08em] text-ash">Last updated</dt>
              <dd className="mt-1">20 December 2025</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Policy ───────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 lg:px-12">
        <nav aria-label="Contents" className="lg:sticky lg:top-28 lg:self-start">
          <details className="group rounded-2xl border border-obsidian/10 bg-white p-5 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
              Contents
              <span className="font-mono text-xs text-stone">{sections.length} sections</span>
            </summary>
            <ContentsList />
          </details>
          <div className="hidden lg:block">
            <p className="eyebrow text-[11px] text-stone">Contents</p>
            <ContentsList />
          </div>
        </nav>

        <div className="max-w-[760px]">
          {policySections.map((section, i) => (
            <article
              key={section.title}
              id={slug(section.title)}
              className="scroll-mt-28 border-t border-obsidian/15 py-9 first:border-t-0 first:pt-0"
            >
              <span className="font-mono text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 font-serif text-[clamp(30px,3vw,40px)] leading-[1.05]">{section.title}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-taupe">{section.body}</p>
            </article>
          ))}

          <article
            id={slug("Contact Us")}
            className="scroll-mt-28 rounded-[24px] bg-obsidian p-7 text-bone sm:p-10"
          >
            <span className="font-mono text-xs text-champagne">{sections.length}</span>
            <h2 className="mt-3 font-serif text-[clamp(30px,3vw,40px)] leading-[1.05]">Contact Us</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-mist">
              For privacy-related requests, corrections, or complaints, contact the Biibisoft Privacy Office,
              Greater Accra Region, Ghana.
            </p>
            <dl className="mt-6 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-bone/10 py-3">
                <dt className="text-fog">Email</dt>
                <dd>
                  <a href={mailtoLink("Privacy request")} className="ulink font-mono text-champagne">
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-bone/10 py-3">
                <dt className="text-fog">Phone / WhatsApp</dt>
                <dd>
                  <WhatsAppLink
                    text="Hi Biibisoft, I have a privacy request."
                    className="ulink inline-flex items-center gap-1 font-mono text-champagne"
                  >
                    <PhoneNumber />
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </WhatsAppLink>
                </dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                <dt className="text-fog">Address</dt>
                <dd>Greater Accra Region, Ghana</dd>
              </div>
            </dl>
          </article>

          <Link href="/" className="ulink mt-12 inline-flex items-center gap-2 text-sm text-taupe hover:text-obsidian">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    </>
  );
}

function ContentsList() {
  return (
    <ol className="mt-4 space-y-1 text-[15px]">
      {sections.map((section, i) => (
        <li key={section.title}>
          <a
            href={`#${slug(section.title)}`}
            className="flex gap-3 rounded-lg py-1.5 text-taupe transition-colors hover:text-obsidian"
          >
            <span className="w-5 shrink-0 font-mono text-xs leading-6 text-stone">
              {String(i + 1).padStart(2, "0")}
            </span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
