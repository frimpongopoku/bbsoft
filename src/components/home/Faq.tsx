import FaqList from "@/components/FaqList";
import { GENERAL_FAQS } from "@/content/services";

export default function Faq() {
  return (
    <section id="faq" className="bg-linen">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:px-12">
        <div>
          <p className="eyebrow text-stone">( Questions )</p>
          <h2 className="mt-5 text-[clamp(48px,6.4vw,96px)] font-normal leading-[0.92] tracking-[-0.05em]">
            Asked <span className="accent-serif text-brass">often.</span>
          </h2>
        </div>
        <FaqList faqs={GENERAL_FAQS} />
      </div>
    </section>
  );
}
