import Hero from "@/components/home/Hero";
import Promises from "@/components/home/Promises";
import Crafts from "@/components/home/Crafts";
import Audiences from "@/components/home/Audiences";
import FinishLine from "@/components/home/FinishLine";
import Team from "@/components/home/Team";
import Work from "@/components/home/Work";
import Lab from "@/components/home/Lab";
import Build from "@/components/home/Build";
import Enquiry from "@/components/home/Enquiry";
import Faq from "@/components/home/Faq";
import JsonLd from "@/components/JsonLd";
import { LAB } from "@/content/home";
import { GENERAL_FAQS } from "@/content/services";
import { SITE_URL } from "@/content/contact";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: GENERAL_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    // Our own products, published by Biibisoft.
    ...LAB.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      url: p.url,
      description: p.pitch,
      applicationCategory: p.category === "Developer tools" ? "DeveloperApplication" : "BusinessApplication",
      operatingSystem: p.platform === "macOS" ? "macOS" : p.platform === "Chrome extension" ? "Chrome" : "Web",
      publisher: { "@id": `${SITE_URL}/#organization` },
    })),
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <Promises />
      <Crafts />
      <Audiences />
      <div className="pb-24 md:pb-36">
        <FinishLine />
      </div>
      <Team />
      <Work />
      <Lab />
      <Build />
      <Faq />
      <Enquiry />
    </>
  );
}
