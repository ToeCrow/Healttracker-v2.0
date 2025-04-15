import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MacrosBar from '../dashboard/MacrosBar';
import FoodSelector from './FoodSelector';
import { Button } from '@/components/ui/button';

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

  return (
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
        <option value="">Välj kategori</option>
        <option value="Frukost">Frukost</option>
        <option value="Lunch">Lunch</option>
        <option value="Middag">Middag</option>
        <option value="Mellanmål">Mellanmål</option>
      </select>

      <Button className="w-full rounded py-2 transition ">Lägg till måltid</Button>

      <FoodSelector />
    </div>
  );
};

export default AddMeal;
