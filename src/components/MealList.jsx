import React from 'react';
import MealListItem from './MealListItem';

const MealList = ({ meals = [], onEdit }) => {
  // Ensure meals is an array and sort them by date
  const sortedMeals = [...(meals || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="card w-fit">
      <h2 className="text-2xl font-bold mb-4 text-center">Loggade måltider</h2>
      <div className="flex flex-wrap justify-center items-center -mx-2 gap-2 w-fit">
        {sortedMeals.map((meal, index) => (
          <div key={index} className="w-full px-2 mb-4">
            <MealListItem meal={meal} onEdit={onEdit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
