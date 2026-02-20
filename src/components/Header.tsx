"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-yellow-500/10 shadow-[0_2px_20px_rgba(255,215,0,0.05)]">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-bold tracking-widest text-yellow-500 hover:opacity-80 transition"
        >
          GP31 11U GOLD
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm items-center">
          <Link href="/stats" className="hover:text-yellow-500 transition">
            Stats
          </Link>

          <Link href="/roster" className="hover:text-yellow-500 transition">
            Roster
          </Link>

          <a
            href="https://web.gc.com/teams/DfTGF0BJaivS/2026-spring-gp31-gold-11u/schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            Schedule
          </a>

          <Link href="/media" className="hover:text-yellow-500 transition">
            Media
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className="w-6 h-0.5 bg-yellow-500"></span>
          <span className="w-6 h-0.5 bg-yellow-500"></span>
          <span className="w-6 h-0.5 bg-yellow-500"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-yellow-500/30 px-8 py-6 space-y-6 text-sm">
          <Link
            href="/stats"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-500 transition"
          >
            Stats
          </Link>

          <Link
            href="/roster"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-500 transition"
          >
            Roster
          </Link>

          <a
            href="https://web.gc.com/teams/DfTGF0BJaivS/2026-spring-gp31-gold-11u/schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-yellow-500 transition"
          >
            Schedule
          </a>

          <Link
            href="/media"
            onClick={() => setOpen(false)}
            className="block hover:text-yellow-500 transition"
          >
            Media
          </Link>
        </div>
      )}
    </header>
  );
}
