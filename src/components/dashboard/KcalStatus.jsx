import React from 'react';
import { useSelector } from 'react-redux';
import { selectTDEE } from '@/Redux/reducers/profileSlice';

const KcalStatus = () => {
  const tdee = useSelector(selectTDEE);
  const meals = useSelector((state) => state.meals.mealLogs || []);

  const todaysDate = new Date().toISOString().split('T')[0];

  // Filtrera måltider för idag
  const todaysMeals = meals.filter((meal) => meal.date === todaysDate);

  // Räkna ut kalorier som konsumerats idag
  const consumedCalories = todaysMeals.reduce((total, meal) => total + Number(meal.energy || 0), 0);

  // Räkna ut om det är kvar eller över
  const remainingKcal = tdee - consumedCalories;
  const isOver = remainingKcal < 0;

  return (
    <div className="flex justify-center items-center m-6">
      <div 
        className={`w-32 h-32 flex flex-col justify-center items-center rounded-full border-4 
          ${isOver ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}
      >
        <p className="font-bold text-2xl">{Math.abs(Math.round(remainingKcal))}</p>
        <p className="text-sm">{isOver ? 'KCAL ÖVER' : 'KCAL KVAR'}</p>
      </div>
    </div>
  );
};

export default KcalStatus;
