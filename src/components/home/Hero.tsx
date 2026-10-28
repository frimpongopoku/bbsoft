import { ArrowUpRight } from "lucide-react";
import { STACK } from "@/content/home";

function StackGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="belt-group" aria-hidden={hidden || undefined}>
      {STACK.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.08em] text-fog">
            {item}
          </span>
          <span aria-hidden="true" className="mx-8 text-champagne">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[max(720px,100svh)] flex-col overflow-hidden bg-obsidian text-bone"
    >
      {/* Mesh backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="mesh-blob mesh-1 left-[-8%] top-[30%] h-[min(620px,90vw)] w-[min(620px,90vw)] bg-champagne opacity-55" />
        <div className="mesh-blob mesh-2 right-[-6%] top-[8%] h-[min(560px,80vw)] w-[min(560px,80vw)] bg-[#6e4e1e] opacity-70" />
        <div className="mesh-blob mesh-3 bottom-[-18%] left-[38%] h-[min(480px,70vw)] w-[min(480px,70vw)] bg-[#3a2e1f] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(11,11,12,0.7)_70%)]" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-32 text-center sm:px-8">
        <p className="eyebrow focus-in text-mist" style={{ animationDelay: "0.1s" }}>
          Web, mobile &amp; AI product studio · Accra, Ghana
        </p>
        <h1 className="mt-7 text-[clamp(64px,13vw,210px)] font-normal leading-[0.86] tracking-[-0.06em]">
          <span className="focus-in" style={{ animationDelay: "0.2s" }}>
            Software,
          </span>
          <br />
          <span className="focus-in accent-serif text-champagne" style={{ animationDelay: "0.6s" }}>
            considered.
          </span>
          <span className="sr-only"> Biibisoft, a software development company in Accra, Ghana</span>
        </h1>
        <p
          className="focus-in mt-9 max-w-[600px] text-[clamp(17px,1.4vw,20px)] font-light leading-relaxed text-mist"
          style={{ animationDelay: "0.8s" }}
        >
          From first-time founders to established companies, we design, build and launch web,
          mobile and AI products, with the same care we give the products we run ourselves.
        </p>
        {/* .focus-in forces inline-block, so the flex row lives on an inner wrapper */}
        <div className="focus-in mt-9 w-full sm:w-auto" style={{ animationDelay: "0.8s" }}>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#enquire"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-champagne px-7 text-base font-medium text-obsidian transition-colors hover:bg-bone"
            >
              Start a project
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#lab"
              className="inline-flex h-14 items-center justify-center rounded-full border border-bone/25 bg-obsidian/40 px-7 text-base transition-colors hover:border-bone/60"
            >
              See what we&apos;ve built
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-bone/10 py-5" aria-label="Our technology stack">
        <div className="belt">
          <div className="belt-track" style={{ "--belt-duration": "45s" } as React.CSSProperties}>
            <StackGroup />
            <StackGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
