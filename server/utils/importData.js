import fs from 'fs';
import FoodNutrient from '../models/FoodNutrient.js';

const importData = async () => {
  try {
    // Läs in db.json
    const rawData = fs.readFileSync('server/data/db.json');
    const foods = JSON.parse(rawData).livsmedel;

    // Loopar igenom alla livsmedel och deras näringsvärden
    for (const food of foods) {
      const foodName = food[0].namn;
      const nutrients = food[0].naringsvarden;

      // Importera varje näringsvärde för varje livsmedel
      for (const nutrient of nutrients) {
        await FoodNutrient.create({
          namn: foodName,
          naringsvarde_namn: nutrient.namn,
          varde: nutrient.varde,
          enhet: nutrient.enhet,
          viktGram: nutrient.viktGram,
          livsmedel_id: food[0].nummer,  // Referens till livsmedlets id
        });
      }
    }

    console.log('Data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

importData();
