import { artemisEval } from "./eval";

export const site = {
  name: "Anshuman Mishra",
  role: "AI Engineer",
  email: "anshumanmishra.v.2.8@gmail.com",
  github: "https://github.com/Anshumanv28",
  linkedin: "https://www.linkedin.com/in/anshuman-mishra-726781364/",
  resumeHref: "/resume/Anshuman_Mishra_Resume.pdf",
  demoUrl: "http://54.87.62.83:8000",
};

export const experience = [
  {
    company: "Innovatiview India Ltd",
    tag: "B2G",
    role: "Assistant Manager, Full Stack Developer & Product",
    period: "Apr 2026 – Present",
    summary:
      "REST APIs for identity verification with human-in-the-loop approval flows, a JSON-configurable form engine that replaced manual backend changes, and a constraint-based candidate allocation algorithm — for a government exam platform used at scale.",
  },
  {
    company: "Bhashini, Ministry of Electronics & IT",
    tag: "Research",
    role: "AI/ML Intern",
    period: "Aug – Nov 2025",
    summary:
      "Multi-engine OCR pipeline (Tesseract, Surya OCR, Docling, TableFormer) with a 40% improvement in table recognition, across 23 Indian languages, for India's National Language Translation Mission.",
  },
  {
    company: "SkoolSaver",
    tag: "Startup",
    role: "Software / Flutter Developer",
    period: "Nov 2024 – Jul 2025",
    summary:
      "Dual-database REST API, a mentor-booking system with conflict resolution, and a Dockerized four-service stack.",
  },
];

export const skillGroups = [
  {
    label: "Agentic AI",
    items: ["LangChain", "LangGraph", "Agent Workflows", "Multi-Agent Orchestration", "RAG Pipelines"],
  },
  {
    label: "LLMs",
    items: ["OpenAI GPT", "Prompt Engineering", "Function / Tool Calling", "Structured Outputs"],
  },
  {
    label: "Vector search",
    items: ["Qdrant", "Embeddings", "Semantic Search"],
  },
  {
    label: "ML / NLP",
    items: ["PyTorch", "ASR", "TTS", "Machine Translation", "OCR"],
  },
  {
    label: "Backend & deployment",
    items: ["FastAPI", "Flask", "Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Docker", "AWS", "Git / CI-CD"],
  },
  {
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
];

export const projects = [
  {
    slug: "artemis",
    name: "A.R.T.E.M.I.S",
    kind: "Multi-agent RAG platform",
    year: "2026",
    tagline: "A multi-agent RAG platform with its own eval harness.",
    stats: [
      `${artemisEval.routingAccuracy} routing accuracy`,
      `${artemisEval.taskSuccessRate} task success rate`,
      artemisEval.avgCostPerTaskHeadline,
    ],
    oneLiner:
      "LangGraph Supervisor architecture routing across 3 specialized agents, Qdrant retrieval with citation-grounded answers, an MCP server with least-privilege scopes, and an automated evaluation suite that tracks accuracy, reliability, cost, and tool-selection — CI-tested, Docker-deployed, live AWS demo.",
    image: "/images/artemis/ops-dashboard.jpg",
    imageAlt:
      "A.R.T.E.M.I.S ops dashboard showing backend status, Qdrant collections, and the latest eval run: 83% task success across 6 cases, 100% routing accuracy, 83% tool-selection accuracy.",
    image2: "/images/artemis/chat-supervisor-trace.jpg",
    image2Alt:
      "A.R.T.E.M.I.S chat UI showing a query routed to the rag_search sub-agent with an expanded tool-call trace.",
    href: "/work/artemis",
    repo: "https://github.com/Anshumanv28/A.R.T.E.M.I.S",
  },
  {
    slug: "ai-concierge",
    name: "AI_Concierge",
    kind: "Voice-native booking agent",
    year: "2026",
    tagline: "A voice-native booking agent that doesn't hallucinate its own tool calls.",
    stats: ["Real-time voice I/O", "3-service CI/CD → GHCR", "Persistent chat-history dashboard"],
    oneLiner:
      "Real-time voice agent (LiveKit + OpenAI function calling) that grounds every booking decision in actual availability data instead of LLM-invented answers — including a fix for unreliable self-referential function calls (ending a call, muting a mic) that most agent demos quietly get wrong.",
    image: "/images/concierge/landing.png",
    imageAlt: "AI_Concierge landing screen with past chat history listed below the connect button.",
    image2: "/images/concierge/connected.png",
    image2Alt: "AI_Concierge live voice session with a real-time transcript and mic equalizer.",
    href: "/work/ai-concierge",
    repo: "https://github.com/Anshumanv28/AI_Concierge",
  },
];
