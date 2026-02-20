"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function SkillRadar({ stats }: { stats: any }) {
  const data = [
    { skill: "Contact", value: stats?.AVG ? stats.AVG * 200 : 50 },
    { skill: "Power", value: stats?.SLG ? stats.SLG * 150 : 50 },
    { skill: "Speed", value: stats?.SB ? stats.SB * 10 : 50 },
    { skill: "Discipline", value: stats?.OBP ? stats.OBP * 200 : 50 },
    { skill: "Impact", value: stats?.OPS ? stats.OPS * 150 : 50 },
  ];

  return (
    <div className="mt-14 max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Skill Overview</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="skill" stroke="#aaa" />
            <PolarRadiusAxis domain={[0, 150]} tick={false} />
            <Radar
              dataKey="value"
              stroke="#facc15"
              fill="#facc15"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
