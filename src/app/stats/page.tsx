"use client";

import { useEffect, useState } from "react";
import stats from "@/data/processed/stats.json";

function format(n: number) {
  return n.toFixed(3);
}

function normalize(value: number, max: number) {
  return Math.min(100, (value / max) * 100);
}

function overallRating(p: any) {
  const contact = normalize(p.AVG, 0.500);
  const power = normalize(p.SLG, 0.800);
  const speed = normalize(p.SB, 40);
  return Math.round((contact + power + speed) / 3);
}

export default function StatsPage() {
  const team = stats.team;

  const qualified = stats.players.filter((p) => p.PA >= 1);
  const topOps = [...qualified]
    .sort((a, b) => b.OPS - a.OPS)
    .slice(0, 5);

  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-20 py-14 relative overflow-hidden">

      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* HERO */}
      <header className="mb-20 relative z-10">
        <h1 className="text-7xl font-extrabold tracking-tight text-yellow-400 mb-4 drop-shadow-lg">
          GP31 Gold 11U
        </h1>

        <div className="flex gap-12 text-2xl font-semibold text-yellow-300 mb-2">
          <div>Team OPS: {format(team.OPS)}</div>
          <div>Team HR: {team.HR}</div>
        </div>

        <p className="text-gray-400 text-lg">
          Season Performance Dashboard
        </p>
      </header>

      {/* TEAM HUD */}
      <section className="grid grid-cols-4 gap-10 mb-24 relative z-10">
        <StatCard label="AVG" value={team.AVG} />
        <StatCard label="OBP" value={team.OBP} />
        <StatCard label="SLG" value={team.SLG} />
        <StatCard label="OPS" value={team.OPS} />
      </section>

      {/* OPS LEADERBOARD */}
      <section className="mb-28 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-yellow-400">
          OPS Leaders
        </h2>

        <div className="space-y-6">
          {topOps.map((p, i) => (
            <div
              key={p.name}
              onClick={() => setSelected(p)}
              className="relative bg-[#111827] px-10 py-6 rounded-2xl border border-yellow-500/20 cursor-pointer hover:border-yellow-400 hover:scale-[1.01] transition-all duration-200 shadow-xl"
            >
              <div
                className="absolute left-0 top-0 h-full bg-yellow-500/10 rounded-l-2xl"
                style={{
                  width: `${normalize(p.OPS, topOps[0].OPS)}%`,
                }}
              />

              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-8">
                  <span className="text-3xl font-bold text-yellow-400">
                    {i + 1}
                  </span>
                  <span className="text-2xl font-semibold">
                    {p.name}
                  </span>
                </div>

                <span className="text-3xl font-bold">
                  {format(p.OPS)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HR LEADERBOARD */}
      <section className="mb-28 relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-yellow-400">
          Home Run Leaders
        </h2>

        <div className="space-y-6">
          {[...stats.players]
            .filter((p) => p.HR > 0)
            .sort((a, b) => b.HR - a.HR)
            .map((p, i) => (
              <div
                key={p.name}
                onClick={() => setSelected(p)}
                className="bg-[#111827] px-10 py-6 rounded-2xl border border-yellow-500/20 cursor-pointer hover:border-yellow-400 hover:scale-[1.01] transition-all duration-200 shadow-xl flex justify-between"
              >
                <div className="flex gap-6">
                  <span className="text-3xl font-bold text-yellow-400">
                    {i + 1}
                  </span>
                  <span className="text-2xl font-semibold">
                    {p.name}
                  </span>
                </div>

                <span className="text-3xl font-bold text-yellow-400">
                  {p.HR}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* FULL ROSTER */}
      <section className="relative z-10">
        <h2 className="text-4xl font-bold mb-10 text-yellow-400">
          Full Roster
        </h2>

        <div className="grid grid-cols-4 gap-8">
          {stats.players.map((p) => (
            <div
              key={p.name}
              onClick={() => setSelected(p)}
              className="bg-[#111827] p-8 rounded-2xl border border-yellow-500/20 cursor-pointer hover:border-yellow-400 hover:scale-[1.03] transition-all duration-200 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold">
                  {p.name}
                </div>
                <div className="text-lg font-bold text-yellow-400">
                  {overallRating(p)}
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <Row label="AVG" value={format(p.AVG)} />
                <Row label="OPS" value={format(p.OPS)} />
                <Row label="HR" value={p.HR} />
                <Row label="SB" value={p.SB} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLAYER MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#111827] rounded-3xl p-14 w-[700px] border border-yellow-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-5xl font-extrabold text-yellow-400">
                {selected.name}
              </h2>
              <div className="text-4xl font-bold text-yellow-300">
                {overallRating(selected)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-12">
              <Stat label="AVG" value={format(selected.AVG)} />
              <Stat label="OBP" value={format(selected.OBP)} />
              <Stat label="SLG" value={format(selected.SLG)} />
              <Stat label="OPS" value={format(selected.OPS)} />
              <Stat label="H" value={selected.H} />
              <Stat label="HR" value={selected.HR} />
              <Stat label="BB" value={selected.BB} />
              <Stat label="SO" value={selected.SO} />
              <Stat label="SB" value={selected.SB} />
            </div>

            <div className="space-y-6">
              <RatingBar label="Contact" value={normalize(selected.AVG, 0.500)} />
              <RatingBar label="Power" value={normalize(selected.SLG, 0.800)} />
              <RatingBar label="Speed" value={normalize(selected.SB, 40)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-[#111827] p-12 rounded-3xl border border-yellow-500/20 text-center shadow-xl">
      <div className="text-sm text-gray-400 mb-3 tracking-wide">
        {label}
      </div>
      <div className="text-6xl font-extrabold text-yellow-400">
        {display.toFixed(3)}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="text-yellow-400 font-semibold">{value}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-[#0B0F1A] p-6 rounded-xl text-center border border-yellow-500/20">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-3xl font-bold text-yellow-400">{value}</div>
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm text-yellow-400 font-bold">
          {Math.round(value)}
        </span>
      </div>
      <div className="h-3 bg-[#0B0F1A] rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
