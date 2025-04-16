import React, { use } from 'react';
import { useSelector } from 'react-redux';

const MacrosBar = () => {
  const macros = useSelector((state) => state.profile.macros) || {};

  const allMeals = useSelector((state) => state.meals.meals);

  const today = useSelector((state) => state.meals.currentDate);

  const todaysMeals = allMeals.filter(meal => meal.date === today);

  let totalProtein = 0;
  let totalKolhydrater = 0;
  let totalFett = 0;

  todaysMeals.forEach(meal => {
    totalProtein += Number(meal.total?.protein || 0);
    totalKolhydrater += Number(meal.total?.kolhydrater || 0);
    totalFett += Number(meal.total?.fett || 0);
  });

  const getPercentage = (current, target) =>
    Math.min((current / target) * 100, 100).toFixed(1);

  const MacroRow = ({ label, current, target, color }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{label}: <span className="font-semibold">{current.toFixed(1)}g</span> / {target}g</span>
        <span>{getPercentage(current, target)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${getPercentage(current, target)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 card rounded-lg shadow-md fixed-width">
      <h3 className="text-md font-semibold mb-4">Dagens makronutrienter</h3>
      <MacroRow
        label="Protein"
        current={totalProtein}
        target={macros.proteinGrams}
        color="bg-green-500"
      />
      <MacroRow
        label="Kolhydrater"
        current={totalKolhydrater}
        target={macros.carbohydratesGrams}
        color="bg-blue-500"
      />
      <MacroRow
        label="Fett"
        current={totalFett}
        target={macros.fatGrams}
        color="bg-yellow-400"
      />
    </div>
  );
};

export default MacrosBar;
