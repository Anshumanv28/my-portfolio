import { site } from "@/lib/content";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="field flex min-h-[86svh] scroll-mt-20 flex-col justify-between">
      <div
        className="flex flex-1 flex-col justify-between"
        style={{ paddingInline: "var(--margin)", paddingBlock: "48px" }}
      >
        <Reveal>
          <h2 className="max-w-[420px] text-[20px] font-medium leading-[1.4] text-field1Ink">
            Open to AI Engineer / agentic-RAG roles — reach out directly, no form in the way.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <a
            href={`mailto:${site.email}`}
            className="group mx-auto my-16 block text-center leading-[1.05] tracking-tight text-field1Ink transition-colors hover:text-accent sm:mx-0 sm:text-left"
            style={{ fontSize: "clamp(1.9rem, 8vw, 4.2rem)" }}
          >
            anshumanmishra.v.2.8
            <wbr />
            @gmail.com
          </a>
        </Reveal>

        <div className="flex flex-col gap-4 text-[14px] text-field1Muted sm:flex-row sm:items-end sm:justify-between">
          <span>Based in India · open to remote &amp; relocation</span>
          <div className="flex gap-5">
            <a href={site.linkedin} className="transition-colors hover:text-field1Ink" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={site.github} className="transition-colors hover:text-field1Ink" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.resumeHref} download className="transition-colors hover:text-field1Ink">
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
