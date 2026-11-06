"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

export default function WorkSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="bg-bg scroll-mt-20" style={{ paddingBlock: "var(--section-gap)" }}>
      <div style={{ paddingInline: "var(--margin)" }}>
        <Reveal>
          <h2 className="text-[26px] font-medium tracking-tight text-ink lg:ml-[clamp(0px,20vw,300px)]">
            Work
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-16 lg:ml-[clamp(0px,20vw,300px)] lg:grid lg:grid-cols-[320px_1fr] lg:gap-16">
          {/* Ledger (desktop only) */}
          <ul className="hidden lg:block">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={project.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="flex h-[52px] items-center justify-between text-[16px]"
                >
                  <span className={`transition-colors ${active === i ? "text-ink" : "text-muted"}`}>
                    {project.name}
                  </span>
                  <span className="tabular text-[13px] text-muted">{project.year}</span>
                </Link>
                <p className="text-[13px] text-muted">{project.kind}</p>
              </li>
            ))}
          </ul>

          {/* Detail column — both projects always shown, active one highlighted */}
          <div className="flex flex-col gap-16">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <article
                  className="transition-opacity duration-300"
                  style={{ opacity: active === i ? 1 : 0.6 }}
                  onMouseEnter={() => setActive(i)}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 320px, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image
                        src={project.image2}
                        alt={project.image2Alt}
                        fill
                        sizes="(min-width: 1024px) 320px, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between lg:hidden">
                    <h3 className="text-[17px] font-medium text-ink">{project.name}</h3>
                    <span className="tabular text-[13px] text-muted">{project.year}</span>
                  </div>

                  <p className="mt-4 text-[16px] font-medium text-ink lg:mt-5">{project.tagline}</p>
                  <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.6] text-ink">{project.oneLiner}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted">
                    {project.stats.map((s) => (
                      <li key={s} className="tabular">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={project.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-accent"
                  >
                    Read the case study <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
