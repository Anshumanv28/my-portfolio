import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EngineeringNotes from "@/components/EngineeringNotes";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "AI_Concierge case study — Anshuman Mishra",
  description:
    "A real-time voice booking agent (LiveKit + OpenAI function calling) grounded in real availability data, with a fix for unreliable self-referential tool calls — case study with architecture, hard parts, and results.",
};

const engineeringNotes = [
  {
    title: "A few-shot example leaked into every real booking date",
    body: "The agent's own tool docstrings contained a literal illustrative date (\"if today is 2024-01-15, tomorrow is 2024-01-16\") — the model pattern-matched and reused that literal value as the real bookingDate argument, even while correctly stating the actual date in its spoken reply. Fixed by replacing every concrete example with an instruction to compute from the live check_date result, not by more prompting.",
  },
  {
    title: "The LLM wouldn't reliably call its own 'end the call' tool — on two model tiers",
    body: "Tested gpt-4o-mini and full gpt-4o, with aggressive prompting and explicit few-shot examples. The model would write a goodbye message, sometimes literally narrate `end_conversation()` as text, and never invoke the tool. The fix wasn't more prompting: mic control is now driven deterministically off the already-reliable transcript data-channel messages, and call-ending is decided by a second, narrow LLM call scoped to exactly one structured decision — isolated from the primary conversational turn, where tool-calling for this kind of self-referential action proved unreliable.",
  },
  {
    title: "A naive yes/no classifier was still biased toward 'yes'",
    body: "The dedicated end-call classifier first shipped as 'any tool call = yes', which turned out biased toward calling the one available tool almost reflexively — including on a plain mid-task reply with zero farewell language. Fixed by forcing a single tool call with required reasoning and boolean should_end fields: the model can't skip straight to a yes/no without explaining itself first.",
  },
  {
    title: "A React state update that wasn't actually synchronous",
    body: "A flag mutated inside a setTranscript(prev => ...) updater and read on the very next line isn't reliable — React doesn't guarantee that updater runs synchronously. Found via a live timestamped-console-log test showing the signal silently dropped about half the time. Fixed with a ref kept in sync instead of trusting read-after-write on state.",
  },
  {
    title: "A startup crash caught before it shipped",
    body: "The OpenAI client for the end-call classifier was first created at module import time — but agent.py imports that module before calling load_dotenv(), so OPENAI_API_KEY wasn't set yet and the client constructor raised immediately. Fixed with lazy initialization.",
  },
];

const flow = [
  { label: "Frontend (React)", note: "LiveKit client, data channel" },
  { label: "Agent (Python)", note: "LiveKit Agents: STT → LLM tool-calling → TTS" },
  { label: "Backend (Node/Express)", note: "bookings, weather, conversations" },
  { label: "MongoDB · OpenWeatherMap · NodeMailer", note: "real data, not LLM guesses" },
];

export default function ConciergeCaseStudy() {
  return (
    <>
      <Header />
      <main id="main" className="pt-16">
        <div className="relative h-[220px] w-full overflow-hidden bg-surface sm:h-[280px]">
          <Image
            src="https://picsum.photos/id/743/2400/640?grayscale"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        </div>

        <section className="bg-bg" style={{ paddingBlock: "64px" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <Reveal delay={60}>
              <div className="flex items-baseline justify-between gap-4">
                <h1 className="text-[clamp(2.1rem,5.2vw,3.2rem)] font-medium leading-[1.1] tracking-tight text-ink">
                  AI_Concierge
                </h1>
                <Link
                  href="/#work"
                  className="shrink-0 text-[14px] text-muted transition-colors hover:text-ink"
                >
                  ← Work
                </Link>
              </div>
              <p className="mt-4 max-w-[60ch] text-[18px] leading-[1.6] text-ink">
                A voice-native booking agent that doesn&apos;t hallucinate its own tool calls.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                <a
                  href="https://github.com/Anshumanv28/AI_Concierge"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  View on GitHub
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
                  Voice agents are usually demoed on the happy path. The interesting engineering is
                  what happens when the LLM has to do something about <em>itself</em> mid-call — end
                  the call, mute the mic — because standard function-calling is unreliable for exactly
                  those self-referential actions.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <blockquote className="border-0 bg-surface px-6 py-6 text-[20px] leading-[1.4] text-ink">
                  Most voice-agent demos never test what happens when the model has to act on
                  itself, not the customer.
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
                LiveKit real-time voice agent (Python) and OpenAI GPT tool calling in front of a
                Node/Express/MongoDB backend and a React frontend. The LLM is the only thing deciding
                what happens next; the backend only executes well-defined tool calls and never makes a
                conversational decision itself.
              </p>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
              {flow.map((step, i) => (
                <div key={step.label} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 bg-surface px-4 py-4">
                    <p className="text-[14px] font-medium text-ink">{step.label}</p>
                    <p className="mt-1 text-[13px] text-muted">{step.note}</p>
                  </div>
                  {i < flow.length - 1 && (
                    <span className="hidden shrink-0 text-muted sm:inline" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg" style={{ paddingBlock: "var(--section-gap)" }}>
          <div style={{ paddingInline: "var(--margin)" }}>
            <Reveal>
              <h2 className="text-[22px] font-medium text-ink">Hard parts</h2>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-ink">
                Five real bugs found and fixed along the way — the fixes are more interesting than the
                feature list:
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
              <EngineeringNotes notes={engineeringNotes} />
              <Reveal delay={120}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src="/images/concierge/connected.png"
                      alt="Live voice session with a real-time transcript and mic equalizer."
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-muted">
                    The mic turns on/off driven by the transcript channel, not a guess.
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
            </Reveal>

            <ul className="mt-8 flex flex-col gap-2 text-[16px] text-field1Ink">
              {[
                "Persistent, browsable chat-history dashboard — every conversation saved and revisitable.",
                "3-service CI/CD pipeline (backend, agent, frontend) building and pushing Docker images to GHCR on every merge.",
                "Mono-design frontend redesign (Space Mono / JetBrains Mono, one accent hue for the live moment) with accessibility fixes.",
                "Real-data grounding: live weather forecast and computed availability, never an LLM-invented slot.",
              ].map((text, i) => (
                <Reveal key={text} delay={i * 50} as="li">
                  {text}
                </Reveal>
              ))}
            </ul>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/concierge/landing.png"
                      alt="AI_Concierge landing screen with past chat history listed below the connect button."
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">Landing + chat history</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={60}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/concierge/connected.png"
                      alt="Connected live voice session with a real-time mic equalizer and transcript."
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">Live voice session</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={120}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/concierge/booking-confirmation.png"
                      alt="Booking confirmation screen rendered immediately after the agent calls create_booking."
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">Booking confirmed</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={180}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/concierge/past-conversation.png"
                      alt="A past conversation reopened from the landing page, shown read-only."
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">Past conversation</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={240}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image
                      src="/images/concierge/chat-history.png"
                      alt="Chat history list scoped anonymously to a local browser id."
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] text-field1Muted">Chat history list</figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer credit="Header photograph: Anthony DELANOIX, via picsum.photos (Unsplash licence)." />
    </>
  );
}
