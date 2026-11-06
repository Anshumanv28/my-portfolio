import StatusPill from "./StatusPill";
import DemoPanel from "./DemoPanel";
import Reveal from "./Reveal";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col pb-14 pt-24"
      style={{ paddingInline: "var(--margin)" }}
    >
      <div className="w-full max-w-[460px] lg:ml-[clamp(0px,20vw,300px)]">
        <Reveal>
          <h1 className="text-[clamp(1.6rem,2.3vw,1.9rem)] font-medium leading-[1.2] tracking-tight text-ink">
            AI Engineer building agentic, RAG-powered systems.
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-5 max-w-[400px] text-[16px] leading-[1.6] text-ink">
            From architecture to production — multi-agent orchestration, retrieval
            pipelines, and the evaluation harnesses that prove they work.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={site.resumeHref}
              download
              className="inline-flex items-center bg-accent px-5 py-3 text-[14px] font-medium text-accentInk transition-opacity hover:opacity-90 active:opacity-80"
            >
              Download resume
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-accent"
            >
              View work <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-muted">
            <a href={site.github} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.linkedin} className="transition-colors hover:text-ink" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
              Email
            </a>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-6">
            <StatusPill />
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mt-7">
            <DemoPanel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
