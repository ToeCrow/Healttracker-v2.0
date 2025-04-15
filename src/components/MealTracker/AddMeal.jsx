import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MacrosBar from '../dashboard/MacrosBar';
import { Button } from '@/components/ui/button';
import MealList from '../MealList';

const AddMeal = () => {
  const location = useLocation();
  const { date, mealType: initialMealType } = location.state || {};
 


  const today = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayDate = date || today;
  const [mealType, setMealType] = useState(initialMealType || '');

    const getTotal = (items, key) => {
      const total = items.reduce((acc, item) => acc + item[key], 0);
      return Number.isInteger(total) ? total : total.toFixed(1);
    };
    
    // mock data
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

    const handleRemoveFood = (index) => {
      const updated = [...addedFoods];
      updated.splice(index, 1);
      setAddedFoods(updated); // uppdatera din state
    };
    
    const handleSelectFood = (food, index) => {
      setSelectedFood(food); // sätt den för redigering
      setSelectedIndex(index); // valfritt, om du vill uppdatera istället för lägga till
    };
    

  return (
    <main id='main-content' className='flex justify-center items-center min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start p-4 max-w-4xl w-full'>
    <div className='flex flex-col gap-4 card'>
      <MacrosBar />
      <h2>{displayDate}</h2>
      <p className="text-sm text-gray-500">
        Du registrerar: <strong>{mealType || 'Ingen måltid vald'}</strong>
      </p>

      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        required
        className="block w-full px-4 py-2 pr-10 text-accent bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none"
      >
        <option value="" disabled hidden>Välj kategori</option>
        <option value="Frukost">Frukost</option>
        <option value="Lunch">Lunch</option>
        <option value="Middag">Middag</option>
        <option value="Mellanmål">Mellanmål</option>
      </select>

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
            autoFocus
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          
          {/* Lägg till knapp */}
          
          <Button 
          onClick={handleAddFood} 
          className="w-full rounded py-2 transition ">
            Lägg till matvara
            </Button>
        </div>
      )}

      {addedFoods.length > 0 && (
        <div className="mt-4 p-3 border-t border-gray-300">
          <h3 className="text-lg font-bold">Totalt:</h3>
          <p>Protein: {getTotal(addedFoods, "totalProtein")} g</p>
          <p>Kolhydrater: {getTotal(addedFoods, "totalKolhydrater")} g</p>
          <p>Fett: {getTotal(addedFoods, "totalFett")} g</p>
          <p>Kcal: {getTotal(addedFoods, "totalKcal")} kcal</p>
        </div>
      )}

      {/* Lista över tillagda livsmedel */}
      <div className="mt-5">
  {addedFoods.length > 0 && (
    <h3 className="text-xl font-semibold">Tillagda livsmedel:</h3>
  )}
  {addedFoods.map((food, index) => (
    <div
      key={index}
      onClick={() => handleSelectFood(food, index)} // sätt det som selected
      className="mt-2 p-2 border border-gray-300 rounded relative hover:bg-gray-50 cursor-pointer"
    >
      {/* Kryss-knapp */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Stoppar click från att även trigga onClick för edit
          handleRemoveFood(index); // din borttagningsfunktion
        }}
        className="absolute top-1 right-2 text-red-500 text-lg font-bold hover:text-red-700"
        aria-label="Ta bort"
      >
        ×
      </button>

      <h4 className="font-semibold">
        {food.namn} ({food.quantity} g)
      </h4>
      <p>Protein: {Number.isInteger(food.totalProtein) ? food.totalProtein : food.totalProtein.toFixed(1)} g</p>
      <p>Kolhydrater: {Number.isInteger(food.totalKolhydrater) ? food.totalKolhydrater : food.totalKolhydrater.toFixed(1)} g</p>
      <p>Fett: {Number.isInteger(food.totalFett) ? food.totalFett : food.totalFett.toFixed(1)} g</p>
      <p>Kcal: {Number.isInteger(food.totalKcal) ? food.totalKcal : food.totalKcal.toFixed(1)} kcal</p>
    </div>
  ))}
</div>
    </div>
    </div>
    <div className="flex flex-col gap-4">
          <MealList />
        </div>

        </div>
    </main>
  );
};

export default AddMeal;
