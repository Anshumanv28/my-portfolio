"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as "div";
  const shown = visible || reduced;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: reduced ? "none" : shown ? "translateY(0)" : "translateY(18px)",
        transition: reduced
          ? "none"
          : `opacity 0.6s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.6s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}
