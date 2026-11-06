"use client";

import { useEffect, useState } from "react";
import { artemisEval } from "@/lib/eval";

type Status = "loading" | "online" | "offline";

export default function DemoPanel() {
  const [status, setStatus] = useState<Status>("loading");
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/artemis-status")
      .then((res) => res.json())
      .then((data: { online: boolean; latencyMs: number | null }) => {
        if (cancelled) return;
        setStatus(data.online ? "online" : "offline");
        setLatency(data.latencyMs);
      })
      .catch(() => {
        if (!cancelled) setStatus("offline");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      data-ui
      className="w-full max-w-[420px] bg-surface px-5 py-4 text-[14px] leading-[1.7] text-ink"
      aria-live="polite"
    >
      <p className="text-[13px] text-muted">Live from the A.R.T.E.M.I.S API</p>
      <p className="tabular mt-1.5">
        <span className="text-muted">GET /health → </span>
        {status === "loading" && <span className="text-muted">pinging…</span>}
        {status === "online" && (
          <span className="text-accent">200 OK{latency !== null ? ` (${latency}ms)` : ""}</span>
        )}
        {status === "offline" && <span className="text-muted">unreachable right now</span>}
      </p>
      <p className="tabular text-ink">
        routing {artemisEval.routingAccuracy} · success {artemisEval.taskSuccessRate} · cost/task{" "}
        {artemisEval.avgCostPerTaskUsd}
      </p>
    </div>
  );
}
