import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";

export const metadata: Metadata = {
  title: "Privacy Policy | Biibisoft",
  description:
    "Privacy Policy for Biibisoft, aligned with Ghana's Data Protection Act, 2012 (Act 843).",
};

const policySections = [
  {
    title: "1. Who We Are",
    body: "Biibisoft is the data controller for personal data processed through our website and services. Our registered business details are maintained in the Republic of Ghana.",
  },
  {
    title: "2. Legal Framework and Scope",
    body: "This policy is prepared with regard to Ghana's Data Protection Act, 2012 (Act 843) and applies to personal data collected through inquiries, service delivery, product usage, and related communications.",
  },
  {
    title: "3. Categories of Personal Data We Collect",
    body: "We may collect identity data (for example, name), contact data (for example, email and phone), business information, communication content, technical data (device/browser/IP), and service usage data required to deliver and improve our products and services.",
  },
  {
    title: "4. Purposes and Lawful Basis for Processing",
    body: "We process personal data to respond to inquiries, provide requested services, manage client relationships, secure our systems, comply with legal obligations, and improve product quality. Processing is based on consent, contractual necessity, legitimate interests, and legal compliance as applicable.",
  },
  {
    title: "5. How We Collect Data",
    body: "Data is collected directly from you through forms, emails, consultations, and project onboarding, and indirectly through website analytics, security tools, and service integrations.",
  },
  {
    title: "6. Data Sharing and Third-Party Processors",
    body: "We may share personal data with trusted vendors and processors that support hosting, analytics, communications, or project delivery under confidentiality and data protection obligations. We do not sell personal data.",
  },
  {
    title: "7. Cross-Border Transfers",
    body: "Where personal data is transferred outside Ghana, we apply safeguards such as contractual protections, vendor due diligence, and transfer controls appropriate to the sensitivity of the data and legal requirements.",
  },
  {
    title: "8. Data Retention",
    body: "We retain personal data only for as long as necessary for business, contractual, legal, and regulatory purposes.",
  },
  {
    title: "9. Information Security",
    body: "We apply organizational and technical security controls designed to prevent unauthorized access, disclosure, alteration, and loss, including role-based access, secure transmission, and operational monitoring.",
  },
  {
    title: "10. Your Rights",
    body: "Subject to applicable law, you may request access to your data, correction of inaccurate data, withdrawal of consent where consent applies, and other rights recognized under Act 843. You may also raise a complaint with the Data Protection Commission of Ghana.",
  },
  {
    title: "11. Cookies and Similar Technologies",
    body: "We may use cookies and similar technologies for core website functionality, performance measurement, and user experience improvements.",
  },
  {
    title: "12. Children and Sensitive Data",
    body: "Our services are not intentionally directed to children without appropriate safeguards and legal basis. We avoid collecting sensitive personal data unless necessary and supported by lawful grounds.",
  },
  {
    title: "13. Policy Updates",
    body: "We may update this policy from time to time to reflect legal, technical, or operational changes. Material updates will be posted on this page with a revised effective date.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen font-sans">
      <BackgroundGrid />

      <section className="relative pt-36 pb-20 md:pt-48 md:pb-24 max-w-5xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-orange"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mt-8 glass-panel rounded-3xl p-8 md:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy and Data Protection
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-text-title tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-brand-text-body leading-relaxed">
            Effective Date: <strong>1st March 2022</strong>
            <br />
            Last Updated: <strong>20 December 2025</strong>
          </p>
          <p className="mt-4 text-brand-text-body leading-relaxed">
            This Privacy Policy describes how Biibisoft collects, uses, stores,
            and protects personal data in connection with our website, products,
            and service delivery.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-28 max-w-5xl mx-auto px-6">
        <div className="space-y-5">
          {policySections.map((section) => (
            <article
              key={section.title}
              className="glass-card rounded-2xl p-7 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-extrabold text-brand-text-title">
                {section.title}
              </h2>
              <p className="mt-3 text-sm md:text-base text-brand-text-body leading-relaxed">
                {section.body}
              </p>
            </article>
          ))}

          <article className="glass-panel rounded-2xl p-7 md:p-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-text-title">
              14. Contact Us
            </h2>
            <p className="mt-3 text-sm md:text-base text-brand-text-body leading-relaxed">
              For privacy-related requests, corrections, or complaints, contact:
            </p>
            <p className="mt-3 text-sm md:text-base text-brand-text-body leading-relaxed">
              <strong>Biibisoft Privacy Office</strong>
              <br />
              Email: <strong>message@biibisoft.com</strong>
              <br />
              Phone: <strong>+2332052221387</strong>
              <br />
              Address: <strong>Greater Accra Region, Ghana</strong>
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
