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
    <div className="flex justify-center items-center max-w-sm mx-auto  shadow-md mt-4 fixed-width bg-card flex-col gap-2 text-card-foreground w-fit rounded-md h-fit drop-shadow-[1px_1px_4px_rgba(0,0,0,0.1)] px-4 pt-6 pb-8">
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
