import fs from "fs";
import fetch from "node-fetch";

// Ladda in db.json
const dbPath = "./db.json";
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

if (!db.livsmedel) {
  console.error("Ingen 'livsmedel' i databasen!");
  process.exit(1);
}

const livsmedel = db.livsmedel;

async function fetchNutritionalValues() {
  for (const item of livsmedel) {
    for (const key in item) {
      if (item[key].naringsvarden) {
        console.log(`✅ Näringsvärden redan hämtade för: ${item[key].namn}`);
        continue;
      }

      console.log(`🔄 Hämtar data för: ${item[key].namn}...`);
      try {
        const response = await fetch(item[key].naringsvardenLink);
        const data = await response.json();

        // Spara näringsvärden i objektet
        item[key].naringsvarden = data;
      } catch (error) {
        console.error(`❌ Misslyckades att hämta data för ${item[key].namn}`, error);
      }
    }
  }

  // Spara uppdaterad data tillbaka till db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
  console.log("✅ Alla näringsvärden har sparats i db.json!");
}

fetchNutritionalValues();
