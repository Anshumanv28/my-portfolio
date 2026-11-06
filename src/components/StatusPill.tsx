"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "online" | "offline";

export default function StatusPill() {
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
      className="inline-flex items-center gap-2 text-small text-muted"
      aria-live="polite"
    >
      <span
        className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full ${
          status === "online"
            ? "bg-accent pulse"
            : status === "offline"
              ? "bg-muted"
              : "bg-muted opacity-50"
        }`}
        aria-hidden="true"
      />
      {status === "loading" && <span>checking A.R.T.E.M.I.S demo…</span>}
      {status === "online" && (
        <span>
          A.R.T.E.M.I.S demo: online
          {latency !== null ? ` · ${latency}ms` : ""}
        </span>
      )}
      {status === "offline" && <span>A.R.T.E.M.I.S demo: offline right now — see screenshots below</span>}
    </div>
  );
}
