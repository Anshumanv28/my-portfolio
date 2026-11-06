"use client";

import { useState } from "react";

const VB_W = 900;
const VB_H = 430;

type Node = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tooltip: string;
  variant?: "default" | "scope";
};

const nodes: Node[] = [
  {
    id: "query",
    label: "User query",
    x: 350,
    y: 16,
    w: 200,
    h: 50,
    tooltip: "Where every request starts — the Supervisor decides the route, not a hardcoded intent switch.",
  },
  {
    id: "supervisor",
    label: "Supervisor",
    sub: "1 LLM routing call",
    x: 350,
    y: 98,
    w: 200,
    h: 62,
    tooltip:
      "One lightweight LLM call classifies the query into exactly one route — no tool loop, so simple requests stay fast and cheap.",
  },
  {
    id: "rag",
    label: "rag_search",
    x: 28,
    y: 196,
    w: 172,
    h: 62,
    tooltip:
      "Semantic search across Qdrant collections with citation-grounded answers — flags missing context instead of guessing.",
  },
  {
    id: "ingestion",
    label: "ingestion",
    x: 220,
    y: 196,
    w: 172,
    h: 62,
    tooltip: "Chunks and embeds new documents — 5 chunking strategies across 4 file formats (CSV, PDF, DOCX, Markdown).",
  },
  {
    id: "collection",
    label: "collection_mgmt",
    x: 412,
    y: 196,
    w: 172,
    h: 62,
    tooltip:
      "Creates, lists and deletes Qdrant collections — the only agent with destructive scope, kept chat-only and off the read-only ops dashboard.",
  },
  {
    id: "direct",
    label: "direct answer",
    x: 632,
    y: 196,
    w: 172,
    h: 62,
    tooltip: "Answers directly with no tool call when retrieval isn't needed — keeps trivial requests fast.",
  },
  {
    id: "qdrant",
    label: "Qdrant",
    sub: "vector store",
    x: 123,
    y: 316,
    w: 172,
    h: 62,
    tooltip: "Vector store behind rag_search and ingestion — multiple collections routed per task (system docs vs. user docs).",
  },
  {
    id: "mcp",
    label: "MCP server",
    sub: "least-privilege scopes",
    x: 440,
    y: 316,
    w: 222,
    h: 62,
    variant: "scope",
    tooltip:
      "The same tool registry, exposed over MCP with least-privilege scopes per sub-agent — rag_search's scope is read-only by default, and an out-of-scope tool request returns an explicit error instead of silently succeeding.",
  },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

const edges: Array<{ from: string; to: string; dashed?: boolean }> = [
  { from: "query", to: "supervisor" },
  { from: "supervisor", to: "rag" },
  { from: "supervisor", to: "ingestion" },
  { from: "supervisor", to: "collection" },
  { from: "supervisor", to: "direct" },
  { from: "rag", to: "qdrant" },
  { from: "ingestion", to: "qdrant" },
];

function top(n: Node) {
  return { x: n.x + n.w / 2, y: n.y };
}
function bottom(n: Node) {
  return { x: n.x + n.w / 2, y: n.y + n.h };
}

export default function ArchitectureDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  const scopeBracket = { x: 14, y: 182, w: 584, h: 90 };

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <rect
            x={scopeBracket.x}
            y={scopeBracket.y}
            width={scopeBracket.w}
            height={scopeBracket.h}
            fill="none"
            stroke="#52545a"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            rx="2"
          />
          {edges.map((e) => {
            const from = bottom(byId[e.from]);
            const to = top(byId[e.to]);
            const midY = (from.y + to.y) / 2;
            const d = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
            const active = hovered === e.from || hovered === e.to;
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={d}
                fill="none"
                stroke={active ? "#ff4a1f" : "#4a4c51"}
                strokeWidth={active ? 2 : 1.5}
              />
            );
          })}
          <path
            d={`M ${scopeBracket.x + scopeBracket.w / 2} ${scopeBracket.y + scopeBracket.h} C ${scopeBracket.x + scopeBracket.w / 2} ${scopeBracket.y + scopeBracket.h + 18}, ${top(byId.mcp).x} ${top(byId.mcp).y - 18}, ${top(byId.mcp).x} ${top(byId.mcp).y}`}
            fill="none"
            stroke={hovered === "mcp" ? "#ff4a1f" : "#52545a"}
            strokeWidth={hovered === "mcp" ? 2 : 1.5}
            strokeDasharray="4 5"
          />
        </svg>

        {nodes.map((n) => {
          const isHovered = hovered === n.id;
          const left = (n.x / VB_W) * 100;
          const topPct = (n.y / VB_H) * 100;
          const width = (n.w / VB_W) * 100;
          const height = (n.h / VB_H) * 100;
          return (
            <div
              key={n.id}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${topPct}%`,
                width: `${width}%`,
                height: `${height}%`,
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered((h) => (h === n.id ? null : h))}
                className={`flex h-full w-full flex-col items-center justify-center border px-2 text-center transition-colors ${
                  isHovered
                    ? "z-10 border-accent bg-surface2"
                    : n.variant === "scope"
                      ? "border-dashed border-[#52545a] bg-transparent"
                      : "border-[#3a3c40] bg-surface"
                }`}
                aria-describedby={`tooltip-${n.id}`}
              >
                <span className={`text-[13px] font-medium ${isHovered ? "text-accent" : "text-ink"}`}>
                  {n.label}
                </span>
                {n.sub && <span className="mt-0.5 text-[13px] text-muted">{n.sub}</span>}
              </button>
              <span id={`tooltip-${n.id}`} className="sr-only">
                {n.tooltip}
              </span>
            </div>
          );
        })}

        {nodes.map((n) => {
          if (hovered !== n.id) return null;
          const left = ((n.x + n.w / 2) / VB_W) * 100;
          const belowSpace = n.y < VB_H * 0.5;
          const topPct = belowSpace ? ((n.y + n.h) / VB_H) * 100 : (n.y / VB_H) * 100;
          return (
            <div
              key={`tip-${n.id}`}
              role="tooltip"
              className="pointer-events-none absolute z-20 w-[220px] -translate-x-1/2 bg-ink px-3 py-2 text-[13px] leading-[1.5] text-bg shadow-none"
              style={{
                left: `${left}%`,
                top: `${topPct}%`,
                transform: `translate(-50%, ${belowSpace ? "10px" : "calc(-100% - 10px)"})`,
              }}
            >
              {n.tooltip}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-[13px] text-muted">
        Hover or tab through each node — the dashed group is the MCP-exposed scope boundary.
      </p>
    </div>
  );
}
