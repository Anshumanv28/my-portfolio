import { experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function ExperienceSection() {
  return (
    <section id="experience" className="field scroll-mt-20" style={{ paddingBlock: "var(--section-gap)" }}>
      <div className="mx-auto max-w-[760px]" style={{ paddingInline: "var(--margin)" }}>
        <Reveal>
          <h2 className="text-[26px] font-medium tracking-tight text-field1Ink">Experience</h2>
        </Reveal>

        <ul className="mt-10 flex flex-col gap-9">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 90} as="li">
              <div className="flex items-start gap-4">
                <span
                  className="mt-2 inline-block h-[8px] w-[8px] shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <div className="max-w-[60ch] flex-1">
                  <p className="text-[16px] text-field1Ink">
                    <span className="font-medium">{job.company}</span>
                    <span className="text-field1Muted"> — {job.role}</span>
                  </p>
                  <p className="mt-1.5 text-[16px] leading-[1.6] text-field1Ink">{job.summary}</p>
                </div>
                <span className="tabular shrink-0 whitespace-nowrap pt-0.5 text-[13px] text-field1Muted">
                  {job.period}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
