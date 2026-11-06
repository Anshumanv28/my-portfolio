import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import EngineeringNotes from "@/components/EngineeringNotes";
import StatusPill from "@/components/StatusPill";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/content";
import { artemisEval } from "@/lib/eval";

export const metadata: Metadata = {
  title: "A.R.T.E.M.I.S case study — Anshuman Mishra",
  description:
    "A Supervisor-routed multi-agent RAG platform with least-privilege MCP scopes and a real automated eval harness — case study with architecture, hard parts, and results.",
};

const engineeringNotes = [
  {
    title: "Least-privilege MCP scopes, not a shared god-tool",
    body: "The MCP server (artemis/mcp/) reuses each sub-agent's own tool allow-list verbatim: rag_search's scope is read-only by default, and requesting an out-of-scope tool (like delete_collection from the rag_search scope) returns an explicit error instead of silently succeeding. Most agent projects skip this entirely and expose one undifferentiated tool surface — this one treats tool access as a real security boundary per role.",
  },
  {
    title: "An eval harness, not a vibe check",
    body: "scripts/eval_agent.py runs a golden dataset end-to-end against the live Supervisor and writes a timestamped report: task success rate, routing accuracy, tool-selection accuracy, step count, duration, and per-case token/cost usage. It's meant to be re-run after any planner or prompt change to catch regressions — the numbers on this page come straight from the latest of those reports, not from a one-off manual test.",
  },
  {
    title: "Citation-grounded answers that admit what they don't know",
    body: "The rag_search agent is built to flag an explicit \"missing context\" state rather than answer confidently from a weak retrieval. Combined with 5 chunking strategies across 4 file formats (fixed, fixed_overlap, csv_row, semantic, agentic/LLM-driven), the goal is fewer plausible-sounding wrong answers, not just more answers.",
  },
];

export default function ArtemisCaseStudy() {
  return (
    <>
      <Header />
      <main id="main" className="pt-16">
        <div className="relative h-[220px] w-full overflow-hidden bg-surface sm:h-[280px]">
          <Image
            src="https://picsum.photos/id/1081/2400/640?grayscale"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-70"
            priority
          />
        </div>

        <section className="bg-bg" style={{ paddingBlock: "64px" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <Reveal delay={60}>
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-[clamp(2.1rem,5.2vw,3.2rem)] font-medium leading-[1.1] tracking-tight text-ink">
                  A.R.T.E.M.I.S
                </h1>
                <Link
                  href="/#work"
                  className="shrink-0 text-[14px] text-muted transition-colors hover:text-ink"
                >
                  ← Work
                </Link>
              </div>
              <p className="mt-4 max-w-[60ch] text-[18px] leading-[1.6] text-ink">
                A multi-agent RAG platform with its own eval harness — Supervisor-routed, MCP-scoped, and
                CI-tested.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <StatusPill />
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                <a
                  href="https://github.com/Anshumanv28/A.R.T.E.M.I.S"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  View on GitHub
                </a>
                <a
                  href={site.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Live demo (HTTP — browser will flag as insecure)
                </a>
                <a
                  href={`${site.demoUrl}/docs`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Swagger docs
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg" style={{ paddingBlock: "var(--section-gap)" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
              <Reveal>
                <h2 className="text-[22px] font-medium text-ink">Problem</h2>
                <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-ink">
                  Most &ldquo;RAG chatbot&rdquo; projects are a single retrieval step bolted onto a
                  prompt. Real knowledge-work systems need to route between different tasks — search
                  versus ingesting new documents versus managing collections — decide when retrieval
                  isn&apos;t enough, and prove they&apos;re not making things up.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <blockquote className="border-0 bg-surface px-6 py-6 text-[20px] leading-[1.4] text-ink">
                  Most demos: one retrieval step. This one: 3 specialist agents and a router that
                  knows when <em>not</em> to retrieve.
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-bg" style={{ paddingBlock: "var(--section-gap)" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <Reveal>
              <h2 className="text-[22px] font-medium text-ink">Architecture</h2>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-ink">
                A LangGraph Supervisor pattern orchestrates 3 specialized sub-agents, with a lightweight
                LLM router deciding where a query goes before any tool loop starts — keeping cost down on
                simple requests. Hover or tab through the diagram below.
              </p>
            </Reveal>
            <div className="mx-auto mt-10 max-w-[900px]">
              <ArchitectureDiagram />
            </div>
          </div>
        </section>

        <section className="bg-bg" style={{ paddingBlock: "var(--section-gap)" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <Reveal>
              <h2 className="text-[22px] font-medium text-ink">Hard parts</h2>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-ink">
                This is what separates it from a toy demo. Three things worth reading in full:
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
              <EngineeringNotes notes={engineeringNotes} />
              <Reveal delay={120}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src="/images/artemis/api-swagger.jpg"
                      alt="FastAPI Swagger / OpenAPI documentation listing the A.R.T.E.M.I.S backend's REST endpoints."
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-muted">
                    The MCP server and REST API share the same tool registry.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="field" style={{ paddingBlock: "var(--section-gap)" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <Reveal>
              <h2 className="text-[22px] font-medium text-field1Ink">Results</h2>
              <p className="mt-2 text-[13px] text-field1Muted">
                From the latest run of the real eval harness ({artemisEval.generatedAt.slice(0, 4)}-
                {artemisEval.generatedAt.slice(4, 6)}-{artemisEval.generatedAt.slice(6, 8)}, {artemisEval.totalCases}{" "}
                golden-dataset cases) — re-run after every planner change, numbers here aren&apos;t hand-typed.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {[
                {
                  value: artemisEval.taskSuccessRate,
                  suffix: ` (${artemisEval.taskSuccessFraction})`,
                  label: "Task success rate",
                },
                {
                  value: artemisEval.routingAccuracy,
                  suffix: ` (${artemisEval.routingFraction})`,
                  label: "Routing accuracy",
                },
                {
                  value: artemisEval.toolSelectionAccuracy,
                  suffix: ` (${artemisEval.toolSelectionFraction})`,
                  label: "Tool-selection accuracy",
                },
                { value: artemisEval.avgStepCount, suffix: "", label: "Avg. steps / case" },
                { value: `${artemisEval.avgDurationS}s`, suffix: "", label: "Avg. duration" },
                {
                  value: artemisEval.totalCostUsd,
                  suffix: ` (${artemisEval.avgCostPerTaskUsd}/task)`,
                  label: "Total cost / avg per task",
                },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 50}>
                  <p className="tabular text-[28px] font-medium text-field1Ink">
                    {stat.value}
                    <span className="text-[14px] font-normal text-field1Muted">{stat.suffix}</span>
                  </p>
                  <p className="mt-1 text-[13px] text-field1Muted">{stat.label}</p>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 max-w-[60ch] text-[16px] leading-[1.6] text-field1Ink">
              CI-tested via GitHub Actions, deployed via Docker + docker-compose, with a live AWS demo.
              {Object.keys(artemisEval.failureBreakdown).length > 0 && (
                <>
                  {" "}
                  The one failure in this run was a <code className="text-[14px]">tool_sequence_mismatch</code>{" "}
                  — tracked, not hidden.
                </>
              )}
            </p>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/artemis/chat-supervisor-trace.jpg"
                      alt="A.R.T.E.M.I.S chat UI showing a query routed to the rag_search sub-agent, with the expanded Supervisor tool-call trace."
                      fill
                      sizes="(min-width: 640px) 48vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">
                    Chat with the expanded Supervisor trace
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={90}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/artemis/ops-dashboard.jpg"
                      alt="A.R.T.E.M.I.S ops dashboard showing backend status, Qdrant collections, and the latest eval run with routing and tool-selection accuracy."
                      fill
                      sizes="(min-width: 640px) 48vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">
                    Ops dashboard — live eval run
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer credit="Header photograph: Julien Moreau, via picsum.photos (Unsplash licence)." />
    </>
  );
}
