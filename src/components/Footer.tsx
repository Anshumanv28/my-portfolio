import { site } from "@/lib/content";

export default function Footer({ credit }: { credit?: string }) {
  return (
    <footer className="bg-bg" style={{ paddingBlock: "56px" }}>
      <div
        className="flex flex-col items-start justify-between gap-4 text-[13px] text-muted sm:flex-row sm:items-end"
        style={{ paddingInline: "var(--margin)" }}
      >
        <p className="text-[28px] font-medium tracking-tight text-ink">{site.name}</p>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>© {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
          {credit && <p className="text-muted">{credit}</p>}
        </div>
      </div>
    </footer>
  );
}
