"use client";

import Image from "next/image";
import Link from "next/link";
import stats from "@/data/processed/stats.json";
import { games } from "@/data/games";

export default function Home() {
  const nextGame = games[0];
  const team = stats.team;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-8 pt-20 pb-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_65%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

          {/* LOGO */}
          <Image
            src="/images/11gold-logo4.png"
            alt="GP31 11U Gold Logo"
            width={360}
            height={360}
            priority
            className="drop-shadow-[0_40px_80px_rgba(255,215,0,0.45)]"
          />

          {/* RECORD */}
          <div className="mt-10 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-yellow-500/40 rounded-2xl px-14 py-8 shadow-2xl">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              Current Record
            </p>
            <p className="text-6xl font-extrabold text-yellow-500 mt-2">
              3–1
            </p>
          </div>

          {/* NEXT GAME */}
          <div className="mt-6 bg-zinc-900/70 border border-yellow-500/20 rounded-xl px-10 py-5 shadow-xl">
            <p className="text-xs uppercase tracking-widest text-zinc-400">
              Next Game
            </p>
            <p className="text-lg font-semibold mt-2">
              vs {nextGame.opponent}
            </p>
            <p className="text-sm text-zinc-400">
              {nextGame.date} · {nextGame.time}
            </p>
            <p className="text-sm text-zinc-500">
              {nextGame.location}
            </p>
          </div>

          {/* STATS */}
          <div className="mt-8 flex gap-10">
            <Stat label="AVG" value={team.AVG.toFixed(3)} />
            <Stat label="OBP" value={team.OBP.toFixed(3)} />
            <Stat label="OPS" value={team.OPS.toFixed(3)} />
            <Stat label="SB" value={team.SB} />
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-6">
            <Link href="/stats">
              <div className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:scale-105 transition shadow-xl cursor-pointer">
                View Stats
              </div>
            </Link>

            <Link href="/roster">
              <div className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 font-bold rounded-xl hover:bg-yellow-500 hover:text-black transition shadow-xl cursor-pointer">
                Roster
              </div>
            </Link>
          </div>

          {/* VIDEO */}
          <div className="mt-14 w-full max-w-4xl">

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-yellow-500/30 shadow-[0_50px_120px_rgba(0,0,0,0.9)]">

              <video
                className="w-full h-full object-cover"
                src="/videos/hr1.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Overlay text */}
              <div className="absolute bottom-8 left-8 text-left">
                <p className="text-sm uppercase tracking-widest text-zinc-300">
                  Highlight
                </p>
                <h2 className="text-4xl font-extrabold text-yellow-500 drop-shadow-lg">
                  Hunter 88 Home Run
                </h2>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="relative z-10 max-w-7xl mx-auto w-full px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Cards unchanged */}
         <a
  href="https://www.perfectgame.org/PGBA/Team/default.aspx?orgid=31822&orgteamid=283383&team=1071252&Year=2026"
  target="_blank"
  rel="noopener noreferrer"
>
  <Card
    image="/images/team-action.jpg"
    label="Latest Action"
    title="Game Recap"
  />
</a>


          <Link href="/roster">
            <Card
              image="/images/player.jpg"
              label="Featured"
              title="Player Spotlight"
            />
          </Link>

          <a
  href="https://web.gc.com/teams/DfTGF0BJaivS/2026-spring-gp31-gold-11u/schedule"
  target="_blank"
  rel="noopener noreferrer"
>
  <Card
    image="/images/tournaments1.png"
    label="Coming Up"
    title="Tournaments"
  />
</a>


        </div>
      </section>

      {/* GOLD DIVIDER */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-pulse" />

    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs uppercase text-zinc-400">{label}</p>
      <p className="text-2xl font-bold text-yellow-500 mt-1">{value}</p>
    </div>
  );
}

function Card({ image, label, title }: any) {
  return (
    <div className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-yellow-500/20 hover:border-yellow-500/70 hover:-translate-y-2 transition-all duration-500">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute bottom-6 left-6">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          {label}
        </p>
        <p className="text-2xl font-bold text-yellow-500 mt-1">
          {title}
        </p>
      </div>
    </div>
  );
}
