"use client";

import { useState } from "react";
import stats from "@/data/processed/stats.json";

function format(n: number) {
  return n.toFixed(3);
}

function normalize(value: number, max: number) {
  return Math.min(100, (value / max) * 100);
}

function overallRating(p: any) {
  const contact = normalize(p.AVG, 0.5);
  const power = normalize(p.SLG, 0.8);
  const speed = normalize(p.SB, 40);
  return Math.round((contact + power + speed) / 3);
}

export default function StatsPage() {

  const team = stats.team;

  const qualified = stats.players.filter((p) => p.PA >= 1);

  const topOps = [...qualified]
    .sort((a, b) => b.OPS - a.OPS)
    .slice(0, 5);

  const hrLeaders = [...stats.players]
    .filter((p) => p.HR > 0)
    .sort((a, b) => b.HR - a.HR)
    .slice(0, 5);

  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 md:px-12 lg:px-20 py-14 relative">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4">
            GP31 Gold 11U
          </h1>

          <p className="text-gray-400 text-lg">
            Season Performance Dashboard
          </p>
        </header>


        {/* TEAM STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

          <StatCard label="AVG" value={team.AVG} />
          <StatCard label="OBP" value={team.OBP} />
          <StatCard label="SLG" value={team.SLG} />
          <StatCard label="OPS" value={team.OPS} />

        </section>


        {/* OPS LEADERS */}
        <section className="mb-20">

          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            OPS Leaders
          </h2>

          <div className="space-y-4">

            {topOps.map((p, i) => (
              <LeaderboardRow
                key={p.name}
                rank={i + 1}
                name={p.name}
                value={format(p.OPS)}
                bar={normalize(p.OPS, topOps[0].OPS)}
                onClick={() => setSelected(p)}
              />
            ))}

          </div>
        </section>


        {/* HR LEADERS */}
        <section className="mb-20">

          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Home Run Leaders
          </h2>

          <div className="space-y-4">

            {hrLeaders.map((p, i) => (
              <LeaderboardRow
                key={p.name}
                rank={i + 1}
                name={p.name}
                value={p.HR}
                bar={normalize(p.HR, hrLeaders[0].HR)}
                onClick={() => setSelected(p)}
              />
            ))}

          </div>

        </section>


        {/* FULL ROSTER */}
        <section>

          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Full Roster
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {stats.players.map((p) => (
              <div
                key={p.name}
                onClick={() => setSelected(p)}
                className="bg-[#111827] p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-400 transition cursor-pointer"
              >
                <div className="flex justify-between mb-4">

                  <div className="font-semibold">{p.name}</div>

                  <div className="text-yellow-400 font-bold">
                    {overallRating(p)}
                  </div>

                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <Row label="AVG" value={format(p.AVG)} />
                  <Row label="OPS" value={format(p.OPS)} />
                  <Row label="HR" value={p.HR} />
                  <Row label="SB" value={p.SB} />
                </div>

              </div>
            ))}

          </div>

        </section>


      </div>


      {/* PLAYER MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
          onClick={() => setSelected(null)}
        >

          <div
            className="bg-[#111827] rounded-2xl w-full max-w-xl p-8 border border-yellow-500/30"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              {selected.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">

              <Stat label="AVG" value={format(selected.AVG)} />
              <Stat label="OBP" value={format(selected.OBP)} />
              <Stat label="SLG" value={format(selected.SLG)} />
              <Stat label="OPS" value={format(selected.OPS)} />
              <Stat label="HR" value={selected.HR} />
              <Stat label="SB" value={selected.SB} />

            </div>

            <RatingBar label="Contact" value={normalize(selected.AVG, 0.5)} />
            <RatingBar label="Power" value={normalize(selected.SLG, 0.8)} />
            <RatingBar label="Speed" value={normalize(selected.SB, 40)} />

          </div>

        </div>
      )}
    </div>
  );
}


function LeaderboardRow({ rank, name, value, bar, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="relative bg-[#111827] p-5 rounded-xl border border-yellow-500/20 cursor-pointer hover:border-yellow-400 transition"
    >

      <div
        className="absolute left-0 top-0 h-full bg-yellow-500/10 rounded-l-xl"
        style={{ width: `${bar}%` }}
      />

      <div className="relative flex justify-between">

        <div className="flex gap-4">
          <span className="text-yellow-400 font-bold">{rank}</span>
          <span className="font-semibold">{name}</span>
        </div>

        <span className="font-bold">{value}</span>

      </div>

    </div>
  );
}


function StatCard({ label, value }: any) {
  return (
    <div className="bg-[#111827] p-6 rounded-xl border border-yellow-500/20 text-center">

      <div className="text-sm text-gray-400 mb-1">
        {label}
      </div>

      <div className="text-3xl md:text-4xl font-bold text-yellow-400">
        {value.toFixed(3)}
      </div>

    </div>
  );
}


function Row({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="text-yellow-400">{value}</span>
    </div>
  );
}


function Stat({ label, value }: any) {
  return (
    <div className="bg-[#0B0F1A] p-4 rounded-lg text-center">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-xl font-bold text-yellow-400">{value}</div>
    </div>
  );
}


function RatingBar({ label, value }: any) {
  return (
    <div className="mb-4">

      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-yellow-400">{Math.round(value)}</span>
      </div>

      <div className="h-2 bg-[#0B0F1A] rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400"
          style={{ width: `${value}%` }}
        />
      </div>

    </div>
  );
}