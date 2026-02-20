import Link from "next/link";
import Image from "next/image";
import players from "@/data/processed/players.json";

export default function RosterPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-8 py-16">
      <h1 className="text-5xl font-bold mb-14 text-center tracking-wide">
        11U Gold Roster
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {players.map((player: any) => (
          <Link
            key={player.slug}
            href={`/roster/${player.slug}`}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
          >
            <div className="relative h-80 w-full">
              <Image
                src={player.photo}
                alt={player.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{player.name}</h2>
                </div>
                <div className="text-3xl font-extrabold text-yellow-400">
                  #{player.number}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
