import { skillGroups } from "@/lib/content";
import Reveal from "./Reveal";

export default function SkillsSection() {
  return (
    <section className="bg-bg" style={{ paddingBlock: "var(--section-gap)" }}>
      <div className="mx-auto max-w-[1040px]" style={{ paddingInline: "var(--margin)" }}>
        <Reveal>
          <h2 className="text-[26px] font-medium tracking-tight text-ink">Skills</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60}>
              <p className="text-[15px] font-medium text-ink">{group.label}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="bg-surface px-3 py-2 text-[14px] text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
