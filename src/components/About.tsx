import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="bg-bg" style={{ paddingBlock: "var(--section-gap)" }}>
      <div className="mx-auto max-w-[680px]" style={{ paddingInline: "var(--margin)" }}>
        <Reveal>
          <div className="field px-8 py-10 sm:px-14 sm:py-14">
            <h2 className="text-[26px] font-medium tracking-tight text-field1Ink">About</h2>

            <div className="mt-8 max-w-[520px] space-y-5 text-[16px] leading-[1.65] text-field1Ink">
              <p>
                I build systems that let LLMs act reliably — not just answer
                questions, but plan, retrieve, call tools, and know when they
                don&apos;t know something.
              </p>
              <p>
                My background is backend engineering first: REST APIs, databases,
                systems at scale for a government exam platform serving thousands
                of candidates. That&apos;s why my AI work is less &ldquo;demo that
                works once&rdquo; and more &ldquo;system that has an eval
                harness, a CI pipeline, and a security model.&rdquo;
              </p>
              <p>
                I previously worked on ASR/TTS/OCR research at Bhashini, India&apos;s
                National Language Translation Mission, across 23 languages.
              </p>
              <p>
                Right now I&apos;m focused on agentic AI and RAG — two projects
                below, A.R.T.E.M.I.S and AI_Concierge, are where most of that
                thinking lives.
              </p>
            </div>

            <p className="mt-9 text-[20px] italic text-field1Ink">Anshuman Mishra</p>
            <p className="text-[14px] text-field1Muted">AI Engineer</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
