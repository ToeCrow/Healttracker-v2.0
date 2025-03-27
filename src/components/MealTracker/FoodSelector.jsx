import React, { useState } from 'react';

const FoodSelector = () => {
  const [foods] = useState([
    { namn: 'Nöt talg', protein: 7, kolhydrater: 0, fett: 71, kcal: 656 },
    { namn: 'Gris späck', protein: 10, kolhydrater: 0, fett: 80, kcal: 700 },
    { namn: 'Kycklingbröst', protein: 31, kolhydrater: 0, fett: 3.6, kcal: 165 },
    { namn: 'Lax', protein: 20, kolhydrater: 0, fett: 13, kcal: 232 },
    { namn: 'Ägg', protein: 13, kolhydrater: 1.1, fett: 10, kcal: 155 },
    { namn: 'Ost (cheddar)', protein: 25, kolhydrater: 1.3, fett: 33, kcal: 402 },
    { namn: 'Köttfärs (nöt)', protein: 26, kolhydrater: 0, fett: 20, kcal: 250 },
    { namn: 'Banan', protein: 1.3, kolhydrater: 27, fett: 0.3, kcal: 105 },
    { namn: 'Potatis', protein: 2, kolhydrater: 17, fett: 0.1, kcal: 77 },
    { namn: 'Broccoli', protein: 2.8, kolhydrater: 7, fett: 0.4, kcal: 55 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [addedFoods, setAddedFoods] = useState([]);

  const filteredFoods = searchTerm.length > 0
    ? foods.filter(food =>
        food.namn.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : foods;

  const handleAddFood = () => {
    if (!selectedFood || !quantity) return;

    const quantityNumber = parseFloat(quantity);
    if (isNaN(quantityNumber) || quantityNumber <= 0) return;

    // Beräkna näringsvärdet per gram och multiplicera med den angivna mängden (gram)
    const foodWithQuantity = {
      ...selectedFood,
      quantity: quantityNumber,
      totalProtein: (selectedFood.protein / 100) * quantityNumber,
      totalKolhydrater: (selectedFood.kolhydrater / 100) * quantityNumber,
      totalFett: (selectedFood.fett / 100) * quantityNumber,
      totalKcal: (selectedFood.kcal / 100) * quantityNumber
    };

    setAddedFoods([...addedFoods, foodWithQuantity]);
    setSearchTerm('');
    setSelectedFood(null);
    setQuantity('');
  };

  return (
    <div className="w-80 mx-auto mt-5">
      <input
        type="text"
        placeholder="Sök livsmedel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      
      {searchTerm.length > 0 && filteredFoods.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded bg-white shadow-lg">
          {filteredFoods.map((food, index) => (
            <li
              key={index}
              onClick={() => setSelectedFood(food)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {food.namn}
            </li>
          ))}
        </ul>
      )}

      {selectedFood && (
        <div className="mt-3">
          <h3 className="text-lg font-semibold">Vald: {selectedFood.namn}</h3>
          
          {/* Inputfält för att ange mängd i gram */}
          <input
            type="number"
            placeholder="Ange mängd i gram..."
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          
          {/* Lägg till knapp */}
          <button
            onClick={handleAddFood}
            className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Lägg till
          </button>
        </div>
      )}

      {/* Lista över tillagda livsmedel */}
      <div className="mt-5">
        {addedFoods.length > 0 && (
          <h3 className="text-xl font-semibold">Tillagda livsmedel</h3>
        )}
        {addedFoods.map((food, index) => (
          <div key={index} className="mt-2 p-2 border border-gray-300 rounded">
            <h4 className="font-semibold">{food.namn} ({food.quantity} g)</h4>
            <p>Protein: {food.totalProtein} g</p>
            <p>Kolhydrater: {food.totalKolhydrater} g</p>
            <p>Fett: {food.totalFett} g</p>
            <p>Kcal: {food.totalKcal} kcal</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSelector;
