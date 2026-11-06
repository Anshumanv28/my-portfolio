import Link from "next/link";
import { site } from "@/lib/content";

export default function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-accentInk"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-40 bg-bg">
      <div
        className="flex h-16 items-center justify-between"
        style={{ paddingInline: "var(--margin)" }}
      >
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          Anshuman Mishra
        </Link>
        <nav className="flex items-center gap-7">
          <Link
            href="/#work"
            className="hidden text-[14px] text-muted transition-colors hover:text-ink sm:inline"
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="hidden text-[14px] text-muted transition-colors hover:text-ink sm:inline"
          >
            Experience
          </Link>
          <Link
            href="/#contact"
            className="hidden text-[14px] text-muted transition-colors hover:text-ink sm:inline"
          >
            Contact
          </Link>
          <a
            href={site.resumeHref}
            download
            className="text-[14px] font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
          >
            Resume
          </a>
        </nav>
      </div>
      </header>
    </>
  );
}
