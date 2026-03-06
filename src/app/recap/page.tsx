"use client";

import { useState } from "react";
import Image from "next/image";

const recaps = [
  {
    title: "PG Spring Training Showdown",
    location: "Houston, TX",
    date: "Feb 14–15, 2026",
    record: "3–1",
    poster: "/recaps/pg-spring-showdown.jpg",
  },
  {
    title: "PGBA Swing For The Fences AAA",
    location: "Houston, TX",
    date: "Feb 28–Mar 1, 2026",
    record: "3–2",
    poster: "/recaps/swing-for-the-fences.jpg",
  },
];

export default function RecapPage() {
  const [activePoster, setActivePoster] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-extrabold mb-4">
          Tournament Recaps
        </h1>

        <div className="h-1 w-16 bg-yellow-400 mb-12"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {recaps.map((recap, i) => (
            <div
              key={i}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-500/40 transition"
            >

              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={recap.poster}
                  alt={recap.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">

                <h2 className="text-xl font-bold mb-1">
                  {recap.title}
                </h2>

                <p className="text-zinc-400 text-sm mb-4">
                  {recap.date} • {recap.location}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-semibold">
                    Record: {recap.record}
                  </span>

                  <button
                    onClick={() => setActivePoster(recap.poster)}
                    className="text-sm text-zinc-300 hover:text-white"
                  >
                    View Poster →
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Poster Modal */}
      {activePoster && (
        <div
          onClick={() => setActivePoster(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
        >
          <div className="relative max-w-5xl w-full h-[90vh]">

            <Image
              src={activePoster}
              alt="Poster"
              fill
              className="object-contain"
            />

          </div>
        </div>
      )}
    </div>
  );
}