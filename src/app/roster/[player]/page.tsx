import Image from "next/image";
import Link from "next/link";
import players from "@/data/processed/players.json";
import stats from "@/data/processed/stats.json";
import SkillRadar from "@/components/SkillRadar";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ player: string }>;
}) {
  const { player: slug } = await params;

  const player = players.find(
    (p: any) => p.slug?.toLowerCase() === slug?.toLowerCase()
  );

  if (!player) {
    return <div className="text-white p-20">Player not found</div>;
  }

  const playerStats = stats.players?.find(
    (p: any) => p.name === player.name
  );

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-10 py-16">
      <Link
        href="/roster"
        className="text-zinc-400 hover:text-white mb-10 inline-block"
      >
        ← Back to Roster
      </Link>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={player.photo}
            alt={player.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="lg:border-l lg:border-zinc-800 lg:pl-12">
          <h1 className="text-5xl xl:text-6xl font-extrabold mb-4">
            <div className="h-1 w-16 bg-yellow-400 mb-6"></div>

            {player.name}
          </h1>

          <div className="flex items-center gap-6 mb-10">
            <span className="text-5xl text-yellow-400 font-extrabold">
              #{player.number}
            </span>
            <span className="text-2xl text-zinc-300">
              {player.position}
            </span>
          </div>

          {playerStats && (
            <>
              <div className="grid grid-cols-2 gap-6 max-w-xl">
                <StatBlock label="AVG" value={playerStats.AVG} />
                <StatBlock label="OPS" value={playerStats.OPS} />
                <StatBlock label="SLG" value={playerStats.SLG} />
                <StatBlock label="OBP" value={playerStats.OBP} />
                <StatBlock label="HR" value={playerStats.HR} />
                <StatBlock label="SB" value={playerStats.SB} />
              </div>

              <SkillRadar stats={playerStats} />
            </>
          )}

          {player.bio && (
            <div className="mt-14 max-w-xl">
              <h2 className="text-2xl font-bold mb-4">Player Profile</h2>
              <p className="text-zinc-300 leading-relaxed">
                {player.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: any }) {
  let formatted = "-";

  if (typeof value === "number") {
    if (label === "HR" || label === "SB") {
      formatted = value.toString();
    } else {
      formatted = value.toFixed(3).replace(/^0/, "");
    }
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-xl text-center border border-zinc-800 hover:border-yellow-500/40 hover:-translate-y-1 transition">
      <p className="text-4xl font-bold">{formatted}</p>
      <p className="text-zinc-400 mt-2 tracking-wide text-sm">{label}</p>
    </div>
  );
}
