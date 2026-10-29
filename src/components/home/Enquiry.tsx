import ContactChannels from "@/components/ContactChannels";
import EnquiryForm from "@/components/EnquiryForm";

export default function Enquiry() {
  return (
    <section id="enquire" className="bg-obsidian text-bone">
      <div className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-5 pt-24 sm:px-8 md:pt-36 lg:px-12">
        <div className="min-w-0 flex-[1_1_420px]">
          <p className="eyebrow text-ash">( Studio enquiry )</p>
          <h2 className="mt-5 text-[clamp(52px,7vw,108px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Tell us what
            <br />
            you&apos;re <span className="accent-serif text-champagne">building.</span>
          </h2>
          <p className="mt-7 max-w-[420px] text-lg font-light leading-relaxed text-mist">
            A brand-new build, a half-finished app, or an AI idea you can&apos;t stop thinking about. We reply within 24 hours, usually much sooner.
          </p>
          <div className="mt-10 max-w-[460px]">
            <ContactChannels />
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_520px]">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
