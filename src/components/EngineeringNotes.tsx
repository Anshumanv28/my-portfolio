"use client";

import { useState } from "react";

export type Note = { title: string; body: string };

export default function EngineeringNotes({ notes }: { notes: Note[] }) {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <ul className="flex flex-col gap-3">
      {notes.map((note, i) => {
        const open = openId === i;
        return (
          <li key={note.title} className="bg-surface">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : i)}
              aria-expanded={open}
              aria-controls={`note-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-medium text-ink">{note.title}</span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-[14px] text-muted transition-transform ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {open && (
              <div id={`note-panel-${i}`} className="px-5 pb-5">
                <p className="max-w-[640px] text-[15px] leading-[1.65] text-muted">{note.body}</p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
