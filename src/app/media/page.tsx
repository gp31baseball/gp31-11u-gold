"use client";

import Image from "next/image";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HEADER */}
      <section className="relative pt-24 pb-16 px-8 text-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

        <div className="relative z-10 max-w-5xl mx-auto">

          <h1 className="text-5xl font-extrabold text-yellow-500 tracking-wide">
            GP31 Media 
            COMMING SOON!!
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Live. Interviews. Highlights.
          </p>

          <div className="h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent mt-8" />

        </div>
      </section>

      {/* LIVE STREAM FEATURE */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto">

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_50px_120px_rgba(0,0,0,0.9)]">

            {/* Replace with real livestream embed */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YOUR_LIVE_STREAM_ID"
              title="Live Stream"
              allowFullScreen
            />

            {/* LIVE Badge */}
            <div className="absolute top-6 left-6 bg-red-600 px-4 py-1 rounded-full text-sm font-bold tracking-wider animate-pulse">
              ● LIVE
            </div>

          </div>

        </div>
      </section>

      {/* INTERVIEW + HIGHLIGHTS */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

          {/* INTERVIEW FEATURE */}
          <div>

            <h2 className="text-2xl font-bold text-yellow-500 mb-6">
              Player Interview
            </h2>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-yellow-500/30 shadow-xl">

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_INTERVIEW_VIDEO_ID"
                title="Interview"
                allowFullScreen
              />

            </div>

            <p className="text-zinc-400 mt-4">
              Post-game breakdown, mindset, and development insight.
            </p>

          </div>

          {/* HIGHLIGHT GRID */}
          <div>

            <h2 className="text-2xl font-bold text-yellow-500 mb-6">
              Highlights
            </h2>

            <div className="grid grid-cols-2 gap-6">

              {["abc123", "def456", "ghi789", "jkl012"].map((id, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/60 transition"
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}`}
                    title="Highlight"
                    allowFullScreen
                  />
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
