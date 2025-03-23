import fs from "fs";

// Läs in db.json
const dbPath = "./db.json";
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

if (!db.livsmedel) {
  console.error("❌ Ingen 'livsmedel' i databasen!");
  process.exit(1);
}

// Loopa genom alla livsmedel och rensa näringsvärden
db.livsmedel.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (item[key].naringsvarden) {
      item[key].naringsvarden = item[key].naringsvarden.map((naring) => ({
        namn: naring.namn,
        varde: naring.varde,
        enhet: naring.enhet,
        viktGram: naring.viktGram,
      }));
    }
  });
});

// Spara tillbaka till db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

console.log("✅ Näringsvärden har rensats och sparats!");
