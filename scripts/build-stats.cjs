const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const RAW_PATH = path.join(process.cwd(), "src/data/raw/gc-season.csv");
const OUTPUT_DIR = path.join(process.cwd(), "src/data/processed");

function safeNumber(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function main() {
  if (!fs.existsSync(RAW_PATH)) {
    console.log("CSV not found at:", RAW_PATH);
    process.exit(1);
  }

  let csv = fs.readFileSync(RAW_PATH, "utf8");
  if (csv.charCodeAt(0) === 0xFEFF) {
    csv = csv.slice(1);
  }

  const rows = parse(csv, { skip_empty_lines: true });
  const dataRows = rows.slice(2);

  const players = [];

  const teamTotals = {
    AB: 0,
    H: 0,
    BB: 0,
    HBP: 0,
    TB: 0,
    HR: 0,
    SO: 0,
    SB: 0,
    PA: 0
  };

  for (const row of dataRows) {
    const last = row[1];
    const first = row[2];
    const name = (first + " " + last).trim();
    if (!name) continue;

    const PA = safeNumber(row[4]);
    const AB = safeNumber(row[5]);
    if (!AB && !PA) continue;

    const H = safeNumber(row[10]);
    const HR = safeNumber(row[14]);   // <-- HOME RUN INDEX
    const BB = safeNumber(row[17]);
    const SO = safeNumber(row[18]);
    const HBP = safeNumber(row[20]);
    const SB = safeNumber(row[25]);
    const TB = safeNumber(row[43]);

    const player = {
      name,
      AB,
      H,
      HR,
      BB,
      HBP,
      TB,
      SO,
      SB,
      PA
    };

    player.AVG = AB ? H / AB : 0;
    player.OBP = PA ? (H + BB + HBP) / PA : 0;
    player.SLG = AB ? TB / AB : 0;
    player.OPS = player.OBP + player.SLG;

    players.push(player);

    teamTotals.AB += AB;
    teamTotals.H += H;
    teamTotals.HR += HR;
    teamTotals.BB += BB;
    teamTotals.HBP += HBP;
    teamTotals.TB += TB;
    teamTotals.SO += SO;
    teamTotals.SB += SB;
    teamTotals.PA += PA;
  }

  teamTotals.AVG = teamTotals.AB ? teamTotals.H / teamTotals.AB : 0;
  teamTotals.OBP = teamTotals.PA ? (teamTotals.H + teamTotals.BB + teamTotals.HBP) / teamTotals.PA : 0;
  teamTotals.SLG = teamTotals.AB ? teamTotals.TB / teamTotals.AB : 0;
  teamTotals.OPS = teamTotals.OBP + teamTotals.SLG;

  const leaderboards = {
    avg: [...players].sort((a,b)=>b.AVG-a.AVG),
    obp: [...players].sort((a,b)=>b.OBP-a.OBP),
    ops: [...players].sort((a,b)=>b.OPS-a.OPS),
    hr:  [...players].sort((a,b)=>b.HR-a.HR),
    sb:  [...players].sort((a,b)=>b.SB-a.SB),
    so:  [...players].sort((a,b)=>b.SO-a.SO)
  };

  const output = {
    players,
    leaderboards,
    team: teamTotals
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "stats.json"),
    JSON.stringify(output, null, 2)
  );

  console.log("Stats engine upgraded -> src/data/processed/stats.json");
}

main();
